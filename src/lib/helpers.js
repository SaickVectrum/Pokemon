//Se trae el modulo bcrypt para cifrar las contraseñas de los usuarios
const bcrypt = require('bcryptjs');

//Se crea este objeto para que almacene varios metodos
const helpers = {};

//Este metodo encripta la contraseña utilizado para el registro
helpers.encryptPassword = async (password) => {
    //genSalt se utiliza para crear un hash y se repita 10 veces dicho proceso
    const salt = await bcrypt.genSalt(10);
    //Cifra la contraseña guardando el resultado en la constante
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

//Este metodo compara las contraseñas para el inicio de sesion
helpers.matchPassword = async (password, savedPasword) => {
    //Se pone en un try catch en caso de que ocurra un error
    try{
        //El metodo 'compare' compara la contraseña que ingrese el usuario con la guardada en la base de datos
        return await bcrypt.compare(password, savedPasword); 
    } catch(e){
        //Muestra el error por consola
        console.log(e);
    }
}

module.exports = helpers;
