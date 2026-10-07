import React, { Component } from 'react'
import axios from 'axios'
export default class EmpleadosDepartamentos extends Component {
  cajaIdDepartamento = React.createRef(); 
  
buscarEmpleados = (event) => {
    event.preventDefault();
    
    let idDepartamento = event.cajaIdDepartamento.current.value;
    let request= "api/Empleados/EmpleadosDepartamento"+ idDepartamento;
    axios.get(this.urlEmpleados + request).then((response) => {
        this.setState({empleados: response.data});
    })
}

  state ={empleados: []}
  
    render() {
    
    return (
      <div>
        <h1>Api Empleados Departamentos</h1>
        <form>
           <labeL>Introduzca id departamento:</labeL>
           <input type="text" name="idDepartamento" ref={this.cajaIdDepartamento} />
           <button onClick={this.buscarEmpleados}>Buscar Empleados</button> 
        </form>
        <ul>
            {
                this.state.empleados.map((empleado,index) => {
                    return(
                        <li key={index}>{empleado.nombre}, Oficio: {empleado.oficio }</li>
                        
                    )
                })
            }
        </ul>
      
      </div>
    )
  }
}
