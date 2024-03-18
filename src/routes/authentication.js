//Se trae el framework express para utilizar sus metodos.
const express = require('express');
//Se importa router de express para gestionar adecuadamente la estructura de las rutas
const router = express.Router();
//Se trae el modulo passport para una mejor autenticacion y registro de los usuarios.
const passport = require('passport');
//Se traen los metodos para proteger las rutas
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');

//Se renderiza el formulario para que el usuario se registre
router.get('/signup', isNotLoggedIn, (req, res) =>{
    res.render('auth/signup');
})

//Se autentifica si el usuario es creado correctamente
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    //Si la autenticacion es correcta, envia al usuario a la pagina principal
    successRedirect: '/profile',
    //De lo contrario deja al usuario en la misma vista de registro
    failureRedirect: '/signup',
    //Permite recibir mensajes flash de exito y de error
    failureFlash: true
}))

//Renderiza la vista de inicio de sesion
router.get('/signin', isNotLoggedIn, (req, res)=> {
    res.render('auth/signin');
})

//Se autentifica si el usuario esta creado
router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin',{
        //Si la autenticacion es correcta, envia al usuario a la pagina principal
        successRedirect: '/profile',
        //De lo contrario deja al usuario en la misma vista de inicio de sesion
        failureRedirect: '/signin',
        //Permite recibir mensajes flash de exito y de error
        failureFlash: true
    })(req, res, next);
})

//Renderiza la pagina principal despues de la autenticacion del usuario
router.get('/profile', isLoggedIn, (req, res) =>{
    res.render('profile')
})

//Permite al usuario cerrar sesion 
router.get("/logout", isLoggedIn, (req, res, next) => {
    req.logOut(req.user, err => {
        if(err) return next(err);
        //Envia al usuario a signin por si desea volver a iniciar sesion
        res.redirect("/signin");  
    });
});

//Se exporta router para que funcione las renderizaciones
module.exports = router;