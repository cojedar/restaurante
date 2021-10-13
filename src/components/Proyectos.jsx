import React, { useEffect, useState } from 'react'
import {firebase} from '../firebase'


const Proyectos = () => {

  const [proyectos, setProyectos] = useState([])
  const [nombreProyecto, setNombreProyecto] = useState("")
  const [descProyecto, setDescProyecto] = useState("")
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState("")

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const db = firebase.firestore()
        const datos = await db.collection('proyectos').get()
        const arrayProyectos = datos.docs.map(
          doc => ({ id: doc.id, ...doc.data() })
        )
        console.log(arrayProyectos)
        setProyectos(arrayProyectos)
      } catch (error) {
        console.log(error)
      }
    }

    obtenerProyectos()

  }, [])



  const agregar = async (e) => {
    e.preventDefault()

    try{
      const db = firebase.firestore()
      const proy = {
        nombre: nombreProyecto,
        descripcion: descProyecto
      }
      const datos = await db.collection('proyectos').add( proy )
      setProyectos([
        ...proyectos,
        {
          id: datos.id,
          ...proy
        }
      ])
    setNombreProyecto('')
    setDescProyecto('')


    }catch(error){
      console.log(error)
    }


    console.log(agregar)
  }
  const eliminar = async (id) =>{
   try{
    const db = firebase.firestore()
    await db.collection('proyectos').doc(id).delete()
    
    const filtro = proyectos.filter( item => item.id !== id )
    setProyectos(filtro)

   }catch(error){
     console.log(error)
   }
  }

  const editar = (item) =>{

    setModoEdicion(true)
    setId(item.id)
    setNombreProyecto(item.nombre)
    setDescProyecto(item.descripcion)
  }

  const actualizar = async (e)=>{
    e.preventDefault()

    try{
      const proy = {
        nombre: nombreProyecto,
        descripcion: descProyecto
      }
      const db = firebase.firestore()
      await db.collection('proyectos').doc(id).update(proy)
      const filtro = proyectos.map(
        (item) => (
          item.id === id ? { 
            id: item.id, 
            nombre: nombreProyecto, 
            descripcion: descProyecto 
          }: item
        )
      )
      setProyectos( filtro )
      setModoEdicion(false)
      setId('')
      setNombreProyecto('')
      setDescProyecto('')

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
                <label>Nombre Proyecto </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre proyecto"
                  onChange={ e => setNombreProyecto( e.target.value) }
                  value={nombreProyecto}
                />
              </div>
              <div className="form-group">
                <label>Descripción </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Descripcion"
                  onChange={ e => setDescProyecto( e.target.value) }
                  value={descProyecto}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-2">Enviar
              </button>
  
            </form>
          </div>
          <div className="col-sm-8">
            <h1>Lista de Proyectos</h1>
            <ul className="list-group mt-5">
              {
                proyectos.map(
                  (item) => (
                    <li className="list-group-item" key={item.id}>
                      <small>{item.id}</small>
                      <h3>{item.nombre}</h3>
                      <h3>{item.descripcion}</h3>
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

export default Proyectos