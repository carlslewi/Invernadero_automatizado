import React, {Component} from "react";
import UsuarioServicio from "../servicios/usuario.servicio"
import Sensores from "../servicios/datossensores.servicio"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export default class PagUsuario extends Component{
    
    constructor(props){
        super(props);
        this.obtenerTemperaturas = this.obtenerTemperaturas.bind(this);
        this.obtenerUltTemp = this.obtenerUltTemp.bind(this);

           this.state={
            //content:"",
            temperaturas:[],
            temperaturamax:[],
            fecha:new Date()
        };
    }

    onChange=(fecha)=>{
        this.setState({fecha:fecha})
        //this.obtenerTemperaturasDia();
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

       //this.obtenerTemperaturasDia();
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

    obtenerTemperaturasDia() {
        const anno = this.state.fecha.getFullYear()
        const mes = this.state.fecha.getMonth();
        const dia = this.state.fecha.getDate();
        const fechap = new Date(anno,mes,dia)
        const fechaf = new Date(anno,mes,dia+1)
        
        Sensores.getDayTemps(fechap, fechaf).then(
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
            <div class="list row">
               <div className="col-md-4">
                <div class="row>">
                    <h4>Temperaturas</h4>
                    <p>Última temperatura registrada: {temperaturamax &&
                            temperaturamax.map((temperatura) => (
                        temperatura.valor
                    ))}</p>
                </div>
                <div class="row>">
                    <h4>Temperaturas Registradas</h4>
                    <button className="m-3 btn-sm btn btn-outline-dark" type="button" onClick={()=>this.obtenerTemperaturasDia()}>Buscar</button>
                    <ul className="list-group">
                        {temperaturas &&
                            temperaturas.map((temperatura) => (
                        <input value={temperatura.valor}/>
                    ))}
                    </ul>
                </div>
            </div>
                
                <div className="col-md-8">
                <div>
                <DatePicker selected={this.state.fecha} onSelect={this.onChange} />
           <br /><br />
            </div>
                </div>
            </div>
        );
    }
}
