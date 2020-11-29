import React, { component, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import Breadcrumbs from '../layouts/breadcrumbs';
import { BrdcrbConsumer } from '../../index';
import Data from '../../data';
import Product_item from './product-item';


function Product() {
  //login state
  const [isLogin, setisLogin] = useState(false);
  //product item check
  const [checkedItem, setcheckedItem] = useState([]);
  //bootstrap modal
  const [show, setshow] = useState(false);
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);
  
  
  //tea data
  const mainList = Data.PdctItem;
  const teaType = ['紅 茶', '綠 茶', '烏 龍 茶'];
  const pg_title = '下方選擇欲購買的茶葉!';


  const actLogin = () => setisLogin(true);

  const checkItem = e => {
    const addVal = e.target.value;
    let chkList = [...checkedItem, addVal];
    if (checkedItem.includes(addVal)) {
      chkList = chkList.filter(val => val !== addVal)
    }
    setcheckedItem(chkList);
  };

  let history = useHistory();
  const postOrder = (e) => {
    e.preventDefault();
    //post產品項目ID到訂單
    // Data.userOrder[0].ID_Amount =
      checkedItem.length == 0 ? (alert("購物車不可為空"))
        : (
         // checkedItem.map(str => str.split(',').map(str => Number(str))),
          history.push('/shopping-cart') 
          );
          //檢查checkedItem不可為空值 否則跳出警示
          //console.log(Data.userOrder[0].ID_Amount);
    };

  return (
    <>
      <BrdcrbConsumer>
        {(context) => {
          return <Breadcrumbs urlList={context.Product} pg_title={pg_title} />
        }}
      </BrdcrbConsumer>

      <section className="ftco-section">
        <form onSubmit={postOrder} className="container tea_list">
          {/* <!-- 茶列表 --> */}
          {teaType.map(
            (Type, index) => {
              return (
                <Product_item t_Type={Type} isLogin={setisLogin} key={index} modal={handleShow} checkItem={checkItem}>
                  {mainList.filter(itm => itm.pdct_type === Type)}
                </Product_item>
              )
            }
          )}

          {/* <!-- 送出表單按鈕 --> */}
          <hr />
          {setisLogin ?
            <button type="submit" className="d-block mx-auto btn btn-lg btn-danger ion-ios-check">已確認品項，下一步</button>
            : ''
          }
        </form>
      </section>
      {/* <!-- modal --> */}
      <Modal size="lg" show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className="ion-ios-alert text-danger"> 尚未登入會員</Modal.Title>
        </Modal.Header>
        <Modal.Body>請登入網站會員、或者點選加入本網站會員，即可繼續使用購物車！</Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Link to="/login" className="btn btn-outline-info" onClick={handleClose}>登入會員</Link>
          <Link to="/register" className="btn btn-outline-danger" onClick={handleClose}>加入會員</Link>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Product;