import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ComponentServiceCustomer from './components/ComponentServiceCustomer';
import ComponentServiceSuppliers from './components/ComponentServiceSuppliers';
import ComponentServiceSuppliersProf from './components/ComponentServiceSuppliersProf';
import EmpleadosDepartamentos from './components/EmpleadosDepartamentos'; 
import EmpleadosOficios from './components/EmpleadosOficios';
import DepartamentosComponent from './components/maestrodetalle/DepartamentosComponent';
import CocheComponent from './components/maestrodetalle/CocheComponent';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <ComponentServiceCustomer /> */}
    {/* <ComponentServiceSuppliers /> */}
    {/* <ComponentServiceSuppliersProf /> */}
    {/* <EmpleadosDepartamentos /> */}
    {/* <EmpleadosOficios /> */}
    {/* <DepartamentosComponent/> */}
    <CocheComponent/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
