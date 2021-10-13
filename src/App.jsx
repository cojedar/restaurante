import React from 'react'
import { 
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom'
import Navbar from './components/Navbar';
import Menus from './components/Menus';
import Clientes from './components/Clientes';
import Registro from './components/Registro';
import Pedidos from './components/Pedidos';
import { auth } from './firebase'

function App() {

  const [user, setUser] = React.useState(false)
  React.useEffect(
    ()=>{
      auth.onAuthStateChanged(
        user =>{
          if(user){
            setUser(user)
          }else{
            setUser(null)
          }
        }
      )
    }
  )
  return  user !== false ? (
    <Router>
        <Navbar usuario = { user }/>
        <Switch>

          <Route path="/login">
            <Registro />
          </Route>
          <Route path="/menus">
            <Menus />
          </Route>
          <Route path="/clientes">
            <Clientes />
          </Route>
          <Route path="/pedidos">
            <Pedidos />
          </Route>
          <Route path="/" exact>
            Inicio
          </Route>
          

        </Switch>
    </Router>
  ): (
    <div>
      Cargando...
    </div>
  )
}

export default App;
