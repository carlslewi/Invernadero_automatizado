import React, {Component} from "react";
import UsuarioServicio from "../servicios/usuario.servicio"
import Sensores from "../servicios/datossensores.servicio"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Line} from "react-chartjs-2"

export default class PagTemperatura extends Component{
    
    constructor(props){
        super(props);
        //this.obtenerTemperaturas = this.obtenerTemperaturas.bind(this);
        this.obtenerUltTemp = this.obtenerUltTemp.bind(this);
        this.obtenerTempMax = this.obtenerTempMax.bind(this);
        this.obtenerTempMin = this.obtenerTempMin.bind(this);
        this.obtenerTemperaturasDia=this.obtenerTemperaturasDia.bind(this);
        this.obtenerTemperaturaMaxDia=this.obtenerTemperaturaMaxDia.bind(this);
        this.obtenerTemperaturaMinDia=this.obtenerTemperaturaMinDia.bind(this);

           this.state={
            //content:"",
            temperaturas:[],
            ulttemp:[],
            temperaturamax:[],
            temperaturamin:[],
            temperaturamaxdia:[],
            temperaturamindia:[],
            fecha:new Date(),
            //fechainicio:new Date(),
            //fechafin:new Date(),
            vtemps:[],
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

       this.obtenerUltTemp();
       this.obtenerTempMax();
       this.obtenerTempMin();
       this.obtenerTemperaturasDia(this.state.fecha);
       this.obtenerTemperaturaMaxDia(this.state.fecha);
       this.obtenerTemperaturaMinDia(this.state.fecha);
    }

    onChange=(fecha)=>{
        this.setState({fecha:fecha})
        this.obtenerTemperaturasDia(fecha)
        this.obtenerTemperaturaMaxDia(fecha)
        this.obtenerTemperaturaMinDia(fecha)
    }
   /* onChangeInicio=(fecha)=>{
        this.setState({fechainicio:fecha})
    }

    onChangeFin=(fecha)=>{
        this.setState({fechafin:fecha})
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
    }*/

    obtenerTemperaturasDia(fecha) {
        const anno = fecha.getFullYear();
        const mes = fecha.getMonth();
        const dia = fecha.getDate();
        const fechap = new Date(anno,mes,dia);
        const fechaf = new Date(anno,mes,dia,23,59,59,59);
        var vt=[];
    
        Sensores.getDayTemps(fechap, fechaf).then(
            response => {
                var vtt=[]
                var vff=[]
                vt=response.data
                vt.map(elemento=>(vtt.push(elemento.average)))
                vt.map(elemento=>(vff.push(elemento.createdAt.substr(11,3).concat('00'))))
                this.setState({
                    vtemps:vtt,
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

/*    obtenerTemperaturasFechas() {
        const anno = this.state.fechafin.getFullYear()
        const mes = this.state.fechafin.getMonth();
        const dia = this.state.fechafin.getDate();
        const fechap = this.state.fechainicio.toISOString()
        const fechaf = new Date(anno,mes,dia+1).toISOString()
        var vt=[];
        
        
        Sensores.getDayTemps(fechap, fechaf).then(
            response => {
                var vtt=[]
                var vff=[]
                vt=response.data
                vt.map(elemento=>(vtt.push(elemento.valor), vff.push(elemento.createdAt)))
                this.setState({
                    temperaturas:response.data,
                    vtemps:vtt,
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
*/
    obtenerTemperaturaMaxDia(fecha) {
        const anno = fecha.getFullYear();
        const mes = fecha.getMonth();
        const dia = fecha.getDate();
        const fechap = new Date(anno,mes,dia).toISOString();
        const fechaf = new Date(anno,mes,dia+1).toISOString();

        Sensores.getMaxDayTemp(fechap, fechaf).then(
            response => {
                this.setState({
                    temperaturamaxdia:response.data
                });
                
            }, error => {
                this.setState({
                    content: (error.response && error.response.data) ||
                    error.message || error.message.toString()
                });
            }
        );
    }

    obtenerTemperaturaMinDia(fecha) {
        const anno = fecha.getFullYear();
        const mes = fecha.getMonth();
        const dia = fecha.getDate();
        const fechap = new Date(anno,mes,dia).toISOString();
        const fechaf = new Date(anno,mes,dia+1).toISOString();

        Sensores.getMinDayTemp(fechap, fechaf).then(
            response => {
                this.setState({
                    temperaturamindia:response.data
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
                    ulttemp:response.data
                });
            }, error => {
                this.setState({
                    content: (error.response && error.response.data) ||
                    error.message || error.message.toString()
                });
            }
        );
    }

    obtenerTempMax() {
        Sensores.getTempMax().then(
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

    obtenerTempMin() {
        Sensores.getTempMin().then(
            response => {
                this.setState({
                    temperaturamin:response.data
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
        const {temperaturamax, ulttemp, temperaturamin, temperaturamaxdia, temperaturamindia} = this.state;
        //Para la grafica
       
        const data = {
            labels: this.state.vfechas,
            datasets: [{
                label: 'Temperaturas',
                data: this.state.vtemps,
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
                    <h4><strong>Temperaturas</strong></h4>
                    <p><strong>Última temperatura registrada:</strong> {ulttemp&&
                            ulttemp.map((temperatura) => (
                        temperatura.valor
                    ))}</p>
                </div>
                
                <div class="row>">
                <p><strong>Temperatura Máxima Diaria Registrada:</strong><br></br> {temperaturamaxdia &&
                            temperaturamaxdia.map((temperatura) => (
                        [`Valor:${temperatura.valor}`]
                    ))}<br></br>{temperaturamaxdia &&
                        temperaturamaxdia.map((temperatura) => (
                    [`Fecha:${temperatura.createdAt.substr(0,10)} Hora:${temperatura.createdAt.substr(11,8)}`]
                ))}</p>
                </div>
                <div class="row>">
                <p><strong>Temperatura Mínima Diaria Registrada:</strong><br></br> {temperaturamindia &&
                            temperaturamindia.map((temperatura) => (
                        [`Valor:${temperatura.valor}`]
                    ))}<br></br>{temperaturamindia &&
                        temperaturamindia.map((temperatura) => (
                    [`Fecha:${temperatura.createdAt.substr(0,10)} Hora:${temperatura.createdAt.substr(11,8)}`]
                ))}</p>
                </div>
                <div class="row>">
                    <h6><strong>Graficar Temperaturas Diarias</strong></h6>
                    <div className="col-md-0">
                    <DatePicker selected={this.state.fecha} onSelect={this.onChange}/>
                    </div>
                </div>
                <br></br>
                <div class="row>">
                <p><strong>Temperatura Máxima Registrada:</strong><br></br> {temperaturamax &&
                            temperaturamax.map((temperatura) => (
                        [`Valor:${temperatura.valor}`]
                    ))}<br></br>{temperaturamin &&
                        temperaturamax.map((temperatura) => (
                    [`Fecha:${temperatura.createdAt.substr(0,10)} Hora:${temperatura.createdAt.substr(11,8)}`]
                ))}</p>
                </div>
                <div class="row>">
                <p><strong>Temperatura Mínima Registrada:</strong><br></br> {temperaturamin &&
                            temperaturamin.map((temperatura) => (
                        [`Valor:${temperatura.valor}`]
                    ))}<br></br>{temperaturamin &&
                        temperaturamin.map((temperatura) => (
                    [`Fecha:${temperatura.createdAt.substr(0,10)} Hora:${temperatura.createdAt.substr(11,8)}`]
                ))}</p>
                </div>
             { /*  <div class="row>">
                        <h6>Graficar Temperaturas Entre Fechas</h6>
                        <div className="col-md-0">
                        Fecha Inicio<DatePicker selected={this.state.fechainicio} onSelect={this.onChangeInicio} />
                        </div>
                    <div>
                    Fecha Fin<br></br><DatePicker selected={this.state.fechafin} onSelect={this.onChangeFin} />
                    </div>
                    <button className="m-3 btn-sm btn btn-outline-dark" type="button" onClick={()=>this.obtenerTemperaturasFechas()}>Buscar</button>
                </div>*/}
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
