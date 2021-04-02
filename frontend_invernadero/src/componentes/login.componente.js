import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../servicios/autenticacion.servicio"

//Variable para controlar si un campo esta vacio o no
const campo_requerido = valor =>{
    if(!valor){
        return (<div classname = "alert alert danger" role = "alert" >
            Este campo no puede estar vacio
        </div>);
    }
};

export default class Login extends Component{
    constructor(props){
        super(props);
        this.resolverLogin = this.resolverLogin.bind(this);
        this.onChangeNomUsuario = this.onChangeNomUsuario.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state={
            nom_usuario : "",
            password : "",
            loading : false,
            mensaje : ""
        };
    }

    onChangeNomUsuario(e){this.setState({nom_usuario:e.target.value});}

    onChangePassword(e){this.setState({password:e.target.value});}

    resolverLogin(e){
        e.preventDefault();
        this.setState({message:"",loading:true});
        this.form.validateAll();
        if(this.checkBtn.context._errors.length===0){
            AuthService.login(this.state.nom_usuario,this.state.password).then(
                ()=>{
                    this.props.history.push("/perfil");window.location.reload();
                },error=>{
                    const resMessage = 
                        (error.response && error.response.data 
                         && error.response.data.message) || 
                         error.message || error.toString();
                        
                         this.setState({loading:false, message:resMessage});
                    }
            );
        }else{
            this.setState({loading:false});
        }
}

render(){
    return(
        <div className="col-md-12">
            <div className = "card card-container">
                <Form onSubmit={this.resolverLogin} ref={c=>{this.form=c;}}>
                    
                    <div className="form-group">
                        <label htmlFor="nom_usuario">Usuario</label>
                        <Input type="text" className="form-control" 
                        name="nom_usuario" value={this.state.nom_usuario} 
                        onChange={this.onChangeNomUsuario} validations={[campo_requerido]}/>
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                        <Input type="password" className="form-control" 
                        name="password" value={this.state.password} 
                        onChange={this.onChangePassword} validations={[campo_requerido]}/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={this.state.loading}>
                            {this.state.loading && 
                            (<span className="spinner-border spìnner-border-sm"></span>)}
                            <span>Login</span>
                        </button>
                    </div>

                    {this.state.message &&
                    (<div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {this.state.message}
                        </div>
                    </div>)}

                    <CheckButton style={{display:"none"}} ref={c=>{this.checkBtn=c}}/>
                </Form>
            </div>
        </div>
    );
    }
}
