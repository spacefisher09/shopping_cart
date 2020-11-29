import React from 'react';
import { Link } from 'react-router-dom'

function Navbar() {

	return (
		<nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
			<div className="container">
				<Link className="navbar-brand" to="/">龍源茶品</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="fas fa-bars"></span>
				</button>

				<div className="collapse navbar-collapse" id="ftco-nav">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item"><Link to="/about" className="nav-link ion-ios-leaf"> 關於茶行</Link></li>
						<li className="nav-item"><Link to="/product" className="nav-link ion-ios-basket"> 產品專區</Link></li>
						<li className="nav-item"><Link to="/contact" className="nav-link ion-ios-information-circle-outline"> 聯絡我們</Link></li>
						<li className="nav-item link-lgn"><Link to="/login" className="nav-link ion-ios-person btn btn-outline-light rounded-pill"> 登入會員</Link></li>
						<li className="nav-item link-mbr"><Link to="/mbr-index" className="nav-link ion-ios-person btn btn-outline-light rounded-pill"> 你好，王大明!</Link></li>
					</ul>
				</div>
			</div>
		</nav>
	);

}


export default Navbar;