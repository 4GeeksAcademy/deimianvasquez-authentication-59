import { Link, NavLink } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const { store } = useGlobalReducer()

	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">Todo's</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse " id="navbarNav">
					<ul className="navbar-nav ms-auto navbar-ul">
						<li className="nav-item">
							<NavLink
								// className="nav-link" to={"/"}
								className={({ isActive }) => `nav-link ${isActive ? "bordered" : ""}`}
								to={"/"}

							>Inicio</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className={({ isActive }) => `nav-link ${isActive ? "bordered" : ""}`}
								to={"/todos"}
							>

								Lista de tareas</NavLink>
						</li>

					</ul>
					{
						store.token ? (
							<div>
								<button>Cerrar Sesión</button>
							</div>
						) : (
							<div>
								<NavLink
									to={"/login"}
									className={"btn btn-outline-light"}
								>
									Iniciar Sesión
								</NavLink>
							</div>
						)
					}
				</div>
			</div>
		</nav>
	);
};