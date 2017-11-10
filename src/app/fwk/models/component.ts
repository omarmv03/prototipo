import { Type } from '@angular/core';

export class Component implements IComponent{
  constructor(public type: Type<any>, public data: any) {}
}

export interface IComponent {
  type: Type<any>;
  data: any;
}