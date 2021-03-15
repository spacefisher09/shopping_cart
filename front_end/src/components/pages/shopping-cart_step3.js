import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Loader } from '../../loader.svg'

function Step_3(props) {

  let [order, setorder] = useState(props.pdctInfo);
  let [dataStatus,setdatastatus] = useState(false);
  const [Name, setName] = useState(''); 
  const [Phone, setPhone] = useState(''); 
  const [Email, setEmail] = useState(''); 
  const [Address, setAddress] = useState(''); 
  const [loaderClass, setloaderClass] = useState("ftco-loader h-100 fullscreen"); 

  useEffect(()=>{
    setorder(props.pdctInfo);
  },[props]);
  

  const getUserdata = e => {
    return (e.target.checked) ? (
      setloaderClass("ftco-loader h-100 fullscreen  show"),
      fetch(`${process.env.REACT_APP_API_URL}/api/userdata/${order.userdata}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${props.pgToken}`
        },
      }).then(
        resp => resp.json()
      ).then(
        (resp) => {
          order.recv_info = {
            'Name':resp.Name,
            'Phone':resp.Phone,
            'Email':resp.Email,
            'Address':resp.Address,
          };
          setName(resp.Name);
          setPhone(resp.Phone);
          setEmail(resp.Email);
          setAddress(resp.Address);
          setloaderClass(Boolean(resp)? "ftco-loader fullscreen" : loaderClass);
        }
      ).catch(
        error => console.log(error)
      ),
      props.pdctInfoReturned(order),
      setdatastatus(true)
    ) : (
        setdatastatus(false),
        order.recv_info = {},
        props.pdctInfoReturned(order)
      );
  }

  

  const slctTime = e =>{
    return (e.target.value == "請選擇收貨時間") ? 
    (order.recv_time = null, props.pdctInfoReturned(order))
    : (order.recv_time = e.target.value, props.pdctInfoReturned(order))
  }

  const getName = e =>{
    order.recv_info ={...order.recv_info,'Name':e.target.value};
    props.pdctInfoReturned(order);
  }
  const getPhone = e =>{
    order.recv_info ={...order.recv_info,'Phone':e.target.value};
    props.pdctInfoReturned(order);
  }
  const getEmail = e =>{
    order.recv_info ={...order.recv_info,'Email':e.target.value};
    props.pdctInfoReturned(order);
  }
  const getAddr = e =>{
    order.recv_info ={...order.recv_info,'Address':e.target.value};
    props.pdctInfoReturned(order);
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
          <div className="position-relative">
          <div className="form-inline">
            {/* PICK_TZ1 / PICK_TZ2 database儲存值 */}
            <div className="form-group w-100 mb-2">
              <label className="mx-2" htmlFor="receiveTime">指定收貨時間：</label>
              <select name="" id="" className="form-control ml-sm-1" onChange={slctTime}>
                <option>請選擇收貨時間</option>
                <option value={"PICK_TZ1"}>中午12：00前</option>
                <option value={"PICK_TZ2"}>下午12：00～18：00</option>
              </select>
            </div>
            <div className="form-group w-s-100 flex-wrap mr-sm-3 mb-2">
              <label className="mx-2" htmlFor="receiveName">收貨人姓名：</label>
              {dataStatus ? 
               <p className="font-weight-bold text-primary mx-2 my-1">{Name}</p>
               : <input type="text" className="form-control" id="receiveName" placeholder="請輸入姓名" onChange={getName} required />
              }
            </div>
            <div className="form-group w-s-100 mb-2 flex-wrap">
              <label className="mx-2" htmlFor="receiveTel">收貨人電話：</label>
              {dataStatus ? 
                <p className="font-weight-bold text-primary mx-2 my-1">{Phone}</p>
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
                <p className="font-weight-bold text-primary mx-2 my-1">{Email}</p>
              : <input type="email" className="form-control W-75 w-s-100" id="receiveEmail" placeholder="請輸入電子信箱" onChange={getEmail} required />
              }
          </div>
          <div className="form-group d-flex flex-wrap mb-0">
            <label className="mx-2 my-1" htmlFor="receiveAdrs">收貨人地址：</label>
            {dataStatus ? 
                <p className="font-weight-bold text-primary mx-2 my-1">{Address}</p>
            : <input type="text" className="form-control W-75 w-s-100" id="receiveAdrs" placeholder="請輸入地址" onChange={getAddr} required />
             }
          </div>
          {/* 資料讀取顯示 */}
          <div className={loaderClass}><Loader></Loader></div>
          </div>
        </div>
    )
};

export default Step_3;