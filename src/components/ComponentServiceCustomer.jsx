import React, { Component } from 'react'
import axios from 'axios'

export default class ComponentServiceCustomer extends Component {
    state = {
        customer: []
    };
    url ="https://services.odata.org/V4/Northwind/Northwind.svc/Customers"

     loadCustomers =()=>{
        console.log("Antes")
        axios.get(this.url).then((response) => {
            console.log("Leyendo el servicio")
            this.setState({customer: response.data.value})
        })
       console.log("Despues")
    }
    
     componentDidMount = ()=>{
        this.loadCustomers();
     }

  render() {
    return (
      <div>
        <h1>Customers</h1>
        <button onClick={this.loadCustomers}>Load Customers</button>
        {this.state.customer.map((customer,index) => {
            return (<div >
                <h2 key={index}>{customer.CompanyName}</h2>
            </div>)
        })}
      </div>
    )
  }

}