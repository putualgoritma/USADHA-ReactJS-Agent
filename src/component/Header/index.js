import React, { Fragment,useEffect,useState } from 'react';
import { Logo, Product8 } from '../../assets';
import { useHistory } from 'react-router';
import API from '../../services'
import { Rupiah } from '../../helper/Rupiah';
import {Spinner} from '../../component'
import {Footer} from '../index';
import Sidebar from 'react-sidebar';

const ItemSideBar = (props) => {
    return (
     <div className="sidebar active" style={{zIndex:2, overflowX: 'auto'}}>
        {/* <i className="bx bxs-grid-alt" id="btn" /> */}
        {props.close}
        <ul className="nav_list ">
          {/* <li>
            <a href='./Login'>
              <i className="bx bxs-user bx-md" /> 
              <span className="links_name">Login</span>
            </a>
          </li> */}
          {props.login}
          {props.myAccount}
          <hr className="new5" />
          <li>
            <a>
              <i className="bx bx-money bx-md" />
              <span className="links_name">Saldo Point :   <span style={{color:'red'}}>{Rupiah(props.point)} </span></span>
              </a>
          </li>
          <li>
            <a href="/Stok">
              <i className="bx bxs-box" />
              <span className="links_name">Stok</span>
            </a>
          </li>
          <li>
            <a href="/TopUp">
              <i className="bx bxs-hand-up" />
              <span className="links_name">Top Up</span>
            </a>
          </li>
          <li>
            <a href="/Transfer">
              <i className="bx bx-transfer" />
              <span className="links_name">Transfer</span>
            </a>
          </li>
          <li>
            <a href="/Withdraw">
              <i className="bx bxs-dollar-circle" />
              <span className="links_name">Withdraw</span>
            </a>
          </li>
          {/* <li>
            <a href="/RegisterDownline">
              <i className="bx bxs-registered" />
              <span className="links_name">Register Downline</span>
            </a>
          </li> */}
          {/* <li>
            <a href="/Downline">
              <i className="bx bxs-chevron-down-square" />
              <span className="links_name">Mitra Langsung</span>
            </a>
          </li> */}
          <li>
            <a href="/InfoBank">
              <i className="bx bxs-bank" />
              <span className="links_name">Info Bank</span>
            </a>
          </li>
          <li>
            <a href="/HistoryIn">
              <i className="bx bx-history" />
              <span className="links_name">History Masuk</span>
            </a>
          </li>
          <li>
            <a href="/HistoryPoint">
              <i className="bx bx-history" />
              <span className="links_name">History Point</span>
            </a>
          </li>
          <li>
            <a href="/HistoryOrder">
              <i className="bx bx-history" />
              <span className="links_name">History Order</span>
            </a>
          </li>
          {props.logout}
        </ul>
      </div>
    )
}

const ItemSideBarRes = (props) => {
    return (
     <div className="sidebar active sidebarRes " style={{zIndex:3, overflowX: 'auto', backgroundColor: '#222', color:'white'}}>
        {props.close}
        <ul className="nav_list ">
      
          <li>
            <a href="/">
              <span className="links_name" style={{padding:8}}>Home</span>
            </a>
          </li>
          <li>
            <a href="/About">
              <span className="links_name" style={{padding:8}}>Tentang</span>
            </a>
          </li>
          <li>
            <a href="/Product">
              <span className="links_name" style={{padding:8}}>Produk</span>
            </a>
          </li>
          <li>
            <a href="/Testimoni">
              <span className="links_name" style={{padding:8}}>Testimoni</span>
            </a>
          </li>
          <li>
            <a href="/Contact">
              <span className="links_name" style={{padding:8}}>Contact</span>
            </a>
          </li>
          <li>
            <a href="/">
              <span className="links_name"style={{padding:8}} >Gabung Komunitas</span>
            </a>
          </li>
        </ul>
      </div>
    )
}

