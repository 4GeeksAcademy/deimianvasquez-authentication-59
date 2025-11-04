import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"

const urlBase = import.meta.env.VITE_BACKEND_URL

const ActivateAccount = () => {
    const { store, dispatch } = useGlobalReducer()

    const [searchParams, _] = useSearchParams()

    const [activate, setActivate] = useState(null)

    const handleActiveAccount = async () => {
        console.log(searchParams.get("token"))

        try {
            const response = await fetch(`${urlBase}/activate-account`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${searchParams.get("token")}`,
                    "Content-Type": "application/json"
                }
            })

            if (response.status == 401) {
                setActivate(true)
            } else if (response.status == 200) {

                const responseUser = await fetch(`${urlBase}/me`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    }
                })

                const dataUser = await responseUser.json()
                dispatch({
                    type: "SET_USER",
                    payload: dataUser.user
                })


                localStorage.setItem("user", JSON.stringify(dataUser.user))
            }

            console.log(response)
        } catch (error) {
            console.log(error)
        }

    }


    const forwardEmail = async () => {
        try {
            const response = await fetch(`${urlBase}/forward-email`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${store.token}`,
                    "Content-Type": "application/json"
                }
            })

            console.log(response)

        } catch (error) {

        }
    }


    return (

        <div className="container">
            {
                (store?.user && !store?.user?.is_active) &&

                <button
                    className="btn btn-secondary"
                    onClick={handleActiveAccount}
                >Activar cuenta</button>

                // redirect
            }
            {
                activate ?

                    <p>El token a vencido, <span className="text-danger" onClick={forwardEmail}>Reenviar  correo</span></p> :
                    null
            }

        </div>
    )
}


export default ActivateAccount