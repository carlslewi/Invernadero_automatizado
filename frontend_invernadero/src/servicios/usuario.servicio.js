import axios from "axios";
import authHeader from "./autenticacion-header"
import http from "../conf.http.js"
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
    getListaUsuarios(){
        return http.get("/test/usuarios");
    }
    borrarUsuario(id){
        return http.delete(`/test/usuarios/${id}`);
    }
    findByNombre(nombre){
       return http.get(`/test/usuarios?nom_usuario=${nombre}`);
    }
    updateActivar(id, datos){
        return http.put(`/test/usuarios/${id}`, datos);
    }
}

export default new UsuarioServicio();
