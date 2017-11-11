export interface IComponentData{
    id: number;
    tipo: number;
    descripcion: string;
    valor: string | number;
    control: string;
    orden: number;
    nullable: boolean;
    longitudMaxima?: number;
    default: string;
    minimo: string;
    maximo: string;
    valoresPosibles: Array<any>;
    
    dependienteId?: number;
    dependienteValor: string;
    tieneDependencias?: boolean;
    
    // --> Locales
    isObserved?: Boolean;
}