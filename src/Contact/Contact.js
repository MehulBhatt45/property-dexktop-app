import React, {Component} from 'react';
import MapContainer from './MapContainer/MapContainer';
import FormContainer from './FormContainer/FormContainer';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount(){
        const script = document.createElement("script");
      script.src = `scripts/custom.js`;
      // script.async = true;
      document.body.appendChild(script);
    }

    render() {
        return (
            <React.Fragment>
		<Header />
                <MapContainer />
                <FormContainer/>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Contact;
