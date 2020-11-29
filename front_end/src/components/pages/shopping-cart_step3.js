import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import DatePicker, { registerLocale } from "react-datepicker"
// import zh_TW from "date-fns/locale/zh-TW";
// registerLocale("zh_TW", zh_TW);

function Step_3(props) {

  let [order, setorder] = useState(props.pdctInfo);
  let [dataStatus,setdatastatus] = useState(false);
  // let [getDate,setgetDate] = useState(null);

  const order_set_rtrn = odr =>{
    setorder(odr);
    props.pdctInfoReturned(odr);
  }

  const getUserdata = e =>{
      return (e.target.checked) ? (
          setdatastatus(true),
          order.recv_info = order.userdata[1],
          order_set_rtrn(order)
          ):(
            setdatastatus(false),
            order.recv_info = [],
            order_set_rtrn(order)
       );
  }

  // const setDate = date => {
  //   setgetDate(date);
  //   console.log(date);
  // }

  const slctTime = e =>{
    return (e.target.value == "請選擇收貨時間") ? 
    (order.recv_time = null, order_set_rtrn(order))
    : (order.recv_time = e.target.value, order_set_rtrn(order))
  }

  const getName = e =>{
    order.recv_info.Name = e.target.value;
    order_set_rtrn(order);
  }
  const getPhone = e =>{
    order.recv_info.Phone = e.target.value;
    order_set_rtrn(order);
  }
  const getEmail = e =>{
    order.recv_info.Email = e.target.value;
    order_set_rtrn(order);
  }
  const getAddr = e =>{
    order.recv_info.Address = e.target.value;
    order_set_rtrn(order);
  }

    return (
        <div className="card-body border rounded-lg p-0 mb-3 p-3">
          <div className="mb-2 w-100 font-weight-bold bg-light py-2 px-2 clearfix text-lg-left text-center">
            訂購人資料：為會員資料，若需更改請點連結至會員基本資料修改
            <Link to="/mbr-info" className="btn btn-outline-danger d-inline-block ml-2">
              <i className="fas fa-edit"></i>修改會員資料
            </Link>
            <div className="custom-control custom-checkbox custom-control-inline m-0 float-lg-right btn btn-outline-primary" style={{ paddingLeft: '2em' }}>
              <input className="custom-control-input" type="checkbox" name="" id="equal_user" onChange={getUserdata} />
              <label className="custom-control-label" htmlFor="equal_user" style={{ cursor: 'pointer' }}>收貨人資料同會員資料</label>
            </div>
          </div>
          <div className="form-inline">
            <div className="form-group w-100 mb-2">
              <label className="mx-2" htmlFor="receiveTime">指定收貨時間：</label>
              {/* <div className="date mb-sm-0 mb-1">
                <DatePicker className="form-control w-100" dateFormat="yyyy/MM/dd" locale="zh_TW" 
                placeholderText="請選擇日期..." minDate={new Date()}
                selected={getDate} onChange={setDate} />
                <span className="input-group-addon text-blue px-2" >
                  <i className="fas fa-calendar-alt"></i>
                </span> 
              </div> */}
              <select name="" id="" className="form-control ml-sm-1" onChange={slctTime}>
                <option>請選擇收貨時間</option>
                <option value={"下午13：00前"}>下午13：00前</option>
                <option value={"下午14：00～18：00前"}>下午14：00～18：00前</option>
              </select>
            </div>
            <div className="form-group w-s-100 flex-wrap mr-sm-3 mb-2">
              <label className="mx-2" htmlFor="receiveName">收貨人姓名：</label>
              {dataStatus ? 
               <p className="font-weight-bold text-primary mx-2 my-1">{order.userdata[1].Name}</p>
               : <input type="text" className="form-control" id="receiveName" placeholder="請輸入姓名" onChange={getName} required />
              }
            </div>
            <div className="form-group w-s-100 mb-2 flex-wrap">
              <label className="mx-2" htmlFor="receiveTel">收貨人電話：</label>
              {dataStatus ? 
                <p className="font-weight-bold text-primary mx-2 my-1">{order.userdata[1].Phone}</p>
              : <><input type="text" className="form-control" id="receiveTel" placeholder="請輸入電話" onChange={getPhone} required />
              <span className="text-danger d-inline-block ml-1">
                (住家電話或手機聯絡電話皆可。)
              </span></>
              }
            </div>
          </div>
          <div className="form-group d-flex flex-wrap mb-2">
            <label className="mx-2 my-1" htmlFor="receiveEmail">
              收貨人電子信箱：</label>
              {dataStatus ? 
                <p className="font-weight-bold text-primary mx-2 my-1">{order.userdata[1].Email}</p>
              : <input type="email" className="form-control W-75 w-s-100" id="receiveEmail" placeholder="請輸入電子信箱" onChange={getEmail} required />
              }
          </div>
          <div className="form-group d-flex flex-wrap mb-0">
            <label className="mx-2 my-1" htmlFor="receiveAdrs">收貨人地址：</label>
            {dataStatus ? 
                <p className="font-weight-bold text-primary mx-2 my-1">{order.userdata[1].Address}</p>
            : <input type="text" className="form-control W-75 w-s-100" id="receiveAdrs" placeholder="請輸入地址" onChange={getAddr} required />
             }
          </div>

        </div>
    )
};

export default Step_3;