import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Footer, Header, Spinner } from '../../component'
import { Rupiah } from '../../helper/Rupiah'
import API from '../../services'
import { Source } from '../../services/Config'

const ItemHistoryPoint = (props) => {
      const history = useHistory();

      return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className='col-md-8 item-point'>
                        <p  className='d-block date p-2'><h5>{props.register}</h5></p>
                        <p className='d-block p-2 memo'><h4>{props.memo}</h4></p>
                        <div className='d-flex justify-content-between p-2' style={{color : props.type ==='C' ? 'red' : 'green'}}>
                                <span><h5>{props.type ==='C' ? 'Kredit' : 'Debet'}</h5></span>
                                <span><h5>{Rupiah(props.amount)}</h5></span>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
      )
}

function HistoryPoint() {
      const history = useHistory()
      const [USER, setUSER] = useState(null)
      const [TOKEN, setTOKEN] = useState(null)
      const [loading, setLoading] = useState(true)
      const [pointHistory, setPointHistory] = useState(null)
      useEffect( () => {
            let isAmounted = false
            if(!isAmounted) { 
                  Promise.all([getUSER(), getTOKEN()]).then((res) => {
                        let userData = res[0];
                        let tokenData = res[1];
                        if(userData !== null && tokenData !==null){
                              Promise.all([API.historypoint(userData.id, tokenData)]) 
                              .then((result) => { 
                                    console.log(result);
                                    setPointHistory(result[0].data)
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
                                    <a>History Point</a>
                                </strong>
                            </h3>
                        </div>
                        {pointHistory && pointHistory.map((item, index) => {
                                return (
                                    <ItemHistoryPoint
                                            key = {index}
                                            register = {item.orders.register}
                                            memo = {item.memo}
                                            type = {item.type}
                                            amount = {parseInt(item.amount)}
                                            order = {item.orders}
                                    />
                                )
                        })}
                    </div>
                  <Footer/>
            </Fragment>
      )
}

export default HistoryPoint
