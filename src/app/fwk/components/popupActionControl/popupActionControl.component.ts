import { Component, OnInit,Output,EventEmitter,Input,forwardRef,ViewChild,ViewContainerRef,ComponentFactoryResolver,
    ReflectiveInjector,ComponentFactory,ComponentRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
//http://blog.rangle.io/dynamically-creating-components-with-angular-2/

@Component({
moduleId: module.id,
selector: 'popup-action-control',
templateUrl: 'popupActionControl.component.html',
styleUrls: ['popupActionControl.component.scss']
})
export class PopUpActionComponent implements OnInit {

componentRef: ComponentRef<any>;

/**OUTPUT */
@Output() onAccept = new EventEmitter<any>();
@Output() onDismiss = new EventEmitter<any>();
/**INPUT */
@Input() show:string;
@Input() config:Object;
@Input() set componentData(data: {component: any, inputs: any, outputs: any }) {
   if (!data) {
       return;
   }
   this.dynamicComponentContainer.clear();
   //this.componentRef.instance.text = 'Text Dinamico x Input';
   //this.componentRef.instance.output.subscribe(event => console.log(event));
   // Inputs need to be in the following format to be resolved properly
   let inputProviders = Object.keys(data.inputs).map((inputName) => {return {provide: inputName, useValue: data.inputs[inputName]};});
   let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

   // We create an injector out of the data we want to pass down and this components injector
   let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

   // We create a factory out of the component we want to create
   //let factory = this.resolver.resolveComponentFactory(data.component);
   const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(data.component);

   // We create the component using the factory and the injector
   let component = factory.create(injector);
   //this.componentRef = this.dynamicComponentContainer.createComponent(factory);
   // We insert the component into the dom container
   this.dynamicComponentContainer.insert(component.hostView);

   // We can destroy the old component is we like by calling destroy
   if (this.componentRef) {
       this.componentRef.destroy();
   }

   this.componentRef = component;
}
/** ViewChild */
@ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

constructor(private resolver: ComponentFactoryResolver) {}

ngOnInit() {
   //
}

handleAcept = function(formPopup:FormData) {
   this.onAccept.emit();
};

handleDismiss = function() {
   this.onDismiss.emit();
};

}
