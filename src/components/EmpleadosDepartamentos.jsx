import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'

export default class EmpleadosDepartamentos extends Component {
    selectIdDepartamento = React.createRef();
    urlEmpleados = Global.urlApiEmpleados;
    urlDepartamentos = Global.urlApiDepartamentos;
    buscarEmpleados = (event) => {
        event.preventDefault();
        //NO NECESITAMOS QUE SEA UN NUMERO (parseInt)
        //PORQUE LO VAMOS A CONCATENAR CON UN request/endpoint
        let idDepartamento = this.selectIdDepartamento.current.value;
        let request = "api/empleados/empleadosdepartamento/" + idDepartamento;
        axios.get(this.urlEmpleados + request).then((response) => {
            console.log("leyendo empleados");
            this.setState({
                empleados: response.data
            })
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

    state = {
        empleados: [],
        departamentos: []
    }
    render() {
        return (
        <div>
            <h1>Api Empleados Departamentos</h1>
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