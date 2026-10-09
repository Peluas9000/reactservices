import React, { Component } from 'react'
import axios from 'axios'
import Global from '../../Global'
import EmpleadosComponent from './EmpleadosComponent'
export default class DepartamentosComponent extends Component {
    selectIdDepartamento = React.createRef();
    state = {
        departamentos: [],
        idDepartamento: 0
    }
        urlDepartamentos = Global.urlApiDepartamentos;

    buscarEmpleados = (event) => {
        event.preventDefault();
        let id=this.selectIdDepartamento.current.value;
        this.setState({
            idDepartamento: id
        })
    }
    
    
  loadDepartamentos = () => {
        let request = "webresources/departamentos";
        axios.get(this.urlDepartamentos + request).then((response) => {
            console.log("Leyendo departamentos")
            this.setState({
                departamentos: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadDepartamentos();
    }

    render() {
        return (
        <div><h1>DepartamentosComponent</h1>
         <form>
                <label>Seleccione departamento: </label>
                <select ref={this.selectIdDepartamento}>
                    {
                        this.state.departamentos.map((dept, index) => {
                            return (<option key={index} value={dept.numero}>
                                {dept.nombre}
                            </option>)
                        })
                    }
                </select>
                <button onClick={this.buscarEmpleados}>
                    Buscar empleados
                </button>
            </form>
                    {
                        this.state.idDepartamento !=0 &&
                        (<EmpleadosComponent idDepartamento={this.state.idDepartamento}/>)
                    }
        
        
        </div>
        )
    }
}