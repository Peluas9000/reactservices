import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';

export default class ServiceApiSuppliers extends Component {
    urlSuppliers = Global.urlNorthwind;
    cajaId = React.createRef();

    state = {
        proveedores: [], 
        supplier: null
    }    

    loadSuppliers = () => {
        let request = "suppliers";
        axios.get(Global.urlNorthwind + request).then(response => {
            console.log("Leyendo");
            this.setState({
                proveedores: response.data.value
            })
        })
    }

    findSupplierId = (event) => {
        event.preventDefault();
        let idSupplier = parseInt(this.cajaId.current.value);
        let request = "suppliers";
        //REALIZAMOS LA PETICION DE NUEVO A TODOS LOS PROVEEDORES
        axios.get(Global.urlNorthwind + request).then(response => {
            console.log("Buscando...");
            for (var supplier of response.data.value){
                if (supplier.SupplierID == idSupplier){
                    this.setState({
                        supplier: supplier
                    })
                    break;
                }
            }
        })
    }

    componentDidMount = () => {
        this.loadSuppliers();
    }

  render() {
    return (
      <div>
        <h1>Service Api Suppliers</h1>
        <form>
            <label>Buscar ID</label>
            <input type="number" ref={this.cajaId}/>
            <button onClick={this.findSupplierId}>
                Buscar proveedor
            </button>
        </form>
        {
            this.state.supplier && 
            (
            <div>
                <h1>Company: {this.state.supplier.CompanyName}</h1>
                <h2>Title: {this.state.supplier.ContactTitle}</h2>
                <h2>Dirección: {this.state.supplier.Address}</h2>
            </div>
            )
        }
        <ul>
            {
                this.state.proveedores.map((supplier, index) => {
                    return (<li key={index}>
                        Id: {supplier.SupplierID} - 
                        {supplier.ContactName}
                        </li>)
                })
            }
        </ul>
      </div>
    )
  }
}