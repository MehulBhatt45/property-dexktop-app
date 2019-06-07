import React, { Component } from "react";
import TileBar from './TileBar/TileBar';
import FormContainer from './FormContainer/FormContainer';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class AddProperty extends Component {
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = { isEdit: false, propertyId: null }
    }
    componentDidMount(){
        const script = document.createElement("script");
      script.src = `scripts/custom.js`;
      // script.async = true;
      document.body.appendChild(script);
        if(this.props.match.path.includes('edit-property')){
            this.setState({ isEdit: this.props.match.path.includes('edit-property'), propertyId: this.props.match.params.id })
        }
    }
    render() {
        return (
            <div>
            <Header />
                <TileBar isEdit={this.props.match.path.includes('edit-property')}/>
                <FormContainer isEdit={this.props.match.path.includes('edit-property')} property={this.props.match.params.id}/>
            <Footer />
            </div>
        );
    }
}
export default AddProperty;