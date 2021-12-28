import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router'
import {Header, Footer, Spinner} from '../../component'
import { Rupiah } from '../../helper/Rupiah'
import API from '../../services'
import { Source } from '../../services/Config'

const OrderItem =(props) => {
      const [color, setColor] = useState('#ffffff')
      const history = useHistory()
      useEffect( () => {
            let isAmounted = false
            if(!isAmounted) { 
                  if(props.status === 'closed'){
                        setColor('#c8c5c5')
                  }else if (props.status === 'pending'){
                        setColor('#FFCCCB')
                  }else if(props.status === 'approved' && props.status_delivery ==='process'){
                        setColor('#FFFFCD')
                  }else if (props.status === 'approved' && props.status_delivery ==='delivered'){
                        setColor('#CDFFCC')
                  }else if (props.status === 'approved' && props.status_delivery === 'received'){
                        setColor('#00FFFF')
                  }
            }
            return () => {
                  Source.cancel('cancel api')
                  isAmounted = true;
            }
      }, [])

      const handleOrder = async (data) => {   
            let setData =  await  sessionStorage.setItem('HISTORY', JSON.stringify(data));
            history.push('/historyorderdetail')
      }
      return (
        
             <div className="col-md-12">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className='col-md-8 item-point m-0 p-0'>
                    <br></br>
                        <p><h5>{props.register}</h5></p>
                        <p className='d-block p-2 memo ' style={{color:color}}><h4>{props.memo}</h4></p>
                        <div className='d-flex justify-content-between p-2'>
                                <span><h5>{props.customers}</h5></span>
                                <span><h5>{Rupiah(props.amount)}</h5></span>
                        </div>
                        <div className="login">
                            <div className="mb-3">
                                <button onClick ={() => handleOrder(props.data)}  className="button1" type="button">Detail Order</button>
                            </div>     
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
                <br></br>
            </div>
      
      )
}


function HistoryOrder() {
      const history = useHistory()
      const [USER, setUSER] = useState(null)
      const [TOKEN, setTOKEN] = useState(null)
      const [loading, setLoading] = useState(true)
      const [orderHistory, setOrderHistory] = useState(null)

      useEffect( () => {
            let isAmounted = false
            if(!isAmounted) { 
                  Promise.all([getUSER(), getTOKEN()]).then((res) => {
                        let userData = res[0];
                        let tokenData = res[1];
                        if(userData !== null && tokenData !==null){
                              Promise.all([API.historyorder(userData.id, tokenData)]) 
                              .then((result) => { 
                                    console.log('order', result);
                                    setOrderHistory(result[0].data)
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

        if(loading){
            return (
                  <Spinner/>
            )
      }
      
      return (
            <Fragment>
                  <Header/>
                        <div className="container">
                            <div className="post-title">
                                <h3 style={{color: 'black'}}>
                                    <strong>
                                        <a>History Order</a>
                                    </strong>
                                </h3>
                            </div>
                            {orderHistory && orderHistory.map((item, index) => {
                                    return (
                                    <OrderItem 
                                        key ={index}
                                        register ={item.register}
                                        memo = {item.memo}
                                        customers ={item.customers.name}
                                        // status_delivery ={item.status_delivery}
                                        amount = {parseInt(item.total)}
                                        status = {item.status}
                                        status_delivery ={item.status_delivery}
                                        data = {item}
                                    />
                                    )
                            })}
                        </div>
                  <Footer/>
            </Fragment>
      )
}

export default withRouter(HistoryOrder)
