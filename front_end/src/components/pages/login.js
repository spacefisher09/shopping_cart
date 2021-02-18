import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Navbar from '../layouts/Navbar'
import Breadcrumbs from '../layouts/breadcrumbs'
import { BrdcrbConsumer } from '../../index'

const pg_title = '請登入會員';

function Login() {
  let [username, setusername] = useState('');
  let [password, setpassword] = useState('');
  let history = useHistory();

  const [token, setToken] = useCookies(['sc-token']);
  const [USERNAME, setUSERNAME] = useCookies(['username'])
  let [isLogin, setisLogin] = useState(false);
  const[errmsg, seterrmsg] = useState(false);

  const getUsername = (URL) => {
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['sc-token']}`
      },
    }).then(
      resp => resp.json()
    ).then(
      resp => setUSERNAME('username', resp.Name)
    ).catch(
      error => console.log(error)
    )
  }

  useEffect(() => {
    //判斷取得token後,再設定登陸和抓使用者名稱
    if (USERNAME['username'] == 'undefined' && token['sc-token'] !== 'undefined') {
      setisLogin(true);
      getUsername(`http://127.0.0.1:8000/api/userdata/get_user/`);
    }else if(USERNAME['username'] !== 'undefined'){
      //判斷抓到使用者名稱後,導向首頁
      history.push('/');
    }
  },[token,USERNAME])


  const loginClicked = e => {
    e.preventDefault();
    return fetch(`http://127.0.0.1:8000/auth/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      }).then(
        resp => resp.json()
      ).then(
        (resp) => {
          setToken('sc-token', resp.token);
          //無法成功登錄,顯示登入錯誤訊息
          if(!resp.token){seterrmsg(true)}
        }
      ).catch(
        error => console.log(error)
      );
    
  }

  return (
    <>
      <Navbar isLogin={isLogin} userName={USERNAME['username']} />
      <BrdcrbConsumer>
        {(context) => {
          return <Breadcrumbs urlList={context.Login} pg_title={pg_title} />
        }}
      </BrdcrbConsumer>

      <section className="ftco-section">
        <div className="container">
          <div className="row block-9 justify-content-center">
            {/* 登入錯誤訊息 */}
            {errmsg?
            <div className="col-md-8 mb-3">
              <div className="alert-danger px-3 py-1">
                <i className="fas fa-exclamation-circle"></i> 帳號或密碼輸入錯誤，請重新輸入！
              </div>
            </div> :false
            }
            <div className="col-md-8">
              <form className="bg-light p-5 contact-form " onSubmit={loginClicked}>
                <div className="form-group row">
                  <label htmlFor="mbrID" className="col-sm-3 py-2 ion-ios-person font-weight-bold h5"> 會員帳號</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control form-control-lg" id="mbrID" value={username}
                      onChange={e => setusername(e.target.value)} />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="mbrPWD" className="col-sm-3 py-2 ion-ios-lock font-weight-bold h5"> 會員密碼</label>
                  <div className="col-sm-9">
                    <input type="password" className="form-control form-control-lg"
                      id="mbrPWD" value={password} onChange={e => setpassword(e.target.value)} />
                  </div>
                </div>
                <div className="form-group text-center mt-4">
                  <Link to='/register' className="btn btn-primary py-2 px-5 mr-1">加入會員</Link>
                  <input type="submit" value="確認登入" className="btn btn-danger py-2 px-5" />
                </div>
              </form>

            </div>
          </div>
        </div>
      </section>

    </>
  )

}

export default Login;