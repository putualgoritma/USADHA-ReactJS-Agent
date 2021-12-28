import React,{Fragment} from 'react'
import {Handphone,IconFacebook,IconYoutube,IconInstagram} from '../../assets/'

const Footer=()=>{
    return (
        <Fragment>
<div id="sns_footer" className="footer_style vesion2 wrap">
    <div id="sns_footer_top" className="footer">
        <div className="container">
            <div className="container_in">
                <div className="row">
                    <div className="col-md-3 col-sm-12 col-xs-12 column0">
                        <div className="contact_us">
                            <h6>Contact us</h6>
                            <ul className="fa-ul">
                                <li className="pd-right">
                                    <i className="fa-li fa fw fa-home"></i>
                                    Jalan Raya Nyuh Kuning, Pengosekan, Ubud, MAS, Kec. Gianyar, Kabupaten Gianyar,
                                    Bali 80571
                                </li>
                                <li>
                                    <i className="fa-li fa fw fa-phone"></i>
                                    <p>+62 812-1013-5757</p>
                                    <p>+62 822-9874-5757</p>
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
                    <div className="col-phone-12 col-xs-6 col-sm-3 col-md-2 column column1">
                        <h6>Tentang</h6>
                        <ul>
                            <li>
                                <a href="tentang.html">Visi, Motto, Tagline, Core Value kami</a>
                            </li>
                            <li>
                                <a href="tentang.html#brand">Our Brand</a>
                            </li>

                            <li>
                                <a href="tentang.html#jajaran">Jajaran Komisaris</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-phone-6 col-xs-6 col-sm-6 col-md-2 column column2">
                        <h6>Our Social Media</h6>
                        <ul>
                            <li>
                                <a href="https://www.facebook.com/MinyakBelogBali"><img
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
                    <div className="col-phone-12 col-xs-6 col-sm-3 col-md-2 column column3">
                        <h6>Blog</h6>
                        <ul>
                            <li>
                                <a href="https://wp.belogherbal.com/category/healthwithbelog/">Tips sehat ala Belog Herbal</a>
                            </li>
                            <li>
                                <a href="https://wp.belogherbal.com/category/berita/">Berita</a>
                            </li>
                            <li>
                            </li>
                        </ul>
                    </div>
                    <div className="col-phone-12 col-xs-6 col-sm-3 col-md-2 column column4">
                        <div className="subcribe-footer">
                            <div className="block_border block-subscribe">
                                <div className="block_head">
                                    <h6>Download now</h6>
                                    <p/>
                                </div>
                                <img src={Handphone} width="150px"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="sns_footer_bottom" className="footer">
        <div className="container">
            <div className="row">
                <div className="bottom-pd1 col-sm-6">
                    <div class="sns-copyright">
                        Develop by 
                        <a title="" data-original-title="Visit Digininetive" data-toggle="tooltip" href="https://www.sherocompany.com/">Digininetive</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


        </Fragment>
    )
}
export default Footer