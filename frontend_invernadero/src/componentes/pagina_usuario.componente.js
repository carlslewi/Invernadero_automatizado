import React, {Component} from "react";
import UsuarioServicio from "../servicios/usuario.servicio"
import Sensores from "../servicios/datossensores.servicio"


export default class PagUsuario extends Component{
    
    constructor(props){
        super(props);
        this.obtenerTemperaturas = this.obtenerTemperaturas.bind(this);
        this.obtenerUltTemp = this.obtenerUltTemp.bind(this);
        this.state={
            //content:"",
            temperaturas:[],
            temperaturamax:[],
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

        //this.obtenerTemperaturas();
       this.obtenerUltTemp();
    }

    obtenerTemperaturas() {
        Sensores.getAllTemps().then(
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

    obtenerUltTemp() {
        Sensores.getUltTemp().then(
            response => {
                this.setState({
                    temperaturamax:response.data
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
        const {temperaturamax, temperaturas} = this.state;
        return(
            <div className="container">
                <header className="jumbotron">
                   Página Usuario
                </header>
               <div className="col-md-6">
                <h6>Última temperatura registrada</h6>
                <ul className="list-group">
                    {temperaturamax &&
                        temperaturamax.map((temperatura) => (
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
