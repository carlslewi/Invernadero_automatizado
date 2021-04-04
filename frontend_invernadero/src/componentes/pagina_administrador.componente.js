import React, {Component} from "react";
import UsuarioServicio from "../servicios/usuario.servicio"

export default class PagAdmin extends Component{
    constructor(props){
        super(props);

        this.state={
            content:""
        };
    }
    componentDidMount(){
        UsuarioServicio.getContenidoAdministrador().then(
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
                   <h3>{this.state.content}</h3> 
                </header>
            </div>
        );
    }
}