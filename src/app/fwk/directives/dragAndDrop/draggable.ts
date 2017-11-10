import { Input, HostListener, Directive, HostBinding } from '@angular/core';


@Directive({
  selector: '[drag]'
})
export class DraggableDirective {

  @HostBinding('draggable')
  get draggable() {
    return !this.disableDrag;
  }

  @Input()
  set drag(options: any) {
    if (options) {
      this.options = options;
    }
  }

  @Input() disableDrag: Boolean = false;

  private options: any = {};

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    if(!this.disableDrag) {
      event.dataTransfer.setData('Text', JSON.stringify(this.options));
    }
  }
}
