import React, { useEffect, useState } from 'react'

function Step_2(props) {

  let [order, setorder] = useState(props.pdctInfo);
  const PamntClass = "alert-info p-3 w-100 d-none";
  let [showPamnt,setshowPamnt] = useState(PamntClass);

   const radioBtn = e =>{
     return (radioBtn) ? (
       (e.target.value == "帳戶匯款") ? 
       (setshowPamnt(PamntClass.slice(0,PamntClass.lastIndexOf("d-none"))),
        order.pamnt_info = '' )
       : (setshowPamnt(PamntClass),order.pamnt_info = e.target.value),
       order.pamnt_type = e.target.value,
       setorder(order),
       props.pdctInfoReturned(order)
      ) : (false)
   }

    return (
        <div className="card-body p-0 mb-3 d-flex flex-wrap justify-content-center px-3">
          <div className="d-inline-flex flex-wrap justify-content-center border rounded-lg py-3 mr-2 mb-2" style={{ width: 'calc(50% - .6em)' }}>
            <i className="fas fa-hand-holding-usd w-100 text-center display-4 mb-2"></i>
            <div className="custom-control custom-radio custom-control-inline m-0">
              <input className="custom-control-input" type="radio" name="payment" id="cash_transaction" onChange={radioBtn} value={"貨到付款"} />
              <label className="custom-control-label" htmlFor="cash_transaction">貨到付款</label>
            </div>
          </div>
          <div className="d-inline-flex flex-wrap justify-content-center border rounded-lg py-3 ml-2 mb-2" style={{ width: 'calc(50% - .6em)' }}>
            <i className="far fa-credit-card w-100 text-center display-4 mb-2"></i>
            <div className="custom-control custom-radio custom-control-inline m-0">
              <input className="custom-control-input" type="radio" name="payment" id="atm_transaction" onChange={radioBtn} value={"帳戶匯款"} />
              <label className="custom-control-label" htmlFor="atm_transaction">帳戶匯款</label>
            </div>
          </div>
          <div className={showPamnt} id="payment_info">
            <p className="h5 text-info">
              <i className="fas fa-info-circle mr-1"></i>
            匯款資訊－
          </p>
            <p className="text-info text-center pb-2 border-bottom border-info">
              請將訂單金額匯款至以下帳戶並於匯款備註客戶姓名後，至會員專區－訂單狀態回覆匯款相關資訊，等待客服確認後即線上回覆。
          </p>
            <p className="text-info text-center m-0 font-weight-bold">
              匯款銀行：瑞穗鄉農會 / 戶名：東昇茶行 / 帳號：89501-01-010673-6<br />
            臨櫃匯款銀行通匯代碼：895-0019 / ATM轉帳銀行代碼：895 或 600
          </p>
          </div>

        </div>
    )
};

export default Step_2;