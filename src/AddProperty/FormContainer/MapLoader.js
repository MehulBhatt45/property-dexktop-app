import React from "react"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const { compose, withProps, lifecycle } = require("recompose");
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

export const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAKT-kn9iwKJgBidjQy_H89TxZud5ZQK00&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
            console.log(state, places, this.props);
            this.setState(prevState => {
              const markers = [...state.markers];
              markers[0] = { ...markers[0], position: { lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng() } };
              return { markers };
            });
          state.markers[0].position.lat = places[0].geometry.location.lat();
          state.markers[0].position.lng = places[0].geometry.location.lng();
          this.props.onSelectLocation(state.markers[0].position)
        },
      })
    },
  }),
  withScriptjs  
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Type your adderss or city here"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox> 
  </div> 
);

var state = {
  markers: [
    {
      name: "Current position",
      position: {
        lat: 37.77,
        lng: -122.42
      }
    }
  ]
};
var handleLocation = (lang, props)=>{
  props.onSelectLocation(lang);
}

var onMarkerDragEnd = (coord, props) => {
  const { latLng } = coord;
  const lat = latLng.lat();
  const lng = latLng.lng();
  console.log(lat, lng);
  state.markers[0].position = { lat, lng };
  handleLocation(state.markers[0].position, props);
};

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    zoom={15}
    center={props.position.lat?props.position:state.markers[0].position}
  >
          <Marker
            position={props.position.lat?props.position:state.markers[0].position}
            draggable={true}
            onDragEnd={(coord) =>{onMarkerDragEnd(coord, props)}}
            name={state.markers[0].name}
          />
  </GoogleMap>
));
export default MapWithAMarker;