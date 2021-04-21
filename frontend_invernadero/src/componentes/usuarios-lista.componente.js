import React, { Component } from "react";
import UsuarioServicio from "../servicios/usuario.servicio";

export default class UsuariosLista extends Component {
  constructor(props) {
    super(props);
    this.onChangeBuscarNombre = this.onChangeBuscarNombre.bind(this);
    this.devolverUsuarios = this.devolverUsuarios.bind(this);
    this.refrescarLista = this.refrescarLista.bind(this);
    this.ponerUsuarioActivo = this.ponerUsuarioActivo.bind(this);
    this.borrarUsuario = this.borrarUsuario.bind(this);
    this.buscarNombre = this.buscarNombre.bind(this);
    this.activarUsuario = this.activarUsuario.bind(this);

    this.state = {
      usuarios: [],
      usuarioActual: null,
      indiceActual: -1,
      buscarNombre: ""
    };
  }

  componentDidMount() {
    this.devolverUsuarios();
  }

  onChangeBuscarNombre(e) {
    const buscarNombre = e.target.value;

    this.setState({
      buscarNombre: buscarNombre
    });
  }

  devolverUsuarios() {
    UsuarioServicio.getListaUsuarios()
      .then(response => {
        this.setState({
          usuarios: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refrescarLista() {
    this.devolverUsuarios();
    this.setState({
      usuarioActual: null,
      indiceActual: -1
    });
  }

  ponerUsuarioActivo(usuario, indice) {
    this.setState({
      usuarioActual: usuario,
      indiceActual: indice
    });
  }

  borrarUsuario() {
    UsuarioServicio.borrarUsuario(this.state.usuarioActual.id)
      .then(response => {
        console.log(response.data);
        this.refrescarLista();
      })
      .catch(e => {
        console.log(e);
      });
  }

  buscarNombre() {
    UsuarioServicio.findByNombre(this.state.buscarNombre).then(response => {
        this.setState({
          usuarios: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  activarUsuario(estado){
    var datos ={
      id:this.state.usuarioActual.id,
      nom_usuario:this.state.usuarioActual.nom_usuario,
      password:this.state.usuarioActual.password,
      email:this.state.usuarioActual.email,
      activo:estado
    };
    UsuarioServicio.updateActivar(this.state.usuarioActual.id, datos)
    .then(response => {
      this.setState(prevState => ({
        usuarioActual: {
          ...prevState.usuarioActual,
          activo : estado
        }
      }));
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }
//No funciona
  activarBoton(){
    if(this.state.usuarioActual.id==1)
      return true
    else return false
  }

  render(){
    const{buscarNombre,usuarios,usuarioActual,indiceActual}=this.state;
    return(
         <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input type="text" className="form-control"
                    placeholder="Buscar por nombre" value={buscarNombre} onChange={this.onChangeBuscarNombre}/>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={this.buscarNombre}>Buscar</button>
                </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Lista de Usuarios</h4>
                <ul className="list-group">
                   {usuarios && usuarios.map(
                       (usuario,indice)=>(
                        <li
                        className={
                          "list-group-item " +
                          (indice === indiceActual ? "active" : "")
                        }
                        onClick={() => this.ponerUsuarioActivo(usuario, indice)}
                        key={indice} >
                              {usuario.nom_usuario} 
                           </li>
                    ))} 
                </ul>
                <button className="m-3 btn btn-sm btn-danger" disabled={()=>this.activarBoton}
                onClick={()=>this.borrarUsuario()}>
                    Borrar Usuario
                </button>
            </div>
            <div className="col-md-6">
            {usuarioActual ? (
            <div>
              <h4>Usuario</h4>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {usuarioActual.nom_usuario}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {usuarioActual.email}
              </div>
              <div>
                <label>
                  <strong>Estado:</strong>
                </label>{" "}
                {usuarioActual.activo ? "Activo" : "Pendiente de Activar"}
              </div>
              {usuarioActual.activo ? <button className="btn btn-outline-danger" type="button" onClick={()=>this.activarUsuario(false)}>
                Desactivar</button>: 
                <button className="btn btn-outline-success" type="button" onClick={()=>this.activarUsuario(true)}>Activar</button>}
            </div>
          ) : (
            <div>
              <br />
              <p>Por favor, selecciona usuario</p>
            </div>
          )} 
            </div>
        </div>
    );    
  }
}
