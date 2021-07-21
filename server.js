const { response } = require("express");
const express = require("express");
const { request } = require("http");
//const { request } = require("http");
const path =require("path");
const passport = require("passport");
const {users} = require("./models")
const app = express();
const PORT = 8000;

require("./config/passport")
//Configuración EJS
//1. Definiendo en donde se ubicará el directorio views
app.set('views', path.join(__dirname, 'views'));
//2. Definiendo el motor que usaremos
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true})); //Permite procesar los datos enviados por el cliente a través de x-www-form-urlencoded
app.use(express.json()); //Permite procesar los datos enviados por el cliente a través de application/json

//Middleware de aplicacion trabaja con los métodos HTTP (GET, POST, PUT, DELETE)
//Van manejar los objetos request, response y una función llamada next
app.get("/", (request, response) => {
    response.render("pages/home", {
        title: "Home"
    });
});
app.get("/login", (request, responsse) => {
    response.render("pages/login", {
        title: "Login"
    });
});


app.get("/register", (request, response) => {
    //Obtener los datos que me envia el cliente
    response.render("pages/register", {
        title: "Register"
    });
});

app.post("/register", async (request, response, next) => {
    let {firstname, lastname, email, password} = request.body;
    console.log(request.body);
    try{
      await users.create({firstname, lastname, email, password});
      response.redirect("/register");
    }catch(error){
      next(error);
    }
});

app.get("/tasks", (request, response) => {
    response.render("pages/tasks", {
        title: "Tasks",
        message: "Lista de tareas",
        items: "../exmaple-4-server/tasks.json",
    });
});

app.use((request, response) => {
    let pathNotFound = path.join(__dirname, "public", "404.html");
    response.status(404).sendFile(pathNotFound);
});

//Middleware para manejo de errores
//es necesario pasarle los 4 argumentos para que express lo note como error
app.use((error, request, response, next) => {
    console.log("Se ha recibido el error");
    console.log(error.message);
    response.status(404).send(error.message);

})

app.listen(PORT, () => {
    console.log(`Servidor escuchando sobre el puerto ${PORT}`);
});