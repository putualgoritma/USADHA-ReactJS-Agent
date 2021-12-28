import React, { Fragment, useEffect, useState } from 'react'
import { Footer, Header, Spinner } from '../../component'
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { ImageDefault, ImageDetail1 } from '../../assets';
import { Rupiah } from '../../helper/Rupiah';
import { useHistory, withRouter } from 'react-router';


const ItemCart = (props) => {
    const [qty, setQty] =useState(props.qty);
    // const [CART, setCART] = useState(props.cart)
    var CART = props.cart
    const [total, setTotal]= useState(props.harga * props.qty)
    const [selected, setSelected] =useState(props.selected)
    const handleQty = (type) => {
          if(type === 'MIN'){
                if(qty > 0){
                      setQty(qty - 1);
                }
          }else if( type === 'PLUSH'){
                setQty(qty + 1)
          }
    }

    const handleSelected = (value) => {
          CART.some(function (entry, i){
                if(entry.id === props.id){
                     CART[i].selected = value;
                }
                return 0;
          })
          setSelected(value)
          sessionStorage.setItem('CART', JSON.stringify(CART))
    }

    const cartDelete = () => {
          // let data = CART.find(item => item.id == props.id);
          // console.log(data);
          for (var i = 0; i < CART.length; i++) {
                if (CART[i].id === props.id) {
                      CART.splice(i, 1);
                }
          }
          sessionStorage.setItem('CART', JSON.stringify(CART))
          window.location.reload();
    }
    useEffect(() => {
          let isAmounted = false
          if(!isAmounted) {
                setTotal(props.harga * qty)
                CART.some(function (entry, i){
                      if(entry.id === props.id){
                           CART[i].qty = qty;
                      }
                      return 0;
                })
                sessionStorage.setItem('CART', JSON.stringify(CART))
         }
          return () => {
                isAmounted = true
          }
    }, [qty])

      

      return (
          <>
            <div className="col-md-6 m-0">
                <div className="row" style={{ marginLeft:'3%'}}>
                    {/* <input
                        style={{width:20, height:20,display:'inline'}
                        }
                        type='checkbox'
                        checked = {props.selectedAll ? true : (selected ? true : false)} 
                        onChange={(value) => handleSelected(value.target.checked)} /> */}
                    <img
                        src={(props.img == null ? ImageDefault : process.env.REACT_APP_BASE_URL + String(props.img).replace('public/', ''))}
                        style={{ width:240,height:180, marginLeft:'2%'}
                        }
                        alt="alt"/>
                </div>
            </div>
            <div id="product_shop" className="col-md-6 product-shop  m-0">
                <div className="item-inner product_list_style">
                    <div className="item-info">
                        <div className="item-title">
                        <br></br>
                            <a title="Modular Modern" href="detail.html">{props.namaProduct}</a>
                        </div>
                        <div className="item-price">
                            <div className="price-box">
                                <span className="regular-price">
                                    <span className="price-cart">{Rupiah(parseInt(total))}</span>
                                </span>
                            </div>
                        </div>
                        {/* <div className="desc std">
                            <h5>Description</h5>
                        </div> */}
                        <div className="actions">
                            <label className=" bx bxs-trash" htmlFor="qty" style={{fontSize:18,position:'relative',top:5}} onClick={cartDelete}>
                            </label>
                            <div className="qty-container">
                                <button
                                    className="qty-decrease"
                                    onClick={() => handleQty('MIN')}
                                    type="button"/>
                                 
                                <input
                                    id="qty"
                                    className="input-text qty"
                                    type="text"
                                    title="Qty"
                                    Value={qty}
                                    name="qty"/>
                                <button
                                    className="qty-increase"
                                    onClick={() => handleQty('PLUSH')}
                                    type="button"/>
                            </div>
                        </div>
                        <div className="addthis_native_toolbox"/>
                    </div>
                </div>
            </div>
        </>
      )
}

