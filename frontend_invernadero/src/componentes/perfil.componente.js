import React,{Component} from "react";
import AuthService from "../servicios/autenticacion.servicio";

export default class Perfil extends Component{
    constructor(props){
        super(props);

        this.state={
            usuarioActual:AuthService.getUsuarioActual()
        };
    }

    render(){
        const {usuarioActual} = this.state;
        return(
            <div className="container">
                <header className="jumbotron">
                    <h3>Perfil <strong>{usuarioActual.nom_usuario}</strong></h3>
                </header>
                <p>
                    <strong>Id:</strong>{" "}
                    {usuarioActual.id}
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    {usuarioActual.email}
                </p>
                <strong>Permisos:</strong>
                <ul>
                    {usuarioActual.roles && usuarioActual.roles.map((rol,index)=><li key="index">{rol}</li>)}
                </ul>
            </div>
        );
    }
}