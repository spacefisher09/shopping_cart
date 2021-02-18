import React, { useState, useEffect } from 'react'

//border style
var border_style = { borderLeft: '5px solid' };
function Registerform(props) {
    let [username, showusername] = useState('');
    let [password, showpassword] = useState('');

    useEffect(()=>{
        //true為執行清除重填,否則就送出註冊帳密
        if(props.reset_data) {
            showusername('');
            showpassword('');
            props.rtrn_rgstrdata(false);
        }else{
            props.rtrn_rgstrdata({username,password});
        }
    },[props.reset_data,username,password]);

    const getID = e => {
        showusername(e.target.value);
    }
    const getPWD = e => {
        showpassword(e.target.value);
    }

    return (
        <>
            <div className="form-group row py-2 mx-0 bg-light mb-1">
                <label htmlFor="username" className="col-sm-3 col-form-label border-secondary text-sm-center" style={border_style}>會員帳號</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" id="username" value={username} onChange={getID} required />
                </div>
            </div>
            <div className="form-group row py-2 mx-0 bg-light mb-1">
                <label htmlFor="user_password" className="col-sm-3 col-form-label border-secondary text-sm-center" style={border_style}>會員密碼</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" id="user_password" value={password} onChange={getPWD} required />
                </div>
            </div>
        </>
    )
}

function Memberform(props) {
    let [intData, setintData] = useState(props.userdata);
    let [readmode, setreadmode] = useState(props.readmode ? [true, "form-control-plaintext"] : [false, "form-control"]);
    let [Name, showName] = useState(props.userdata.Name);
    let [Phone, showPhone] = useState(props.userdata.Phone);
    let [Address, showAddress] = useState(props.userdata.Address);
    let [Email, showEmail] = useState(props.userdata.Email);

    useEffect(() => {
        //更新state
        setreadmode(props.readmode ? [true, "form-control-plaintext"] : [false, "form-control"]);
        setintData(props.userdata);
        showName(props.userdata.Name);
        showPhone(props.userdata.Phone);
        showAddress(props.userdata.Address);
        showEmail(props.userdata.Email);
    }, [props])

    const sendData = data => {
        setintData(data);
        props.rtrn_userdata(data);
    }

    const getName = e => {
        showName(e.target.value);
        intData.Name = e.target.value;
        sendData(intData);
    }
    const getPhone = e => {
        showPhone(e.target.value);
        intData.Phone = e.target.value;
        sendData(intData);
    }
    const getAddress = e => {
        showAddress(e.target.value);
        intData.Address = e.target.value;
        sendData(intData);
    }
    const getEmail = e => {
        showEmail(e.target.value);
        intData.Email = e.target.value;
        sendData(intData);
    }

    return (
        <>
            <div className="form-group row py-2 mx-0 alert-warning mb-1">
                <label htmlFor="username" className="col-sm-3 col-form-label border-warning text-sm-center" style={border_style}>會員姓名</label>
                <div className="col-sm-9">
                    <input type="text" className={readmode[1]} id="username" readOnly={readmode[0]} value={intData.Name} onChange={getName} required />
                </div>
            </div>
            <div className="form-group row py-2 mx-0 alert-warning mb-1">
                <label htmlFor="user_tel" className="col-sm-3 col-form-label border-warning text-sm-center" style={border_style}>會員聯絡電話</label>
                <div className="col-sm-9">
                    <input type="text" className={readmode[1]} id="user_tel" readOnly={readmode[0]} value={intData.Phone} onChange={getPhone} required />
                </div>
            </div>
            <div className="form-group row py-2 mx-0 alert-warning mb-1">
                <label htmlFor="user_adrs" className="col-sm-3 col-form-label border-warning text-sm-center" style={border_style}>會員聯絡地址</label>
                <div className="col-sm-9">
                    <input type="text" className={readmode[1]} id="user_adrs" readOnly={readmode[0]} value={intData.Address} onChange={getAddress} required />
                </div>
            </div>
            <div className="form-group row py-2 mx-0 alert-warning mb-1">
                <label htmlFor="user_email" className="col-sm-3 col-form-label border-warning text-sm-center" style={border_style}>會員電子信箱</label>
                <div className="col-sm-9">
                    <input type="email" className={readmode[1]} id="user_email" readOnly={readmode[0]} value={intData.Email} onChange={getEmail} required />
                </div>
            </div>

        </>
    )
}

export { Registerform, Memberform };