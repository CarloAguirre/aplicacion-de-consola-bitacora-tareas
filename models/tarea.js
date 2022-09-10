
import {v4 as uuidv4} from 'uuid'

//crearemos la clase tarea, para lo cual importaremos el paquete uuid (especificamente su funcion v4)//

class Tarea{

    //id = '';
    //desc = '';
    //completadoEn = null;

    constructor(desc){
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;

    }
    
}

export{
    Tarea
};