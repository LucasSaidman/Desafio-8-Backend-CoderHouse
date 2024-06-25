const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const cors = require("cors");
const path = require('path');
require("./database.js");

const app = express();
const PUERTO = 8080;

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");
const fakerRouter = require("./routes/faker.router.js");

const manejadorError = require("./middleware/error.js");


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(express.static("./src/public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


//Passport
app.use(passport.initialize());
initializePassport(); 
app.use(cookieParser());


//AuthMiddleware
const authMiddleware = require("./middleware/authmiddleware.js");
app.use(authMiddleware);


//Configuramos Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", userRouter);
app.use("/api", fakerRouter);
app.use("/", viewsRouter);
app.use(manejadorError);


//Listen
const httpServer = app.listen(PUERTO, () => {

    console.log(`Escuchando en el puerto http://localhost:${PUERTO}`);

});


//WebSockets
const SocketManager = require("./sockets/socketmanager.js");
new SocketManager(httpServer);