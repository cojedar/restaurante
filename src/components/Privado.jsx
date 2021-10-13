import React from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'

const Privado = (props) => {

    const [usuario, setUsuario ] = React.useState(null)

    React.useEffect(
        ()=>{
            if( auth.currentUser ){
                console.log('Existe usuario')
                setUsuario(auth.currentUser)
            }else{
                console.log('No existe usuario')
                props.history.push('/login')
            }
        }, [props.history ])
    return (
        <div>
            <h1>Zona Privada</h1>
            <h1>{
                
                    usuario && (
                        <h1>{ usuario.email }</h1>
                    ) 

                }</h1> 
              
        </div>
    )
}

export default withRouter(Privado)
