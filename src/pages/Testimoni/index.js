import React from "react";
import { Fragment } from "react";
import { Header,Footer } from "../../component";
import { Testi1,Testi2,Testi3,Testi4,Testi5,Testi6,TestiMami } from "../../assets";

const Testimoni =()=>{
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
                                <h1 style={{color: 'black'}}>
                                <strong>
                                    <a href="testimoni.html">Testimoni pengguna Minyak Belog</a>
                                </strong></h1><strong>
                                </strong>
                            </div>
                            <div className="col-md-4">
                                <a href="https://www.youtube.com/watch?v=A0fsA2kcA8g">
                                <img src={Testi1} />
                                <h4>“Minyak Belog ini saya coba untuk dioleskan pada yang sakit ternyata obat
                                    Minyak Belog ini manjur sekali memang betul”
                                </h4>
                                <p>I Gusti Putu Suardika, Sakit pinggang dan kesemutan</p>
                                </a>
                                <br /></div>
                            <div className="col-md-4">
                                <a href="https://www.youtube.com/watch?v=yikULoDfutw">
                                <img src={Testi2} />
                                <h4>“Kaki saya yang hampir delapan bulan tidak bisa jalan akhirnya dengan Minyak
                                    Belog, ini saya dapat berjalan seperti biasa”
                                </h4>
                                <p>Mastrini Erawati, Tidak dapat berjalan</p>
                                </a>
                                <br /></div>
                            <div className="col-md-4">
                                <a href="https://www.youtube.com/watch?v=r28zi8pYnUs">
                                <img src={Testi3} />
                                <h4>“Ini sangat bermanfaat, setelah saya oleskan, dipijit sama istri saya malam,
                                    besok paginya kondisi saya normal lagi”
                                </h4>
                                <p>I Made Rai Suardana, Badan sakit, Pilek, Batuk</p>
                                </a>
                                <br /></div>
                            <div className="col-md-12" style={{marginTop: 40}}>
                                <a href="https://www.youtube.com/watch?v=WjtdDxCctxo">
                                <img src={TestiMami} />
                                <h4 style={{textAlign: 'center', marginBottom: 40}}>Ketuk gambar untuk menonton
                                </h4>
                                </a>
                                <br /></div>
                            <div className="col-md-4">
                                <a href="https://www.youtube.com/watch?v=RLAMh542QGY&t=8s">
                                <img src={Testi4} />
                                <h4>"Astungkara, sesak nafas dan lutut saya dari bengkak atau kesemutan sekarang
                                    sudah menjadi baik kembali"
                                </h4>
                                <p>I Nengah Adyane ,Sesak nafas dan lutut bengkak kesemutan</p>
                                <br /></a>
                            </div>
                            <div className="col-md-4">
                                <a href="https://www.youtube.com/watch?v=6F3r1Sl9D0k&t=111s">
                                <img src={Testi5} />
                                <h4>“Saya ini punya asam urat nyeri di lutut kaki, ini yang saya pakai untuk
                                    menggosokan dan jadinya bagus sekali bisa hilang sakit saya ini"
                                </h4>
                                <p>Jro Mangku Puseh, Asam urat di lutut kaki</p>
                                </a>
                                <br /></div>
                            <div className="col-md-4">
                                <a href="https://www.youtube.com/watch?v=tXbQvvEINH0">
                                <img src={Testi6}/>
                                <h4>"Setiap malam saya pakai sebelum tidur dengan cara diurut, di dada dan
                                    digaian tangan yang kesemutan, akhirnya setelah pakai dua kali sembuh"
                                </h4>
                                <p>Ni Made Suadi, Tangan sering kesemutan dan pegal linu</p>
                                </a>
                                <br /></div>
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

export default Testimoni