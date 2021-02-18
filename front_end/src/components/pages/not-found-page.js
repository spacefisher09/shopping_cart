import React from 'react'
import Navbar from '../layouts/Navbar'

function NotFoundPage() {
  return (
    <>
      <Navbar isLogin={false} userName={'undefined'} />
      <div className="hero-wrap hero-wrap-2 ftco-degree-bg" data-stellar-background-ratio="0.5">
        <div className="container">
          <div className="d-flex slider-text justify-content-center align-items-start">
            <div className="ftco-animate d-inline-block">
              <div className="text text-center">
                <p className="breadcrumbs text-white">顯示錯誤訊息</p>
                <h1 className="mb-3 bread text-white">錯誤頁面</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="ftco-section">
        <div className="d-flex justify-content-center mb-4 col-12">
          <h2>找不到此頁面</h2>
        </div>

      </section>
    </>
  )
}

export default NotFoundPage;