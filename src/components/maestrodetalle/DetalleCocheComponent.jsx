import React, { Component } from 'react'
import axios from 'axios'
import Global from '../../Global'
export default class DetalleCocheComponent extends Component {
    state = {
      detalleCoche: null
    }
    urlCoches = Global.urlApiCoches 
    
    loadDetalleCoche = () => {
      let id = this.props.idCoche;
      let request = "api/Coches/FindCoche/" + id;
        axios.get(this.urlCoches + request).then((response) => {
            console.log("Leyendo detalle coche")
            this.setState({
                detalleCoche: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadDetalleCoche();
        
    }

    componentDidUpdate = (oldProps) => {
      
        if (oldProps.idCoche != this.props.idCoche) {
            this.loadDetalleCoche();
        }
        console.log("Actual: " + this.state.detalleCoche.marca);
    }

  render() {
    return (
      <div>
        <h1>DETALLE COCHE</h1>
       
            <h2>Marca: {this.state.detalleCoche?.marca}</h2>
            <h2>Modelo: {this.state.detalleCoche?.modelo}</h2>
            <h2>Conductor: {this.state.detalleCoche?.conductor}</h2>
            <img src={this.state.detalleCoche?.imagen} alt="Imagen coche" width="300px" />
    
      </div>
    )
  }
}
