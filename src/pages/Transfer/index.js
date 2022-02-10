import React, { Fragment, useEffect, useState } from 'react'
import { FaCreditCard, FaRegCreditCard } from 'react-icons/fa';
import { connect } from 'react-redux'
import { useHistory } from 'react-router';
import { Footer, Header, Spinner } from '../../component';
import { Rupiah } from '../../helper/Rupiah';
import API from '../../services';
import { Source } from '../../services/Config';
import { SelectPicker, Button } from 'rsuite';
import Searchable from 'react-searchable-dropdown';
import ReactPaginate from 'react-paginate';
import { profile } from '../../assets';

function Transfer  () {

    const history = useHistory();
    const [USER, setUSER] = useState(null)
    const [loading, setLoading] = useState(true);
    const [point, setPoint] = useState(0);
    const [TOKEN, setTOKEN] = useState(null)
    const [members, setMembers] = useState(null)
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const [offset, setOffset] = useState(0)
    const [perPage, setpPerPage] =  useState(9)
    const [currentPage, setCurrentPage] = useState(1)
    var [postData, setPostData] = useState([])
    const [select, setSelect] = useState(null)
    const [slice, setSlice] = useState(null)
    const [selectedPage,setSelectedPage] = useState(0)
    const [filter, setFilter] = useState({
        filter : null
       
    })

    const dateRegister = () => {
          let todayTime = new Date();
          let month = todayTime.getMonth() + 1;
          let day = todayTime.getDate();
          let year = todayTime.getFullYear();
          return year + "-" + month + "-" + day;
    }
    const [form, setForm] = useState({
          register : dateRegister(),
          amount : 0,
          from : null,
          to : null
    })
    const [member, setMember] = useState({
        per_page :9,
        page:1
    })

    useEffect( () => {
          let isAmounted = false
          if(!isAmounted) { 
                Promise.all([getUSER(), getTOKEN()]).then((res) => {
                      let userData = res[0];
                      let tokenData = res[1]

                      if(userData!== null && tokenData !==null){
                            Promise.all([API.memberlist(member,tokenData), API.point(userData.id, tokenData)]) 
                            .then((result) => { 
                                console.log(result)
                                    setData(result[0].data.data);
                                    setPageCount(Math.ceil(result[0].data.total/perPage),postData)
                                    setForm({...form, from : userData.id})
                                    setPoint(parseInt(result[1].data[0].balance_points))
                                    setLoading(false)
                                    console.log('sekusis');
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

    const handlePageClick =(e)=>{
        setSelectedPage(e.selected);
        const offset = selectedPage * perPage;
        setCurrentPage(selectedPage);
         let form_out= {
            per_page :9,
            page:e.selected+1,
            filter :filter.filter
        }
        setOffset(offset);
        Promise.all([API.memberlist(form_out,TOKEN)])
        .then((result) => { 
            console.log(result)
            setData(result[0].data.data);
            setPageCount(Math.ceil(result[0].data.total / perPage),postData)
        }).catch((e) => {
              console.log(e);
              setLoading(false)
         })
    }
    
    const handleFilter =(e)=>{
         let form_out= {
            per_page :9,
            page:1,
            filter :filter.filter
        }
        setOffset(offset);
        Promise.all([API.memberlist(form_out,TOKEN)])
        .then((result) => { 
            console.log(result)
            setData(result[0].data.data);
            setPageCount(Math.ceil(result[0].data.total / perPage),postData)
        }).catch((e) => {
              console.log(e);
              setLoading(false)
         })
    }

    const getUSER =  () => {
          let data =  sessionStorage.getItem('USER')
          data = JSON.parse(data)
          setUSER( data)
          // onChangeForm('customers_id', data.id)
          return data;
          
    }
    const getTOKEN =  () => {
          let data =  sessionStorage.getItem('TOKEN')
          data = JSON.parse(data)
          setTOKEN( data)
          return data;
          
    }


    const handleTransfer = () => {
          if(form.accounts_id !==null && form.amount > 0 && form.customers_id !==null && form.memo !== '' && form.register !== ''){
                if(point >= form.amount){
                      setLoading(true)
                      API.transfer(form, TOKEN).then((result) => {
                            // window.location.reload();
                            // history.push(`landing/tansfer sukses/transfer`)
                            alert('Transfer Berhasil')
                            history.push("/");
                            window.location.reload()
                      }).catch((e) => {
                            console.log(e.request);
                            alert('transfer gagal')
                      })
                }else{
                      alert('poin anda kurang')
                }
          }else{
                alert('mohon isi data dengan lengkap')
          }
    }


    if(loading){
          return (
                <Spinner/>
          )
    }

    return(
        <Fragment>
            <Header/>
            <div className="container">
                <div className="post-title">
                    <h3 style={{color: 'black'}}>
                        <strong>
                            <a>Transfer</a>
                        </strong>
                    </h3>
                </div>
                <div className="col-md-12">
                    <div className="row mb-2">
                        <div className ="col-md-8 col-md-offset-2" >
                            <div className="col-lg-10 col-md-6 col-xs-10 ">
                                    <input
                                    className="form-control"
                                    placeholder="Masukan Nama"
                                    onChange={e => setFilter({ filter: e.target.value })}/>
                            </div>
                            <div className="col-md-1 col-xs-1">
                                <button
                                    className="button2"
                                    type='submit'
                                    onClick={() => {handleFilter()}
                                    }>
                                    Filter
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className ="col-md-2"></div>
                        <div className ="col-md-8">
                            <div className="mb-3 " >
                            {/* <SelectPicker data={members}  block onChange={(value) => setForm({...form, to : value})} className='mb-3 select-picker' style={{zIndex:2}} /> */}
                                {/* <Searchable
                                    
                                    hideSelected
                                    options={members}
                                    listMaxHeight={200}
                                    font-family='arial'
                                    placeholder="Search" 
                                    onSelect={(value) => setForm({...form, to : value})}
                                /> */}
                            {data.map((pd ,index)=>(
                                <div className='col-lg-4 col-md-6 col-xs-6' key={pd.id} onClick={() => setSelect(pd.id) & setForm({...form, to : pd.id})} >
                                    <div style={{backgroundColor : (select == pd.id ?  '#F3C242' : ''), paddingTop:15, paddingBottom:15, borderRadius:10}}>
                                        <div className='text-center'>
                                            <img src={profile} style={{width:110, height:100}} />
                                        </div>
                                        <p>{pd.id}</p>
                                        <p>{pd.name .length > 20 ? pd.name.substr(0,20)+ "...":pd.name}</p>
                                        <p>{pd.phone}</p>
                                        <p>{pd.address.length > 15 ? pd.address.substr(0,15)+ "...":pd.address}</p>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                      
                        <div className ="col-md-2"></div>
                    </div>
                    <div className="col-md-8 col-md-offset-2">
                        <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination" }
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}/>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className ="col-md-2"></div>
                        <div className ="col-md-8">
                            <span style={{fontWeight:500, fontSize:15}}>Sumber Dana</span>
                            <div className='box-sumber-dana mb-3'>
                                <div className='d-flex flex-row'>
                                    <FaCreditCard className='icon-card mr-3'/>
                                    <div>
                                        <span className='font-weight-bold'>Minyak Belog Cash</span> <br/>
                                        <span className='font-smaller'>Balance {Rupiah(point)}</span>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div className ="col-md-2"></div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className ="col-md-2"></div>
                        <div className ="col-md-8">
                        <span style={{fontWeight:500, fontSize:13}}>Nominal Transfer</span>
                            <div className="mb-3">
                                <input className="form-control" type="number" style={{padding:20}} onChange={(value) =>  setForm({...form, amount : value.target.value})} minLength={0} />
                            </div>
                        </div>
                        <div className ="col-md-2"></div>
                    </div>
                </div>
                <div className="login">
                    <div className="mb-3">
                        <button onClick={() => {if(window.confirm('Transfer sekarang ?')){handleTransfer()};}}   className="button1" type="button">Transfer</button>
                        {/* <button onClick={() =>console.log(form) }   className="button1" type="button">Testtt</button> */}
                    </div>     
                </div>
            </div>
            
              
            <Footer/>
        </Fragment>
    )
}

export default Transfer