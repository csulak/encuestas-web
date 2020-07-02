import React from 'react';
import Navbar from './components/Navbar';
import VistaAdmin from './components/VistaAdmin';
import AgregarEncuestas from './components/AgregarEncuestas';
import Encuestas from './components/Encuestas';
import {UsuarioContext} from "./context/UsuarioProvider"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"


function App() {

  const {usuario} = React.useContext(UsuarioContext)


  const RutaPridava = ({component, path,  ...rest}) => {
      

      console.log("que usuario tenemos por aqui: ", usuario)
      if(usuario.rol === 'admin'){
        console.log("el componente eeees: ", component)
        return <Route component={component} path={path} {...rest}/>

      }else{
        return <Redirect to="/login" {...rest} />
      }

  }



  return (
    
    <Router>
      <div className="App">

        <Navbar />

          <div className="container">

            {/* {
              usuario.rol === 'admin' && <VistaAdmin />
            }

            {
              usuario.rol === 'autor' && <AgregarEncuestas />
            } */}

            <Switch>
                {
                  usuario.rol === 'admin' && <Route component={VistaAdmin} path="/admin" exact/>
                }
                
                {
                  usuario.rol === 'autor' && <Route component={AgregarEncuestas} path="/encuestador" exact/>
                }

                <Route component={Encuestas} path="/"/>
                {/* <RutaPridava component={VistaAdmin} path="/admin" usuarioio={usuario} exact />
                <RutaPridava component={AgregarEncuestas} path="/perfil" usuarioio={usuario} exact /> */}
                
            </Switch>

          </div>
      </div>


      </Router>

  );
}

export default App;
