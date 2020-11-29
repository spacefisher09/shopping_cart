import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../layouts/breadcrumbs'
import { BrdcrbConsumer } from '../../index'
import HeadTitle from '../layouts/HeadTitle'


const pg_title = '會員基本資料管理及訂單相關';

function MbrIndex() {
    return (
        <>
            <BrdcrbConsumer>
                {(context) => {
                    return <Breadcrumbs urlList={context.MbrIndex} pg_title={pg_title} />
                }}
            </BrdcrbConsumer>

            <section className="ftco-section">

                <HeadTitle EngTitle="member" HdTitle="會 員 專 區"/>
                
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