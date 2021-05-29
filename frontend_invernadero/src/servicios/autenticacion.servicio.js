import http from "../conf.http.js"
class AuthService{
    login(nom_usuario,password){
            return http.post("/auth/login",{nom_usuario,password}).then(
            response => {
                if(response.data.accessToken){
                    localStorage.setItem("usuario", JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    
    logout(){localStorage.removeItem("usuario");}

    registro(nom_usuario, password, email){
        return http.post("/auth/registro",{nom_usuario, password, email});
    }
    getUsuarioActual(){
        return JSON.parse(localStorage.getItem('usuario'));
    }
}

export default new AuthService();