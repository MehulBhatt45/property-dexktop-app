import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { config } from '../../config'
import * as $ from 'jquery';
var loadjs = require('loadjs');
var sectionStyle = {
    backgroundImage: "url(images/cate-mex.jpeg)",
    backgroundAttachment: 'fixed',
    backgroundColor: "rgba(54, 56, 62, 0.45)"
  };
class ParallaxContainer extends Component {

  constructor(props){
    super(props);
    console.log(props)
    this.state = {
      propertyTypes: [{"title" : "Apartment"},{"title" : "House"},{"title" : "Commercial"},{"title" : "Garage"},{"title" : "Lot"}],
      query: {
        status: 'sale'
      },
      goSearch: false
    }
  }

  componentDidMount(){
		loadjs('/scripts/custom.js', ()=>{
      // $('.footer-shadow').css({'visibility': 'hidden'});
    });
  }

    render() {
      if(this.state.goSearch){
        return(
          <Redirect to={{
            pathname: '/property-search',
            state: { query: this.state.query }
        }}
/>
        )
      }
        return (
            <div className="parallax" style={sectionStyle} data-background="images/cate-mex.jpeg" data-color="#36383e" data-color-opacity="0.45" data-img-width="2500" data-img-height="1600">
        <div className="parallax-content">

          <div className="container">
            <div className="row">
              <div className="col-md-12">

                <div className="main-search-container">
                  <h2>Encuentra la casa de tus sueños</h2>

                  <form className="main-search-form">

                    <div className="search-type">
                      <label className="active"><input name="tab" type="radio" value="sale" onChange={(val)=>{
                        var query = {...this.state.query}
                        query['status'] = val.target.value;
                        this.setState({query: query})
                      }}/>Venta</label>
                      <label><input name="tab" type="radio" value="rent" onChange={(val)=>{
                        var query = {...this.state.query}
                        query['status'] = val.target.value;
                        this.setState({query: query})
                      }}/>Renta</label>
                      <div className="search-type-arrow"></div>
                    </div>


                    <div className="main-search-box">

                      <div className="main-search-input larger-input">
                        <input type="text" className="ico-01" id="autocomplete-input" placeholder="Escribe una ciudad, colonia o codigo postal. " defaultValue="" 
                        onChange={(val)=>{
                          var query = {...this.state.query};
                          console.log(query)
                          query['addrKey'] = val.target.value;
                          this.setState({query :query})
                        }}/>
                        <button className="button" onClick={()=>{
                          this.setState({
                            goSearch: true
                          })
                        }}>Buscar</button>
                        
                      </div>

                      <div className="row with-forms">

                        <div className="col-md-4">
                        <select data-placeholder="Tipo" className="chosen-select-no-single" onChange={(val)=>{
                          var query = {...this.state.query};
                          console.log(query)
                          query['stype'] = val.target.value;
                          this.setState({query :query})
                        }}>
                          <option value="">Any Type</option>
                          {
                            this.state.propertyTypes.map((type, index)=>
                              <option key={index} value={type.title}>{type.title}</option>    
                              )
                            }
                          </select>
                        </div>


                        <div className="col-md-4">

                          <div className="select-input">
                            <input type="text" placeholder="Precio Min" data-unit="MXN" onChange={(val)=>{
                              var query = {...this.state.query};
                              console.log(query)
                              query['minPrice'] = val.target.value;
                              this.setState({query :query})
                            }}/>
                          </div>

                        </div>


                        <div className="col-md-4">

                          <div className="select-input">
                            <input type="text" placeholder="Precio Max" data-unit="MXN" onChange={(val)=>{
                              var query = {...this.state.query};
                              console.log(query)
                              query['maxPrice'] = val.target.value;
                              this.setState({query :query})
                            }}/>
                          </div>

                        </div>

                      </div>

                      <button className="more-search-options-trigger margin-top-10" data-open-title="More Options" data-close-title="Less Options"></button>

                      <div className="more-search-options">
                        <div className="more-search-options-container">

                          <div className="row with-forms">

                            <div className="col-md-6">

                              <div className="select-input">
                                <input type="text" placeholder="m&sup2; min" data-unit="m&sup2;" onChange={(val)=>{
                              var query = {...this.state.query};
                              console.log(query)
                              query['minArea'] = val.target.value;
                              this.setState({query :query})
                            }}/>
                              </div>

                            </div>

                            <div className="col-md-6">

                              <div className="select-input">
                                <input type="text" placeholder="m&sup2; max" data-unit="m&sup2;" onChange={(val)=>{
                              var query = {...this.state.query};
                              console.log(query)
                              query['maxArea'] = val.target.value;
                              this.setState({query :query})
                            }}/>
                              </div>

                            </div>

                          </div>


                          <div className="row with-forms">

                            <div className="col-md-6">
                              <select data-placeholder="Camas" className="chosen-select-no-single" onChange={(val)=>{
                              var query = {...this.state.query};
                              console.log(query)
                              query['bedrooms'] = val.target.value;
                              this.setState({query :query})
                            }}>
                                <option label="blank"></option>
                                <option>Camas</option>
                                <option>1+</option>
                                <option>2+</option>
                                <option>3+</option>
                                <option>4+</option>
                                <option>5+</option>
                              </select>
                            </div>

                            <div className="col-md-6">
                              <select data-placeholder="Baños" className="chosen-select-no-single" onChange={(val)=>{
                              var query = {...this.state.query};
                              console.log(query)
                              query['bathrooms'] = val.target.value;
                              this.setState({query :query})
                            }}>
                                <option label="blank"></option>
                                <option>Baños</option>
                                <option>1+</option>
                                <option>2+</option>
                                <option>3+</option>
                                <option>4+</option>
                                <option>5+</option>
                              </select>
                            </div>

                          </div>

                        </div>
                      </div>


                    </div>

                  </form>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
        );
    }
}
export default ParallaxContainer;