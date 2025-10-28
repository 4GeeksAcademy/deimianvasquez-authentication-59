import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialUserState = {
    lastname: "",
    email: "",
    avatar: "",
    password: ""
}

const urlBase = import.meta.env.VITE_BACKEND_URL


const Register = () => {

    const [user, setUser] = useState(initialUserState)
    const navigate = useNavigate()

    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value
        })

    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        // validar que todos los campos esten llenos
        const response = await fetch(`${urlBase}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await response.json()

        if (response.ok) {
            setUser(initialUserState)

            setTimeout(() => {
                navigate("/login")

            }, 2000)


        } else if (response.status == 409) {
            alert("Usuario ya existe")
        } else {
            alert("Error al registrar uausio intente nuevamente")
        }
    }



    return (
        <div className="container">
            <div className="vh-100  d-flex flex-column home-container justify-content-center" >
                <div className="row justify-content-center my-5 p-4">
                    <h2 className="text-center">Registrate en mi web de lista de tareas</h2>

                    <div className="col-12 col-md-6 p-4 border">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="form-group mb-3">
                                <label htmlFor="txtLastname">Nombre Completo</label>
                                <input
                                    type="text"
                                    placeholder="Jhon Doe"
                                    className="form-control "
                                    id="txtLastname"
                                    name="lastname"
                                    onChange={handleChange}
                                    value={user.lastname}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="txtEmail">Correo</label>
                                <input
                                    type="email"
                                    placeholder="usuario@gmail.com"
                                    className="form-control"
                                    id="txtEmail"
                                    name="email"
                                    onChange={handleChange}
                                    value={user.email}
                                    required />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="txtAvatar">Avatar</label>
                                <input
                                    type="file"
                                    placeholder="Avatar"
                                    className="form-control"
                                    id="txtAvatar"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={(event) => {
                                        setUser({ ...user, avatar: event.target.files[0] })
                                    }}
                                // value={user.avatar} No usar value en input file
                                />
                            </div>


                            <div className="form-group mb-3">
                                <label htmlFor="btnPassword">Contraseña:</label>
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    className="form-control"
                                    id="btnPassword"
                                    name="password"
                                    onChange={handleChange}
                                    value={user.password}
                                />
                            </div>


                            <button
                                className="btn btn-outline-primary w-100"
                            >Iniciar Sesión</button>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register;