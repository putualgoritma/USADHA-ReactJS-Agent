import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Footer, Header, Spinner } from '../../component'
import { Rupiah } from '../../helper/Rupiah'
import API from '../../services'
import { Source } from '../../services/Config'
import { ImageDefault } from '../../assets'

const ItemStok = (props) => {
      const history = useHistory();
      return (
            <div className='col-md-4 item-point'>
                <p  className='d-block date p-2'><h4 style={{color:'green'}}>{props.today}</h4></p>
                {props.image}
                <p className='d-block p-2 memo'><h4>{props.name}</h4></p>
                <p className='d-block p-2 memo'><h5 style={{color:'red'}}>Jumlah Stok : {props.stok}</h5></p>
                <hr></hr>
            </div>
      )
}

function Stok() {
      const history = useHistory()
      const [USER, setUSER] = useState(null)
      const [TOKEN, setTOKEN] = useState(null)
      const [loading, setLoading] = useState(true)
      const [pointHistory, setPointHistory] = useState(null)
      const [stok, setStok] = useState(null)
      useEffect( () => {
            let isAmounted = false
            if(!isAmounted) { 
                  Promise.all([getUSER(), getTOKEN()]).then((res) => {
                        let userData = res[0];
                        let tokenData = res[1];
                        if(userData !== null && tokenData !==null){
                              Promise.all([API.stok(userData.id, tokenData)]) 
                              .then((result) => { 
                                    console.log('data',result);
                                    setStok(result[0].data)
                                    setLoading(false) 
                              }).catch((e) => {
                                    console.log('eror',e.request);
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

      const today = () => {
        var todayTime = new Date();
        var month = todayTime.getMonth() + 1;
        var day = todayTime.getDate();
        var year = todayTime.getFullYear();
        return year + "-" + month + "-" + day;
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
                                    <a>Stok</a>
                                </strong>
                            </h3>
                        </div>
                        {/* <button onClick={()=>console.log('Stok',stok)}>Stok</button> */}
                        <div className="col-md-12">
                            <div className="row">
                            {stok && stok.map((item, index) => {
                                    return (
                                    <ItemStok
                                            key = {index}
                                            image = {<img src= {(item.img == null ? ImageDefault :( process.env.REACT_APP_BASE_URL  + String(item.img).replace('public/', '')))} alt="alt"/>}
                                            today = {today()}
                                            name = {item.name}
                                            stok = {item.quantity_balance}
                                    />
                                    )
                            })}
                            </div>
                        </div>
                    </div>
                  <Footer/>
            </Fragment>
      )
}
export default Stok