const Header = (props)=>{

    const [USER, setUSER] = useState(null)
    const [select, setSelect] = useState('home');
    const [lengthCart, setLengthCart] = useState(0)
    const currentURL = window.location.pathname;
    const history = useHistory()
    const [loading, setLoading] = useState(false);
    const width  = window.innerWidth;
    const [point, setPoint] = useState(0)
    const [sideBar, setSideBar] = useState(false)
    const [sideBarRes, setSideBarRes] = useState(false)
    useEffect(() => {
          let isAmounted = false
          if(!isAmounted) { 
                Promise.all([getUSER(), getTOKEN(), getCART()]).then((res) => {
                      let userData = res[0];
                      let tokenData = res[1]

                      if(userData!== null && tokenData !==null){
                            Promise.all([API.point(userData.id, tokenData)]) 
                            .then((result) => { 
                                  let memberData = [];
                                  result[0].data.map((item, index) => {
                                        memberData[memberData.length] ={
                                              label : `${item.name} (${item.code})`,
                                              value : item.id,
                                        }
                                  })
                                  setPoint(parseInt(result[0].data[0].balance_points))
                            }).catch((e) => {
                                  console.log(e);
                                  setLoading(false)
                             })
                      }else{
                            console.log('belum login');
                      }
                });
                
         }
          return () => {
                isAmounted = true;
          }
    }, [])

    const getUSER = () => {
          let data =  sessionStorage.getItem('USER')
          data = JSON.parse(data)
          setUSER(data)
          return data;
          
    }

    const getCART = async () => {
          let data = await sessionStorage.getItem('CART')
          data = JSON.parse(data)
          if(data){
                setLengthCart(data.length)
         }
    }

    const getTOKEN =  () => {
          let data =  sessionStorage.getItem('TOKEN')
          data = JSON.parse(data)
          return data;
          
    }

    const logout = () => {
          setLoading(true)
          Promise.all([sessionStorage.removeItem('USER'),  sessionStorage.removeItem('TOKEN')]).then((result) => {
                setTimeout(function () {
                      setLoading(false)
                      history.push('/login')
                    //   history.goBack('/login')
                  }, 2000); 
          }).catch((e) => {
                setLoading(false)
                alert('logout failed')
          })  
    }

    const myAccount = () => {
        if(!USER){
            alert('mohon login terlebih dahulu')
            history.push(`/login`)
        }else{
            history.push(`/Profile`)
        }
    }
    
    if(loading){
          return (
                <Spinner/>
          )
    }
    return (
      <Fragment>


            <div id="bd"className=" cms-index-index4 header-style4 prd-detail cms-simen-home-page-v2 default cmspage">
                <div id="sns_wrapper">
                    {/* HEADER */}
                    <div id="sns_header" className="wrap">
                        {/* Header Top */}
                        <div className="sns_header_top">
                            <div className="container">
                                <div className="sns_module">
                                    <div className="header-setting">
                                        <div className="module-setting">
                                            
                                        </div>
                                    </div>
                                    
                                    <div className="header-account">
                                        <div className="myaccount">
                                            <div className="tongle">
                                                <i className="fa fa-user"></i>
                                                {USER &&
                                                    <span onClick={() =>setSideBar(true) & setSideBarRes(false)} style={{cursor:'pointer'}}>My Account</span>
                                                }
                                                 {!USER &&
                                                 <span onClick={() => setSideBar(true)  & setSideBarRes(false)} style={{cursor:'pointer'}}>Login</span>
                                                }
                                            </div>
                                            {width >= 600 &&
                                            <div className="customer-ct content">
                                                <ul className="links">
                                                    {USER &&
                                                    <li className="first">
                                                         <a className="top-link-myaccount" title="My Account" onClick={() =>setSideBar(true) & setSideBarRes(false)} style={{cursor:'pointer'}}>My Account</a>
                                                    </li>
                                                    }
                                                    {!USER &&
                                                    <li className=" last">
                                                        <a className="top-link-login" title="Log In" onClick={() => setSideBar(true)  & setSideBarRes(false)} style={{cursor:'pointer'}}>Login</a>
                                                    </li>
                                                    }
                                                </ul>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Header Logo */}
                        <div id="sns_header_logo">
                            <div className="container">
                                <div className="container_in">
                                    <div className="row">
                                        <h1 id="logo" className="responsv col-md-3">
                                            <a title="Magento Commerce">
                                                <img alt="alt" src={Logo}/>
                                            </a>
                                        </h1>
                                        <div className="col-md-9 policy">
                                            <div className="row">
                                                <div className="col-md-4 col-sm-4 col-phone-12">
                                                    <div className="policy_custom">
                                                        <div className="policy-icon">
                                                            <em className="fa fa-truck"></em>
                                                        </div>
                                                        <p className="policy-titile">100% Produk alami</p>
                                                        <p className="policy-ct">Produk yang kami tawarkan 100% berasal dari alam</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4 col-phone-12">
                                                    <div className="policy_custom">
                                                        <div className="policy-icon">
                                                            <em className="fa fa-cloud-upload"></em>
                                                        </div>
                                                        <p className="policy-titile">Pengiriman cepat</p>
                                                        <p className="policy-ct">Dengan menggunakan sistem agen, pengiriman dapat cepat</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4 col-phone-12">
                                                    <div className="policy_custom">
                                                        <div className="policy-icon">
                                                            <em className="fa fa-gift"></em>
                                                        </div>
                                                        <p className="policy-titile">Konsultasi dokter</p>
                                                        <p className="policy-ct">Anda bisa konsultasi dengan dokter secara gratis</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Menu */}
                        <div id="sns_menu">
                            <div className="container">
                                <div className="sns_mainmenu">
                                    <div id="sns_mainnav">
                                        <div id="sns_custommenu" className="visible-md visible-lg">
                                            <ul className="mainnav">
                                                <li className="level0 custom-item active">
                                                    <a className="menu-title-lv0 pd-menu116" href='/' target="_self">
                                                        <span className="title">Home</span>
                                                    </a>
                                                </li>
                                                <li className="level0 custom-item">
                                                    <a className=" menu-title-lv0" href='/About'>
                                                        <span className="title">Tentang</span>
                                                    </a>
                                                </li>
                                                <li className="level0 custom-item">
                                                    <a className=" menu-title-lv0" href='/Product'>
                                                        <span className="title">Produk</span>
                                                    </a>
                                                </li>
                                                <li className="level0 custom-item">
                                                    <a className="menu-title-lv0" href='/Testimoni'>
                                                        <span className="title">Testimoni</span>
                                                    </a>
                                                </li>
                                                <li className="level0 custom-item">
                                                    <a className="menu-title-lv0" href='/Contact'>
                                                        <span className="title">Contact</span>
                                                    </a>
                                                </li>
                                                <li className="level0 custom-item">
                                                    <a className="menu-title-lv0" href='/'>
                                                        <span className="title">Gabung Komunitas</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div id="sns_mommenu" className="menu-offcanvas hidden-md hidden-lg">
                                            <span
                                                className="btn2 btn-navbar leftsidebar"
                                                style={{display: 'inline-block'}
                                                }>
                                                <i className="fa fa-align-left"/>
                                                <span className="overlay"/>
                                            </span>
                                            <span className="btn2 btn-navbar offcanvas">
                                                <a onClick={() => setSideBarRes(true)  & setSideBar(false)} style={{cursor:'pointer'}}>
                                                    <i className="fa fa-align-justify"/>
                                                </a>
                                            </span>
                                            {/* <div id="menu_offcanvas" className="offcanvas">
                                                <ul className="mainnav">
                                                    <li className="level0 nav-5 first active">
                                                        <div className="accr_header">
                                                            <a className=" menu-title-lv0" href="index.html">
                                                                <span>
                                                                    <strong>Home</strong>
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li className="level0 nav-5 first active">
                                                        <div className="accr_header">
                                                            <a className=" menu-title-lv0" href='/About'>
                                                                <span>
                                                                    <strong>Tentang</strong>
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li className="level0 nav-5 first active">
                                                        <div className="accr_header">
                                                            <a className=" menu-title-lv0" href='/Product'>
                                                                <span>
                                                                    <strong>Produk</strong>
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li className="level0 nav-5 first active">
                                                        <div className="accr_header">
                                                            <a className=" menu-title-lv0" href='/Testimoni'>
                                                                <span>
                                                                    <strong>Testimoni</strong>
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li className="level0 nav-5 first active">
                                                        <div className="accr_header">
                                                            <a className=" menu-title-lv0" href='/Contact'>
                                                                <span>
                                                                    <strong>Contact</strong>
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="sns_menu_right">
                                        <div className="block_topsearch">
                                            <div className="top-cart">
                                                <div className="mycart mini-cart">
                                                    <div className="block-minicart">
                                                        <div className="tongle">
                                                        <a href='/Cart'>
                                                            <i className="fa fa-shopping-cart"/>
                                                            <div className="summary">
                                                                <span className="amount">
                        
                                                                        <span>{lengthCart}</span>
                                                                        ( items )
                                                                    
                                                                </span>
                                                            </div>
                                                            </a>
                                                        </div>
                                                        {/* <div className="block-content content">
                                                            <div className="block-inner">
                                                                <ol id="cart-sidebar" className="mini-products-list"> */}
                                                                    {/* Start Perulangan */}
                                                                    {/* <li className="item odd">
                                                                        <a className="product-image" title="Modular Modern" href="detail.html">
                                                                            <img alt="alt" src={Product8}/>
                                                                        </a>
                                                                        <div className="product-details">
                                                                            <a
                                                                                className="btn-remove"
                                                                                onclick="return confirm('Are you sure you would like to remove this item from the shopping cart?');"
                                                                                title="Remove This Item"
                                                                                href="#">Remove This Item</a>
                                                                            <a className="btn-edit" title="Edit item" href="#">Edit item</a>
                                                                            <p className="product-name">
                                                                                <a href="detail.html">Modular Modern</a>
                                                                            </p>
                                                                            <span className="price">$ 540.00</span>
                                                                        </div>
                                                                    </li> */}
                                                                    {/* End Perulangan */}
                                                                {/* </ol>
                                                                <p className="cart-subtotal">
                                                                    <span className="label">Total:</span>
                                                                    <span className="price">$ 540.00</span>
                                                                </p>
                                                                <div className="actions">
                                                                    <a className="button">
                                                                        <span>
                                                                            <span>Check out</span>
                                                                        </span>
                                                                    </a>
                                                                    <a className="button gfont go-to-cart" href="./Cart">Go to cart</a>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {props.carousel}
                     </div>
                </div>    
            </div>
                <Sidebar
                         sidebar={<ItemSideBar
                            close = {<div onClick={() =>setSideBar(false)}  style={{cursor:'pointer', left:'35%', position:'relative'}} className="text-center">
                                        <i className="fa fa-times" style={{color:'white',}}>
                                            <div className="center" style={{fontSize:14}}>Close</div>
                                        </i>
                                    </div>
                                    }
                            login ={!USER &&
                                <li>
                                    <a href='./Login'>
                                    <i className="bx bxs-user bx-md" /> 
                                    <span className="links_name">Login</span>
                                    </a>
                                </li>
                            }
                    myAccount={USER &&
                                <li>
                                    <a onClick={()=>myAccount()}>
                                    <i className="bx bxs-user bx-md" /> 
                                    <span className="links_name">My Account</span>
                                    </a>
                                </li>
                            }

                    logout ={USER &&
                                <li>
                                    <a onClick={() => logout()}>
                                    <i className="bx bxs-log-out" />
                                    <span className="links_name" >Logout</span>
                                    </a>
                                </li>
                             }
                    point = {point && point}
                                      
                                    />}
                         open={sideBar}
                        //  docked={sideBar}
                         onSetOpen={setSideBar}

                        styles={{sidebar: { background: "none", width: (width <= 415 ? '100%' : '19%') , position: "fixed"}, root : {height:'100%',  }}}
                  >
                  </Sidebar>
                  <Sidebar
                         sidebar={<ItemSideBarRes
                                        close = {<div onClick={() =>setSideBarRes(false)}  style={{cursor:'pointer', left:'35%', position:'relative'}} className="text-center">
                                                    <i className="fa fa-times" style={{color:'white',}}>
                                                        <div className="center" style={{fontSize:14}}>Close</div>
                                                    </i>
                                                </div>
                                                }
                                        />}
                         open={sideBarRes}
                        //  docked={sideBar}
                         onSetOpen={setSideBarRes}
                        styles={{sidebar: { background: "none",width: (width <= 415 ? '100%' : '19%') , position: "fixed"}, root : {height:'100%',  }}}
                  >
                  </Sidebar>

      </Fragment>
    );
}
export default Header 