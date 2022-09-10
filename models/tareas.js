
import {v4 as uuidv4} from 'uuid';
import{ Tarea } from './tarea.js';
import colors from 'colors';

class Tareas{
    _listado = {};     // aqui se iran acumulando las tareas (id, desc, completadoEn) de la funcion 'crearTarea'

/*EJEMPLO de: _listado[tarea.id]= tarea

            { uuid-232343242-23434: Tarea{ 
                id:uuid-232343242-23434', 
                desc: barrer la casa, 
                completadoEn: 11-09-2022 
            }
        }
        */
    
    constructor(){
        this._listado = {};
    }



    cargarTareasFromArray(tareas = []){
        
        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        })
    }



    crearTarea(desc =''){
       
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }



    get listadoArr(){

        const listado = [];

        /* EJEMPLO de console.log(tareas.listadoArr):
        [
            {
                id: '94bd37c7-7a73-4a63-a2b5-ffa90b4b772b',
                desc: 'lala',
                completadoEn: null
            },
        ]
        */        
        // utilizando el Object.keys obtendremos las propiedades (names) de la las intancias de tareas{} como un []
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }



    get listadoCompleto(){
        
        console.log('')
        this.listadoArr.forEach((tarea, index)=>{
            //El index (posiciones de array) comienza en 0, por lo que sumaremos 1
            const idx = `${index + 1}`.green; 
            const {desc, completadoEn} = tarea;
            const estado =(completadoEn)
                                ?'Completado'.green              
                                :'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`)
        });
    }


    
    listarCompletadasPendientes(completada = true){
        console.log('')
        let contador = 0;

        this.listadoArr.forEach((tarea)=>{           
            const {desc, completadoEn} = tarea;
            const estado =(completadoEn)
                                ?'Completado'.green              
                                : 'Pendiente'.red;

            if(completada){
                if (completadoEn){
                    contador ++;
                    console.log(`${(contador.toString() + '.').green} ${desc} :: ${completadoEn.green}`)                  
                }
            }else{
                if(!completadoEn){
                    contador ++;
                    console.log(`${(contador.toString() + '.').green} ${desc} :: ${estado}`)  
                }

            }
            
        });
    }



    borrarTarea(id){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }



    toggleCompletadas(ids = []){

        ids.forEach(id=>{
            const tarea = this._listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }

        });

        // Si secamos el check de una tarea "completa" esta debera cambiar a incompleta (null)
        this.listadoArr.forEach(tarea=>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn =null;
            }
        })

    };


    
    
};

export{
    Tareas
};