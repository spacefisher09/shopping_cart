import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import HeadTitle from '../layouts/HeadTitle';


function Product_item(props) {
    
    const [pdctList,setpdctList] = useState(props.children);
    useEffect(()=>{
        setpdctList(props.children);
    },[props]);

    const items = pdctList.map(
        (arr,index) => {
            return (
                <div className="col-md-4" key={index}>
                    <div className="property-wrap">
                        <span className="img overflow-hidden d-flex justify-content-center align-items-start">
                            <img referrerPolicy="no-referrer" src={arr.pdct_img} alt="" className="img-fluid" style={{width:`90%`,maxHeight:`100%`,maxWidth:`400px`}}/>
                        </span>
                        <div className="text">
                            <p className="price font-weight-bold"><span className="orig-price text-danger">$ {arr.pdct_price} 元 <small className="ml-2">{arr.pdct_amount}</small></span></p>
                            <h3 className="font-weight-bold">{arr.pdct_name}</h3>
                            {props.isLogin ?
                                <label className="btn-custom text-dark mb-0" htmlFor={`tea${arr.id}`}>
                                    <input type="checkbox" id={`tea${arr.id}`} value={`${arr.id},0`} name="teaGroup" onChange={props.checkItem}/> 加入購物車
                              </label>
                                : <Link to="#" className="btn-custom ion-ios-cart text-dark" onClick={props.modal}> 加入購物車</Link>}
                        </div>
                    </div>
                </div>
            )
        })

    return (
        <div className="row mb-5" key={props.t_type}>
            <HeadTitle EngTitle="category" HdTitle={`${props.t_Type} 系 列`}/>
            {items}
        </div>

    )
}

export default Product_item;