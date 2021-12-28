import React,{Fragment} from 'react'
import { Header } from '../../component'
import { IconFacebook,IconInstagram,IconYoutube } from '../../assets'


const Contact=()=>{
    return(
        <Fragment>
        <Header/>
            <div>
                <div className="post-title">
                    <h1 style={{color: 'black'}}>
                        <strong>
                            <a href="testimoni.html">Contact Us</a>
                        </strong>
                    </h1>
                </div>
                <div id="sns_footer" className="footer_style vesion2 wrap">
                    <div id="sns_footer_top" className="footer">
                        <div className="container">
                            <div className="container_in">
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 col-xs-6 column0">
                                        <div className="contact_us">
                                            <ul className="fa-ul">
                                                <li className="pd-right">
                                                    <i className="fa-li fa fw fa-home"></i>
                                                    Jalan Raya Nyuh Kuning, Pengosekan, Ubud, MAS, Kec. Gianyar, Kabupaten Gianyar,
                                                    Bali 80571
                                                </li>
                                                <li>
                                                    <i className="fa-li fa fw fa-phone"></i>
                                                    <p>+62 812-1013-5757</p>
                                                    <p>+62 812-1013-5757</p>
                                                </li>
                                                <li>
                                                    <i className="fa-li fa fw fa-envelope"></i>
                                                    <p>
                                                        <a href="mailto:info@yourdomain.com">belogherbal@gmail.com</a>
                                                    </p>
                                                    <p>
                                                        <a href="mailto:info@yourdomain.com">belogherbal@gmail.com</a>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-phone-6 col-xs-6 col-sm-6 col-md-4 column column2">
                                        <h6>Our Social Media</h6>
                                        <ul>
                                            <li>
                                                <a href="https://www.facebook.com/minyakbelogherbal"><img
                                                    src={IconFacebook}
                                                    width="20px"
                                                    height="20px"
                                                    style={{marginRight: 10}
                                                    }/>
                                                    Minyak Belog Official</a>
                                            </li>
                                            <li>
                                                <a href="https://www.instagram.com/minyakbelogofficial/"><img
                                                    src={IconInstagram}
                                                    width="20px"
                                                    height="20px"
                                                    style={{marginRight: 10}
                                                    }/>
                                                    Minyak Belog Official</a>
                                            </li>
                                            <li>
                                                <a href="https://www.youtube.com/channel/UC_a33SNO7qBXigNHPTch1cQ"><img
                                                    src={IconYoutube}
                                                    width="20px"
                                                    height="20px"
                                                    style={{marginRight: 10}
                                                    }/>
                                                    Minyak Belog Official</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="sns_footer_bottom" className="footer">
                        <div className="container">
                            <div className="row">
                                <div className="bottom-pd1 col-sm-6">
                                    <div className="sns-copyright">
                                        © Minyak Belog. All Rights Reserved. Developer by
                                        <a
                                            title="title"
                                            data-original-title="Visit SNSTheme.Com!"
                                            data-toggle="tooltip"
                                            href="http://www.snstheme.com/">Sherocompany</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Contact