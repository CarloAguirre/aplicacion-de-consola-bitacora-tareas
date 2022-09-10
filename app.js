
// IMPORTANTE: Algunos package como inquirer requiere importarse mediante 'import{}' y no con 'require()'//
// deberemos ademas agregar '"type": "module",' en el package.json //

import colors from 'colors';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { confirmar, inquirerMenu, leerInput, listadoBorrarTarea, pausa, tareasCheckList } from './helpers/inquirer.js';
import { Tarea } from './models/tarea.js';
import { Tareas } from './models/tareas.js';



const main = async()=>{
    
    let opcion= '';

    const tareas = new Tareas();

    
    const tareasDB = leerDB();
    
    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB)
    }
    
    
    do{ 
        
        opcion = await inquirerMenu();
        
        switch (opcion) {
            case '1': // CREAR TAREA //
                const desc = await leerInput()
                tareas.crearTarea(desc)               
                break;
            case '2': // LISTAR TAREAS //

                tareas.listadoCompleto
                //console.log(tareas._listado)
                break;
            case '3': // LISTAR TAREAS COMPLETADAS //
                
                tareas.listarCompletadasPendientes(true)
                break;
            case '4': // LISTAR TAREAS PENDIENTES //

                tareas.listarCompletadasPendientes(false)           
                break;
            case '5': // COMPLETAR TAREAS //

                const ids = await tareasCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids)          
                break;    
            case '6': // BORRAR TAREAS //
            
                const id = await listadoBorrarTarea(tareas.listadoArr);
                
                if (id !== '0'){
                    const ok = await confirmar('¿Desea borrar esta esta tarea?');
                    if(ok) tareas.borrarTarea(id);
                } 
                break;
    
            default:
                break;
        }

        // Haremos writeFileSync del arreglo de tareas 
        guardarDB(tareas.listadoArr)
        await pausa();
        
    }while(opcion !== '0')
    
    
};

main();




