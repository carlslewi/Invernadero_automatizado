import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";
import AuthService from "../servicios/autenticacion.servicio";

//Variable para controlar si un campo esta vacio o no
const campo_requerido = valor =>{
    if(!valor){
        return (<div class="alert alert-danger" role="alert">
            Este campo no puede estar vacío
        </div>);
    }
};

const email = valor =>{
    if(!isEmail(valor)){
        return (<div class="alert alert-danger" role="alert">
            Email no válido
        </div>);
    }
};

const controlUsuario = valor =>{
    if(valor.length < 4 || valor.length > 25){
        return (<div class="alert alert-danger" role="alert">
            El nombre de usuario debe contener entre 4 y 25 caracteres
        </div>);
    }
};

const controlPassword = valor =>{
    if(valor.length < 8 || valor.length > 20){
        return (<div class="alert alert-danger" role="alert">
            La contraseña debe contener entre 8 y 20 caracteres
        </div>);
    }
};

export default class Registro extends Component{
    constructor(props){
        super(props);
        this.resolverLogin = this.resolverLogin.bind(this);
        this.onChangeNomUsuario = this.onChangeNomUsuario.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.state={
            nom_usuario : "",
            password : "",
            email:"",
            successful : false,
            mensaje : ""
        };
    }

    onChangeNomUsuario(e){this.setState({nom_usuario:e.target.value});}

    onChangePassword(e){this.setState({password:e.target.value});}

    onChangeEmail(e){this.setState({email:e.target.value});}

    resolverLogin(e){
        e.preventDefault();
        this.setState({message:"",successful:false});
        this.form.validateAll();
        if(this.checkBtn.context._errors.length===0){
            AuthService.registro(this.state.nom_usuario,this.state.password, this.state.email).then(
                response=>{
                    this.setState({message:response.data.message, successful:true});
                },error=>{
                    const resMessage = 
                        (error.response && error.response.data 
                         && error.response.data.message) || 
                         error.message || error.toString();
                        
                         this.setState({successful:false, message:resMessage});
                    }
            );
        }
}

render(){
    return(
        <div className="col-md-12">
            <div className = "card card-container">
                <Form onSubmit={this.resolverLogin} ref={c=>{this.form=c;}}>
                    {!this.state.successful &&(
                    <div>
                    <div className="form-group">
                    <label htmlFor="email">Email</label>
                        <Input type="text" className="form-control" 
                        name="email" value={this.state.email} 
                        onChange={this.onChangeEmail} validations={[campo_requerido,email]}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="nom_usuario">Usuario</label>
                        <Input type="text" className="form-control" 
                        name="nom_usuario" value={this.state.nom_usuario} 
                        onChange={this.onChangeNomUsuario} validations={[campo_requerido,controlUsuario]}/>
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                        <Input type="password" className="form-control" 
                        name="password" value={this.state.password} 
                        onChange={this.onChangePassword} validations={[campo_requerido,controlPassword]}/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block" >Registro</button>
                    </div>
                    </div>
                    )} 
                  
                    {this.state.message &&
                    (<div className="form-group">
                        <div className={this.state.successful ? "alert alert success":"alert alert-danger"} role="alert">
                            {this.state.message}
                        </div>
                    </div>
                    )}

                    <CheckButton style={{display:"none"}} ref={c=>{this.checkBtn=c}}/>
                </Form>
            </div>
        </div>
    );
    }
}
