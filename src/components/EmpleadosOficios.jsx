import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'

export default class EmpleadosOficios extends Component {
  cajaOficio = React.createRef();
  urlEmpleados = Global.urlApiEmpleados;

  cargarOficios = () => {
    let request = 'api/empleados';
    axios.get(this.urlEmpleados + request).then((response) => {
      let oficios = [...new Set(
        response.data.map((empleado) => empleado.oficio)
      )].sort();

      this.setState({
        oficios: oficios,
        cargando: false
      });
    }).catch(() => {
      this.setState({
        error: 'No se pudieron cargar los oficios.',
        cargando: false
      });
    });
  }

  buscarEmpleados = (event) => {
    event.preventDefault();

    let oficio = this.cajaOficio.current.value;
    if (!oficio) {
      this.setState({ empleados: [] });
      return;
    }

    let request = 'api/Empleados/EmpleadosOficio/' + encodeURIComponent(oficio);
    this.setState({
      buscando: true,     
      error: ''
    });

    axios.get(this.urlEmpleados + request).then((response) => {
      this.setState({
        empleados: response.data,
        buscando: false
      });
    }).catch(() => {
      this.setState({
        empleados: [],
        buscando: false,
        error: 'No se pudieron cargar los empleados del oficio seleccionado.'
      });
    });
  }

  componentDidMount = () => {
    this.cargarOficios();
  }

  state = {
    empleados: [],
    oficios: [],
    cargando: true,
    buscando: false,
    error: ''
  }

  render() {
    return (
      <div>
        <h1>Empleados por oficio</h1>
        <form onSubmit={this.buscarEmpleados}>
          <label htmlFor="oficio">Seleccione oficio: </label>
          <select
            id="oficio"
            ref={this.cajaOficio}
            disabled={this.state.cargando || this.state.buscando}
          >
            <option value="">Seleccione un oficio</option>
            {
              this.state.oficios.map((oficio, index) => {
                return (
                  <option key={index} value={oficio}>
                    {oficio}
                  </option>
                )
              })
            }
          </select>
          <button
            type="submit"
            disabled={this.state.cargando || this.state.buscando}
          >
            {this.state.buscando ? 'Buscando...' : 'Buscar empleados'}
          </button>
        </form>

        {
          this.state.cargando &&
          <p>Cargando oficios...</p>
        }
        {
          this.state.error &&
          <p role="alert">{this.state.error}</p>
        }

        {
          this.state.empleados.length > 0 &&
          <table>
            <thead>
              <tr>
                <th>Apellido</th>
                <th>Oficio</th>
                <th>Salario</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.empleados.map((empleado, index) => {
                  return (
                    <tr key={empleado.idEmpleado || index}>
                      <td>{empleado.apellido}</td>
                      <td>{empleado.oficio}</td>
                      <td>{empleado.salario}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        }
      </div>
    )
  }
}
