import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Breadcrumbs from '../layouts/breadcrumbs'
import { BrdcrbConsumer } from '../../index';
import HeadTitle from '../layouts/HeadTitle'
import Memberform from '../layouts/memberform'

const pg_title = '加入會員請填寫以下資料';


function Register() {
  let history = useHistory();
  let [userdata,setuserdata] = useState(false);
  const rtrn_userdata = intData =>{
     setuserdata(intData);
  }

  const submitUserForm = e =>{
    e.preventDefault();
    //history.push('/login');
    //post會員資料寫於此
    console.log(userdata);
  }

  return (
    <>
      <BrdcrbConsumer>
        {(context) => {
          return <Breadcrumbs urlList={context.Register} pg_title={pg_title} />
        }}
      </BrdcrbConsumer>

      <section className="ftco-section container">
    
        <HeadTitle EngTitle="register" HdTitle="會 員 申 請"/>

        <form className="px-3" onSubmit={submitUserForm}>
          <Memberform  userdata={false} readmode={false} rtrn_userdata={rtrn_userdata}/>
          <div className="w-100 d-flex flex-nowrap justify-content-center mt-4">
            <button className="btn btn-warning d-inline-block W-20 w-xs-50 mr-2" type="reset">清除重填</button>
            <button className="btn btn-danger d-inline-block W-20 w-xs-50" type="submit">確認送出</button>
          </div>
        </form>
      </section>

    </>
  )

}

export default Register;