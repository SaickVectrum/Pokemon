//Se trae el framework express para utilizar sus metodos.
const express = require('express');
//Se importa router de express
const router = express.Router();

//Renderiza la primer vista al entrar a la aplicacion
router.get('/', (req,res) =>{
    res.render('index')
})

//Se exporta router para que funcione las renderizaciones
module.exports = router;