import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom'
//waypoint plugin
import { Waypoint } from 'react-waypoint';


function Breadcrumbs(props) {
  const [animaClass, setanimaClass] = useState("breadcrumbs d-inline-block ftco-animate"); 
    
    const scrollanima = () =>{
        setTimeout(() => {
          setanimaClass("breadcrumbs d-inline-block ftco-animate fadeInUp ftco-animated");
      }, 150);
    }
  let children = props.urlList.map(
    ({ to, linkName }, index) => {
      return (to === '/' ?
        <Link key={index} to={to} onClick={event => event.preventDefault()}>{linkName}</Link>
        : <Link key={index} to={to}>{linkName}</Link>);
    }).map(
    (child, index) => (<span className="mr-2" key={`item${index}`}>{child} <i className="ion-ios-arrow-forward"></i></span>)
  );
  return (
    <div className="hero-wrap hero-wrap-2 ftco-degree-bg" data-stellar-background-ratio="0.5">
      <div className="container">
        <div className="d-flex slider-text justify-content-center align-items-start">
        <Waypoint onEnter={scrollanima}>
          <div className={animaClass}>
            <div className="text text-center">
              <p className="text-white">{children}</p>
              <h1 className="mb-3 bread text-white">{props.pg_title}</h1>
            </div>
          </div>
          </Waypoint>
        </div>
      </div>
    </div>
  )
};


export default Breadcrumbs ;
