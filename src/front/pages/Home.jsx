import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<div className="container home-container">
			<div className="row">
				<div className="col-12 vh-100 d-flex flex-column justify-content-center align-items-center text-center">
					<h1>Hola ¿qué tal Mundo?  Bienvenido a mi web</h1>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam esse nihil quam eius cupiditate vel nobis dicta excepturi tempora velit. Modi autem est illum fuga. Dignissimos et consequatur assumenda? Accusamus!</p>
				</div>
			</div>
		</div>
	);
};


/*


	1.- Al registrar usuario enviar correo de activación --> enviar correo
	2.- Usar dos contraseñas para validar que sean iguales -->
	3.- Cerrar sesión (Puede mejorar) --> 
	4.- Lanzar a producción --> 
	5.- Poner a funcionar todo el proyecto, back y fron no se entienden

*/