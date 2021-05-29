import authHeader from "./autenticacion-header"
import http from "../conf.http.js"


class UsuarioServicio{
    getContenidoPublico(){
        return http.get("/test/all");
    }
    
    getContenidoUsuario(){
        return http.get("/test/usuario",{headers:authHeader()});
    }

    getContenidoAdministrador(){
        return http.get("/test/administrador",{headers:authHeader()});
    }
    getListaUsuarios(){
        return http.get("/test/usuarios");
    }
    borrarUsuario(id){
        return http.delete(`/test/usuarios/${id}`);
    }
    borrarUsuarios(){
        return http.delete(`/test/usuarios`);
    }
    findByNombre(nombre){
       return http.get(`/test/usuarios?nom_usuario=${nombre}`);
    }
    updateActivar(id, datos){
        return http.put(`/test/usuarios/${id}`, datos);
    }
    getInactivos(){
        return http.get("/test/usuarios_inactivos");
    }
    getActivos(){
        return http.get("/test/usuarios_activos");
    }
}

export default new UsuarioServicio();
