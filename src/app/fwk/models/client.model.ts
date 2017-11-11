export class ClientModel {
    apellido: string ;
    apellidoMaterno: string;
    contactos: Contactos[];
    domicilios:Domicilios[];
    fechanacimiento:string;
    id:number;
    idPais:number;
    nombre:string;
    razonSocial:string;
    rut:string;
    segmentacion:string;
    tipoPersona:string;
}

export class Contactos {
    descripcion: string;
    id: string;
    tipo: string;
}

export class Domicilios {
    calle:string;
    ciudad:string;
    codigoPostal:string;
    comuna:string;
    descripcion:string;
    id:string;
    idCiudad:number;
    idComuna:number;
    idPais:number;
    idRegion:number;
    numero:string;
    region:string;
    tipo:string;
}
