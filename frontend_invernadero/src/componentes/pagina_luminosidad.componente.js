import React, {Component} from "react";
import UsuarioServicio from "../servicios/usuario.servicio"
import Sensores from "../servicios/datossensores.servicio"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Line} from "react-chartjs-2"

export default class PagLuminosidad extends Component{
    
    constructor(props){
        super(props);
        this.obtenerUltLum = this.obtenerUltLum.bind(this);
        this.obtenerLumMax = this.obtenerLumMax.bind(this);
        this.obtenerLumMin = this.obtenerLumMin.bind(this);
        this.obtenerLuminosidadesDia=this.obtenerLuminosidadesDia.bind(this);
        this.obtenerLuminosidadMaxDia=this.obtenerLuminosidadMaxDia.bind(this);
        this.obtenerLuminosidadMinDia=this.obtenerLuminosidadMinDia.bind(this);

           this.state={
            //content:"",
            luminosidades:[],
            ultlum:[],
            luminosidadmax:[],
            luminosidadmin:[],
            luminosidadmaxdia:[],
            luminosidadmindia:[],
            fecha:new Date(),
            vlums:[],
            vfechas:[]
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

       this.obtenerUltLum();
       this.obtenerLumMax();
       this.obtenerLumMin();
       this.obtenerLuminosidadesDia(this.state.fecha);
       this.obtenerLuminosidadMaxDia(this.state.fecha);
       this.obtenerLuminosidadMinDia(this.state.fecha);
    }

    onChange=(fecha)=>{
        this.setState({fecha:fecha})
        this.obtenerLuminosidadesDia(fecha)
        this.obtenerLuminosidadMaxDia(fecha)
        this.obtenerLuminosidadMinDia(fecha)
    }

    obtenerLuminosidadesDia(fecha) {
        const anno = fecha.getFullYear();
        const mes = fecha.getMonth();
        const dia = fecha.getDate();
        const fechap = new Date(anno,mes,dia).toISOString();
        const fechaf = new Date(anno,mes,dia+1).toISOString();
        var vt=[];
    
        Sensores.getDayLums(fechap, fechaf).then(
            response => {
                var vtt=[]
                var vff=[]
                vt=response.data
                vt.map(elemento=>(vtt.push(elemento.average)))
                vt.map(elemento=>(vff.push(elemento.createdAt.substr(11,3).concat('00'))))
                this.setState({
                    vlums:vtt,
                    vfechas:vff
                });
                
            }, error => {
                this.setState({
                    content: (error.response && error.response.data) ||
                    error.message || error.message.toString()
                });
            }
        );
    }

    obtenerLuminosidadMaxDia(fecha) {
        const anno = fecha.getFullYear();
        const mes = fecha.getMonth();
        const dia = fecha.getDate();
        const fechap = new Date(anno,mes,dia).toISOString();
        const fechaf = new Date(anno,mes,dia+1).toISOString();

        Sensores.getMaxDayLum(fechap, fechaf).then(
            response => {
                this.setState({
                    luminosidadmaxdia:response.data
                });
                
            }, error => {
                this.setState({
                    content: (error.response && error.response.data) ||
                    error.message || error.message.toString()
                });
            }
        );
    }

    obtenerLuminosidadMinDia(fecha) {
        const anno = fecha.getFullYear();
        const mes = fecha.getMonth();
        const dia = fecha.getDate();
        const fechap = new Date(anno,mes,dia).toISOString();
        const fechaf = new Date(anno,mes,dia+1).toISOString();

        Sensores.getMinDayLum(fechap, fechaf).then(
            response => {
                this.setState({
                    luminosidadmindia:response.data
                });
                
            }, error => {
                this.setState({
                    content: (error.response && error.response.data) ||
                    error.message || error.message.toString()
                });
            }
        );
    }

    obtenerUltLum() {
        Sensores.getUltLum().then(
            response => {
                this.setState({
                    ultlum:response.data
                });
            }, error => {
                this.setState({
                    content: (error.response && error.response.data) ||
                    error.message || error.message.toString()
                });
            }
        );
    }

    obtenerLumMax() {
        Sensores.getLumMax().then(
            response => {
                this.setState({
                    luminosidadmax:response.data
                });
            }, error => {
                this.setState({
                    content: (error.response && error.response.data) ||
                    error.message || error.message.toString()
                });
            }
        );
    }

    obtenerLumMin() {
        Sensores.getLumMin().then(
            response => {
                this.setState({
                    luminosidadmin:response.data
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
        const {luminosidadmax, ultlum, luminosidadmin, luminosidadmaxdia, luminosidadmindia} = this.state;
       
        //Para la grafica
        const data = {
            labels: this.state.vfechas,
            datasets: [{
                label: 'Luminosidades',
                data: this.state.vlums,
                backgroundColor: [
                    'rgba(243, 115, 79, 0.2)',
                    
                ],
                borderColor: [
                    'rgba(243, 115, 79, 1)',
 
                ],
                borderWidth: 1
            }]
        }

        return(
            <div class="list row">
               <div className="col-md-5">
                <div class="row>">
                    <h4><strong>Luminosidad</strong></h4>
                    <p><strong>Última luminosidad registrada:</strong> {ultlum&&
                            ultlum.map((luminosidad) => (
                        luminosidad.valor
                    ))}</p>
                </div>
                <div class="row>">
                <p><strong>Luminosidad Máxima Diaria Registrada:</strong><br></br> {luminosidadmaxdia &&
                            luminosidadmaxdia.map((luminosidad) => (
                        [`Valor:${luminosidad.valor}`]
                    ))}<br></br>{luminosidadmaxdia &&
                        luminosidadmaxdia.map((luminosidad) => (
                    [`Fecha:${luminosidad.createdAt.substr(0,10)} Hora:${luminosidad.createdAt.substr(11,8)}`]
                ))}</p>
                </div>
                <div class="row>">
                <p><strong>Luminosidad Mínima Diaria Registrada:</strong><br></br> {luminosidadmindia &&
                            luminosidadmindia.map((luminosidad) => (
                        [`Valor:${luminosidad.valor}`]
                    ))}<br></br>{luminosidadmindia &&
                        luminosidadmindia.map((luminosidad) => (
                    [`Fecha:${luminosidad.createdAt.substr(0,10)} Hora:${luminosidad.createdAt.substr(11,8)}`]
                ))}</p>
                </div>
                <div class="row>">
                    <h6><strong>Graficar Luminosidades Diarias</strong></h6>
                    <div className="col-md-0">
                    <DatePicker selected={this.state.fecha} onSelect={this.onChange}/>
                    </div>
                </div>
                <br></br>
                <div class="row>">
                <p><strong>Luminosidad Máxima Registrada:</strong><br></br> {luminosidadmax &&
                            luminosidadmax.map((luminosidad) => (
                        [`Valor:${luminosidad.valor}`]
                    ))}<br></br>{luminosidadmax &&
                        luminosidadmax.map((luminosidad) => (
                    [`Fecha:${luminosidad.createdAt.substr(0,10)} Hora:${luminosidad.createdAt.substr(11,8)}`]
                ))}</p>
                </div>
                <div class="row>">
                <p><strong>Luminosidad Mínima Registrada:</strong><br></br> {luminosidadmin &&
                            luminosidadmin.map((luminosidad) => (
                        [`Valor:${luminosidad.valor}`]
                    ))}<br></br>{luminosidadmin &&
                        luminosidadmin.map((luminosidad) => (
                    [`Fecha:${luminosidad.createdAt.substr(0,10)} Hora:${luminosidad.createdAt.substr(11,8)}`]
                ))}</p>
                </div>
            </div>
                <div className="col-md-7 align-items-center">
                    <div class="row justify-content-center">
                        <Line data={data} />
                    </div>
               </div>
            </div>
        );
    }
}