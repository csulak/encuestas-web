import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import UsuarioProvider from "./context/UsuarioProvider"
import EncuestasProvider from "./context/EncuestasProvider"

// el app tiene que quedar envuelto por todos los provider que nosotros creemos
ReactDOM.render(
  <React.StrictMode>
    <UsuarioProvider>
      <EncuestasProvider>
        <App />
      </EncuestasProvider>
    </UsuarioProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
