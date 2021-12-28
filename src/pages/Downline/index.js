import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router';
import { profile } from '../../assets';
import { Footer, Header, Spinner } from '../../component'
import API from '../../services';
import { Source } from '../../services/Config';

const ItemMitra = (props) => {
      return (
            <div className="col-md-4">
                  <p>{props.no + 1}</p>
                  <p><img src={profile} style={{width:110, height:100}}/></p>
                  <p>Nama : {props.nama}</p>
                  <p>Code : {props.code}</p>
                  <p>Alamat : {props.address}</p>
                  <br></br>
                  <hr></hr>
            </div>
      )
}


function Downline() {
      const history = useHistory()
      const [mitra, setMitra] = useState(null)
      const [loading, setLoading] = useState(true)

      useEffect( () => {
            let isAmounted = false
            if(!isAmounted) { 
                  Promise.all([getUSER(), getTOKEN()]).then((res) => {
                        let userData = res[0];
                        let tokenData = res[1]

                        if(userData!== null && tokenData !==null){
                              Promise.all([API.downline(userData.id, tokenData)]) 
                              .then((result) => { 
                                    // console.log(result[0].data);
                                    setMitra(result[0].data)
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
            // onChangeForm('customers_id', data.id)
            return data;
            
      }
      const getTOKEN =  () => {
            let data =  sessionStorage.getItem('TOKEN')
            data = JSON.parse(data)
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
                                    <a href="testimoni.html">Downline/Mitra Langsung</a>
                                </strong>
                            </h3>
                        </div>
                              <div className="col-md-12">
                                    <div className="row">
                                          {mitra.map((item, index) => {
                                                return (
                                                      <ItemMitra
                                                            no = {index}
                                                            nama = {item.name}
                                                            code = {item.code}
                                                            address = {item.address}
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

export default withRouter(Downline)
