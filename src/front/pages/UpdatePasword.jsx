import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Toaster, toast } from "sonner"

const urlBase = import.meta.env.VITE_BACKEND_URL

const UpdatePassword = () => {
    const [newPasword, setNewPassword] = useState("")

    const [searchParams, _] = useSearchParams()

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${urlBase}/update-password`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${searchParams.get("token")}`,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({ password: newPasword })
            })

            if (response.ok) {
                toast.success("Contraseña actualizada exitosamente")
                setTimeout(() => {
                    navigate("/login")
                }, 3000)
            }

        } catch (error) {
            console.log("error")
        }

    }


    return (
        <div className="container">
            <div className="row justify-content-center">
                <Toaster position="top-right" />
                <h1> Actualizar contraseña :(</h1>
                <div className="col-12 col-md-6 border py-4">
                    <form
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group mb-3">
                            <label htmlFor="btnUpdatePassword">Correo electrónico</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Ingresa nueva contraseña"
                                id="btnUpdatePassword"
                                name="email"
                                value={newPasword}
                                onChange={({ target }) => setNewPassword(target.value)}
                            />
                        </div>
                        <button
                            className="btn btn-secondary w-100"
                        >Actualizar Contraseña</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default UpdatePassword