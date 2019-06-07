import React, { Component } from "react";

class MostSearch extends Component {
    render() {
        return (
            <div className="container">
              <div className="row">

                <div className="col-md-12">
                  <h3 className="headline centered margin-bottom-35 margin-top-10">Colonias mas buscadas <span>Encuentra propiedades en las mejores zonas.</span></h3>
                </div>

                <div className="col-md-4">

                  <a href="listings-list-with-sidebar.html" className="img-box" data-background-image="images/popular-location-01.jpg">

                    <div className="listing-badges">

                    </div>

                    <div className="img-box-content visible">
                      <h4>Lomas de Chapultepec </h4>
                      <span>14 Propiedades</span>
                    </div>
                  </a>

                </div>

                <div className="col-md-8">

                  <a href="listings-list-with-sidebar.html" className="img-box" data-background-image="images/popular-location-02.jpg">
                    <div className="img-box-content visible">
                      <h4>Condesa</h4>
                      <span>24 Propiedades</span>
                    </div>
                  </a>

                </div>

                <div className="col-md-8">

                  <a href="listings-list-with-sidebar.html" className="img-box" data-background-image="images/popular-location-03.jpg">
                    <div className="img-box-content visible">
                      <h4>Polanco </h4>
                      <span>12 Propiedades</span>
                    </div>
                  </a>

                </div>

                <div className="col-md-4">

                  <a href="listings-list-with-sidebar.html" className="img-box" data-background-image="images/popular-location-04.jpg">
                    <div className="img-box-content visible">
                      <h4>Santa Fe</h4>
                      <span>9 Propiedades</span>
                    </div>
                  </a>

                </div>

              </div>
            </div>
        );
    }
}
export default MostSearch;