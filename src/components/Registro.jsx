import React from 'react'
import {auth, db} from '../firebase'
import { withRouter } from 'react-router-dom'

const Registro = (props) => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [errorForm, setErrorForm] = React.useState(null)
    const [registro, setRegistro] = React.useState(true)

    const enviarDatos = (e) => {
        e.preventDefault()

        if (!email.trim() || !password.trim()) {
            setErrorForm('Debe ingresar todos los datos')
            return
        }
        if (password.length < 6) {
            setErrorForm('Se necesitan 6 o mas caracteres')
            return
        }

        if(registro){
            registrarUsuario()
        }else{
            login()
        }

    }

    const login = React.useCallback(
        async () =>{
            try{
                await auth.signInWithEmailAndPassword(email, password)
                console.log('login exitoso')
                props.history.push('/privado')
            }catch(error){
                console.log(error)
            }
        },[email, password, props]
    )


    const registrarUsuario = React.useCallback(   
        async () => {
            try{
                const res = await auth.
                    createUserWithEmailAndPassword(
                        email,
                        password)
                console.log(res.user)
                await db.collection('usuarios').doc(res.user.uid).set(
                    {
                        email: email,
                        password: password
                    }
                )
                setEmail('')
                setPassword('')
                setErrorForm(null)
                props.history.push('/privado')
            }catch(error){
                console.log(error.code)
                if(error.code === "auth/email-already-in-use"){
                    setErrorForm("Email ya registrado")
                }
                if( error.code === "auth/invalid-email"){
                    setErrorForm("Email Invalido")
                }
            }
        },[email,password]
    )


    return (
        <div className="mt-5">

            <h2 className="text-center">

                {
                    registro ? 'Registro de usuarios' : 'Login'
                }

            </h2>
            <div className="row justify-content-center mt-5">

                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={enviarDatos}>
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <button
                            className="btn col-12 btn-primary mb-2"
                            type="submit">
                            {
                                registro ? 'Registrar' : 'Login'
                            }
                        </button>

                        <button
                            className="btn btn-warning col-12"
                            type="button"
                            onClick={ () => setRegistro(!registro)}
                            
                        >
                            {
                                registro ? '¿Ya tienes cuenta?' : 'Registrate aquí'
                            }

                        </button>

                        {
                            errorForm ? (
                                <div className="alert alert-danger mt-2">
                                    {errorForm}
                                </div>

                            ) : null
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Registro)

