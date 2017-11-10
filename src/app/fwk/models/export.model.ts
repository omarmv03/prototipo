import { Ordenamiento } from './grilla.model';

export class ExportModel {
    titulo:string;
    columnasVisibles:string[];
    filtros:string[];
    orden:Ordenamiento[];
    nombreArchivo:string;
  }
