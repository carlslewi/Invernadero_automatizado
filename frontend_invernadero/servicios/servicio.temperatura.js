import http from "../conf.http";

class STempDatos {
    getTemperaturas(){
        return http.get("/temperaturas");
    }
}

export default new STempDatos();