import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Switch, Route, Link} from "react-router-dom";
import AuthService from "./servicios/autenticacion.servicio";
import Inicio from "./componentes/inicio.componente";
import Login from "./componentes/login.componente";


class App extends Component{
  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state ={
      usuarioActual:undefined
    };
  }

  componentDidMount(){
    const usuario = AuthService.getUsuarioActual();
    if(usuario){
      this.setState({
        usuarioActual : usuario
      });
    }
  }

  logOut(){
    AuthService.logout();
  }

  render(){
    const {usuarioActual} = this.state;
    return(
      <div>
        <nav className = "navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className = "navbar-brand">
            Riego Autónomo
          </Link>
          
        </nav>
      </div>
    );
  }
}

export default App;
