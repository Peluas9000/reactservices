import React, { Component } from 'react'
import axios from 'axios'
export default class ComponentServiceSuppliers extends Component {
    
    cajaId = React.createRef();
    state = {
    suppliers: [],
    idBuscado:""
    }
    url ="https://services.odata.org/V4/Northwind/Northwind.svc/Suppliers";

    getSuppliers= () =>{
        axios.get(this.url).then((response) => {
            console.log("Leyendo el servicio")
            this.setState({suppliers: response.data.value})
        })
    }

    

    componentDidMount = () => {
        this.getSuppliers();
    }


    buscarSupplier = (event) => {
    event.preventDefault(); // Detiene el refresco nativo de la página
    let id = this.cajaId.current.value;
    
    // Al guardar en el state, React dispara el re-render para filtrar
    this.setState({
      idBuscado: id
    });
  };


  render() {
    return (
      <div>
        <h1>Services - Suppliers</h1>
        <form onSubmit={this.buscarSupplier}>
            <input type="text" ref={this.cajaId} placeholder="Enter Supplier ID" />
            <button type="submit">Search</button>
        </form>

                 <button onClick={this.getSuppliers}>Load Suppliers</button>
<hr />
         {
            this.state.suppliers.map((supplier,index) => {
                if(this.state.idBuscado==="" || supplier.SupplierID == this.state.idBuscado){
                return (<div key={supplier.SupplierID ||index}>
                    <h4 key={supplier.SupplierID ||index}>{supplier.SupplierID} <br></br> {supplier.ContactName}</h4>
                </div>)
                }
            })
         }
      </div>
    )
  }
}
