import React from 'react'
import { Link } from 'react-router-dom'


function Breadcrumbs(props) {
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
          <div className="breadcrumbs d-inline-block">
            <div className="text text-center">
              <p className="text-white">{children}</p>
              <h1 className="mb-3 bread text-white">{props.pg_title}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};


export default Breadcrumbs ;
