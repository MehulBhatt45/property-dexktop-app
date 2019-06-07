import React, { Component } from "react";

class LookingForContainer extends Component {
    render() {
        return (
            <section className="fullwidth margin-top-105" data-background-color="#f7f7f7">

        <h3 className="headline-box">¿Qué estás buscando?</h3>

        <div className="container">
          <div className="row">

            <div className="col-md-3 col-sm-6">
              <div className="icon-box-1">

                <div className="icon-container">
                  <i className="im im-icon-Office"></i>
                  <div className="icon-links">
                    <a href="listings-grid-standard-with-sidebar.html">Venta</a>
                    <a href="listings-grid-standard-with-sidebar.html">Renta</a>
                  </div>
                </div>

                <h3>Departamentos</h3>
                <p>Aliquam dictum elit vitae mauris facilisis, at dictum urna dignissim donec vel lectus vel felis.</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="icon-box-1">

                <div className="icon-container">
                  <i className="im im-icon-Home-2"></i>
                  <div className="icon-links">
                    <a href="listings-grid-standard-with-sidebar.html">Venta</a>
                    <a href="listings-grid-standard-with-sidebar.html">Renta</a>
                  </div>
                </div>

                <h3>Casas</h3>
                <p>Aliquam dictum elit vitae mauris facilisis, at dictum urna dignissim donec vel lectus vel felis.</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="icon-box-1">

                <div className="icon-container">
                  <i className="im im-icon-Car-3"></i>
                  <div className="icon-links">
                    <a href="listings-grid-standard-with-sidebar.html">Venta</a>
                    <a href="listings-grid-standard-with-sidebar.html">Renta</a>
                  </div>
                </div>

                <h3>Comercial</h3>
                <p>Aliquam dictum elit vitae mauris facilisis, at dictum urna dignissim donec vel lectus vel felis.</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="icon-box-1">

                <div className="icon-container">
                  <i className="im im-icon-Clothing-Store"></i>
                  <div className="icon-links">
                    <a href="listings-grid-standard-with-sidebar.html">Venta</a>
                    <a href="listings-grid-standard-with-sidebar.html">Renta</a>
                  </div>
                </div>

                <h3>Terrenos</h3>
                <p>Aliquam dictum elit vitae mauris facilisis, at dictum urna dignissim donec vel lectus vel felis.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
        );
    }
}
export default LookingForContainer;