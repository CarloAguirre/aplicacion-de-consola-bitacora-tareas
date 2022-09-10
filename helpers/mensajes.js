
//FORMA MANUAL DE CREAR EL MENU DE PREGUNTAS: para facilitarlo utilizaremos el paquete 'inquirer' (inquirer.js)

require('colors');


const mostrarMenu = ()=>{

    return new Promise((resolve)=>{    // retornamos el argumento como promesa o si no pasara a la cola de callback y se ejecutara solo la funcion siguiente ('pausa')

        console.log('================================='.green)
        console.log('     Seleccione una opcion'.green)
        console.log('=================================\n'.green)
        
        console.log(`${'1.'.green} Seleccione una tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tareas`);
        console.log(`${'6.'.green} Borra tarea`);
        console.log(`${'0.'.green} Salir\n`);
        
        const readline = require('readline').createInterface({      // El paquete 'realine' esta ya en Node
            input: process.stdin,    //dentro de los procesos del paquete 'realine' se encuentra el stdin (= input del usuario)
            output: process.stdout
        });
        
        readline.question('Seleccione una opcion: ', (opcion)=>{
            // console.log(opcion);         imprimira el input que haga el usuario
            readline.close()             // es necesario hacer 'close' o si no 'realine' se quedara esperando informacion de usuario
            resolve(opcion);
        })
        
    })
};


const pausa = ()=>{

    return new Promise((resolve)=>{

        const readline = require('readline').createInterface({      
            input: process.stdin,  
            output: process.stdout
        });
        
        readline.question(`\nPresione ${'ENTER'.blue} para continuar\n`, (opcion)=>{   
            readline.close()
            resolve()            
        })
        
    })
}


module.exports = {
    mostrarMenu,
    pausa
};