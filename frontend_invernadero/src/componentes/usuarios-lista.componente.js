import React, { Component } from "react";
import UsuarioServicio from "../servicios/usuario.servicio";
import swal from "sweetalert"

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
      buscarNombre: "",
      activarBoton:true,
      cambiarCabecera:null
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
      indiceActual: -1,
    });
  }

  ponerUsuarioActivo(usuario, indice) {
    this.setState({
      usuarioActual: usuario,
      indiceActual: indice
    });
    if(usuario.id===1){
      this.setState({
        activarBoton:true
      });
    }else{
      this.setState({
        activarBoton:false
      });
    }
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

  borrarTodosUsuarios() {
    UsuarioServicio.borrarUsuarios()
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
    this.refreshPage();
  }

   refreshPage() {
    window.location.reload();
  }

  devolverUsuariosInactivos() {
    UsuarioServicio.getInactivos()
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

  devolverUsuariosActivos() {
    UsuarioServicio.getActivos()
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

  muestraInactivos(){
    this.setState({
      cambiarCabecera:1
    });
    this.devolverUsuariosInactivos();
  }

  muestraActivos(){
    this.setState({
      cambiarCabecera:2
    });
    this.devolverUsuariosActivos();
  }

  render(){
    const{buscarNombre,usuarios,usuarioActual,indiceActual, activarBoton, cambiarCabecera}=this.state;
    const alertaBorrar=()=>{
      swal({
        title:"Eliminar",
        text:"¿Estás seguro que deseas borrar el usuario?",
        icon:"warning",
        buttons:["Cancelar", "Aceptar"]
      }).then(resp=>{
        if(resp){
          this.borrarUsuario();
          swal({text:"Usuario borrado", icon:"success"})
        }
      })
    }
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
                {cambiarCabecera===1 ? <h4>Lista de Usuarios Inactivos </h4> : cambiarCabecera===2 ? <h4>Lista de Usuarios Activos </h4>:<h4>Lista de Usuarios </h4> }
                  <button className="m-3 btn-sm btn btn-outline-dark" type="button" onClick={this.refreshPage}>Todos</button>
                  <button className="m-3 btn-sm btn btn-outline-warning" type="button" onClick={()=>this.muestraInactivos()}>Inactivos</button>
                  <button className="m-3 btn-sm btn btn-outline-primary" type="button" onClick={()=>this.muestraActivos()}>Activos</button>
                  {/*<button className="m-3 btn-sm btn btn-outline-danger" type="button" onClick={()=>this.borrarTodosUsuarios()}>Borrar Todos</button>*/}
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
              {usuarioActual.activo ? <button className="btn btn-outline-danger" type="button" 
                onClick={()=>this.activarUsuario(false)} disabled={activarBoton}>
                Desactivar</button>: 
                <button className="btn btn-outline-success" type="button" 
                onClick={()=>this.activarUsuario(true)} disabled={activarBoton}>
                Activar</button>}

                <button className="m-3 btn  btn-danger" disabled={activarBoton}
                onClick={alertaBorrar}>
                    Borrar Usuario
                </button>
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
