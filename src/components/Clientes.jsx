import React, { useEffect, useState } from 'react'
import {db} from '../firebase'


const Clientes = () => {

  const [clientes, setClientes] = useState([])
  const [nombreCli, setNombreCli] = useState("")
  const [departamentoCli, setDepartamentoCli] = useState("")
  const [municipioCli, setMunicipioCli] = useState("")
  const [direccionCli, setDireccionCli] = useState("")
  const [telefonoCli, setTelefonoCli] = useState("")
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState("")

  useEffect(() => {
    const obtenerclientes = async () => {
      try {
        const dbc = db
        const datos = await dbc.collection('clientes').get()
        const arrayclientes = datos.docs.map(
          doc => ({ id: doc.id, ...doc.data() })
        )
        console.log(arrayclientes)
        setClientes(arrayclientes)
      } catch (error) {
        console.log(error)
      }
    }

    obtenerclientes()

  }, [])



  const agregar = async (e) => {
    e.preventDefault()

    try{
      const dbc = db
      const cli = {
        nombre: nombreCli,
        departamento: departamentoCli,
        municipio: municipioCli,
        direccion: direccionCli,
        telefono: telefonoCli
      }
      const datos = await dbc.collection('clientes').add( cli )
      setClientes([
        ...clientes,
        {
          id: datos.id,
          ...cli
        }
      ])
    setNombreCli('')
    setDepartamentoCli('')
    setMunicipioCli('')
    setDireccionCli('')
    setTelefonoCli('')

    }catch(error){
      console.log(error)
    }


    console.log(agregar)
  }
  const eliminar = async (id) =>{
   try{
    const dbc = db
    await dbc.collection('clientes').doc(id).delete()
    
    const filtro = clientes.filter( item => item.id !== id )
    setClientes(filtro)

   }catch(error){
     console.log(error)
   }
  }

  const editar = (item) =>{

    setModoEdicion(true)
    setId(item.id)
    setNombreCli(item.nombre)
    setDepartamentoCli(item.departamento)
    setMunicipioCli(item.municipio)
    setTelefonoCli(item.municipio)
  }

  const actualizar = async (e)=>{
    e.preventDefault()

    try{
      const cli = {
        nombre: nombreCli,
        departamento: departamentoCli,
        municipio: municipioCli,
        direccion: direccionCli,
        telefono: telefonoCli
      }
      const dbc = db
      await dbc.collection('clientes').doc(id).update(cli)
      const filtro = clientes.map(
        (item) => (
          item.id === id ? { 
            id: item.id, 
            nombre: nombreCli, 
            direccion: direccionCli,
            municipio: municipioCli,
            telefono: telefonoCli,
          }: item
        )
      )
      setClientes( filtro )
      setModoEdicion(false)
      setId('')
      setNombreCli('')
      setDepartamentoCli('')
      setMunicipioCli('')
      setTelefonoCli('')
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
                <label>Nombre Cliente </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre y apellidos cliente "
                  onChange={ e => setNombreCli( e.target.value) }
                  value={nombreCli}
                />
              </div>
              <div className="form-group">
                <label>Departamento </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Departamento"
                  onChange={ e => setDepartamentoCli( e.target.value) }
                  value={departamentoCli}
                />
              </div>
              <div className="form-group">
                <label>Municipio </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Municipio"
                  onChange={ e => setMunicipioCli( e.target.value) }
                  value={municipioCli}
                />
              </div>
              <div className="form-group">
                <label>Telefono </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Telefono"
                  onChange={ e => setTelefonoCli( e.target.value) }
                  value={telefonoCli}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-2">Enviar
              </button>
  
            </form>
          </div>
          <div className="col-sm-8">
            <h1> Clientes </h1>
            <ul className="list-group mt-5">
              {
                clientes.map(
                  (item) => (
                    <li className="list-group-item" key={item.id}>
                      <small>{item.id}</small>
                      <h3>{item.nombre}</h3>
                      <h3>{item.departamento}</h3>
                      <h3>{item.municipio}</h3>
                      <h3>{item.telefono}</h3>
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

export default Clientes
