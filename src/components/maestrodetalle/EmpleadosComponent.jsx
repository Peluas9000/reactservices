import React, { Component } from 'react'
import axios from 'axios'
import Global from '../../Global'

export default class EmpleadosComponent extends Component {
  state={
    empleados:[]
  }
  componentDidMount = () => {
    this.loadEmpleados();
  }

  /*componentDidUpdate = (prevProps) => {
    if (prevProps.idDepartamento !== this.props.idDepartamento) {
      console.log(this.props.idDepartamento)
    }
  }*/

    loadEmpleados=() =>{
      let id=this.props.idDepartamento;
      let request = "api/empleados/empleadosdepartamento/" + id;
      axios.get(Global.urlApiEmpleados + request).then((response) => {
        console.log("leyendo empleados");
        this.setState({
          empleados: response.data,
        })
      })
    }


 componentDidUpdate=(oldProps) => {
      console.log( "Actual: " + this.props.idDepartamento);
      console.log("Old: " + oldProps.idDepartamento);
      //SOLAMENTE ACTUALIZEMOS STATE SI SE HA ACTUALIZADO EL PROPS idDepartamento
      if (oldProps.idDepartamento != this.props.idDepartamento) {
        this.loadEmpleados();
        this.setState({
          texto: "Id departamento: " + this.props.idDepartamento
        })
      }
 }

  render() {
    return (
      <div>
       <h1>EmpleadosComponent</h1>
       <h2>{this.state.texto}</h2>
       <ul>
                {
                    this.state.empleados.map((emp, index) => {
                        return (<li key={index}>
                            {emp.apellido}, Oficio: {emp.oficio}
                        </li>)
                    })
                }
            </ul>
      </div>
    )
  }
}
