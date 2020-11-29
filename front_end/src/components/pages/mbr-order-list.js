import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import Breadcrumbs from '../layouts/breadcrumbs'
import { BrdcrbConsumer } from '../../index';
import HeadTitle from '../layouts/HeadTitle'
import { Order_dtl, Recv_infoForm } from './mbr-order-list_modals'

import Data from '../../data';
const pg_title = '會員基本資料管理及訂單相關';


function MbrOrderList() {

  let [orders, setorders] = useState(Data.userOrder);
  let [orderdtl, setorderdtl] = useState(null);
  let [pamntdtl, setpamntdtl] = useState([]);
  let [odrswitch, setodrswitch] = useState(false);
  let [pamntswitch, setpamntswitch] = useState(false);

  const open_Orderdtl = data =>{
      setodrswitch(true);
      setorderdtl(data);
  }

  const rtrnSwitchOdr = (OFF) => {
     setodrswitch(OFF);
     console.log(OFF);
  }

  const edit_recvInfo = data =>{
    setpamntswitch(true);
    setpamntdtl(data);
    console.log(data);
  }

  const rtrnSwitchInfo = OFF => setpamntswitch(OFF);   

  const rtrnPamntdtl = dtl =>{
    setpamntdtl(dtl);
    orders[dtl[0]].pamnt_info = dtl[1];
    setorders(orders);
    console.log(orders[dtl[0]]);
  }

  return (
    <>
      <BrdcrbConsumer>
        {(context) => {
          return <Breadcrumbs urlList={context.MbrOrderList} pg_title={pg_title} />
        }}
      </BrdcrbConsumer>


      <section className="ftco-section container">

        <HeadTitle EngTitle="member" HdTitle="訂 單 管 理" />

        <div className="px-3">
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
                    <td data-label="訂單狀態|" className="text-center text-secondary font-weight-bold">處理中</td>
                  </tr>
                )

              })}


            </tbody>
          </table>
          <div className="w-100 d-flex flex-nowrap justify-content-center mt-4">
            <Link to="/mbr-index" className="btn btn-warning d-inline-block W-20 w-xs-50 mr-2">返回會員專區</Link>
          </div>
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