module.exports = {
    HOST : "localhost",
    USER : "admin",
    PASSWORD : "lewi",
    DB : "invernadero",
    dialect: "MariaDB",
    pool : {
        max : 10, //numero maximo de conexiones
        min : 0, //numero minimo de conexiones 
        acquire : 30000, // tiempo maximo de conexion antes de lanzar el error
        idle : 10000 //tiempo maximo que una conexion puede estar inactiva antes de ser liberada
    }
};