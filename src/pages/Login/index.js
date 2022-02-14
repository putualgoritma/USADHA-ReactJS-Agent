import React,{Fragment,useState} from 'react'
import { Spinner } from '../../component';
import API from '../../services'
import { Link, useHistory} from 'react-router-dom'
import {Logo,Product8} from "../../assets";

const Login = ()=>{
    const [loading, setLoading] = useState(false);
      const history = useHistory()
      const [form, setForm] = useState({
            email: null,
            password: null,
            id_onesignal : null
      })
      const [lengthCart, setLengthCart] = useState(0)

      const getCART = async () => {
            let data = await sessionStorage.getItem('CART')
            data = JSON.parse(data)
            if(data){
                  setLengthCart(data.length)
           }
      }
      // cahnge form
      const onChangeForm = (name, value) => {
            setForm(
                 { ...form,
                  [name] : value}
            )
      }

      const setUSER = async (data) => {   
            let setData =  await  sessionStorage.setItem('USER', JSON.stringify(data));
      }

      const setTOKEN = async (data) => {
            let setData =  await  sessionStorage.setItem('TOKEN', JSON.stringify(data));
      }

      // aksi login
      const handleLogin = () => {
            if(form.email !==null && form.password !==null){
                  setLoading(true)
                  API.login(form).then(result => {
                        setUSER(result.user)
                        setTOKEN(result.token.token);
                        setForm({
                              email:null,
                              password:null,
                              id_onesignal:null
                        })
                        setLoading(false)
                        // history.push("/");
                        // history.goBack("/");
                        history.push("/");
                        window.location.reload()
                  }).catch((e) => {
                        console.log(e.request);
                        alert('login gagal')
                        setLoading(false)

                  })
            }else{
                  alert('mohon isi data dengan benar')
            }
      }

      // spinner
      if(loading ){
            return (
                  <Spinner/>
            )
      }
    return(
<Fragment>
<div id="bd" className=" cms-index-index4 header-style4 prd-detail cms-simen-home-page-v2 default cmspage">
  <div className="container-fluid">
    <div className="container">
      <div className="sns_mainmenu">                             
            <div className="sns_menu_right">
                  <div className="block_topsearch">
                        <div className="top-cart">
                        {/* <div className="mycart mini-cart">
                              <div className="block-minicart">
                                    <div className="tongle">
                                    <i className="fa fa-shopping-cart"/>
                                    <div className="summary">
                                          <span className="amount">
                                                <a href='/Cart'>
                                                <span>{lengthCart}</span>
                                                ( items )
                                                </a>
                                          </span>
                                    </div>
                                    </div>
                                    <div className="block-content content">
                                    <div className="block-inner">
                                          <ol id="cart-sidebar" className="mini-products-list">
                      
                                                <li className="item odd">
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
                                                </li>
                      
                                          </ol>
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
                                                <a className="button gfont go-to-cart" href="shoppingcart.html">Go to cart</a>
                                          </div>
                                    </div>
                                    </div>
                              </div>
                        </div> */}
                        </div>
                  </div>
            </div>
            </div>
    </div>
  </div>
  <div id="sns_header_logo">
    <div className="container">
      <div className="container_in">
        <div className="col-lg-3 policy ">
          <div className="row ">
            <h1 id="logo" className="responsv col-lg-12 col-md-5">
              <a href="index.html" title="Magento Commerce">
                <img alt src={Logo}/> 
              </a>
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="sns_wrapper">  
    <div id="sns_header" className="wrap">
      <div className="sns_header_top">
        <div className="container">
          <div className="sns_module">
            <div className="header-setting">
              <div className="module-setting">
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="sidebar ">
        <i className="bx bxs-grid-alt" id="btn" />
        <ul className="nav_list">
          <li>
            <a href='./Login'>
              <i className="bx bxs-user bx-md" /> 
              <span className="links_name">Login</span>
            </a>
          </li>
          <hr className="new5" />
          <li>
            <a href="index.html">
              <i className="bx bx-money bx-md" />
              <span className="links_name">Saldo Point</span>
            </a><br /><br />
          </li>
          <li>
            <a href="index.html">
              <i className="bx bxs-hand-up" />
              <span className="links_name">Top Up</span>
            </a>
          </li>
          <li>
            <a href="index.html">
              <i className="bx bx-transfer" />
              <span className="links_name">Transfer</span>
            </a>
          </li>
          <li>
            <a href="index.html">
              <i className="bx bxs-chevron-down-square" />
              <span className="links_name">Widthdraw</span>
            </a>
          </li>
        </ul>
      </div> */}
    </div>
    <div className="container-fluid">
      <div className="container">
        <div className="login">
          <form>
            <div className="row  mb-1">
                <div className="col-md-6 col-md-offset-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="name@example.com"
                            onChange={(value) => onChangeForm('email', value.target.value)}/>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-6 col-md-offset-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleFormControlInput2"
                          placeholder="******"
                          onChange={(value) => onChangeForm('password', value.target.value)}/>
                 </div>
            </div>
            <div className="mb-3">
              <button
                  type='submit'
                  className='button1'
                  onClick={() => {handleLogin()}
                  }>
                  Login
                  </button><br/>
                    <button className="button1">
                      <Link to="/Register" style={{color:'white'}}>Register</Link>
                    </button>
            </div>     

            {/* <div className="col-lg-12 col-md-12">
              <div className="mb-1">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder="name@example.com"
                                    onChange={(value) => onChangeForm('email', value.target.value)}/>
              </div>
              <div className="mb-2">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleFormControlInput2"
                                    placeholder="******"
                                    onChange={(value) => onChangeForm('password', value.target.value)}/>
              </div><br />
            
            </div> */}
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

</Fragment>
    )
}

export default Login