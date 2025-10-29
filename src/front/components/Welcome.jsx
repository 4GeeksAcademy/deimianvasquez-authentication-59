import useGlobalReducer from "../hooks/useGlobalReducer";



const Welcome = () => {
    const { store } = useGlobalReducer()
    const { user } = store
    return (
        <>
            {
                store.token != null &&
                <div className="container my-3">
                    <p>Hola ¿qué tal {`${user.lastname}`}?</p>
                </div>
            }
        </>

    )
}

export default Welcome;