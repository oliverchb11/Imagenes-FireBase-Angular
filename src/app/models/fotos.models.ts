export class Fotos{
    public archivo:File;
    public nombreArchivo:string;
    public url:string;
    public estaSubiendo;
    public progreso:number;

    constructor(archivo:File){

        this.archivo = archivo;
        this.nombreArchivo = archivo.name;
        this.estaSubiendo = false;
        this.progreso = 0;
    }
}