//Este archivo lo usaremos en el publicador para poder guardar los datos en la base de datos
//no podemos olvidar crear un archivo . env con el puerto 8081 que es el que usamos
const axios = require("axios")
const instance = axios.create({
    baseURL:"http://localhost:8080/api"
 })
exports.instance = instance;