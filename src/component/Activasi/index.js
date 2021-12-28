import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router';
import { Spinner } from '..';
import { ImageDefault, profile } from '../../assets'
import { Rupiah } from '../../helper/Rupiah';
import API from '../../services';
import { Source } from '../../services/Config';
import { Footer } from '..';
import { Header } from '..';


function Activasi(props) {
      const history = useHistory()
      // const [USER, setUSER] = useState(null);
      const [TOKEN, setTOKEN] = useState(null);
      const [paket, setPaket] = useState(null)
      const [point, setPoint] = useState(0)
      const [agen, setAgen] = useState(null)
      const [loading, setLoading] = useState(true)
      const [select, setSelect] = useState(null)
      const [changePage, setChangePage] = useState(false)
      const [form, setForm] = useState({
            id :null,
            package_id : null,
            agents_id : null
      })

      useEffect( () => {
            let isAmounted = false
            if(!isAmounted) { 
                  Promise.all([getUSER(), getTOKEN()]).then((res) => {
                        let userData = res[0];
                        let tokenData = res[1]

                      if(userData && tokenData !==null){
                              setForm({...form, id : userData.id})
                              Promise.all([API.point(userData.id, tokenData), API.agents(), API.paketMembers(tokenData)]) 
                              .then((result) => { 
                                    console.log(result);
                                    setPoint(parseInt(result[0].data[0].balance_points))
                                    setAgen(result[1].data)
                                    setPaket(result[2].data)
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

      const selectPaket = () => {
            if(select){
                  if(point >= select.price){
                        setForm({...form, package_id : select.id})
                        setChangePage(true)
                  }else{
                        alert('point anda kurang')
                  }
            }else{
                  alert('mohon pilih paket terlebih dahulu')
            }
      }

      
      const handleActivasi = () => {
            if (form.id !== null && form.agents_id !==null  && form.package_id !== null) {
                  setLoading(true)
                  API.activasi(form, TOKEN).then((result) => {
                        setLoading(false)
                        console.log(result);
                        setUSERSession(result.data)
                        history.push(`/landing/Activasi Sukses/profile`)
                  }).catch((e) => {
                        console.log(e.request);
                  })
            }else{
                  select === null ? alert('mohon pilih paket') : alert('mohon pilih agen');
            }
      }

      const getUSER = async () => {
            let data =  await sessionStorage.getItem('USER')
            data = JSON.parse(data)
            // setUSER( data)
            return data;
      }
      const getTOKEN =  async () => {
            let data =  await sessionStorage.getItem('TOKEN')
            data = JSON.parse(data)
            setTOKEN( data)
            return data;
      }

      const setUSERSession = async (data) => {   
            let setData =  await  sessionStorage.setItem('USER', JSON.stringify(data));
      }


      if(loading){
            return (
                  <Spinner/>
            )
      }

      return (
            <Fragment>
                  <Header/>
                    
                              {changePage === false ? (
                                   
                                     <div className='container'>
                                          <h4>Pilih Paket</h4>
                                          <div className='row'>
                                                {paket && paket.map((item, index) => {
                                                      return (
                                                
                                                 <div className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12 " style={{ backgroundColor : (select !== null && select.id === item.id ? ' #ffc400' : ''), paddingTop:15,paddingBottom:15}}>
                                                    <div className="item-inner">
                                                        <div className="prd">
                                                            <div className="item-img clearfix">
                                                                <a  onClick={() => setSelect(item)}>
                                                                    <div
                                                                        className="product-image have-additional"
                                                                        title="Modular Modern"
                                                                        key = {index}>
                                                                              
                                                                        <span className="img-main">
                                                                              <img src={(item.img == null ? ImageDefault : process.env.REACT_APP_BASE_URL + String(item.img).replace('public/', ''))} alt ='gambar' />
                                                                        </span>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div className="item-info">
                                                                <div className="info-inner">
                                                                    <div className="item-title">
                                                                        <a title="Modular Modern" href='/Detail'>
                                                                        {item.name}
                                                                        </a>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <div className="price-box">
                                                                            <span className="regular-price">
                                                                                <span className="price">
                                                                                    <span className="price1">{Rupiah(parseInt(item.price))}</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br></br>
                                                </div>
                                                      )
                                                })}
                                          </div>
                                          <div className="login">
                                            <div className="mb-3">
                                                <button onClick={selectPaket} className="button1" type="button">Aktivasi</button>
                                            </div>     
                                        </div>
                                         
                                    </div>
                                    
                              ) :   ( 
                                    <div className='container'>
                                          <div className='row'>
                                          {agen.map((item) => {
                                                return (
                                                      <div className='col-6 col-md-4' key={item.id} onClick ={() => setForm({...form, agents_id : item.id})}>
                                                            
                                                            <div style={{backgroundColor : (form.agents_id !== null && form.agents_id === item.id ? '#F3C242' : ''), paddingTop:15, paddingBottom:15, borderRadius:10}}>
                                                                  <div className='text-center'>
                                                                        <img src={profile} style={{width:110, height:100}} alt='foto-agent'/>
                                                                  </div>
                                                                  <p>{item.name}</p>
                                                                  <p>{item.email}</p>
                                                                  <p>{item.phone}</p>
                                                            </div>
                                                      </div>
                                                )
                                          })}
                                          </div>                                            
                                          <div className="login">
                                                <div className="mb-3">
                                                      <button onClick={() => setChangePage(false)} className="button1" type="button">Back</button>
                                                      <br></br>
                                                      <button onClick={() => {if(window.confirm('Activasi sekarang ?')){handleActivasi()};}} className="button1" type="button">Activasi</button>
                                                      
                                                </div>     
                                          </div>    
                                    </div>
                              )}

                     
                  <Footer/>
            </Fragment>
      )
}

export default withRouter(Activasi)
