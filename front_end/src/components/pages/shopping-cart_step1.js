import React, { useEffect, useState } from 'react'

export function Countbox(props) {
  let [showNum,setshowNum] = useState(props.amount);
  let [newOrder, setnewOrder] = useState(props.orderCounted.ID_Amount);
 
  useEffect(()=>{
    //更新未刪除input顯示value
    setshowNum(props.amount);
  },[props])

  const enterNum = e => {
    //設定input輸入value範圍,再設定顯示value
    e.target.value = e.target.value >= 0 ? e.target.value : 0;
    setshowNum (e.target.value);
    //更新輸入value到訂單再回傳
    newOrder[props.pos][1] = Number(e.target.value);
    setnewOrder(newOrder);
    props.orderReturned(newOrder);
  };
  const dlteOrder1 = () => {
    //回傳修改後訂單
    props.dlteOrder(props.pos); 
  }

  return (
    <>
      <div className="col-5 col-sm-3 col-md-3 px-0">
        <div className="quantity m-auto">
          <div className="plus">+</div>
          <input type="number" value={showNum} placeholder={0} onChange={enterNum} title="Qty" className="qty" />
          <div className="minus">-</div>
        </div>
      </div>
      <div className="col-2 col-sm-3 col-md-3 text-center px-0">
        <button type="button" className="btn btn-outline-danger px-3 py-1" onClick={dlteOrder1}>
          <i className="ion-ios-trash lead"></i>
        </button>
      </div>
    </>
  )
}

function Step_1(props) {

  let [countOrder, setcountOrder] = useState(props.pdctInfo);

  let countBill = val => {
    return val.map(
      arr => { return arr[0].pdct_price * arr[1] }
    ).reduce((addnum, num) => { return addnum + num });
  }
  const rtrnOrder = newOrder => {
    //countbox回傳的修改訂單重新指定給countOrder給countOrder
    countOrder.ID_Amount = newOrder;
    //計算訂單總額
    countOrder.total_bill = countBill(newOrder) + countOrder.shipping_fee;
    //修改顯示訂單總額
    settotalBill(countOrder.total_bill);
    //回傳修改後訂單
    props.pdctInfoReturned(countOrder);
  }

  const dlteOrder2 = pos => {
    countOrder.ID_Amount.splice(pos, pos + 1);
    //計算訂單總額
    let totalCounted = countBill(countOrder.ID_Amount) + countOrder.shipping_fee;
    countOrder.total_bill = totalCounted == 100 ? 0 : totalCounted;
    //修改顯示訂單總額
    settotalBill(countOrder.total_bill);
    //修改刪除後顯示訂購商品項目
    //console.log(itemsCreate(countOrder).toString())
    setitems(itemsCreate(countOrder));
    //回傳修改後訂單
    props.pdctInfoReturned(countOrder);
  }

  //item產生html用
  let itemsCreate = odr => {
    return odr.ID_Amount.map(
      (arr, index) => {
        return (
          <div className="d-flex flex-wrap border-bottom border-white" key={index}>
            <div className="col-12 col-lg-2 col-md-4">
              <span className="bg-light overflow-hidden mx-auto d-flex align-items-end border-light" style={{ width: '120px', height: '90px', border: '5px solid', }}>
                <img className="img-fluid" src={arr[0].pdct_img} alt="" />
              </span>
            </div>
            <div className="col-12 text-center col-lg-5 text-md-left col-md-8 mb-lg-0 mb-2">
              <h4 className="product-name mt-2 w-100"><strong>{arr[0].pdct_name}</strong></h4>
              <span className="d-block h5 text-secondary w-100">{arr[0].pdct_amount}</span>
            </div>
            <div className="col-12 col-lg-5 col-md-12 d-flex align-items-center p-lg-0 py-2 px-0 bg-light">
              <div className="col-5 col-sm-6 col-md-6 text-center h5 font-weight-bold text-danger px-0 pt-1">
                {`$ ${arr[0].pdct_price}`}
              </div>
              <Countbox orderCounted={odr} amount={arr[1]} pos={index} dlteOrder={dlteOrder2} orderReturned={rtrnOrder} key={arr.id} />
            </div>
          </div>
        )
      }
    )
  }

  //訂購商品項目產生
  let [items, setitems] = useState(itemsCreate(countOrder));
  //訂單總額產生
  let [totalBill, settotalBill] = useState(countOrder.total_bill);


  return (
    <>
      <div className="card-body px-0 mb-3">
        {/* <!-- PRODUCT --> */}
        {items}
        <hr />
        <div className="d-flex flex-wrap">
          <div className="col-12 col-lg-7 col-md-12 py-2 px-0 font-weight-bold text-center">
            運費－{props.shipng_fee}元，消費總金額不足NT$2,000元者，需自行負擔運費，謝謝。(限台灣本島)
          </div>
          <div className="col-12 col-lg-5 col-md-12 py-2 px-0 bg-light text-center h5 font-weight-bold text-danger m-0">
            $ {props.shipng_fee}
          </div>
        </div>
        <hr />
        <div className="d-flex flex-wrap">
          <div className="col-12 col-lg-7 col-md-12 text-center py-2 h4 font-weight-bold text-thm m-0">
            <i className="ion-ios-calculator mr-2"></i>訂單總金額－
          </div>
          <div className="col-12 col-lg-5 col-md-12 py-2 px-0 bg-light text-center h5 font-weight-bold text-danger m-0">
            $ {totalBill}
          </div>
        </div>
      </div>
    </>
  )
}

export default Step_1;