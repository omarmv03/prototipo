import { PaginadoModel } from './paginado.model';

export class GrillaModel {
    title: string ;
    msg: string;
    type: string;
    seleccionadas:Array<any>;
    filtrosDeshabilitados:boolean;
    css:Object;
    resize:boolean=true;
    dataConfig: GridDataConfig;
    columns: Array<GridColumnsConfig>;

    constructor() {
      this.dataConfig = new GridDataConfig();
      this.columns = new Array<GridColumnsConfig>();
    }
}

export class GridDataConfig {
  paging: PaginadoModel;
  order: Ordenamiento[];
  filter: any = {};
}

export class GridColumnsConfig {
  css: {};
  name: string;
  title: String;
  visible: Boolean;
  order: number;
  filter: Filter;

  constructor() {
    this.filter = new Filter();
  }
}

class Filter {
  value: string;
}

export class Ordenamiento {
    columna: string;
    asc: boolean = true;
    posicion:number;
}
