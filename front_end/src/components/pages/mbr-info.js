import React, {useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Navbar from '../layouts/Navbar'
import Breadcrumbs from '../layouts/breadcrumbs'
import { BrdcrbConsumer } from '../../index';
import HeadTitle from '../layouts/HeadTitle'
import {Memberform} from '../layouts/memberform'

const pg_title = '會員基本資料管理及訂單相關';


function MbrInfo() {
  const [token] = useCookies(['sc-token']);
  const [USERNAME, setUSERNAME] = useCookies(['username'])
  let [isLogin, setisLogin] = useState((token['sc-token'] !== 'undefined') ? true : false);

  let history = useHistory();
  let [userdata,setuserdata] = useState([]);
  let [readmode,setreadmode] = useState(true);
  //userdata
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/userdata/create_userdata/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['sc-token']}`
      },
    }).then(
      resp => resp.json()
    ).then(
      (resp) => {
        let getuser={
          'Name' : resp.Name,
          'Phone' : resp.Phone,
          'Email' : resp.Email,
          'Address' : resp.Address
        };
        setuserdata({...userdata,...getuser});
      }
    ).catch((error) => { console.log(error); history.push('/not-found-page');});
  }, [])


  const rtrn_userdata = intData =>{
     setuserdata(intData);
  }
  const submitUserForm = e =>{
    e.preventDefault();
    //post會員資料寫於此
    fetch(`${process.env.REACT_APP_API_URL}/api/userdata/create_userdata/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['sc-token']}`
      },
      body: JSON.stringify(userdata)
    }).then(
      resp => resp.json()
    ).then(
      (resp) => {
        alert(resp);
        setUSERNAME('username', userdata['Name'])
        history.push('/mbr-index');
      }
    ).catch(
      error => console.log(error)
    )
  }

  const offReadmode =()=>{
    setreadmode(false);
  }

  return (
    <>
      <Navbar isLogin={isLogin} userName={USERNAME['username']} />
      <BrdcrbConsumer>
        {(context) => {
          return <Breadcrumbs urlList={context.MbrInfo} pg_title={pg_title} />
        }}
      </BrdcrbConsumer>

      <section className="ftco-section container">

        <HeadTitle EngTitle="member" HdTitle="會 員 基 本 資 料"/>

        <form className="px-3" onSubmit={submitUserForm}>
          <Memberform  userdata={userdata} readmode={readmode} rtrn_userdata={rtrn_userdata}/>
          <div className="w-100 d-flex flex-nowrap justify-content-center mt-4">
                <button className="btn btn-warning d-inline-block W-20 w-xs-50 mr-2" type="button" onClick={offReadmode}>修改資料</button>
                <button className="btn btn-danger d-inline-block W-20 w-xs-50" type="submit">確認儲存</button>
            </div>
        </form>
      </section>
    </>
  )
}

export default MbrInfo;