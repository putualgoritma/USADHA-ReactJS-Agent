import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router';
import { Footer, Spinner } from '..';
import { ImageDefault } from '../../assets';
import { Rupiah } from '../../helper/Rupiah';
import API from '../../services';
import { Header } from '..';
import axios from 'axios';

const ItemHistory =(props) => {
      return (
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
                                        <li className="category3 last">
                                            <span>Pesanan  {props.pesanan }</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
                <div className="container">
                    <div className="row">
                        <div id="sns_main" className="col-md-12 col-main">
                            <div id="sns_mainmidle">
                                <div className="product-view sns-product-detail">
                                    <div className="product-essential clearfix">
                                        <div className="row row-img">
                                            <div className="product-img-box col-md-4 col-sm-5">
                                                <div className="detail-img">
                                                {/* <img src={ (props.dataOrder.img === null ? ImageDefault : process.env.REACT_APP_BASE_URL +String(props.dataOrder.img).replace('public/', ''))} alt='img' /> */}
                                                <img src={ImageDefault} alt='img' />
                                                </div>
                                            </div>
                                            <div id="product_shop" className="product-shop col-md-8 col-sm-7">
                                                <div className="item-inner product_list_style">
                                                    <div className="item-info">
                                                        <div className="item-title">
                                                            <a title="Modular Modern">{props.dataOrder.name}</a>
                                                        </div>
                                                        <div className="item-price">
                                                            <div className="price-box">
                                                                <span className="regular-price">
                                                                    <span className="price">{Rupiah(parseInt(props.dataOrder.price * props.dataOrder.pivot.quantity))}</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="availability">
                                                            <p className="style1">Tanggal : {props.data.register}</p>
                                                        </div>
                                                        <div className="rating-block">
                                                            <div className="ratings">
                                                                <div className="rating-box">
                                                                    <div className="rating" style={{width: '100%'}}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="desc std">
                                                            {/* <h5>{props.data.agents.name}</h5> */}
                                                        </div>
                                                        <div className="actions">
                                                            <label className="gfont" htmlFor="qty">Quantity : {props.dataOrder.pivot.quantity}
                                                            </label>
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

      )
}


function HistoryOrderDetailIn() {
      const history = useHistory()
      const [HISTORY, setHISTORY] = useState(null);
      const [TOKEN, setTOKEN] = useState(null);
      const [loading, setLoading ] = useState(true);
      useEffect( () => {
            let isAmounted = false
            if(!isAmounted) { 
                  Promise.all([getTOKEN(),getHistory()]).then((res) => {
                        let tokenData = res[0]
                        let historyData = res[1]
                        // console.log(tokenData)
                        if(tokenData !==null && historyData !== null ){
                                    setLoading(false)
                        }else{
                              alert('mohon login terlebih dahulu')
                              history.push('/login')
                        }
                  });
           }
            return () => {
                  isAmounted = true;
            }
      }, [])


      const handleBatal = () => {
            setLoading(true)
            API.historyordercancel(HISTORY.id, TOKEN).then((result) => {
                  // console.log(result);
                  history.push('/HistoryIn')
            }).catch((e) => {
                  console.log(e.request);
                  alert('pesanan gagal di batalkan')
                  setLoading(false)
            })
      }
      
      const handleProses =()=>{
          setLoading(true)
          API.deliveryproses(HISTORY.id, TOKEN).then((result) => {
            // console.log(result);
            history.push('/HistoryIn')
        }).catch((e) => {
                console.log(e.request);
                alert('pesanan gagal di proses')
                setLoading(false)
        })
      }

      const handleKirim =()=>{
        setLoading(true)
        console.log('id',HISTORY.id)
        axios.get(`https://admin.belogherbal.com/api/close/delivery-agent-update/${HISTORY.id}`, {
            headers: {
                  cancelToken :'',
                  Authorization: (TOKEN ==null ? null : `Bearer ${TOKEN}`),
                  'Accept' : 'application/json'
            }
      })
      .then((result) => {
        console.log(result);
        history.push('/HistoryIn')
        setLoading(false)
      }, (err) => {
        alert('pesanan gagal di kirim');
        setLoading(false)
      })
    //     API.deliveryupdate(HISTORY.id, TOKEN).then((result) => {
    //       // console.log(result);
    //       history.push('/HistoryIn')
    //   }).catch((e) => {
    //           console.log(e.request);
    //           alert('pesanan gagal di kirim')
    //           setLoading(false)
    //   })
    }

    //   const handleTerima = () => {
    //         setLoading(true)
    //         API.historyorderupdate(HISTORY.id, TOKEN).then((result) => {
    //               // console.log(result);
    //               history.push(`/landing/${result.message}/historyorder`)
    //         }).catch((e) => {
    //               console.log(e.request);
    //               alert('pesanan gagal di konfirmasi, coba ulang!')
    //               setLoading(false)
    //         })
    //   }

      const getHistory = async () => {
            let data =  await sessionStorage.getItem('HISTORY')
            data = JSON.parse(data)
            setHISTORY(data)
            console.log(data)
            return data;
      }
      const getTOKEN =  async () => {
            let data =  await sessionStorage.getItem('TOKEN')
            data = JSON.parse(data)
            setTOKEN( data)
            return data;
      }

      if(loading){
            return (
                  <Spinner/>
            )
      }

      return (
            <Fragment>
                  <Header/>
                <div id="sns_content" className="wrap layout-m">
                    <div className="post-title">
                        <h3 style={{color: 'black'}}>
                            <strong>
                                <a>Detail History Order Masuk</a>
                            </strong>
                        </h3>
                    </div>
                    {HISTORY && HISTORY.products.map((item, index) => {
                            return (
                                <ItemHistory
                                        key ={index}
                                        dataOrder = {item}
                                        data = {HISTORY}
                                        pesanan = {index + 1}

                                />
                            )
                    })}
                    <div className='text-center'>
                            {HISTORY.status === 'pending' && 
                            <div>
                                <div className ="login">
                                 <div className="mb-3"> 
                                     <button  className="button1"
                                             onClick={() => {if(window.confirm('Proses Pesanan?')){handleProses()}}}
                                     >
                                                Proses Pesanan
                                     </button>
                                 </div>
                                </div>
                                <div className ="login">
                                    <div className="mb-3"> 
                                        <button  className="button1"
                                                onClick={() => {if(window.confirm('Batalkan Pesanan?')){handleBatal()}}}
                                        >
                                                Batalkan Pesanan
                                        </button>
                                    </div>
                                </div>
                            </div>
                            }
                             {((HISTORY && (HISTORY.status_delivery==='process' && HISTORY.status==='approved'))) && 
                                <div className ="login">
                                    <div className="mb-3"> 
                                        <button  className="button1"  
                                                    onClick={() => {if(window.confirm('Kirim Pesanan?')){handleKirim()}}}>
                                                Kirim
                                        </button>
                                    </div>
                                </div>
                            }
                           
                            {((HISTORY && (HISTORY.status_delivery==='delivered' && HISTORY.status==='approved'))) &&
                                <div className ="login">
                                    <div className="mb-3"> 
                                        <button  className="button1"  onClick={() => history.goBack()}>
                                                Kembali
                                        </button>
                                    </div>
                                </div>
                            }
                           
                    </div>
                </div>
                                        
                  <Footer/>
            </Fragment>
      )
}

export default withRouter(HistoryOrderDetailIn)
