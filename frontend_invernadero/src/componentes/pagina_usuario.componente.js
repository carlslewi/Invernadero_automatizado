import React, {Component} from "react";
import { Link } from "react-router-dom";
import UsuarioServicio from "../servicios/usuario.servicio"

export default class PagUsuario extends Component{
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
                                <Link to={"usuario/temperaturas"} className="nav-link">
                                   <h4>Temperaturas</h4> 
                                </Link>
                            </li>
                            
                            <li className="nav-item"> 
                                <Link to={"usuario/humedades"} className="nav-link">
                                    <h4>Humedades</h4>
                                </Link>
                            </li>
                            <li className="nav-item"> 
                                <Link to={"usuario/luminosidades"} className="nav-link">
                                    <h4>Luminosidades</h4>
                                </Link>
                            </li>
                        </div>
                    </nav>                  
            </div>
        );
    }
}