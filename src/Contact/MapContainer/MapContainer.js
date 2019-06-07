import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class mapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    getGoogleMaps() {
        console.log("this.googleMapsPromise in contact page line 10=========================>",this.googleMapsPromise)
        if (!this.googleMapsPromise) {
            this.googleMapsPromise = new Promise((resolve) => {
                window.resolveGoogleMapsPromise = () => {
                    // eslint-disable-next-line no-undef
                    resolve(google);
                    delete window.resolveGoogleMapsPromise;
                };
                const script = document.createElement("script");
                const API = 'AIzaSyAKT-kn9iwKJgBidjQy_H89TxZud5ZQK00';
                script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
                script.async = true;
                document.body.appendChild(script);
            });
        }
        return this.googleMapsPromise;
    }

    componentWillMount() {
        this.getGoogleMaps();
    }

    componentDidMount() {
        this.getGoogleMaps().then((google) => {
            const uluru = {lat: 19.429367, lng: -99.209006};
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: uluru
            });
            new google.maps.Marker({
                position: uluru,
                map: map
            });
        });
    }

    render() {
        return (
            <div>
                <div className="contact-map margin-bottom-55">
                    {/*Google Maps*/}
                    <div className="google-map-container">
                        <div id="map"  />
                        <NavLink to="#" id="streetView">Street View</NavLink>
                    </div>
                    {/*Google Maps / End*/}
                    {/*Office*/}
                    <div className="address-box-container">
                        <div className="address-container" data-background-image="/images/our-office.jpg">
                            <div className="office-address">
                                <h3>Corporativo</h3>
                                <ul>
                                    <li>Montes Urales 320</li>
                                    <li>Lomas de Chapultepec</li>
                                    <li>CDMX, 11000</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*Office / End*/}
                </div>
            </div>
        );
    }
}

export default mapContainer;