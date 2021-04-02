/* Si se ha iniciado sesion son usuario y unaccesToken devuelve el encabezado
de la autorizacion http si no devuelve un objeto vacio*/

export default function authHeader(){
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if(usuario && usuario.accessToken){
        return{ "x-access-token": usuario.accessToken}
    }else{return{}}
}