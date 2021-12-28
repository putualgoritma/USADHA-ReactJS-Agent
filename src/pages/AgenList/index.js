import React,{Fragment,useEffect,useState} from 'react'
import { Header,Footer,Spinner } from '../../component'
import { BannerAgen } from '../../assets'
import API from '../../services';
import { Source } from '../../services/Config';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router';

const AgenList=()=>{
    const [loading, setLoading] = useState(true)
    const [agen, setAgen] = useState(null)
    const history = useHistory()
    const [select, setSelect] = useState(null)
    useEffect(() => {
        let isAmounted = false

        if(!isAmounted) {
                Promise.all([API.agents()])
                .then(result => {
                    // console.log('nilai',result)
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
    return(
        <Fragment>
            <Header/>
                <div id="sns_content" className="wrap">
                    <div className="container">
                        <div className="row">
                            <div id="sns_main" className="col-md-12 col-main">
                                <div id="sns_mainmidle">
                                    <div className="blogs-page">
                                        <div className="postWrapper v1">
                                            <div className="post-title">
                                                <h1 style={{color: 'black'}}><strong> List agen PT Usadha Bhakti Buana</strong></h1>
                                            </div>  
                                            <a className="post-img">
                                                <img src={BannerAgen} alt />
                                            </a>
                                            {agen.map((pd ,index)=>(
                                            <div className="col-md-6">
                                                <h3><strong>{pd.name .length > 40 ? pd.name.substr(0,37)+ "...":pd.name}</strong> </h3> 
                                                <h4 style={{lineHeight: '1.5em'}}> 
                                                Email	: {pd.email}<br />
                                                Alamat	: {pd.address.length}<br />
                                                No Telepon/HP	:{pd.phone}
                                                </h4>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer/>  
        </Fragment>
    )
}

export default AgenList