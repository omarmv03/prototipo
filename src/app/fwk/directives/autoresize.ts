import { Directive,ViewChild,ElementRef,OnInit,Input } from '@angular/core';

@Directive({selector: '[myHighlight]'})

export class AutoresizeDirective {
  /*
  @ViewChild('header') header: ElementRef;
  @ViewChild('subheader') subheader:ElementRef;
  @ViewChild('section') section:ElementRef;*/
  constructor(private el:ElementRef) { 
    //console.log('this.subheader');
    el.nativeElement.style.backgroundColor='yellow';
  }
}