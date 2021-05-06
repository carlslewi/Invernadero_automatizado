import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Switch, Route, Link} from "react-router-dom";
import AuthService from "./servicios/autenticacion.servicio";
import Inicio from "./componentes/inicio.componente";
import Login from "./componentes/login.componente";
import Registro from "./componentes/registro.componente";
import Perfil from "./componentes/perfil.componente";
import PagUsuario from "./componentes/pagina_usuario.componente";
import PagTemperatura from "./componentes/pagina_temperatura.componente";
import PagHumedad from "./componentes/pagina_humedad.componente";
import PagLuminosidad from "./componentes/pagina_luminosidad.componente";
import UsuariosLista from "./componentes/usuarios-lista.componente"


class App extends Component{
  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state ={
      mostrarPagAdmin:false,
      usuarioActual:undefined
    };
  }

  componentDidMount(){
    const usuario = AuthService.getUsuarioActual();
    if(usuario){
      this.setState({
        usuarioActual : usuario,
        mostrarPagAdmin : usuario.roles.includes("ROL_ADMINISTRADOR"),
      });
    }
  }

  logOut(){
    AuthService.logout();
  }

  render(){
    const {usuarioActual, mostrarPagAdmin} = this.state;
    return(
      <div>
        <nav className = "navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className = "navbar-brand">
            Riego Autónomo
          </Link>
          <div className = "navbar-nav mr-auto">
            <li className="nav-item">
            <Link to={"/inicio"} className="nav-link">
              Inicio
            </Link>
            </li>
            
            {mostrarPagAdmin && (
              <li className="nav-item">
                <Link to ={"/administrador"} className="nav-link">
                  Administrador
                </Link>
              </li>
            )}  

            {usuarioActual &&(
              <li className="nav-item">
                <Link to={"/usuario"} className="nav-link">
                  Usuario
                </Link>
              </li>
            )}
          </div>
          {usuarioActual ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/perfil"} className="nav-link">
                  {usuarioActual.nom_usuario}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ):(
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"registro"} className="nav-link">
                  Registrarse
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
            <Switch>
              <Route exact path={["/","/inicio"]} component={Inicio}/>
              <Route exact path={["/login"]} component={Login}/>
              <Route exact path={["/registro"]} component={Registro}/>
              <Route exact path={["/perfil"]} component={Perfil}/>
              <Route exact path={["/usuario"]} component={PagUsuario}/>
              <Route exact path={["/usuario/temperaturas"]} component={PagTemperatura}/>
              <Route exact path={["/usuario/humedades"]} component={PagHumedad}/>
              <Route exact path={["/usuario/luminosidades"]} component={PagLuminosidad}/>
              <Route exact path={["/administrador"]} component={UsuariosLista}/>

            </Switch>
        </div>
      </div>
    );
  }
}

export default App;
