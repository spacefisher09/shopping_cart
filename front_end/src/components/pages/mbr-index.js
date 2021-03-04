import React, { useState,useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Navbar from '../layouts/Navbar'
import Breadcrumbs from '../layouts/breadcrumbs'
import { BrdcrbConsumer } from '../../index'
import HeadTitle from '../layouts/HeadTitle'


const pg_title = '會員基本資料管理及訂單相關';

function MbrIndex() {
    const [token, setToken, deleteToken] = useCookies(['sc-token']);
    const [USERNAME, setUSERNAME, deleteUSERNAME] = useCookies(['username']);
     //初始設sc-token為字串undefined
     setToken('sc-token', (token['sc-token']==undefined)? 'undefined' : token['sc-token']);

    let history = useHistory();
    //初始token為字串undefined
    let [isLogin,setisLogin] = useState((token['sc-token']!=='undefined')?true:false);

    useEffect(() => {
        //檢查是否為undefined
        if(token['sc-token']=='undefined' || token['sc-token']==undefined) {
            setisLogin(false);
            //delete token為undefined值,需重新設定為初始值字串undefined
            setUSERNAME('username',undefined);
            history.push('/login');
        }
    }, [token])

    const logoutClicked = () => {
        deleteToken(['sc-token']);
        deleteToken(['username']);
    }

    return (
        <>
            <Navbar isLogin={isLogin} userName={USERNAME['username']} />
            <BrdcrbConsumer>
                {(context) => {
                    return <Breadcrumbs urlList={context.MbrIndex} pg_title={pg_title} />
                }}
            </BrdcrbConsumer>

            <section className="ftco-section">

                <HeadTitle EngTitle="member" HdTitle="會 員 專 區" />

                <div className="row m-0 justify-content-center mb-4">
                    <div className="col-12 col-md-6">
                        <button className="btn btn-lg btn-outline-dark rounded-0 border-left-0 border-right-0 w-100" type="button" onClick={logoutClicked}>
                            <i className="fas fa-sign-out-alt mr-2"></i> 登出帳號
                        </button>
                    </div>
                </div>
                <div className="row m-0 justify-content-center">
                    <div className="col-12 col-sm-6 col-md-3">
                        <Link to="/mbr-info" className="border border-info d-block w-100 rounded-lg text-info text-center py-4 h3">
                            <i className="fas fa-user-edit display-3 d-block mx-auto my-3"></i>
                            帳戶管理
                        </Link>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                        <Link to="/mbr-order-list" className="border border-info d-block w-100 rounded-lg text-info text-center py-4 h3">
                            <i className="fas fa-money-check-alt display-3 d-block mx-auto my-3"></i>
                            訂單管理
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MbrIndex;