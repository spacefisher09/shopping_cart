import React, { useState, useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import { useCookies } from 'react-cookie'

import Navbar from '../layouts/Navbar'
import Breadcrumbs from '../layouts/breadcrumbs'
import { BrdcrbConsumer } from '../../index';
import HeadTitle from '../layouts/HeadTitle'
import Step_1 from './shopping-cart_step1'
import Step_2 from './shopping-cart_step2'
import Step_3 from './shopping-cart_step3'


const pg_title = '請於下方進行商品訂購與結帳!';


function ShoppingCart() {
  const [token] = useCookies(['sc-token']);
  const [USERNAME] = useCookies(['username']);
  const [newOrder,setnewOrder,deletenewOrder] = useCookies(['neworder']);
  
  //帶入選購商品資料
  const [UserOdr, setUserOdr] = useState(newOrder['neworder']);
  let history = useHistory();


  //bootstrap modal
  const [show, setshow] = useState(false);
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);

  //步驟資料回傳訂單
  const rtrn_pdctInfo = countOrder => {
    setUserOdr(countOrder);
  }

  //返回上頁並刪除訂單
  const dlteOrder = () => {
    deletenewOrder(['neworder']);
    history.push('/product');
  }
  
  //送出訂單
  const submitOrder = () => {
    return( 
      fetch(`${process.env.REACT_APP_API_URL}/api/userorder/${UserOdr.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['sc-token']}`
      },
      body: JSON.stringify(UserOdr)
    }).then(
      resp => resp.json()
    ).then(
      () => {
        handleClose();
        deletenewOrder(['neworder']);
      }
    ).catch(
      error => console.log(error)
    ),
    history.push('/mbr-order-list')
    )
  }

  return (
    <>
      <Navbar isLogin={(token['sc-token']!=='undefined') ? true : false} userName={USERNAME['username']} />
      <BrdcrbConsumer>
        {(context) => {
          return <Breadcrumbs urlList={context.ShoppingCart} pg_title={pg_title} />
        }}
      </BrdcrbConsumer>

      <form className="ftco-section pb-5 container px-3">

        <HeadTitle EngTitle="shopping cart" HdTitle="結 帳 購 物 車" />
        <div className="w-0 alert alert-warning border-0 rounded-0 h5 text-cus-secondary">
          <i className="ion-ios-arrow-dropright-circle lead"></i> 步驟 1－確認購物車商品及金額
        </div>
        {newOrder['neworder'].id_Amount ?
          <Step_1 keyVal="step1" shipng_fee={newOrder['neworder'].shipping_fee} pdctInfo={UserOdr} pdctInfoReturned={rtrn_pdctInfo} />
          : null
        }
        {/* <!-- step 2 --> */}
        <div className="w-0 alert alert-warning border-0 rounded-0 h5 text-cus-secondary">
          <i className="ion-ios-arrow-dropright-circle lead"></i> 步驟 2－選擇結帳方式
        </div>
        <Step_2 keyVal="step2" pdctInfo={UserOdr} pdctInfoReturned={rtrn_pdctInfo} />

        {/* <!-- step 3 --> */}
        <div className="w-0 alert alert-warning border-0 rounded-0 h5 text-cus-secondary">
          <i className="ion-ios-arrow-dropright-circle lead"></i> 步驟 3－確認收件資訊
        </div>
        <Step_3 keyVal="step3" pdctInfo={UserOdr} pgToken={token['sc-token']} pdctInfoReturned={rtrn_pdctInfo} />
        

        <div className="w-100 d-flex flex-nowrap justify-content-center mt-4">
          <button className="btn btn-warning d-inline-block W-20 w-xs-50 mr-2" type="button" onClick={dlteOrder}>返回上頁,並清空購物車</button>
          <button className="btn btn-danger d-inline-block W-20 w-xs-50" type="button" onClick={handleShow}>確認送出</button>
        </div>

      </form>
      {/* <!-- modal --> */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body><h4>訂單送出後就無法修改，確定要送出此份訂單嗎?</h4></Modal.Body>
        <Modal.Footer className="justify-content-center">
          <button type='button' className="btn btn-outline-primary" onClick={handleClose}>返回訂單</button>
          <button type='button' className="btn btn-outline-danger" onClick={submitOrder}>確認送出訂單</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ShoppingCart;