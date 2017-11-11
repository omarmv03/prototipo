
/*
*
*/
export abstract class ServiceBase {
    protected mapFormToModel<T>(pObject: any, pModel: T): T {
        let returnEntity: T;

        for(var prop in pModel) {
            console.log(prop);
            for(let objProp in pObject) {
                console.log(objProp);
            }
        }
        // console.log(<T>pObject);
        // return <T>pObject;
        return <T>pObject;
    }
}
