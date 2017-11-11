import { Output, EventEmitter, Input, HostListener, Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[drop]'
})
export class DroppableDirective {
  @Input()
  set drop(options: any) {
    if (options) {
      this.options = options;
    }
  }

  @Output() dropObject = new EventEmitter();

  private options: any;

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  onDragOver(event) {
       event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    var objDrag = JSON.parse(event.dataTransfer.getData('Text'));
    var sendToDropFunction:any = {};
    sendToDropFunction.from = objDrag;
    sendToDropFunction.to = this.options;
    this.dropObject.next(sendToDropFunction);
  }
}
