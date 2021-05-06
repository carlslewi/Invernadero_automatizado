import http from "../conf.http.js"
class Sensores{
    //Temperaturas
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
    getMaxDayTemp(fechap,fechaf){
        return http.get(`/temperaturaMaxDia?fechap=${fechap}&fechaf=${fechaf}`);
    }
    getMinDayTemp(fechap,fechaf){
        return http.get(`/temperaturaMinDia?fechap=${fechap}&fechaf=${fechaf}`);
    }
    getUltTemp(){
        return http.get("/temperaturault");
    }
    //Humedades
    getAllHums(){
        return http.get("/humedades");
    }
    getHumMax(){
        return http.get("/humedadmax");
    }
    getHumMin(){
        return http.get("/humedadmin");
    }
    getDayHums(fechap, fechaf){
        return http.get(`/humedadesFechas?fechap=${fechap}&fechaf=${fechaf}`);
    }
    getMaxDayHum(fechap,fechaf){
        return http.get(`/humedadMaxDia?fechap=${fechap}&fechaf=${fechaf}`);
    }
    getMinDayHum(fechap,fechaf){
        return http.get(`/humedadMinDia?fechap=${fechap}&fechaf=${fechaf}`);
    }
    getUltHum(){
        return http.get("/humedadult");
    }
    //Luminosidad
    getAllLums(){
        return http.get("/luminosidades");
    }
    getLumMax(){
        return http.get("/luminosidadmax");
    }
    getLumMin(){
        return http.get("/luminosidadmin");
    }
    getDayLums(fechap, fechaf){
        return http.get(`/luminosidadesFechas?fechap=${fechap}&fechaf=${fechaf}`);
    }
    getMaxDayLum(fechap,fechaf){
        return http.get(`/luminosidadMaxDia?fechap=${fechap}&fechaf=${fechaf}`);
    }
    getMinDayLum(fechap,fechaf){
        return http.get(`/luminosidadMinDia?fechap=${fechap}&fechaf=${fechaf}`);
    }
    getUltLum(){
        return http.get("/luminosidadult");
    }
}

export default new Sensores();
