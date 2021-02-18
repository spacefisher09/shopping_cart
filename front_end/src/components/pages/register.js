import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Navbar from '../layouts/Navbar'
import Breadcrumbs from '../layouts/breadcrumbs'
import { BrdcrbConsumer } from '../../index';
import HeadTitle from '../layouts/HeadTitle'
import { Registerform } from '../layouts/memberform'

const pg_title = '加入會員請填寫以下資料';


function Register() {
  const [token] = useCookies(['sc-token']);
  const [USERNAME] = useCookies(['username']);
  let history = useHistory();
  
  let [rgstruser, setrgstruser] = useState(false);
  const [resetClicked,setresetClicked] = useState(false);
  
  //回傳兩種表單狀況 1.清除重填(when false) 2.註冊帳密
  const rtrn_rgstrdata = intData => {
    (intData !== false)? setrgstruser(intData) : setresetClicked(intData);
  }

  //註冊會員 api
  const submitUserForm = e => {
    e.preventDefault();
    return fetch(`http://127.0.0.1:8000/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rgstruser)
    }).then(
      resp => resp.json()
    ).then(
      (resp) => {
        return (
          //檢查是否為已註冊會員帳密
          resp.username !== rgstruser['username'] ?
            ( alert(resp.username) )
            : (
              alert('會員 ' + resp.username + ' 註冊成功!'),
              history.push('/login')
            )
        )
      }
    ).catch(
      error => console.log(error)
    );
  }

  //執行清除重填
  const reset_data = () => setresetClicked(true);

  return (
    <>
      <Navbar isLogin={(token['sc-token']!=='undefined') ? true : false} userName={USERNAME['username']} />
      <BrdcrbConsumer>
        {(context) => {
          return <Breadcrumbs urlList={context.Register} pg_title={pg_title} />
        }}
      </BrdcrbConsumer>

      <section className="ftco-section container">

        <HeadTitle EngTitle="register" HdTitle="會 員 申 請" />

        <form className="px-3" onSubmit={submitUserForm}>
          <Registerform reset_data={resetClicked} rtrn_rgstrdata={rtrn_rgstrdata} />
          <div className="w-100 d-flex flex-nowrap justify-content-center mt-4">
            <button className="btn btn-warning d-inline-block W-20 w-xs-50 mr-2" onClick={reset_data} type="button">清除重填</button>
            <button className="btn btn-danger d-inline-block W-20 w-xs-50" type="submit">確認註冊</button>
          </div>
        </form>
      </section>

    </>
  )

}

export default Register;