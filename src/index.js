//Se trae el framework express para utilizar sus metodos.
const express = require('express');
//Morgan permite observar las peticiones que se le hacen al servidor
const morgan = require('morgan');
//express-handlebars es el motor de las plantillas handlebars
const {engine} = require('express-handlebars');
const path = require('path');
//Flash se utiliza para mostrar mensajes exitosos o de errores a los usuarios
process.EventEmitter = require('events').EventEmitter;
const flash = require('connect-flash');
//express-session se utiliza para crear sesiones, ademas de que flash requiere de sesiones para funcionar
const session = require('express-session');
//Se trae el modulo "express-mysql-session" para que las sesiones se puedan guardar en la base de datos
const MySQLStore = require('express-mysql-session')(session);
//Se trae el modulo passport para una mejor autenticacion y registro de los usuarios.
const passport = require('passport');
//Se trae la configuracion de la base de datos
const { database } = require('./keys');
//se trae el metodo condig del dotenv para manejar variables de entorno
const {config} = require('dotenv');
//Ejecución de config
config();
//Variable de entorno del puerto, para realizar la conexión al mismo
const { PORT } = require('./config');

//Initializations
//Se inicia la conexion a la base de datos y del framework express
const app = express();
//Se trae la configuracion de nuestro passport que hemos creado, para que el resto de la aplicacion se entere de la autenticacion creada
require('./lib/passport');

//settings
//Se configura el servidor en que va funcionar express
//Se configura que por defecto tome un puerto del sistema, o de lo contrario tome el 4000
app.set('port', process.env.PORT || 4000);
//Se le dice a node donde encontrar la carpeta views que contendra los handlebars
app.set('views', path.join(__dirname, 'views'))
//Se configuran los handlebars para su correcto funcionamiento
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}))
//Configuracion de la extensión de los archivos
app.set('view engine','.hbs')


//Middlewares
//Se ejecutan cada vez que se envia una petición al servidor
//Se configura la sesion 
app.use(session({
    //El secret es de como se va a llamar la sesion para guardarla
    secret: 'faztmysqlnodemysql',
    //Se pone en false para que no se renueve la sesion a cada momento
    resave: false,
    //Se pone en false para que no se vuelva a establecer la sesion en cada momento
    saveUninitialized: false,
    //Se guarda en la base de datos y no en el servidor, a traves del modulo express-mysql-session
    store: new MySQLStore(database)
}));
//Se trae el metodo flash para inicializarlo y mostrar mensajes de exito o de error
app.use(flash());
//Se trae el modulo morgan para que muestre las peticiones al servidor
app.use(morgan('dev'));
//Se trae el metodo urlencoded para poder aceptar los datos que envien los usuarios desde los formularios, y se
//le pone una extension en false, ya que se van a recibir datos sencillos como texto y numeros.
app.use(express.urlencoded({extended: false}));

//Se trae el metodo de json para enviar y recibir datos en dicho formato.
app.use(express.json());
//Con esto se le dice a passport que inicie o se ejecute 
app.use(passport.initialize());
//Se le indica que va a manejar los datos recibidos con la sesion
app.use(passport.session());


//Global variables
app.use((req,res, next) =>{
    //Se trae el metodo flash, para que los mensajes pueden ser utilizados y vistos en todas las rutas
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})


//Routes
//Se indican las rutas que se van a utilizar
//Ruta de bienvenida
app.use(require('./routes/index'));
//Ruta de autenticación
app.use(require('./routes/authentication'));
//Se pone pokemons antes de requerirla para que las rutas hijas o siguientes de pokemons tenga dicho prefijo
app.use('/pokemons',require('./routes/pokemones'));

//Public
//Es a lo unico que el navegador puede acceder 
//Se le indica a node donde se encuentra la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
//Se enlaza con la configuracion anterior, del puerto del servidor y muestra por consola si se conecta satisfactoriamente
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})