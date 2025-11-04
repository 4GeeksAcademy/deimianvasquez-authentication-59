import { useState } from "react"
import { Toaster, toast } from "sonner"


const urlBase = import.meta.env.VITE_BACKEND_URL

const ResetPass = () => {
    const [email, setEmail] = useState({
        email: ""
    })

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (email.email.trim() == "") {
            alert("Debe colocar un correo valido")
            return
        }

        //fetch a un endpoint de recuperación
        try {
            const response = await fetch(`${urlBase}/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(email)
            })

            if (response.ok) {
                toast.success("Revisa tu correo para actualizar la contraseña")
                setEmail({
                    email: ""
                })
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <Toaster position="top-right" />
                <h1 className="text-center"> Recuperación de contraseña :(</h1>
                <div className="col-12 col-md-6 border py-4">
                    <form
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group mb-3">
                            <label htmlFor="btnRecoveryPassword">Correo electrónico</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="vero@gmail.com"
                                id="btnRecoveryPassword"
                                name="email"
                                value={email.email}
                                onChange={({ target }) => setEmail({ email: target.value })}
                            />
                        </div>
                        <button
                            className="btn btn-secondary w-100"
                        >Recuperación de contraseña</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPass