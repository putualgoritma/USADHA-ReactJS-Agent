import React, {Fragment,Component,useState} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


function GoogleMaps(props) {
  const [myMarkers,setMymarkers]= useState([
        {lat: 47.49855629475769, lng: -122.14184416996333},
        {latitude: 47.359423, longitude: -122.021071},
        {latitude: 47.2052192687988, longitude: -121.988426208496},
        {latitude: 47.6307081, longitude: -122.1434325},
        {latitude: 47.3084488, longitude: -122.2140121},
        {latitude: 47.5524695, longitude: -122.0425407}
  ])

 const displayMarkers = () =>{
    return myMarkers.map((mark,index)=>{
      return <Marker id={index} position={{lat:mark.latitude, lng:mark.longitude}}
      onClick={()=> console.log("You clicked me!", {index})}
      />
    })
  }

//     return(
//        <div style={{position:'relative', width:'50%',height:'1100px'}} className="Map">
//          <Map google={props.google} zoom={13} styles={mapStyles.styles} initialCenter={{lat:40.7812, lng: -73.9665}} disableDefaultUI= {true}> {displayMarkers()}</Map>
//        </div>
//     )
const mapStyles = {
  width: '100%',
  height: '100%',
};
      return (
        <Map
          google={props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        >
          {displayMarkers()}
        </Map>
      );
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyB_nXYwbS7kPBrD0oBccTVsMk1L60elHcA'
})(GoogleMaps)


