//Este metodo permite identificar si un usuario inicio sesion o no para proteger las rutas
module.exports = {
    
    isLoggedIn(req, res, next) {
        //Verifica si la sesion del usuario existe, si es asi, permite mostrar las rutas selecionadas
        if (req.isAuthenticated()){
            return next();
        }
        //De lo contrario envia al usuario a que inicie sesion
        return res.redirect('/signin');
    },

    //Es lo contrario al anterior
    isNotLoggedIn(req, res, next){
        //Si el usuario esta logeado o ha iniciado sesion, no permite que se observen las rutas seleccionadas
        if (!req.isAuthenticated()){
            return next();
        }
        //Envia al usuario a la vista principal 
        return res.redirect('/profile');
    }

}