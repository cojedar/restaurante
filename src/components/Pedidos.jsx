import React, { useEffect, useState } from 'react'
import {db} from '../firebase'


const Pedidos = () => {

  const [pedidos, setPedidos] = useState([])
  const [menus, setMenus] = useState([])
  const [clientes, setClientes] = useState([])
  const [nombreMenu, setNombreMenu] = useState("")
  const [nombreCli, setNombreCli] = useState("")
  const [estadoPed, setEstadoPed] = useState("")
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState("")

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const dbc = db
        const datos = await dbc.collection('pedidos').get()
        const arrayPedidos = datos.docs.map(
          doc => ({ id: doc.id, ...doc.data() })
        )
        console.log(arrayPedidos)
        setPedidos(arrayPedidos)
      } catch (error) {
        console.log(error)
      }
    }
    const obtenerMenus = async () => {
        try {
          const dbc = db
          const datos = await dbc.collection('menus').get()
          const arrayMenus = datos.docs.map(
            doc => ({ id: doc.id, ...doc.data() })
          )
          setMenus(arrayMenus)
        } catch (error) {
          console.log(error)
        }
    }
    const obtenerClientes = async () => {
        try {
          const dbc = db
          const datos = await dbc.collection('clientes').get()
          const arrayClientes = datos.docs.map(
            doc => ({ id: doc.id, ...doc.data() })
          )
          setClientes(arrayClientes)
        } catch (error) {
          console.log(error)
        }
      }

  
    obtenerMenus()
    obtenerClientes()
    obtenerPedidos()

  }, [])



  const agregar = async (e) => {
    e.preventDefault()

    try{
      const dbc = db
      const pedido = {
        nombreMenu: nombreMenu,
        nombreCli: nombreCli,
        estado: estadoPed
      }
      const datos = await dbc.collection('pedidos').add( pedido )
      setMenus([
        ...pedidos,
        {
          id: datos.id,
          ...pedido
        }
      ])
    setNombreMenu('')
    setNombreCli('')
    setEstadoPed('')

    }catch(error){
      console.log(error)
    }
  }
  const eliminar = async (id) =>{
   try{
    const dbc = db
    await dbc.collection('pedidos').doc(id).delete()
    
    const filtro = pedidos.filter( item => item.id !== id )
    setPedidos(filtro)

   }catch(error){
     console.log(error)
   }
  }

  const editar = (item) =>{

    setModoEdicion(true)
    setId(item.id)
    setNombreMenu(item.nombreMenu)
    setNombreCli(item.nombreCli)
    setEstadoPed(item.estadoPed)
  }

  const actualizar = async (e)=>{
    e.preventDefault()

    try{
      const menu = {
        nombreCli: nombreCli,
        nombreMenu: nombreMenu,
        estadoPed: estadoPed
      }
      const dbc = db
      await dbc.collection('menus').doc(id).update(menu)
      const filtro = menus.map(
        (item) => (
          item.id === id ? { 
            id: item.id, 
            nombre: nombreMenu, 
            nombreMenu: nombreMenu,
            estadoPed: estadoPed
          }: item
        )
      )
      setMenus( filtro )
      setModoEdicion(false)
      setId('')
      setNombreMenu('')
      setNombreCli('')
      setEstadoPed('')

    }catch(error){
      console.log(error)
    }  

  }
  return (
        <div className="container mt-5">

        <div className="row">
  
          <div className="col-sm-4">
            <h1>Formulario</h1>
  
            <form onSubmit={ modoEdicion ? actualizar: agregar }>
  
              <div className="form-group">
                <label>Nombre Menu </label>
                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={ e => setNombreMenu( e.target.value) } value={nombreMenu} >
                <option selected>Escoja una opción</option>
                {
                   menus.map(
                   (item) => (
                     <option value={item.nombre}>{item.nombre}</option>
                    )
                  )
                }    
                </select>
              </div>
              <div className="form-group">
                <label>Nombre Cliente </label>
                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={ e => setNombreCli( e.target.value) } value={nombreCli} >
                <option selected>Escoja una opción</option>
                {
                   clientes.map(
                   (item) => (
                     <option value={item.nombre}>{item.nombre}</option>
                    )
                  )
                }    
                </select>
              </div>
              <div className="form-group">
                <label>Estado </label>
                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"  onChange={ e => setEstadoPed( e.target.value) } value={estadoPed}>
                <option selected>Escoja una opción</option>
                    <option value="Solicitado">Solicitado</option>
                    <option value="Enviado">Enviado</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-2">Enviar
              </button>
  
            </form>
          </div>
          <div className="col-sm-8">
            <h1> Pedidos </h1>
            <ul className="list-group mt-5">
              {
                pedidos.map(
                  (item) => (
                    <li className="list-group-item" key={item.id}>
                      <small>{item.id}</small>
                      <h3>{item.nombreCli}</h3>
                      <h3>{item.nombreMenu}</h3>
                      <h3>{item.estadoPed}</h3>
                      <button className="btn btn-warning mx-2" onClick={ () => editar(item)  }> Editar</button>
                      <button className="btn btn-danger" onClick={ ()=> eliminar(item.id)  }> Eliminar</button>
                    </li>
                  )
                )
              }
            </ul>
          </div>
        </div>  
      </div>
    )
}

export default Pedidos