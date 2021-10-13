import React, { useEffect, useState } from 'react'
import {db} from '../firebase'


const Menus = () => {

  const [menus, setMenus] = useState([])
  const [nombreMenu, setNombreMenu] = useState("")
  const [descMenu, setDescMenu] = useState("")
  const [precioMenu, setPrecioMenu] = useState("")
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState("")

  useEffect(() => {
    const obtenerMenus = async () => {
      try {
        const dbc = db
        const datos = await dbc.collection('menus').get()
        const arrayMenus = datos.docs.map(
          doc => ({ id: doc.id, ...doc.data() })
        )
        console.log(arrayMenus)
        setMenus(arrayMenus)
      } catch (error) {
        console.log(error)
      }
    }

    obtenerMenus()

  }, [])



  const agregar = async (e) => {
    e.preventDefault()

    try{
      const dbc = db
      const menu = {
        nombre: nombreMenu,
        descripcion: descMenu,
        precio: precioMenu
      }
      const datos = await dbc.collection('menus').add( menu )
      setMenus([
        ...menus,
        {
          id: datos.id,
          ...menu
        }
      ])
    setNombreMenu('')
    setDescMenu('')
    setPrecioMenu('')

    }catch(error){
      console.log(error)
    }


    console.log(agregar)
  }
  const eliminar = async (id) =>{
   try{
    const dbc = db
    await dbc.collection('menus').doc(id).delete()
    
    const filtro = menus.filter( item => item.id !== id )
    setMenus(filtro)

   }catch(error){
     console.log(error)
   }
  }

  const editar = (item) =>{

    setModoEdicion(true)
    setId(item.id)
    setNombreMenu(item.nombre)
    setDescMenu(item.descripcion)
    setPrecioMenu(item.precio)
  }

  const actualizar = async (e)=>{
    e.preventDefault()

    try{
      const menu = {
        nombre: nombreMenu,
        descripcion: descMenu,
        precio: precioMenu
      }
      const dbc = db
      await dbc.collection('menus').doc(id).update(menu)
      const filtro = menus.map(
        (item) => (
          item.id === id ? { 
            id: item.id, 
            nombre: nombreMenu, 
            descripcion: descMenu,
            precio: precioMenu
          }: item
        )
      )
      setMenus( filtro )
      setModoEdicion(false)
      setId('')
      setNombreMenu('')
      setDescMenu('')

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
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Menú"
                  onChange={ e => setNombreMenu( e.target.value) }
                  value={nombreMenu}
                />
              </div>
              <div className="form-group">
                <label>Descripción </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Descripcion"
                  onChange={ e => setDescMenu( e.target.value) }
                  value={descMenu}
                />
              </div>
              <div className="form-group">
                <label>Valor </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Valor"
                  onChange={ e => setPrecioMenu( e.target.value) }
                  value={precioMenu}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-2">Enviar
              </button>
  
            </form>
          </div>
          <div className="col-sm-8">
            <h1> Menu </h1>
            <ul className="list-group mt-5">
              {
                menus.map(
                  (item) => (
                    <li className="list-group-item" key={item.id}>
                      <small>{item.id}</small>
                      <h3>{item.nombre}</h3>
                      <h3>{item.descripcion}</h3>
                      <h3>{item.precio}</h3>
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

export default Menus