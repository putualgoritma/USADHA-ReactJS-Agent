import React, { Fragment } from 'react'


function Spinner(props) {
      return (
          <Fragment>
                  <div className='spinner animated' style={{height:'100vh', backgroundColor:'white'}}/>
                  <h1>{props.info}</h1>
          </Fragment>
      )
}

export default Spinner
