
import colors from 'colors';
import inquirer from 'inquirer';
import { validate } from 'uuid';
import { Tareas } from '../models/tareas.js';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que te gustaria hacer?',
        choices: [ 
            // estas son las preguntas que inquirer enviara al prompt([])                                      
            {
                value:'1',
                name: `${'1.'.green} Crear tarea`
            },

            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },

            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },

            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },

            {
                value: '5',
                name: `${'5.'.green} Completar tareas`
            },

            {
                value: '6',
                name: `${'6.'.green} Borra tarea` 
            },

            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]            
    }
]



const inquirerMenu = async()=>{

    console.clear();

    console.log('================================='.green)
    console.log('      Seleccione una opcion')
    console.log('=================================\n'.green)

    // inquirer espera que le enviemos las preguntas como un []
    const {opcion} = await inquirer.prompt(preguntas)   
    return opcion;
}


const pausa = async()=>{
    
    const question = [
        {
            type:'input',
            name: 'enter',
            message: `\nPresione ${'ENTER'.blue} para continuar\n`,
        }
    ]

    await inquirer.prompt(question)
    
}


const leerInput = async()=>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: 'Descripcion:',
            validate(value){
                if(value.length ===0){
                    return 'Por favor ingrese un valor valido.'
                }
                //Debemos retornar true o si no no se completara la funcion
                return true;          
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}



const listadoBorrarTarea = async(tareas = [])=>{

    //Creamos las choises a partir de el index y desc de las tareas con el metodo map()
    const choices = tareas.map((tarea, index)=>{
        const idx = `${index + 1}.`.green;
    
        //retornamos el 'value' (uuid de la tarea) y 'name' que imprimira el prompt()
        return{
            value: tarea.id,
            name: `${idx.green}` + ' ' + tarea.desc,
            
        }
    })
    
    // agregamos una opcion para caancelar y salir del menu sin borrar ninguna tarea
    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    })

    //Creamos el prompt con las choices desprendidas del metodo map()
    const question = [
        {
            type: 'list',
            name: 'id',
            message:'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(question)

    return id;
    
}


const confirmar = async(message)=>{

    const question = [{

        type: 'confirm',
        name: 'ok',
        message
    }]


    const {ok} = await inquirer.prompt(question)
    return ok;        
};




const tareasCheckList = async(tareas = [])=>{

    //Creamos las choises a partir de el index y desc de las tareas con el metodo map()
    const choices = tareas.map((tarea, index)=>{
        const idx = `${index + 1}.`.green;
    
        //retornamos el 
        return{
            value: tarea.id,
            name: `${idx.green}` + ' ' + tarea.desc,
            checked: (tarea.completadoEn)? true : false
            
        }
    })

    //Creamos el prompt con las choices desprendidas del metodo map()
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message:'Seleccione',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(question)

    return ids;
    
}    



export {
 inquirerMenu,
 pausa,
 leerInput,
 listadoBorrarTarea,
 confirmar,
 tareasCheckList

};