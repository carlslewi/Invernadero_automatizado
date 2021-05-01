import http from "../conf.http.js"
class Sensores{
    getAllTemps(){
        return http.get("/temperaturas");
    }
    getTempMax(){
        return http.get("/temperaturamax");
    }
    getTempMin(){
        return http.get("/temperaturamin");
    }
    getDayTemps(fechap, fechaf){
        return http.get(`/temperaturasFechas?fechap=${fechap}&fechaf=${fechaf}`);
    }
    getUltTemp(){
        return http.get("/temperaturault");
    }
}

export default new Sensores();
