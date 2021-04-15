import React, {Component} from "react";
import UsuarioServicio from "../servicios/usuario.servicio"

export default class Inicio extends Component{
    constructor(props){
        super(props);

        this.state={
            content:""
        };
    }
    componentDidMount(){
        UsuarioServicio.getContenidoPublico().then(
            response => {
                this.setState({
                    content:response.data
                });
            }, error => {
                this.setState({
                    content: (error.response && error.response.data) ||
                    error.message || error.message.toString()
                });
            }
        );
    }
    render(){
        return(
            <div className="container">
                <header className="jumbotron">
                   Bienvenido a la App, para consultar datos debes estar registrado.
                </header>
            </div>
        );
    }
}