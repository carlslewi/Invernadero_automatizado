import axios from "axios";
import authHeader from "./autenticacion-header"
const API_URL = "http:localhost:8080/api/test"

class UsuarioServicio{
    getContenidoPublico(){
        return axios.get(API_URL+'all');
    }
    
    getContenidoUsuario(){
        return axios.get(API_URL+'usuario', {headers:authHeader()});
    }

    getContenidoAdministrador(){
        return axios.get(API_URL+'administrador',{headers:authHeader()});
    }
}

export default new UsuarioServicio();
