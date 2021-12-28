import React, { Fragment, useEffect, useState } from 'react'
import {FaCreditCard, FaRegCreditCard} from "react-icons/fa";
import { useHistory } from 'react-router';
import { Footer, Header, Spinner } from '../../component';
import { Rupiah } from '../../helper/Rupiah';
import API from '../../services';
import { Source } from '../../services/Config';

function TopUp  () {

    const history = useHistory()
    const [USER, setUSER] = useState(null)
    const [accountCash, setAccountCash] = useState(null);
    const [loading, setLoading] = useState(true);
    const [point, setPoint] = useState(0);
    const [TOKEN, setTOKEN] = useState(null)

    const dateRegister = () => {
          let todayTime = new Date();
          let month = todayTime.getMonth() + 1;
          let day = todayTime.getDate();
          let year = todayTime.getFullYear();
          return year + "-" + month + "-" + day;
    }
    const [form, setForm] = useState({
          register : dateRegister(),
          customers_id : null,
          memo : 'Top up poin',
          accounts_id : null,
          amount : 0,
    })

    useEffect( () => {
          let isAmounted = false
          if(!isAmounted) { 
                Promise.all([getUSER(), getTOKEN()]).then((res) => {
                      let userData = res[0];
                      let tokenData = res[1];
                      if(userData !== null && tokenData !==null){
                            setForm({
                                  ...form,
                                  customers_id : userData.id
                            })
                            Promise.all([API.accountCash(tokenData), API.point(userData.id, tokenData)]) 
                            .then((result) => { 
                                  setAccountCash(result[0])
                                  setPoint(result[1].data[0].balance_points)
                                  setLoading(false) 
                            }).catch((e) => {
                                  console.log(e);
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

    
    const getUSER =  () => {
          let data =  sessionStorage.getItem('USER')
          data = JSON.parse(data)
          setUSER( data)
          return data;
          
    }
    const getTOKEN =  () => {
          let data =  sessionStorage.getItem('TOKEN')
          data = JSON.parse(data)
          setTOKEN( data)
          return data;
          
    }


    const onChangeForm = (name, value) => {
          setForm({
                ...form,
                [name] : value
          })
    }

    const handleTopup = () => {
          if(form.accounts_id !== null && form.amount !== 0 && form.customers_id !== '' && form.memo !== '' && form.register !== ''){
                setLoading(true)
                API.topup(form, TOKEN).then((result) => {
                      console.log(result);
                      setForm({
                            register : dateRegister(),
                            customers_id : USER.id,
                            memo : 'Top up poin',
                            accounts_id : null,
                            amount : 0,
                      });
                      
                    //   history.push(`landing/${result.message}/topup`)
                      history.goBack(`landing/${result.message}/topup`)
                      
                      alert(result.message)
                    
                     
                
                      // setLoading(false)
                      // window.location.reload();
                }).catch((e) => {
                      console.log(e.request)
                      alert('topup gagal')
                      setForm({
                            register : dateRegister(),
                            customers_id : USER.id,
                            memo : 'Top up poin',
                            accounts_id : null,
                            amount : 0,
                      });
                      setLoading(false)
                })
          }else{
                alert('mohon isi data dengan lengkap');
                setLoading(false)
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
            <div id="sns_content" className="wrap layout-m">
                <div className="container">
                    <div className="post-title">
                        <h3 style={{color: 'black'}}>
                            <strong>
                                <a>TopUp</a>
                            </strong>
                        </h3>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className ="col-md-2"></div>
                            <div className ="col-md-8">
                                <span style={{fontWeight:500, fontSize:15}}>Sumber Dana</span>
                                <div className='box-sumber-dana mb-3'>
                                    <div className='d-flex flex-row'>
                                        <FaCreditCard className='icon-card mr-3'/>
                                        <div>
                                            <span className='font-weight-bold'>Minyak Belog Cash</span> <br/>
                                            <span className='font-smaller'>Balance {Rupiah(parseInt(point))}</span>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div className ="col-md-2"></div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className ="col-md-2"></div>
                            <div className="col-md-8">
                            <span style={{fontWeight:500, fontSize:15}}>Pilih Nominal TopUp</span>
                                <div className="row">
                                    <div className ="col-md-4">
                                        <div className='mb-3  nominal' onClick={()=>onChangeForm('amount', 200000)}>
                                            <span className='box-nominal ' style={{boxShadow : (form.amount === 200000 ? `0 0 5px rgb(230, 158, 26)` : ''), color : (form.amount === 200000? `rgb(230, 158, 26)` : '')}}> RP.200.000</span>
                                        </div>
                                    </div>
                                    <div className ="col-md-4">
                                        <div className='mb-3  nominal'>
                                            <span className='box-nominal'  style={{boxShadow : (form.amount === 300000 ? `0 0 5px rgb(230, 158, 26)` : ''), color : (form.amount === 300000? `rgb(230, 158, 26)` : '')}} onClick={()=>onChangeForm('amount', 300000)}> RP.300.000</span>
                                        </div>
                                    </div>
                                    <div className ="col-md-4">
                                        <div className='mb-3  nominal'>
                                            <span className='box-nominal' style={{boxShadow : (form.amount === 500000 ? `0 0 5px rgb(230, 158, 26)` : ''), color : (form.amount === 500000? `rgb(230, 158, 26)` : '')}} onClick={()=>onChangeForm('amount', 500000)}> RP.500.000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className ="col-md-2"></div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className ="col-md-2"></div>
                            <div className ="col-md-8">
                            <span style={{fontWeight:500, fontSize:13}}>Atau masukan nominal Topup disini</span>
                                <div className="mb-3">
                                    <input className="form-control" type="number" style={{padding:20}}  value={typeof form.amount !== 'object' ? form.amount :0}  onChange={(value) => {onChangeForm('amount', value.target.value);}}/>
                                </div>
                            </div>
                            <div className ="col-md-2"></div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className ="col-md-2"></div>
                            <div className ="col-md-8">
                                <span style={{fontWeight:500, fontSize:15}}>Transfer Bank</span>
                                <div className="row mb-3">
                                {accountCash.map((item, index) => {
                                            return (
                                                <div className='col-md-4 mt-3' key = {index} onClick ={(result) => onChangeForm('accounts_id', item.id)} style={{marginBottom:20}}>
                                                    <div className='box-type-transfer text-center' style={{boxShadow : (item.id === form.accounts_id ? `0 0 5px rgb(230, 158, 26)` : ''), color : (item.id === form.accounts_id ? `rgb(230, 158, 26)` : '')}}  >
                                                            <FaRegCreditCard className='icon'/>
                                                            <p>{item.name}</p>
                                                    </div>
                                                </div>
                                                
                                            )
                                        })} 
                                </div>
                            </div>
                            <div className ="col-md-2"></div>    
                        </div>
                    </div>
                    <div className="login">
                        <div className="mb-3">
                            <button onClick={() => {if(window.confirm('Topup sekarang ?')){handleTopup()};}}  className="button1" type="button">Top Up</button>
                        </div>     
                    </div>
                </div>
            </div>
              
            <Footer/>
        </Fragment>
    )
}

export default TopUp