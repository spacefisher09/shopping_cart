import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Navbar from './components/layouts/Navbar'

function Home() {
  const [token, setToken] = useCookies(['sc-token']);
  const [USERNAME, setUSERNAME] = useCookies(['username']);
  //初始設sc-token / username 為字串undefined
  setToken('sc-token', (token['sc-token']==undefined)? 'undefined' : token['sc-token']);
  setUSERNAME('username', (USERNAME['username']==undefined)? 'undefined' : USERNAME['username']);

  return (
    <>
      <Navbar isLogin={(token['sc-token']!=='undefined' && token['sc-token']!==undefined) ? true : false} userName={USERNAME['username']} />
      <div className="hero-wrap ftco-degree-bg" style={{ marginBottom: '4em' }} data-stellar-background-ratio="0.5">
        <div className="container">
          <div className="d-flex slider-text justify-content-center align-items-start">
            <div className="breadcrumbs d-inline-block">
              <div className="text text-center">
                <h1 className="mb-4 text-white">本茶行採用自然農法</h1>
                <p className="text-white">復育「小葉綠蟬」防治茶蟲，被小葉綠蟬吸吮過的大葉烏龍茶葉，經過達人精心烘焙下完成頂級香氣襲人的蜜香紅茶。</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mouse">
          <Link to="/product" className="mouse-icon">
            <div className="mouse-wheel"><span className="ion-ios-arrow-round-down"></span></div>
          </Link>
        </div>
      </div>
    </>
  )

};

export default Home;