import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { useCookies } from 'react-cookie'

import Navbar from '../layouts/Navbar'
import Breadcrumbs from '../layouts/breadcrumbs';
import { BrdcrbConsumer } from '../../index';
import Product_item from './product-item';


function Product() {
  const [token] = useCookies(['sc-token']);
  const [USERNAME] = useCookies(['username']);
  const [newOrder,setnewOrder] = useCookies(['neworder']);
  //product list
  const [mainList,setmainList] = useState([]);
  //login state
  const [isLogin, setisLogin] = useState((token['sc-token']!=='undefined' && token['sc-token']!==undefined) ? true : false);
  //product item check
  let [checkedItem, setcheckedItem] = useState({'id_amount':[]});
  //bootstrap modal
  const [show, setshow] = useState(false);
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);
  //tea data
  useEffect(()=>{
    //導入產品項目
    fetch(`${process.env.REACT_APP_API_URL}/api/pdctlist/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(
      resp => resp.json()
    ).then(
      resp => setmainList(resp)
    ).catch((error) => { console.log(error); history.push('/not-found-page');});
  },[])

  
  const teaType = [['RT','紅 茶'], ['GT','綠 茶'], ['OLT','烏 龍 茶']];
  const pg_title = '下方選擇欲購買的茶葉!';

  //產出勾選產品
  const checkItem = e => {
    const addVal = e.target.value;
    //每次勾選產出新列表
    let chkList = [...checkedItem['id_amount'], addVal];
    //過濾重複勾選
    if (checkedItem['id_amount'].includes(addVal)) {
      chkList = chkList.filter(val => val !== addVal)
    }
    //重設勾選品項
    setcheckedItem({...checkItem,id_amount:chkList});
  };
  
  let history = useHistory();
  const postOrder = (e) => {
    e.preventDefault();
    return checkedItem['id_amount'].length == 0 ? (alert("購物車不可為空"))
      : (
        //轉換字串為數字
        checkedItem['id_amount'] = checkedItem['id_amount'].map(str => str.split(',').map(str => Number(str))).map(
          (arr) => {
            const swapitem = mainList.filter(val => val.id == arr[0]);
            return arr = [swapitem[0], 0];
          }
        ),
     
        //送出新訂單
        fetch(`${process.env.REACT_APP_API_URL}/api/userorder/create_userorder/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['sc-token']}`
          },
          body: JSON.stringify(checkedItem)
        }).then(
          resp => resp.json()
        ).then(
          (resp) => {
            setnewOrder('neworder', resp);
            history.push('/shopping-cart');
          }
        ).catch(
          error => console.log(error)
        )
        
      );
   };

  return (
    <>
      <Navbar isLogin={isLogin} userName={USERNAME['username']} />
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
                <Product_item t_Type={Type[1]} isLogin={isLogin} key={index} modal={handleShow} checkItem={checkItem}>
                  {mainList.filter(itm => itm.pdct_type === Type[0])}
                </Product_item>
              )
            }
          )}

          {/* <!-- 送出表單按鈕 --> */}
          {isLogin ?
            <>
            <hr />
            <button type="submit" className="d-block mx-auto btn btn-lg btn-danger ion-ios-check">已確認品項，下一步</button>
            </>
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