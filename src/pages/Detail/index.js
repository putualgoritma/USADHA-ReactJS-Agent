import React,{Fragment, useEffect, useState} from "react";
import { Header,Footer,Spinner } from "../../component";
import { ImageDetail1,ImageDetail2,ImageDetail3,ImageDetail4,ImageDetail5,ImageTesti2,ImageTesti5,ImageTesti6,ImageTesti7 } from "../../assets";
import { useHistory, withRouter } from "react-router-dom";
import { Source } from '../../services/Config';
import API from '../../services'
import { Rupiah } from '../../helper/Rupiah';


function Detail(props){
    const history = useHistory()
    const [loading, setLoading] =  useState(true)
    const [product, setProduct] = useState(null)
    const [USER, setUSER] = useState(null)
    const [CART, setCART] = useState(null)
    var cartData = []

    useEffect(() => {
          let isAmounted = false
          if(!isAmounted) {
                Promise.all([API.productDetail(props.match.params.id)])
                .then(response => {
                      getUSER()
                      getCART()
                      setProduct(response[0].data)
                      setLoading(false)
                }).catch((e) => {
                      setLoading(false)
                })
         }
          return () => {
                Source.cancel('cancel axios')
                isAmounted = true
          }
    }, [])

    const getCART = async () => {
          let data = await sessionStorage.getItem('CART')
          data = JSON.parse(data)
          setCART(data)
    }

    const getUSER = async() => {
          let data = await sessionStorage.getItem('USER')
          data = JSON.parse(data)
          setUSER(data)
    }

    const handleCart = () => {
          if(!USER){
                alert('mohon login terlebih dahulu')
                history.push(`/login`)
          }else{
                if(USER.status ==='active'){
                      if(CART !== null){
                            cartData = CART
                      }
                      let penanda = false; 
                      let message = '';
                      let data ={
                            id: product.id,
                            // id_user: USER.id,
                            namaProduct: product.name,
                            harga: product.price,
                            selected: false,
                            qty: 1,
                            img : product.img,
                            note: '',
                            status: 'pending',
                      }
                      cartData.some(function (entry, i){
                            if(entry.id === product.id){
                                  penanda= true
                            }
                      })
          
                      if(!penanda){
                            cartData.push(data)
                            message = 'produk di tambahkan';
                            sessionStorage.setItem('CART', JSON.stringify(cartData))
                            // history.push(`/landing/${message}/Cart`)
                            history.push(`/Cart`)
                            // history.goBack(`/landing/${message}/home`);
                      }else{
                            alert('produk sudah ada di keranjang')
                      }
                }else{
                      alert('Mohon Activasi Terlebih Dahulu')
                      history.push('/profile')
                }
          }
    }
    if(loading){
        return (
              <Spinner/>
        )
  }
  
    return(
        <Fragment>
            <Header/>
            <div>
                <div id="sns_breadcrumbs" className="wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div id="sns_titlepage"/>
                                <div id="sns_pathway" className="clearfix">
                                    <div className="pathway-inner">
                                        <span className="icon-pointer "/>
                                        <ul className="breadcrumbs">
                                            <li className="home">
                                                <a title="Go to Home Page" href="#">
                                                    <i className="fa fa-home"/>
                                                    <span>Home</span>
                                                </a>
                                            </li>
                                            <li className="category3 last">
                                                <span>Modular Modern</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
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
                                            <div className="row row-img">
                                                <div className="product-img-box col-md-4 col-sm-5">
                                                    <div className="detail-img">
                                                        <img src={(product.img == null ? ImageDetail1 : process.env.REACT_APP_BASE_URL + String(product.img).replace('public/', ''))}alt="alt"/>
                                                    </div>
                                                </div>
                                                <div id="product_shop" className="product-shop col-md-8 col-sm-7">
                                                    <div className="item-inner product_list_style">
                                                        <div className="item-info">
                                                            <div className="item-title">
                                                                <a title="Modular Modern" href="detail.html">{product.name}</a>
                                                            </div>
                                                            <div className="item-price">
                                                                <div className="price-box">
                                                                    <span className="regular-price">
                                                                        <span className="price">{Rupiah(parseInt(product.price))}</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="availability">
                                                                <p className="style1">Availability: In stock</p>
                                                            </div>
                                                            <div className="rating-block">
                                                                <div className="ratings">
                                                                    <div className="rating-box">
                                                                        <div className="rating" style={{width: '100%'}}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="desc std">
                                                                <h5>{product.description}</h5>
                                                            </div>
                                                            <div className="actions">
                                                                {/* <label className="gfont" htmlFor="qty">Qty :
                                                                </label>
                                                                <div className="qty-container">
                                                                    <button
                                                                        className="qty-decrease"
                                                                        onclick="var qty_el = document.getElementById('qty'); var qty = qty_el.value; if( !isNaN( qty ) && qty > 1 ) qty_el.value--;return false;"
                                                                        type="button"/>
                                                                    <input
                                                                        id="qty"
                                                                        className="input-text qty"
                                                                        type="text"
                                                                        title="Qty"
                                                                        defaultValue={1}
                                                                        name="qty"/>
                                                                    <button
                                                                        className="qty-increase"
                                                                        onclick="var qty_el = document.getElementById('qty'); var qty = qty_el.value; if( !isNaN( qty )) qty_el.value++;return false;"
                                                                        type="button"/>
                                                                </div> */}
                                                                <button className="btn-cart" title="Add to Cart" data-id="qv_item_8" onClick={() => handleCart()}>
                                                                    Add to Cart
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
                        <div className="bottom row">
                            <div className="2coloum-left">
                                <div id="sns_mainm" className="col-md-12">
                                    <div id="sns_description" className="description">
                                        <div className="sns_producttaps_wraps1">
                                            <h3 className="detail-none">Description
                                                <i className="fa fa-align-justify"/>
                                            </h3>
                                            {/* Nav tabs */}
                                            <ul className="nav nav-tabs" role="tablist">
                                                <li role="presentation" className="active style-detail">
                                                    <a href="#home" aria-controls="home" role="tab" data-toggle="tab">Deskripsi Produk</a>
                                                </li>
                                                {/* <li role="presentation" className="style-detail">
                                                    <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Testimoni</a>
                                                </li>
                                                <li role="presentation" className="style-detail">
                                                    <a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Artikel Terkait</a>
                                                </li>
                                                <li role="presentation" className="style-detail">
                                                    <a href="#video" aria-controls="video" role="tab" data-toggle="tab">Video</a>
                                                </li> */}
                                            </ul>
                                            {/* Tab panes */}
                                            <div className="tab-content">
                                                <div role="tabpanel" className="tab-pane active" id="home">
                                                    <div className="style1">
                                                        <p className="top">
                                                            {/* <strong>Khasiat :
                                                            </strong> */}
                                                            {/* <br/> */}
                                                            <strong>{product.description}</strong>
                                                        </p>
                                                        {/* <p className="mid">
                                                            <strong>Cara Penggunaan :</strong>
                                                            <br/>Teteskan dan oleskan pada bagian yang sakit, atau balurkan pada tulang
                                                                punggung dari leher sampai tulang ekor, serta pada bagian dada setiap malam
                                                                menjelang tidur.</p>
                                                        <p className="bot">
                                                            <strong>Bahan Baku:</strong><br/>
                                                            Oleoum Syzgli : 2,4%
                                                            <br/>
                                                            Oleoum Cymbopogis : 2,4%
                                                            <br/>
                                                            Rawalfia Serpentine Cortex : 10%
                                                            <br/>
                                                            Messua Ferrea Frutus : 10%
                                                            <br/>
                                                        </p> */}
                                                    </div>
                                                </div>
                                                <div role="tabpanel" className="tab-pane" id="profile">
                                                    <div className="collateral-box">
                                                        <div className="style1">
                                                            <p className="top">
                                                                “Minyak Belog ini saya coba untuk dioleskan pada yang sakit, ternyata Minyak
                                                                Belog ini sangat manjur sekali memang”<br/>
                                                                <strong>
                                                                    I Gusti Putu Suartika, Kesemutan dan sakit pinggang</strong><br/>
                                                            </p>
                                                            <p className="top">
                                                                “Kaki saya yang hampir delapan bulan tidak bisa jalan akhirnya dengan Minyak
                                                                Belog, ini saya dapat berjalan seperti biasa”
                                                                <br/>
                                                                <strong>
                                                                    Mastrini Erawati, Tidak dapat berjalan</strong>
                                                            </p>
                                                            <p className="top">
                                                                <a href="https://youtube.com">
                                                                    <strong>
                                                                        Testimoni Lainnya
                                                                    </strong>
                                                                </a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div role="tabpanel" className="tab-pane" id="messages">
                                                    <div className="collateral-box">
                                                        <img
                                                            alt="alt"
                                                            src={ImageDetail2}
                                                            style={{marginTop: 5, width: 240, height: 180}
                                                            }/>
                                                        <img
                                                            alt="alt"
                                                            src={ImageDetail3}
                                                            style={{marginTop: 5, width: 240, height: 180}
                                                            }/>
                                                        <img
                                                            alt="alt"
                                                            src={ImageDetail4}
                                                            style={{marginTop: 5, width: 240, height: 180}
                                                            }/>
                                                        <img
                                                            alt="alt"
                                                            src={ImageDetail5}
                                                            style={{marginTop: 5, width: 240, height: 180}
                                                            }/>
                                                    </div>
                                                </div>
                                                <div role="tabpanel" className="tab-pane" id="video">
                                                    <div className="collateral-box">
                                                        <a href="https://www.youtube.com/watch?v=A0fsA2kcA8g">
                                                            <img
                                                                alt="Video testimoni"
                                                                src={ImageTesti2}
                                                                style={{marginTop: 5, width: 240, height: 180}
                                                                }/></a>
                                                        <a href="https://www.youtube.com/watch?v=yikULoDfutw">
                                                            <img
                                                                alt="Video testimoni"
                                                                src={ImageTesti5}
                                                                style={{marginTop: 5, width: 240, height: 180}
                                                                }/></a>
                                                        <a href="https://www.youtube.com/watch?v=tXbQvvEINH0">
                                                            <img
                                                                alt="Video testimoni"
                                                                src={ImageTesti6}
                                                                style={{marginTop: 5, width: 240, height: 180}
                                                                }/></a>
                                                        <a href="https://www.youtube.com/watch?v=6F3r1Sl9D0k&t=1s">
                                                            <img
                                                                alt="Video testimoni"
                                                                src={ImageTesti7}
                                                                style={{marginTop: 5, width: 240, height: 180}
                                                                }/></a>
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
export default withRouter(Detail)