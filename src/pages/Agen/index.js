import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { profile } from '../../assets'
import { Footer, Header, Spinner } from '../../component'
import API from '../../services'
import { Source } from '../../services/Config'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'

function Agen(props) {
    const [myMarkers,setMymarkers]= useState([
        // {latitude:-8.525673350010061, longitude: 115.1045738118341},
        // {latitude: -8.79890314230233, longitude: 115.1616967253286},
        // {latitude: -8.116383295015035, longitude: 115.08770040997422},
        // {latitude: -8.342992618609465, longitude: 114.61459871693032},
    ])
    const displayMarkers = () =>{
        return myMarkers.map((mark,index)=>{
          return <Marker id={index} position={{lat:mark.latitude, lng:mark.longitude}}
          onClick={()=> console.log("You clicked me!", {index})}
          />
        })
    }
    const mapStyles = {
        width: '100%',
        height: '100%',
    };

    const [loading, setLoading] = useState(true)
    const [agen, setAgen] = useState(null)
    const history = useHistory()
    const [select, setSelect] = useState(null)


    
    useEffect(() => {
        let isAmounted = false

        if(!isAmounted) {
            navigator.geolocation.getCurrentPosition(function(position) {
                // alert('latitude : '+position.coords.latitude);
                // alert('longtitude : '+position.coords.longitude);
              });
                Promise.all([API.agents()])
                .then(result => {
                    // getUSER()
                    // getCART()
                    // setProduct(result[0].data)
                    setAgen(result[0].data)
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
                            <a>Pilih Agen</a>
                        </strong>
                    </h3>
                </div>
                <div className='container'>
                    <div className='col-md-10 col-md-offset-1 m-0 p-0' style={{height:450}}>
                    <Map
                        google={props.google}
                        zoom={10}
                        style={mapStyles}
                        initialCenter={{lat: -8.5255684, lng: 115.1058938}}
                        >
                        {displayMarkers()}
                    </Map>
                    </div>
                </div>
                <hr/>
                <div className='container'>
                    <div className='row'>
                        {agen.map((item) => {
                                return (
                                <div className='col-6 col-md-4' key={item.id} onClick={() => setSelect(item.id)}>
                                    <div style={{backgroundColor : (select !== null && select === item.id ?  '#F3C242' : ''), paddingTop:15, paddingBottom:15, borderRadius:10}}>
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
                            <button onClick={select ? () => history.push("/checkout/" + select) : () => alert('pilih agen terlebih dahulu')} className="button1" type="button">Pilih Agen</button>
                        </div>     
                    </div>    
                </div>
            </div>  
            <Footer/>
        </Fragment>
      )
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyB_nXYwbS7kPBrD0oBccTVsMk1L60elHcA')
  })(Agen)
