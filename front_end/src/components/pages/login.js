import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import Breadcrumbs from '../layouts/breadcrumbs'
import {BrdcrbConsumer} from '../../index';

const pg_title = '請登入會員';

function Login() {
  let [username, setusername] = useState('');
  let [password, setpassword] = useState('');
  let history = useHistory();
  
  const Login = e =>{
    e.preventDefault();
    history.push('/mbr-index')
    //console.log(username+','+password)
  }

  return (
    <>
      <BrdcrbConsumer>
        {(context) => {
          return <Breadcrumbs urlList={context.Login} pg_title={pg_title}/>   
        }}
      </BrdcrbConsumer>

      <section className="ftco-section">
        <div className="container">
          <div className="row block-9 justify-content-center">
            <div className="col-md-8">
              <form className="bg-light p-5 contact-form " onSubmit={Login}>
                <div className="form-group row">
                  <label htmlFor="mbrID" className="col-sm-3 py-2 ion-ios-person font-weight-bold h5"> 會員帳號</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control form-control-lg" id="mbrID" value={username}
                     onChange={e=>setusername(e.target.value)} />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="mbrPWD" className="col-sm-3 py-2 ion-ios-lock font-weight-bold h5"> 會員密碼</label>
                  <div className="col-sm-9">
                    <input type="password" className="form-control form-control-lg" 
                    id="mbrPWD" value={password} onChange={e=>setpassword(e.target.value)}/>
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