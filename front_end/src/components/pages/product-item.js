import React,{useState,useEffect} from 'react';
import { ReactComponent as Loader } from '../../loader.svg'
import { Link } from 'react-router-dom';
import HeadTitle from '../layouts/HeadTitle';
//waypoint plugin
import { Waypoint } from 'react-waypoint';
//slick plugin
import Slider from "react-slick";


function Product_item(props) {
    
    const [pdctList,setpdctList] = useState(props.children);
    useEffect(()=>{
        setpdctList(props.children);
        setloaderClass(props.children.length>0? "ftco-loader fullscreen" : loaderClass);
    },[props]);

    const [loaderClass, setloaderClass] = useState("ftco-loader fullscreen show");
    const [animaClass, setanimaClass] = useState("property-wrap ftco-animate"); 
    
    const scrollanima = () =>{
        setTimeout(() => {
            setanimaClass("property-wrap ftco-animate fadeInUp ftco-animated");
        }, 150);
    }
    var settings = {
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        dots: true,
        responsive: [{
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 600,
            settings: {
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true
            }
        }]
    };

    const items = pdctList.map(
        (arr,index) => {
            return (
                <div className="js-slider-item" key={index}>
                    <div className={animaClass}>
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
        <div className="mb-5 position-relative" key={props.t_type}>
            <HeadTitle EngTitle="category" HdTitle={`${props.t_Type} 系 列`}/>
            <Waypoint onEnter={scrollanima} bottomOffset='100px'/>
            <Slider {...settings}>
                {items}
            </Slider>
            {/* 資料讀取顯示 */}
            <div className={loaderClass}><Loader></Loader></div>
        </div>

    )
}

export default Product_item;