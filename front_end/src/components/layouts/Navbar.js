import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom'

function Navbar(props) {
	let [isLogin,setisLogin] = useState(props.isLogin);
    let [USERNAME,setUSERNAME]= useState(props.userName=='undefined'?'貴賓':'貴賓 '+props.userName)

	let classStr = "navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light";
    let [navClass, setnavClass] = useState((isLogin)? classStr+=' mbr':classStr);

	useEffect( () => {
		setisLogin(props.isLogin);
		setUSERNAME(props.userName=='undefined'?'貴賓':'貴賓 '+props.userName)
		setnavClass((isLogin)? classStr +=' mbr' : classStr);
	  }, [isLogin])

	return (
		<nav className={navClass} id="ftco-navbar">
			<div className="container">
				<Link className="navbar-brand" to="/">無名茶行</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="fas fa-bars"></span>
				</button>

				<div className="collapse navbar-collapse" id="ftco-nav">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item"><div className="nav-link text-muted ion-ios-leaf"> 關於茶行</div></li>
						<li className="nav-item"><Link to="/product" className="nav-link ion-ios-basket"> 產品專區</Link></li>
						<li className="nav-item"><div className="nav-link text-muted ion-ios-information-circle-outline"> 聯絡我們</div></li>
						<li className="nav-item link-lgn"><Link to="/login" className="nav-link ion-ios-person btn btn-outline-light rounded-pill"> 登入會員</Link></li>
						<li className="nav-item link-mbr"><Link to="/mbr-index" className="nav-link ion-ios-person btn btn-outline-light rounded-pill"> 你好，{USERNAME}!</Link></li>
					</ul>
				</div>
			</div>
		</nav>
	);

}


export default Navbar;