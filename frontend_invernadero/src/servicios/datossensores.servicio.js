import http from "../conf.http.js"
class Sensores{
    getAllTemps(){
        return http.get("/temperaturas");
    }
    getUltTemp(){
        return http.get("/temperaturamax");
    }
}

export default new Sensores();
