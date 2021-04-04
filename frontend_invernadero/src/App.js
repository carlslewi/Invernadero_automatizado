import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Switch, Route, Link} from "react-router-dom";
import AuthService from "./servicios/autenticacion.servicio";
import Inicio from "./componentes/inicio.componente";
import Login from "./componentes/login.componente";
import Registro from "./componentes/registro.componente";
import Perfil from "./componentes/perfil.componente";
import PagUsuario from "./componentes/pagina_usuario.componente";
import PagAdmin from "./componentes/pagina_administrador.componente";


class App extends Component{
  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state ={
      mostrarPagUsuario:false,
      mostrarPagAdmin:false,
      usuarioActual:undefined
    };
  }

  componentDidMount(){
    const usuario = AuthService.getUsuarioActual();
    if(usuario){
      this.setState({
        usuarioActual : usuario,
        mostrarPagUsuario : usuario.roles.includes("ROL_USUARIO"),
        mostrarPagAdmin : usuario.roles.includes("ROL_ADMINISTRADOR"),
      });
    }
  }

  logOut(){
    AuthService.logout();
  }

  render(){
    const {usuarioActual, mostrarPagUsuario, mostrarPagAdmin} = this.state;
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
            
            {mostrarPagUsuario && (
              <li className="nav-item">
                <Link to ={"/usuarioR"} className="nav-link">
                  Página Usuario
                </Link>
              </li>
            )}

            {mostrarPagAdmin && (
              <li className="nav-item">
                <Link to ={"/administrador"} className="nav-link">
                  Página Usuario
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
              <Route exact path={["/usuarioR"]} component={PagUsuario}/>
              <Route exact path={["/administrador"]} component={PagAdmin}/>
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;
