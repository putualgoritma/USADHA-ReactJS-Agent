import React,{Fragment, useEffect, useState} from "react";
import { Header,Footer,Spinner } from "../../component";
import API from '../../services';
import { Source } from '../../services/Config';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router';
import { profile } from '../../assets';
import { Button } from "rsuite";


const Test=()=>{
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [TOKEN, setTOKEN] = useState(null)
    const [USER, setUSER] = useState(null)
    const [offset, setOffset] = useState(0)
    const [perPage, setpPerPage] =  useState(9)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    var [postData, setPostData] = useState([])
    const [select, setSelect] = useState(null)
    const [slice, setSlice] = useState(null)
    const [selectedPage,setSelectedPage] = useState(0)
    const [form, setForm] = useState({
        per_page :9,
        page:1
    })
    const [filter, setFilter] = useState({
        filter : null
       
    })
    // const [filter,setFilter]=useState(null);

    
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
    useEffect(async() => {
        let isAmounted = false
        let tokenData = await getTOKEN();
        let userData = await getUSER();
            if(userData!== null && tokenData !==null){
                Promise.all([API.memberlist(form,tokenData)]) 
                .then((result) => {
                    console.log(result)
                    setData(result[0].data.data);
                    setPageCount(Math.ceil(result[0].data.total/perPage),postData)
                    setLoading(false)
                }).catch((e) => {
                        console.log(e);
                        setLoading(false)
                    })
            }else{
                alert('mohon login terlebih dahulu')
                history.push('/login')
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

if(loading){
    return (
          <Spinner/>
    )
}
    return(
    <Fragment>
        <Header/>
            <div className="container">
                <div className="container-fluid">
                    <div className ="row">
                   
                    <div className="row mb-2">
                        <div className="col-md-4 col-md-offset-1">
                                <input
                                className="form-control"
                                placeholder="Masukan Nama"
                                onChange={e => setFilter({ filter: e.target.value })}/>
                        </div>
                        <div className="col-md-1 ">
                            <button
                                className="button2"
                                type='submit'
                                onClick={() => {handleFilter()}
                                }>
                                Filter
                            </button>
                        </div>
                    </div>
  
                        {data.map((pd ,index)=>(
                            <div className='col-6 col-md-4' key={pd.id} onClick={() => setSelect(pd.id)}>
                                <div style={{backgroundColor : (select == pd.id ?  '#F3C242' : ''), paddingTop:15, paddingBottom:15, borderRadius:10}}>
                                    <div className='text-center'>
                                        <img src={profile} style={{width:110, height:100}} />
                                    </div>
                                    <p>{pd.id}</p>
                                    <p>{pd.name .length > 52 ? pd.name.substr(0,49)+ "...":pd.name}</p>
                                    <p>{pd.phone}</p>
                                    <p>{pd.address.length > 52 ? pd.address.substr(0,49)+ "...":pd.address}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}/>
                    </div>
                    {/* <Button onClick={()=>{console.log(filter.filter)}}>TESS</Button> */}
                    </div>
            </div>
        <Footer/>
    </Fragment>
    )
}

export default Test