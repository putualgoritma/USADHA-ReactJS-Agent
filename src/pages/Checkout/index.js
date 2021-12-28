import React, { Fragment, useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { useHistory, withRouter } from 'react-router';
import { ImageDefault } from '../../assets';
import { Footer, Header, Spinner } from '../../component';
import { Rupiah } from '../../helper/Rupiah';
import API from '../../services';
import { Source } from '../../services/Config';



const ItemCart =(props) => {
      var total = useState(props.harga * props.qty)
      return (
        <>
        <div className="col-md-6 m-0">
            <div className="row" style={{ marginLeft:'3%'}}>
                <img
                    src={(props.img === null ? ImageDefault : process.env.REACT_APP_BASE_URL +String(props.img).replace('public/', ''))}
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
                    <span>Jumlah</span>
                        <div className="qty-container">
                            
                            <input
                                id="qty"
                                className="input-text qty"
                                type="text"
                                title="Qty"
                                Value={props.qty}
                                name="qty"/>
                        </div>
                    </div>
                    <div className="addthis_native_toolbox"/>
                </div>
            </div>
        </div>
    </>
      )
}


function Checkout(props) {
      const history = useHistory()
      const [USER, setUSER] = useState(null);
    //   const [agen, setAgen] = useState(null)
      const [loading, setLoading] = useState(true);
      const [point, setPoint] = useState(0);
      const [CART, setCART] = useState(props.cart)
      const [total, setTotal]= useState(props.harga * props.qty)
      const [TOKEN, setTOKEN] = useState(null)
      const dateRegister = () => {
           var todayTime = new Date();
           var month = todayTime.getMonth() + 1;
           var day = todayTime.getDate();
           var year = todayTime.getFullYear();
           return year + "-" + month + "-" + day;
     }
      const [orders, setOrders] = useState({
            register: dateRegister(),
            customers_id: null,
            memo: "",
            // agents_id : props.match.params.id,
            cart: null,
       });
      

      useEffect( () => {
            let isAmounted = false
            if(!isAmounted) { 
                  Promise.all([getUSER(), getTOKEN(), getCART()]).then((res) => {
                        let userData = res[0];
                        let tokenData = res[1]
                        let cartData = res[2]

                      if(userData && tokenData !==null){
                              setOrders({
                                    ...orders,
                                    customers_id : userData.id,
                                    cart : cartData
                              })
                              Promise.all([API.point(userData.id, tokenData)]) 
                              .then((result) => { 
                                    console.log(result);
                                    setPoint(parseInt(result[0].data[0].balance_points))
                                    // setAgen(result[1].data)
                                    setLoading(false) 
                              }).catch((e) => {
                                    console.log(e.request);
                                    setLoading(false)
                              })
                      }else{
                        alert('mohon login terlebih dahulu')
                        history.push('/login')
                      }
                  });
           }
            return () => {
                  Source.cancel('cancel api')
                  isAmounted = true;
            }
      }, [])

      const getUSER = async () => {
            let data =  await sessionStorage.getItem('USER')
            data = JSON.parse(data)
            setUSER( data)
            return data;
      }
      const getTOKEN =  async () => {
            let data =  await sessionStorage.getItem('TOKEN')
            data = JSON.parse(data)
            setTOKEN( data)
            return data;
      }
      const getCART = async () => {
            let data = await sessionStorage.getItem('CART')
            data = JSON.parse(data)
            if(data){
                  setCART(data)
                  let cart = [];
                  data.map((item) => {
                        cart[cart.length] = {
                              products_id : item.id,
                              price : item.harga,
                              quantity : item.qty,
                        } 
                        return 0;
                  })

                  let totalHarga = data.reduce((accum, item) => accum +( item.qty * item.harga), 0)
                  setTotal(totalHarga)
                  return cart;
           }
      }
      
      const handleCheckout = () => {
            if(USER.status !== 'active'){
                  alert('mohon lakukan activasi dahulu')
            }else{
                  if(point >= total){
                       if(orders.register !== null && orders.customers_id !== null  && orders.cart){
                              setLoading(true)
                              API.orderagent(orders, TOKEN).then((result) => {
                                   console.log('tes',result)
                                   sessionStorage.removeItem('CART')
                                //    history.push(`/landing/checkout sukses/home`)
                                     history.push('/HistoryOrder')
                                   setLoading(false)
                              }).catch((e) => {
                                    console.log(e.request)
                                    setLoading(false)
                              })
                        }else{
                              alert('data order tidak lengkap ')
                        }
                  }else{
                        alert('point tidak cukup')
                  }
            }
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
                                        <a href="testimoni.html">Complate Order</a>
                                    </strong>
                                </h3>
                            </div>
                            <div>
                                <div id="sns_breadcrumbs" className="wrap">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div id="sns_titlepage"/>
                                               
                                            </div>
                                          
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
                                                                                            <span>Agen : </span>
                                                                                            {/* <span className="price-cart">{agen.name}
                                                                                            </span> */}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="item-price">
                                                                                    <div className="price-box">
                                                                                        <span className="regular-price">
                                                                                            <span>Total Harga({CART && CART.length} barang) : </span>
                                                                                            <span className="price-cart">{Rupiah(total)}
                                                                                            </span>
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="desc std">
                                                                                    <div className="item-price">
                                                                                        <div className="price-box">
                                                                                            <span className="regular-price">
                                                                                                <span>Total Harga : </span>
                                                                                                <span className="price-cart">
                                                                                                {Rupiah(total)}</span>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="actions">
                                                                                    <button className="btn-cart" title="Add to Cart" data-id="qv_item_8"  onClick={() => {if(window.confirm('Checkout sekarang ?')){handleCheckout()};}}>
                                                                                        Buat Pesanan
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

export default withRouter(Checkout) 
