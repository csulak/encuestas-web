import React from 'react';
import Navbar from './components/Navbar';
import VistaAdmin from './components/VistaAdmin';
import AgregarEncuestas from './components/AgregarEncuestas';
import Encuestas from './components/Encuestas';
import {UsuarioContext} from "./context/UsuarioProvider"



function App() {

  const {usuario} = React.useContext(UsuarioContext)

  return (
    <div className="App">
      <Navbar />


      <div className="container">

        {
          usuario.rol === 'admin' && <VistaAdmin />
        }

        {
          usuario.rol === 'autor' && <AgregarEncuestas />
        }

        <Encuestas />


      </div>
    </div>
  );
}

export default App;
