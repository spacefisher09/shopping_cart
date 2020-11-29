import React,{ useState, useEffect } from 'react'

function Memberform(props) {
    //border style
    const border_style = {
        borderLeft: '5px solid',
    };

    let [intData,setintData] = useState(props.userdata ? props.userdata : [{},{}]);
    let [readmode,setreadmode] = useState(props.readmode ?[true,"form-control-plaintext"] : [false,"form-control"]);
    let [userID,showuserID] = useState(intData ? intData[0].userID : '');
    let [userPWD,showuserPWD] = useState(intData ? intData[0].userPWD : '');
    let [Name,showName] = useState(intData ? intData[1].Name : '');
    let [Phone,showPhone] = useState(intData ? intData[1].Phone : '');
    let [Address,showAddress] = useState(intData ? intData[1].Address : '');
    let [Email,showEmail] = useState(intData ? intData[1].Email : '');
    
    useEffect(()=>{
        //更新state
        setreadmode(props.readmode ?[true,"form-control-plaintext"] : [false,"form-control"]);
      },[props.readmode])
     
    const sendData = data =>{
        setintData(data);
        props.rtrn_userdata(data);
    }
    const getID = e =>{
        showuserID (e.target.value);
        intData[0].userID = e.target.value;
        sendData(intData);
    }
    const getPWD = e =>{
        showuserPWD(e.target.value);
        intData[0].userPWD = e.target.value;
        sendData(intData);
    }
    const getName = e =>{
        showName(e.target.value);
        intData[1].Name = e.target.value;
        sendData(intData);
    }
    const getPhone = e =>{
        showPhone(e.target.value);
        intData[1].Phone = e.target.value;
        sendData(intData);
    }
    const getAddress = e =>{
        showAddress(e.target.value);
        intData[1].Address = e.target.value;
        sendData(intData);
    }
    const getEmail = e =>{
        showEmail(e.target.value);
        intData[1].Email = e.target.value;
        sendData(intData);
    }
    
    return (
        <>
            <div className="form-group row py-2 mx-0 bg-light mb-1">
                <label htmlFor="userID" className="col-sm-3 col-form-label border-secondary text-sm-center" style={border_style}>會員帳號</label>
                <div className="col-sm-9">
                    <input type="text" className={readmode[1]} id="userID" readOnly={readmode[0]} value={props.userdata ? userID : undefined} onChange={getID} required />
                </div>
            </div>
            <div className="form-group row py-2 mx-0 bg-light mb-1">
                <label htmlFor="user_password" className="col-sm-3 col-form-label border-secondary text-sm-center" style={border_style}>會員密碼</label>
                <div className="col-sm-9">
                    <input type="text" className={readmode[1]} id="user_password" readOnly={readmode[0]} value={props.userdata ? userPWD : undefined} onChange={getPWD} required />
                </div>
            </div>
            <div className="form-group row py-2 mx-0 alert-warning mb-1">
                <label htmlFor="username" className="col-sm-3 col-form-label border-warning text-sm-center" style={border_style}>會員姓名</label>
                <div className="col-sm-9">
                    <input type="text" className={readmode[1]} id="username" readOnly={readmode[0]} value={props.userdata ? Name : undefined} onChange={getName} required />
                </div>
            </div>
            <div className="form-group row py-2 mx-0 alert-warning mb-1">
                <label htmlFor="user_tel" className="col-sm-3 col-form-label border-warning text-sm-center" style={border_style}>會員聯絡電話</label>
                <div className="col-sm-9">
                    <input type="text" className={readmode[1]} id="user_tel" readOnly={readmode[0]} value={props.userdata ? Phone : undefined} onChange={getPhone} required />
                </div>
            </div>
            <div className="form-group row py-2 mx-0 alert-warning mb-1">
                <label htmlFor="user_adrs" className="col-sm-3 col-form-label border-warning text-sm-center" style={border_style}>會員聯絡地址</label>
                <div className="col-sm-9">
                    <input type="text" className={readmode[1]} id="user_adrs" readOnly={readmode[0]} value={props.userdata ? Address : undefined} onChange={getAddress} required />
                </div>
            </div>
            <div className="form-group row py-2 mx-0 alert-warning mb-1">
                <label htmlFor="user_email" className="col-sm-3 col-form-label border-warning text-sm-center" style={border_style}>會員電子信箱</label>
                <div className="col-sm-9">
                    <input type="email" className={readmode[1]} id="user_email" readOnly={readmode[0]} value={props.userdata ? Email : undefined} onChange={getEmail} required />
                </div>
            </div>
            
        </>
    )
}

export default Memberform;