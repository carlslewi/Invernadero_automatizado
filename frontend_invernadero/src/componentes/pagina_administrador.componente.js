import React, {Component} from "react";
import { Link } from "react-router-dom";
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
                    <nav>
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item"> 
                                <Link to={"/administrador/usuarios"} className="nav-link">
                                    Usuarios
                                </Link>
                            </li>
                            <li className="nav-item"> 
                                <Link to={"administrador/temperaturas"} className="nav-link">
                                    Temperaturas
                                </Link>
                            </li>
                        </div>
                    </nav>
                    
                    
            </div>
        );
    }
}