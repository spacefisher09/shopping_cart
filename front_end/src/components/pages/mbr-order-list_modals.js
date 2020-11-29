import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap';

function Order_dtl(props){
  //bootstrap modal
  const [show, setshow] = useState(props.odrSwitch);
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);

  //order data
  let [Orderdetail, setOrderdetail] = useState(props.orderData);

  //更新props資料
  useEffect(() => {
    setshow(props.odrSwitch);
    setOrderdetail(props.orderData);
  }, [props])

  //關閉視窗和回傳switch狀態
  const closeOrder = () =>{
    handleClose();
    props.rtrnSwitch(false);
  }

  return (
    <Modal size="lg" show={show} onHide={handleClose} >
      <Modal.Header>
        <Modal.Title className="text-dark"><i className="fas fa-money-check-alt mr-2"></i> 訂單明細</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
        {Orderdetail ?
          (<>
            {Orderdetail.ID_Amount.map(odr => {
              return (
                <div className="d-flex flex-wrap border-bottom border-white">
                  <div className="col-12 col-lg-2 col-md-4">
                    <span className="bg-light overflow-hidden mx-auto d-flex align-items-end border-light" style={{ width: '120px', height: '90px', border: '5px solid', }}>
                      <img className="img-fluid" src={odr[0].pdct_img} alt="" />
                    </span>
                  </div>
                  <div className="col-12 text-center col-lg-5 text-md-left col-md-8 mb-lg-0 mb-2">
              <h4 className="product-name mt-2 w-100"><strong>{odr[0].pdct_name}</strong></h4>
                    <span className="d-block h5 text-secondary w-100">{odr[0].pdct_amount}</span>
                  </div>
                  <div className="col-12 col-lg-5 col-md-12 py-2 px-0 bg-light text-center h5 font-weight-bold text-danger m-0">
                    訂購數量 {odr[1]} 份 / $ {odr[0].pdct_price}
                  </div>
                </div>
              )
            })}

            <hr />
            <div className="d-flex flex-wrap">
              <div className="col-12 col-lg-7 col-md-12 py-2 px-0 font-weight-bold text-center">
                運費－{Orderdetail.shipping_fee}元，消費總金額不足NT$2,000元者，需自行負擔運費，謝謝。(限台灣本島)
              </div>
              <div className="col-12 col-lg-5 col-md-12 py-2 px-0 bg-light text-center h5 font-weight-bold text-danger m-0">
                $ {Orderdetail.shipping_fee}
              </div>
            </div>
            <hr />
            <div className="d-flex flex-wrap">
              <div className="col-12 col-lg-7 col-md-12 text-center py-2 h4 font-weight-bold text-thm m-0">
                <i className="ion-ios-calculator mr-2"></i>訂單總金額－
              </div>
              <div className="col-12 col-lg-5 col-md-12 py-2 px-0 bg-light text-center h5 font-weight-bold text-danger m-0">
                $ {Orderdetail.total_bill}
              </div>
            </div>
          </>
          ) : null}
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <button className="btn btn-outline-danger" onClick={closeOrder}><i className="fas fa-times"></i> 關閉</button>
      </Modal.Footer>
    </Modal>

  )

}


function Recv_infoForm(props){
  //bootstrap modal
  const [show, setshow] = useState(props.pamntSwitch);
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);

  //recvinfo data
  let [Pamntdetail, setPamntdetail] = useState(props.pamntData);
  let [detail, setdetail] = useState(Pamntdetail[1]);

  useEffect(() => {
    setshow(props.pamntSwitch);
    setPamntdetail(props.pamntData);
  }, [props])

  const editPamnt = e =>{
    setdetail(e.target.value);
    Pamntdetail[1] = e.target.value;
    setPamntdetail(Pamntdetail);
  } 
  

  const saveInfo = () =>{
    handleClose();
    props.rtrnSwitch(false);
    props.rtrnPamntdtl(Pamntdetail);
  }

  return(
    <Modal size="lg" show={show} onHide={handleClose} >
      <Modal.Header>
        <Modal.Title className="text-dark"><i className="fas fa-money-check-alt mr-2"></i> 回覆匯款資訊</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
        <p className="text-danger font-weight-bold h4">
          請輸入匯款銀行代碼和帳號與匯款日期。 
        </p>
        <p className="text-black-50 font-weight-bold">
          範例：匯款帳號－004-XXXXXXXXXX。 匯款日期－2012/07/15
        </p>
        <textarea name="" id="" rows="3" className="form-control w-100" placeholder="" value={detail} onChange={editPamnt}></textarea>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <button className="btn btn-outline-danger" onClick={saveInfo}><i className="fas fa-times"></i> 儲存並關閉</button>
      </Modal.Footer>
    </Modal>
  )
}

export { Order_dtl, Recv_infoForm };

