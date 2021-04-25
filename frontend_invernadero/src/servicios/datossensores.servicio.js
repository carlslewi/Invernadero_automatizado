import http from "../conf.http.js"
class Sensores{
    getAllTemps(){
        return http.get("/temperaturas");
    }
    getUltTemp(){
        return http.get("/temperaturamax");
    }
     getDayTemps(fechap, fechaf){
        return http.get(`/temperaturas?fechap=${fechap}&fechaf=${fechaf}`);
     }
}

export default new Sensores();
