import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import Breadcrumbs from '../layouts/breadcrumbs'
import { BrdcrbConsumer } from '../../index';
import HeadTitle from '../layouts/HeadTitle'
import Memberform from '../layouts/memberform'

import Data from '../../data';
const pg_title = '會員基本資料管理及訂單相關';


function MbrInfo() {
  let history = useHistory();
  let [userdata,setuserdata] = useState(Data.Userdata);
  let [readmode,setreadmode] = useState(true);

  const rtrn_userdata = intData =>{
     setuserdata(intData);
  }
  const submitUserForm = e =>{
    e.preventDefault();
    history.push('/mbr-index');
    //post會員資料寫於此
    console.log(userdata);
  }

  const offReadmode =()=>{
    setreadmode(false);
  }

  return (
    <>
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