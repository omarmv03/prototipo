import { FormController } from './components/form/formController.component';
import { FieldErrorMessageComponent } from './components/form/fieldErrorMessage.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { FormValidationMessageComponent } from './components/form/formValidationMessage.component';
import { SelectControlComponent } from './components/selectControl/selectControl.component';
import { LblSelectComponent } from './components/lblselect/lblSelect.component';
import { CheckboxControlComponent } from './components/checkboxControl/checkboxControl.component';
import { CheckboxOpControlComponent } from './components/checkboxOpControl/checkboxOpControl.component';
import { LblCheckboxComponent } from './components/lblCheckbox/lblCheckbox.component';
import { ModalComponent } from './components/modalPopUp/modalPopUp.component';
import { PopUpComponent } from './components/popupControl/popupControl.component';
import { TextAreaControlComponent } from './components/textareaControl/textareaControl.component';
import { LblTextareaComponent } from './components/lblTextarea/lblTextarea.component';
import { ToastService } from './services/toaster.service';
import { IntegerInputControlComponent } from './components/input/integer.input.control';
import { LabelInputIntegerControlComponent } from './components/lblInput/lblInput.integer.control';
import { LabelInputStringControlComponent } from './components/lblInput/lblInput.string.control';
import { StringInputControlComponent } from './components/input/string.input.control';
import { DinamicGridComponent } from './components/dynamicGrid/dynamicGrid.component';
import { PaginationComponent } from './components/dynamicGrid/pagination.component';
import { LabelDescriptionComponent } from './components/labelDescription/labelDescription.control';
import { ComponentContainer } from './directives/componentContainer';
import { DropDownComponent } from './components/dynamicGrid/dropDown.component';
import { AccordionService } from './services/accordion.service';
import { FormService } from './services/form.service';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { DisableControlDirective } from './directives/disableControl';
import { NumberIntegerInputDirective } from './directives/numberIntegerInput.directive';
import { CanActivateViaAuthGuard } from './services/login-auth.service';
import { UserService } from './services/user.service';
import { AutoresizeDirective } from './directives/autoresize';
import { DraggableDirective } from './directives/dragAndDrop/draggable';
import { DroppableDirective } from './directives/dragAndDrop/droppable';
import { ServerService } from './services/server.service';
import { RouteService } from './services/route.service';
import { SharedService } from './services/shared.service';
import { ContratanteService } from './services/contratante.service';
import { ExportService } from './services/exports.service';
import { PopUpActionComponent } from './components/popupActionControl/popupActionControl.component';

@NgModule({
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule],
  declarations: [FormValidationMessageComponent,
                 LblSelectComponent,
                 SelectControlComponent,
                 CheckboxControlComponent,
                 CheckboxOpControlComponent,
                 LblCheckboxComponent,
                 IntegerInputControlComponent,
                 LabelInputIntegerControlComponent,
                 StringInputControlComponent,
                 LabelDescriptionComponent,
                 ModalComponent,
                 PopUpComponent,
                 TextAreaControlComponent,
                 LblTextareaComponent,
                 DinamicGridComponent,
                 LabelInputStringControlComponent,
                 PaginationComponent,
                 ComponentContainer,
                 DropDownComponent,
                 ConfirmComponent,
                 DisableControlDirective,
                 NumberIntegerInputDirective,
                 AutoresizeDirective,
                 DraggableDirective,
                 DroppableDirective,
                 FieldErrorMessageComponent,
                 PopUpActionComponent
                ],
  exports: [FormValidationMessageComponent,
            LblSelectComponent,
            SelectControlComponent,
            CheckboxControlComponent,
            CheckboxOpControlComponent,
            LblCheckboxComponent,
            IntegerInputControlComponent,
            LabelInputIntegerControlComponent,
            StringInputControlComponent,
            LabelDescriptionComponent,
            LabelInputStringControlComponent,
            ModalComponent,
            PopUpComponent,
            TextAreaControlComponent,
            LblTextareaComponent,
            DinamicGridComponent,
            ConfirmComponent,
            AutoresizeDirective,
            PopUpActionComponent
           ],

  entryComponents: [
    LabelDescriptionComponent
  ]
})
export class FWKModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FWKModule,
      providers: [ToastService,
                  AccordionService,
                  CanActivateViaAuthGuard,
                  UserService,
                  ServerService,
                  RouteService,
                  SharedService,
                  ContratanteService,
                  ExportService,
                  FormService]
    };
  }
}
