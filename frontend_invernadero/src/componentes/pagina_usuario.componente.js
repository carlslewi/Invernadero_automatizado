import React, {Component} from "react";
import UsuarioServicio from "../servicios/usuario.servicio"
import Sensores from "../servicios/datossensores.servicio"


export default class PagUsuario extends Component{
    
    constructor(props){
        super(props);
        this.obtenerTemperaturas = this.obtenerTemperaturas.bind(this);
        this.state={
            //content:"",
            temperaturas:[]
        };
    }
    componentDidMount(){
        UsuarioServicio.getContenidoUsuario().then(
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

        this.obtenerTemperaturas();
    }

    obtenerTemperaturas() {
        Sensores.getDatos().then(
            response => {
                this.setState({
                    temperaturas:response.data
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
        const {temperaturas} = this.state ;
        return(
            <div className="container">
                <header className="jumbotron">
                   Página Usuario
                </header>
                <div className="col-md-6">
                <h4>Temperaturas</h4>
                <ul className="list-group">
                    {temperaturas &&
                        temperaturas.map((temperatura) => (
                    <li>
                    {temperatura.valor}
                    </li>
                ))}
                </ul>
                </div>
            </div>
        );
    }
}
