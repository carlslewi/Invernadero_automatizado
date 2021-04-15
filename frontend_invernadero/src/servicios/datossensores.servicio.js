import http from "../conf.http.js"
class Sensores{
    getDatos(){
        return http.get("/temperaturas");
    }
}

export default new Sensores();
