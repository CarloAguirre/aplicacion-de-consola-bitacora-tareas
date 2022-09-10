import fs from 'fs';

const archivo = './db/data.json'


const guardarDB = (data)=>{

    //se ejecuta desde el root ya que se llamara a la funcion desde app.js
    fs.writeFileSync(archivo, JSON.stringify(data));

};



const leerDB = ()=>{

    if(! fs.existsSync(archivo)){
        return null;
    };
    //reaFileSync pide el nombre del archivo, y el encoding (utf-8)
    const info = fs.readFileSync(archivo, { encoding:'utf-8'} );

    // Info sera un String, NO EL ARREGLO ORIGINAL, por lo que deberemos hacer un "parse"
    const data = JSON.parse(info);
    console.log(data);

    return data;
};

export {
    guardarDB,
    leerDB
};