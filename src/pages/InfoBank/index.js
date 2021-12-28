import React, { Fragment } from 'react'
import { Footer, Header } from '../../component'

function Bank() {
    return (
       <Fragment>
             <Header/>
                <div className="container">
                    <div className="post-title">
                        <h3 style={{color: 'black'}}>
                            <strong>
                                <a>Info Bank</a>
                            </strong>
                        </h3>
                    </div>
                    <div className="container">
                        <div className="col-md-12">
                            <div className="row" style={{marginBottom:15}}>
                                <span style={{fontSize : '4vmin'}}>Silahkan Transfer Dana ke Rekening Bank yang tertera di bawah ini</span>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className='col-md-12' style={{backgroundColor : '#ffffeb', marginBottom:15}}>
                                    <div className = 'mr-2'>
                                        <h3 style={{fontSize : '10vmin'}} className='text-home-title-page'>BRI</h3>
                                    </div>
                                    <div>
                                        <p style={{fontSize :'4vmin'}}>PT. Usadha Bakthi Buana</p>
                                        <p style={{fontSize :'4vmin'}}>No Rek. 001701003292302</p>
                                    </div>
                                </div>
                                <div className='col-md-12' style={{backgroundColor : '#ffffeb', marginBottom:15}}>
                                    <div className = 'mr-2'>
                                          <h3 style={{fontSize : '10vmin'}} className='text-home-title-page'>BCA</h3>
                                    </div>
                                    <div>
                                          <p style={{fontSize :'4vmin'}}>PT. Usadha Bakthi Buana</p>
                                          <p style={{fontSize :'4vmin'}}>No Rek. 0498696999</p>
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

export default Bank
