import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import { useCookies } from 'react-cookie'

import Navbar from '../layouts/Navbar'
import Breadcrumbs from '../layouts/breadcrumbs'
import { BrdcrbConsumer } from '../../index';
import HeadTitle from '../layouts/HeadTitle'
import { Order_dtl, Recv_infoForm } from './mbr-order-list_modals'
import { ReactComponent as Loader } from '../../loader.svg'

const pg_title = '會員基本資料管理及訂單相關';


function MbrOrderList() {
  const [token] = useCookies(['sc-token']);
  const [USERNAME] = useCookies(['username']);

  let [orders, setorders] = useState([]);
  let [orderdtl, setorderdtl] = useState(null);
  let [pamntdtl, setpamntdtl] = useState([]);
  let [odrswitch, setodrswitch] = useState(false);
  let [pamntswitch, setpamntswitch] = useState(false);
  const [loaderClass, setloaderClass] = useState("ftco-loader fullscreen show"); 
  let history = useHistory();

  //userorder data
  useEffect(()=>{
    //導入產品項目
    fetch(`${process.env.REACT_APP_API_URL}/api/userorder/get_userorder/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['sc-token']}`
      },
    }).then(
      resp => resp.json()
    ).then(
      (resp) => {
        console.log(resp);
        setorders(resp);
        setloaderClass(Boolean(resp)? "ftco-loader fullscreen" : loaderClass);
      }
    ).catch((error) => { console.log(error); history.push('/not-found-page');});
  },[])

  const open_Orderdtl = data =>{
    setodrswitch(true);
    setorderdtl(data);
  }

  const rtrnSwitchOdr = (OFF) => {
    setodrswitch(OFF);
  }

  const edit_recvInfo = data =>{
    setpamntswitch(true);
    setpamntdtl(data);
  }

  const rtrnSwitchInfo = OFF => setpamntswitch(OFF);   

  const rtrnPamntdtl = dtl =>{
    setpamntdtl(dtl);
    orders[dtl[0]].pamnt_info = dtl[1];
    setorders(orders);
    //送出新訂單
    fetch(`${process.env.REACT_APP_API_URL}/api/userorder/${orders[dtl[0]].id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['sc-token']}`
      },
      body: JSON.stringify(orders[dtl[0]])
    }).then(
      resp => resp.json()
    ).then(
      (resp) => {
        alert('付款訊息送出成功！');
      }
    ).catch(
      error => console.log(error)
    );
  }

  //刪除訂單
  const deleteOrder = odr =>{
    orders = orders.filter(arr=>arr.id!==odr);
    setorders(orders);
    fetch(`${process.env.REACT_APP_API_URL}/api/userorder/${odr}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['sc-token']}`
      },
    }).then(
      resp => resp.json()
    ).then(
      (resp) => {
        alert(resp);
      }
    ).catch(
      error => console.log(error)
    );
  }

  return (
    <>
      <Navbar isLogin={(token['sc-token']!=='undefined') ? true : false} userName={USERNAME['username']} />
      <BrdcrbConsumer>
        {(context) => {
          return <Breadcrumbs urlList={context.MbrOrderList} pg_title={pg_title} />
        }}
      </BrdcrbConsumer>


      <section className="ftco-section container">
        <div className="px-3 position-relative">
        <HeadTitle EngTitle="member" HdTitle="訂 單 管 理" />
          <table className="table table-rwd table-hover text-info bg-white border-bottom">
            <thead>
              <tr className="alert-info text-info">
                <th className="W-30">訂單號碼</th>
                <th className="W-25">訂單日期</th>
                <th className="W-15 text-center">付款狀態</th>
                <th className="W-15 text-center">運送狀態</th>
                <th className="W-15 text-center">訂單狀態</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order,index) => {
                return (
                  <tr key={index}>
                    <td data-label="訂單號碼|">
                      <button className="btn btn-link btn-sm p-0" type="button" onClick={()=>open_Orderdtl(order)}>
                        <i className="fas fa-money-check-alt mr-2"></i>  {order.order_id}
                      </button>
                    </td>
                <td data-label="訂單日期|" className="text-secondary font-weight-bold">{order.order_date}</td>
                    <td data-label="付款狀態|" className="text-center">
                      {order.pamnt_info == '貨到付款'? 
                      <span className="font-weight-bold text-cus-secondary">{order.pamnt_info}</span>
                      :<button className="btn btn-outline-danger btn-sm" type="button" onClick={()=>edit_recvInfo([index,order.pamnt_info])}>
                        {order.pamnt_info == '' ? '尚未回覆' : '編輯'}付款訊息
                      </button>
                      }
                    </td>
                    <td data-label="運送狀態|" className="text-center text-secondary font-weight-bold">未出貨</td>
                    <td data-label="訂單狀態|" className="text-center text-secondary font-weight-bold">
                      <button className="btn btn-outline-danger btn-sm" type="button" onClick={()=>deleteOrder(order.id)}>刪除訂單</button>
                    </td>
                  </tr>
                )

              })}


            </tbody>
          </table>
          <div className="w-100 d-flex flex-nowrap justify-content-center mt-4">
            <Link to="/mbr-index" className="btn btn-warning d-inline-block W-20 w-xs-50 mr-2">返回會員專區</Link>
          </div>
          {/* 資料讀取顯示 */}
          <div className={loaderClass}><Loader></Loader></div>
        </div>
      </section>
      
      {/* 訂單明細modal */}
      <Order_dtl orderData={orderdtl} odrSwitch={odrswitch} rtrnSwitch={rtrnSwitchOdr}/>
      {/* 付款狀態modal */}
      <Recv_infoForm pamntData={pamntdtl} pamntSwitch={pamntswitch} rtrnSwitch={rtrnSwitchInfo} rtrnPamntdtl={rtrnPamntdtl}/>
      
    </>
  )
}

export default MbrOrderList;