function Cart() {
    const history = useHistory()
    const [CART, setCART] = useState(null)
    const [total, setTotal] = useState(0)
    const [selected, setSelected] = useState(false)
    const [loading, setLoading] =  useState(true)
    useEffect(() => {
          let isAmounted = false
          if(!isAmounted) { 
             getCART()
             setLoading(false)
         }
          return () => {
                isAmounted = true;
          }
    }, [])
    
    const handleSelected = (value) => {
          CART.map((item, index) => {
                CART[index].selected = value;
                return 0;
          })
          setSelected(value)
          // console.log(CART);
    }

    const getCART = async () => {
          let data = await sessionStorage.getItem('CART')
          data = JSON.parse(data)
          setCART(data)
         if(data){
                let totalHarga = data.reduce((accum, item) => accum +( item.qty * item.harga), 0)
                setTotal(totalHarga)
         }
    }

    const deleteSelected = async () => {
          let i = 0;
          while (i < CART.length) {
                if (CART[i].selected === true) {
                  CART.splice(i, 1);
                } else {
                  ++i;
                }
           }
          let setdata = await sessionStorage.setItem('CART', JSON.stringify(CART))
          getCART()
          window.location.reload();
          
    }
    
    if(loading){
          return (
                <Spinner/>
          )
    }


      return (
            <Fragment>
                  <Header/>
<div id="sns_content" className="wrap">
    <div className="container">
        <div className="row">
            <div id="sns_main" className="col-md-12 col-main">
                <div id="sns_mainmidle">
                    <div className="blogs-page">
                        <div className="postWrapper v1">
                            <div className="post-title">
                                <h3 style={{color: 'black'}}>
                                    <strong>
                                        <a href="testimoni.html">Keranjang</a>
                                    </strong>
                                </h3>
                            </div>
                            <div>
                                <div id="sns_breadcrumbs" className="wrap">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div id="sns_titlepage"/>
                                                <div id="sns_pathway" className="clearfix">
                                                </div>
                                            </div>
                                            <hr></hr>
                                        </div>
                                    </div>
                                </div>
                                <div id="sns_content" className="wrap layout-m">
                                    <div className="container">
                                        <div className="row">
                                            <div id="sns_main" className="col-md-12 col-main">
                                                <div id="sns_mainmidle">
                                                    <div className="product-view sns-product-detail">
                                                        <div className="product-essential clearfix">

                                                            <div className="col-md-12">
                                                                <div className="row">
                                                                    <div className="col-md-9 m-0 p-0">
                                                                    {CART && CART.map((item, index) => {
                                                                        return (
                                                                            <div  key = {item.id} onClick={() => {setTimeout(function(){ getCART() }, 1000)}}>
                                                                                    <ItemCart
                                                                                    id = {item.id}
                                                                                    cart = {CART}
                                                                                    namaProduct = {item.namaProduct}
                                                                                   
                                                                                    img = {item.img}
                                                                                    harga = {parseInt(item.harga)}
                                                                                    qty = {item.qty}
                                                                                    selected = {item.selected}
                                                                                    selectedAll = {selected}
                                                                                    />
                                                                            </div>
                                                                        )
                                                                })}
                                                                    </div>
                                                                    <div
                                                                        id="product_shop"
                                                                        className="col-md-3 m-0 product-shop"
                                                                        style={{padding:25, borderRadius:5, border:'solid', borderColor:'#ffc400',}
                                                                        }>
                                                                        <div className="item-inner product_list_style">
                                                                            <div className="item-info">
                                                                                <div className="item-title">
                                                                                    <a title="Modular Modern" href="detail.html">Ringkasan Belanja</a>
                                                                                </div>
                                                                                <div className="item-price">
                                                                                    <div className="price-box">
                                                                                        <span className="regular-price">
                                                                                            <span>Total Harga({CART && CART.length} barang)</span>
                                                                                            <span className="price-cart">{Rupiah(total)}
                                                                                            </span>
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="desc std">
                                                                                    <div className="item-price">
                                                                                        <div className="price-box">
                                                                                            <span className="regular-price">
                                                                                                <span>Total Harga</span>
                                                                                                <span className="price-cart">
                                                                                                {Rupiah(total)}</span>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="actions">
                                                                                    <button className="btn-cart" title="Add to Cart" data-id="qv_item_8" onClick={CART && CART.length > 0 ? () => history.push("/checkout") : () => alert('keranjang kosong')}>
                                                                                        Checkout
                                                                                    </button>
                                                                                </div>
                                                                                <div className="addthis_native_toolbox"/>
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

export default withRouter (Cart)
