import React, {Component} from "react";
import UsuarioServicio from "../servicios/usuario.servicio"
import Sensores from "../servicios/datossensores.servicio"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Line} from "react-chartjs-2"

export default class PagHumedad extends Component{
    
    constructor(props){
        super(props);
        this.obtenerUltHum = this.obtenerUltHum.bind(this);
        this.obtenerHumMax = this.obtenerHumMax.bind(this);
        this.obtenerHumMin = this.obtenerHumMin.bind(this);
        this.obtenerHumedadesDia=this.obtenerHumedadesDia.bind(this);
        this.obtenerHumedadMaxDia=this.obtenerHumedadMaxDia.bind(this);
        this.obtenerHumedadMinDia=this.obtenerHumedadMinDia.bind(this);

           this.state={
            //content:"",
            humedades:[],
            ulthum:[],
            humedadmax:[],
            humedadmin:[],
            humedadmaxdia:[],
            humedadmindia:[],
            fecha:new Date(),
            //fechainicio:new Date(),
            //fechafin:new Date(),
            vhums:[],
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

       this.obtenerUltHum();
       this.obtenerHumMax();
       this.obtenerHumMin();
       this.obtenerHumedadesDia(this.state.fecha);
       this.obtenerHumedadMaxDia(this.state.fecha);
       this.obtenerHumedadMinDia(this.state.fecha);
    }

    onChange=(fecha)=>{
        this.setState({fecha:fecha})
        this.obtenerHumedadesDia(fecha)
        this.obtenerHumedadMaxDia(fecha)
        this.obtenerHumedadMinDia(fecha)
    }

    obtenerHumedadesDia(fecha) {
        const anno = fecha.getFullYear();
        const mes = fecha.getMonth();
        const dia = fecha.getDate();
        const fechap = new Date(anno,mes,dia).toISOString();
        const fechaf = new Date(anno,mes,dia+1).toISOString();
        var vt=[];
    
        Sensores.getDayHums(fechap, fechaf).then(
            response => {
                var vtt=[]
                var vff=[]
                vt=response.data
                vt.map(elemento=>(vtt.push(elemento.average)))
                vt.map(elemento=>(vff.push(elemento.createdAt)))
                this.setState({
                    vhums:vtt,
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

    obtenerHumedadMaxDia(fecha) {
        const anno = fecha.getFullYear();
        const mes = fecha.getMonth();
        const dia = fecha.getDate();
        const fechap = new Date(anno,mes,dia).toISOString();
        const fechaf = new Date(anno,mes,dia+1).toISOString();

        Sensores.getMaxDayHum(fechap, fechaf).then(
            response => {
                this.setState({
                    humedadmaxdia:response.data
                });
                
            }, error => {
                this.setState({
                    content: (error.response && error.response.data) ||
                    error.message || error.message.toString()
                });
            }
        );
    }

    obtenerHumedadMinDia(fecha) {
        const anno = fecha.getFullYear();
        const mes = fecha.getMonth();
        const dia = fecha.getDate();
        const fechap = new Date(anno,mes,dia).toISOString();
        const fechaf = new Date(anno,mes,dia+1).toISOString();

        Sensores.getMinDayHum(fechap, fechaf).then(
            response => {
                this.setState({
                    humedadmindia:response.data
                });
                
            }, error => {
                this.setState({
                    content: (error.response && error.response.data) ||
                    error.message || error.message.toString()
                });
            }
        );
    }

    obtenerUltHum() {
        Sensores.getUltHum().then(
            response => {
                this.setState({
                    ulthum:response.data
                });
            }, error => {
                this.setState({
                    content: (error.response && error.response.data) ||
                    error.message || error.message.toString()
                });
            }
        );
    }

    obtenerHumMax() {
        Sensores.getHumMax().then(
            response => {
                this.setState({
                    humedadmax:response.data
                });
            }, error => {
                this.setState({
                    content: (error.response && error.response.data) ||
                    error.message || error.message.toString()
                });
            }
        );
    }

    obtenerHumMin() {
        Sensores.getHumMin().then(
            response => {
                this.setState({
                    humedadmin:response.data
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
        const {humedadmax, ulthum, humedadmin, humedadmaxdia, humedadmindia} = this.state;
        //Para la grafica
       
        const data = {
            labels: this.state.vfechas,
            datasets: [{
                label: 'Humedades',
                data: this.state.vhums,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
 
                ],
                borderWidth: 1
            }]
        }

        return(
            <div class="list row">
               <div className="col-md-5">
                <div class="row>">
                    <h4><strong>Humedades</strong></h4>
                    <p><strong>Última humedad registrada:</strong> {ulthum&&
                            ulthum.map((humedad) => (
                        humedad.valor
                    ))}</p>
                </div>
                <div class="row>">
                    <p><strong>Humedad Máxima Diaria Registrada:</strong><br></br> {humedadmaxdia &&
                            humedadmaxdia.map((humedad) => (
                        [`Valor:${humedad.valor}\nFecha:${humedad.createdAt}`]
                    ))}</p>
                </div>
                <div class="row>">
                    <p><strong>Humedad Mínima Diaria Registrada:</strong><br></br> {humedadmindia &&
                            humedadmindia.map((humedad) => (
                        [`Valor:${humedad.valor}\nFecha:${humedad.createdAt}`]
                    ))}</p>
                </div>
                <div class="row>">
                    <h6><strong>Graficar Humedades Diarias</strong></h6>
                    <div className="col-md-0">
                    <DatePicker selected={this.state.fecha} onSelect={this.onChange}/>
                    </div>
                </div>
                <br></br>
                <div class="row>">
                    <p><strong>Humedad Máxima Registrada:</strong><br></br> {humedadmax &&
                            humedadmax.map((humedad) => (
                        [`Valor:${humedad.valor}\nFecha:${humedad.createdAt}`]
                    ))}</p>
                </div>
                <div class="row>">
                   <p><strong>Humedad Mínima Registrada:</strong><br></br> {humedadmin &&
                            humedadmin.map((humedad) => (
                        [`Valor:${humedad.valor}\nFecha:${humedad.createdAt}`]
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