import React, {Component} from "react";
import UsuarioServicio from "../servicios/usuario.servicio"
import Sensores from "../servicios/datossensores.servicio"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Line} from "react-chartjs-2"

export default class PagUsuario extends Component{
    
    constructor(props){
        super(props);
        this.obtenerTemperaturas = this.obtenerTemperaturas.bind(this);
        this.obtenerUltTemp = this.obtenerUltTemp.bind(this);

           this.state={
            //content:"",
            temperaturas:[],
            temperaturamax:[],
            fecha:new Date(),
            fechainicio:new Date(),
            fechafin:new Date(),
            vtemps:[],
            vfechas:[]
        };
    }

    onChange=(fecha)=>{
        this.setState({fecha:fecha})
    }

    onChangeInicio=(fecha)=>{
        this.setState({fechainicio:fecha})
    }

    onChangeFin=(fecha)=>{
        this.setState({fechafin:fecha})
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
        const fechap = new Date(anno,mes,dia).toISOString()
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

    obtenerTemperaturasFechas() {
        /*const anno = this.state.fecha.getFullYear()
        const mes = this.state.fecha.getMonth();
        const dia = this.state.fecha.getDate();*/
        const fechap = this.state.fechainicio.toISOString()
        const fechaf = this.state.fechafin.toISOString()
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

        const data1 = {
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
               <div className="col-md-4">
                <div class="row>">
                    <h4>Temperaturas</h4>
                    <p>Última temperatura registrada: {temperaturamax &&
                            temperaturamax.map((temperatura) => (
                        temperatura.valor
                    ))}</p>
                </div>
                <div class="row>">
                    <h6>Graficar Temperaturas Diarias</h6>
                    <div className="col-md-0">
                    <DatePicker selected={this.state.fecha} onSelect={this.onChange} />
                    </div>
                    <button className="m-3 btn-sm btn btn-outline-dark" type="button" onClick={()=>this.obtenerTemperaturasDia()}>Buscar</button>
                </div>
                <div class="row>">
                    <h6>Graficar Temperaturas Entre Fechas</h6>
                    <div className="col-md-0">
                    Fecha Inicio<DatePicker selected={this.state.fechainicio} onSelect={this.onChangeInicio} />
                    </div>
                    <div>
                    Fecha Fin<br></br><DatePicker selected={this.state.fechafin} onSelect={this.onChangeFin} />
                    </div>
                    <button className="m-3 btn-sm btn btn-outline-dark" type="button" onClick={()=>this.obtenerTemperaturasFechas()}>Buscar</button>
                </div>
            </div>
                <div className="col-md-8 align-items-center">
                    <div class="row justify-content-center">
                                <Line data={data1}/>
                    </div>
               </div>
            </div>
        );
    }
}
