import axios from "axios";
const API_URL = "http://localhost:8080/api/auth";

class AuthService{
    login(nom_usuario,password){
        return axios.post(API_URL+"login",{nom_usuario,password}).then(
            response => {
                if(response.data.accessToken){
                    localStorage.setItem("usuario", JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    
    logout(){localStorage.removeItem("usuario");}

    registro(nom_usuario, password, email){
        return axios.post(API_URL+"registro",{nom_usuario, password, email});
    }
    getUsuarioActual(){
        return JSON.parse(localStorage.getItem('usuario'));
    }
}

export default new AuthService();