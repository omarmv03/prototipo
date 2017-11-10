import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgModel, ControlValueAccessor } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector:'ng-pagination[ngModel]',
    template:`
                <ul class="pagination" >
                    <li><a [ngClass]="{'pagination-disabled': !previousItemValid}" (click)="firstPage()" [innerHTML]="firstText"></a></li>
                    <li> <a [ngClass]="{'pagination-disabled': !previousItemValid}" (click)="previousPage(nextItem)" aria-label="Previous"> <span aria-hidden="true">{{previousText}}</span> </a> </li>
                    <li *ngFor="let pageNo of pageList" [ngClass]="{'active':seletedPage === pageNo}">
                        <a (click)="setCurrentPage(pageNo)">{{pageNo}}</a>
                    </li>
                    <li> <a [ngClass]="{'pagination-disabled': !nextItemValid}" (click)="nextPage(nextItem)" aria-label="Next"> <span aria-hidden="true">{{nextText}}</span> </a> </li>
                    <li><a [ngClass]="{'pagination-disabled': !nextItemValid}" (click)="lastPage()" [innerHTML]="lastText" ></a></li>
                    </ul>

    `,
    styleUrls: ['pagination.component.scss']
})
export class PaginationComponent implements ControlValueAccessor, OnInit {
  @Input() previousText:string;
  @Input() nextText:string;
  @Input() firstText:string;
  @Input() lastText:string;
  @Input() totalItems:number;
  @Input() cPage:number;
  @Input() pageSize:number;
  @Input() boundaryLinks:boolean;

  @Output() pageChanged = new EventEmitter();
  currentpage:number;
  pageList:Array<number> = [];
  private onChange: Function;
  private onTouched: Function;
  private seletedPage: number;
  private nextItem: number;
  private previousItem: number;
  private nextItemValid: boolean;
  private previousItemValid: boolean;

  constructor(private pageChangedNgModel: NgModel) {
    this.pageChangedNgModel.valueAccessor = this;

  }
  ngOnInit() {
    this.doPaging();
  }
  doPaging() {
     this.pageList = [];
     this.seletedPage = this.currentpage;

    if (this.currentpage < this.totalItems) {
      this.pageList.push(this.currentpage);
      this.nextItemValid = true;
      this.nextItem = this.currentpage+1;
    }else {
      this.pageList.push(this.currentpage);
      this.nextItemValid = false;
      this.nextItem = this.currentpage+1;
    }
    //previous validation
    if((this.currentpage) >1) {
      this.previousItemValid = true;
       this.previousItem = (this.currentpage*this.pageSize)-1;
    }else {
      this.previousItemValid = false;
    }
  }
  setCurrentPage(pageNo:number) {
    this.seletedPage = pageNo;
    this.pageChangedNgModel.viewToModelUpdate(pageNo);
    this.pageChageListner();
  }
  firstPage() {
    if (this.previousItemValid) {
        this.currentpage = 1;
        this.pageChangedNgModel.viewToModelUpdate(1);
        this.pageChageListner();
        this.doPaging();
    }
  }
  lastPage() {
    if(this.nextItemValid) {
        var totalPages = (this.totalItems / this.pageSize);
        var lastPage = (totalPages) - (totalPages % this.pageSize === 0 ? this.pageSize : totalPages % this.pageSize)+1;
        this.currentpage = lastPage;
        this.pageChangedNgModel.viewToModelUpdate(lastPage);
        this.pageChageListner();
        this.doPaging();
    }
  }
  nextPage(pageNo:number) {
    if(this.nextItemValid) {
        this.currentpage = pageNo;
        this.pageChangedNgModel.viewToModelUpdate(pageNo);
        this.pageChageListner();
        this.doPaging();
    }
  }
  previousPage(pageNo:number) {
    if (this.previousItemValid) {
        //var temp = pageNo - this.pageSize;
        var temp = pageNo - 2;
        this.currentpage = temp > 0 ?temp: 1;
        //this.currentpage =pageNo-2;
        this.pageChangedNgModel.viewToModelUpdate(this.currentpage);
        this.pageChageListner();
        this.doPaging();
    }
  }
  writeValue(value: string): void {
        if (!value && value !== '0') return;
        this.setValue(value);
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: (_: any) => {}): void {
        this.onTouched = fn;
    }
  setValue(currentValue:any) {
    this.currentpage = currentValue;
    this.doPaging();
  }
  pageChageListner() {
    this.pageChanged.emit(this.currentpage);
  }
}
