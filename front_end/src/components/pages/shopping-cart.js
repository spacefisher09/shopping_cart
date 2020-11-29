import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap';

import Breadcrumbs from '../layouts/breadcrumbs'
import { BrdcrbConsumer } from '../../index';
import HeadTitle from '../layouts/HeadTitle'
import Step_1 from './shopping-cart_step1'
import Step_2 from './shopping-cart_step2'
import Step_3 from './shopping-cart_step3'

import Data from '../../data';

const pg_title = '請於下方進行商品訂購與結帳!';


function ShoppingCart(props) {

  //帶入選購商品資料
  let mdfyOdr = Data.userOrder_0[0].ID_Amount.map(
    (arr) => {
      const swapitem = Data.PdctItem.filter(val => val.id == arr[0]);
      return arr = [swapitem[0], 0];
    }
  );
  
  let [UserOdr, setUserOdr] = useState(Data.userOrder_0[0]);
  //bootstrap modal
  const [show, setshow] = useState(false);
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);
  
  let intOrder = () =>{
    UserOdr.ID_Amount = mdfyOdr;
    return UserOdr;
  }


  const rtrn_pdctInfo = countOrder => {
    setUserOdr(countOrder);
    console.log(countOrder);
  }

  const dlteOrder = () => {
    props.history.goBack();
  }

  const submitOrder = () => {
    handleClose();
  }

  return (
    <>
      <BrdcrbConsumer>
        {(context) => {
          return <Breadcrumbs urlList={context.ShoppingCart} pg_title={pg_title} />
        }}
      </BrdcrbConsumer>

      <div className="ftco-section pb-5 container px-3">

        <HeadTitle EngTitle="shopping cart" HdTitle="結 帳 購 物 車" />
        <div className="w-0 alert alert-warning border-0 rounded-0 h5 text-cus-secondary">
          <i className="ion-ios-arrow-dropright-circle lead"></i> 步驟 1－確認購物車商品及金額
        </div>
        {UserOdr.ID_Amount ?
          <Step_1 keyVal="step1" shipng_fee={UserOdr.shipping_fee} pdctInfo={intOrder} pdctInfoReturned={rtrn_pdctInfo} />
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
        <Step_3 keyVal="step3" pdctInfo={UserOdr} pdctInfoReturned={rtrn_pdctInfo} />
        

        <div className="w-100 d-flex flex-nowrap justify-content-center mt-4">
          <button className="btn btn-warning d-inline-block W-20 w-xs-50 mr-2" type="button" onClick={dlteOrder}>返回上頁,並清空購物車</button>
          <button className="btn btn-danger d-inline-block W-20 w-xs-50" onClick={handleShow}>確認送出</button>
        </div>

      </div>
      {/* <!-- modal --> */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body><h4>訂單送出後就無法修改，確定要送出此份訂單嗎?</h4></Modal.Body>
        <Modal.Footer className="justify-content-center">
          <button className="btn btn-outline-primary" onClick={handleClose}>返回訂單</button>
          <Link to="/mbr-order-list" className="btn btn-outline-danger" onClick={submitOrder}>確認送出訂單</Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ShoppingCart;