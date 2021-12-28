import React,{useEffect,useState}  from "react";
import { Fragment } from "react";
import {Header,Footer,Spinner} from '../../component'
import { ImageDefault, Product1,Product2,Product3,Product4 } from "../../assets";
import API from '../../services'
import { useHistory } from 'react-router-dom';
import { Source } from '../../services/Config';
import { Rupiah } from '../../helper/Rupiah';

const Product=()=>{
    const history = useHistory()
    const [index, setIndex] = useState(0);
    const [products, setProducts] = useState(null)
    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
    const [loading, setLoading] = useState(true) 

    useEffect(() => {
          let isAmounted = false
          if(!isAmounted) { 
                Promise.all([API.products()])
                .then((result) => {
                      console.log(result);
                      setProducts(result[0])
                      setLoading(false)
                }).catch((e) => {
                      console.log(e);
                      setLoading(false)
                })
         }
          return () => {
                Source.cancel('home cancel axios')
                isAmounted = true;
                console.log('cancel home');
          }
    }, [])
    if(loading){
        return (
              <Spinner/>
        )
  }
    return(
        <Fragment>
            <Header/>
                <div id="sns_content" className="wrap layout-m">
                    <div className="container">
                        <div className="row">
                            <div id="sns_main" className="col-md-12 col-main">
                                <div id="sns_mainmidle">
                                    <h1 style={{textAlign: 'center', marginBottom: 30}}>
                                        <strong>Produk Minyak Belog</strong>
                                    </h1>
                                    <div className="tab-content">
                                        <div role="tabpanel" className="tab-pane active" id="home">
                                            <div className="products-grid row style_grid">
                                            {/* Start Perulangan Produk */}
                                            {products && products.map((item, index)=> {
                                                return (
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12 ">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <a href ={'/Detail/'+ item.id}>
                                                                    <div
                                                                        className="product-image have-additional"
                                                                        title="Modular Modern"
                                                                        key = {index}>
                                                                        <span className="img-main">
                                                                            <img src= {(item.img == null ? ImageDefault :( process.env.REACT_APP_BASE_URL  + String(item.img).replace('public/', '')))} alt="alt"/>
                                                                        </span>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href='/Detail' >
                                                                            {/* <span style={{whiteSpace:"nowrap",overflow:'hidden',textOverflow:'ellipsis', height:50, width:100}}></span> */}
                                                                                {item.name.length > 25 ? item.name.substr(0,22)+ "...":item.name}
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">{Rupiah(parseInt(item.price))}</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <a  href={'/Detail/' + item.id} className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </a>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links"></ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                )
                                                })}
                                            {/* End Perulangan Produk */}
                                                {/* produk minyak belog */}
                                            </div>
                                        </div>
                                        {/* <h1 style={{textAlign: 'center', marginBottom: 30} }>
                                            <strong>Paket Produk Minyak Belog</strong>
                                        </h1> */}
                                        {/* <div role="tabpanel" className="tab-pane active" id="home">
                                            <div className="products-grid row style_grid">
                                           
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src={Product4} alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Paket New Life
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">Rp 50.000</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links"></ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src={Product3} alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Paket Go Life One (GLO)
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">Rp 95.000</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links"></ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src={Product2} alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Paket Go Life Two (GLT)
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">Rp 150.000</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links"></ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src={Product1} alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Paket Grow Life Beginner (GLB)
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">Rp 235.000</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links"></ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src={Product4} alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Paket New Life
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">Rp 50.000</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links"></ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div> */}
                                        <div role="tabpanel" className="tab-pane" id="profile">
                                            <div className="products-grid row style_grid">
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/30.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                    <span className="price2">$ 600.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/29.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/28.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/27.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/26.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/25.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                    <span className="price2">$ 600.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/24.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/23.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/22.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/21.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div role="tabpanel" className="tab-pane" id="messages">
                                            <div className="products-grid row style_grid">
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/3.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                    <span className="price2">$ 600.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/5.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/7.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/9.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/11.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/13.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                    <span className="price2">$ 600.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/15.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/17.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/19.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12">
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <div className="ico-label"/>
                                                                <a
                                                                    className="product-image have-additional"
                                                                    title="Modular Modern"
                                                                    href="detail.html">
                                                                    <span className="img-main">
                                                                        <img src="images/products/21.jpg" alt="alt"/>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href="detail.html">
                                                                            Modular Modern
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">$ 540.00</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="action-bot">
                                                                <div className="wrap-addtocart">
                                                                    <button className="btn-cart" title="Add to Cart">
                                                                        <i className="fa fa-shopping-cart"/>
                                                                        <span>Add to Cart</span>
                                                                    </button>
                                                                </div>
                                                                <div className="actions">
                                                                    <ul className="add-to-links">
                                                                        <li>
                                                                            <a className="link-wishlist" href="#" title="Add to Wishlist">
                                                                                <i className="fa fa-heart"/>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="link-compare" href="#" title="Add to Compare">
                                                                                <i className="fa fa-random"/>
                                                                            </a>
                                                                        </li>
                                                                        <li className="wrap-quickview" data-id="qv_item_7">
                                                                            <div className="quickview-wrap">
                                                                                <a className="sns-btn-quickview qv_btn" href="#">
                                                                                    <i className="fa fa-eye"/>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer/>
        </Fragment>
    )
}
export default Product