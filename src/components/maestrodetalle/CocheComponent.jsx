import React, { Component } from 'react'
import axios from 'axios'
import Global from '../../Global'
import DetalleCocheComponent from './DetalleCocheComponent'
export default class CocheComponent extends Component {
    selectIdCoche = React.createRef();
    state = {
        coches: [],
        idCoche: 0
    }
    urlCoches = Global.urlApiCoches;
    loadCoches = () => {
        let request = "api/Coches";
        axios.get(this.urlCoches + request).then(response => {
            this.setState({
                coches: response.data
            })
        })
    }
    buscarCoche = (event) => {
        event.preventDefault();
        let id = this.selectIdCoche.current.value;
        this.setState({
            idCoche: id
        })
    }

    componentDidMount = () => {
        this.loadCoches();
    }

  render() {
    return (
      <div>
        <h1>CocheComponent</h1>
        <form>
        <select ref={this.selectIdCoche} onChange={this.onChangeIdCoche}>
          {
            this.state.coches.map((coche, index) => {
              return (<option key={index} value={coche.idCoche}>
                {coche.marca} - {coche.modelo}
              </option>)
            })
          }
        </select>
        <button onClick={this.buscarCoche}>
          Buscar Coche
        </button>
        </form>
        {
            this.state.idCoche != 0 &&
            (<DetalleCocheComponent idCoche={this.state.idCoche} />)
        }
      </div>
    )
  }
}
