import React, { Component } from "react";
import * as $ from 'jquery';
class BlogNewsContainer extends Component {

  constructor(){
    super()
    this.state = {};
  }
  componentDidMount(){
    $(".some-classes, section.fullwidth, .img-box-background, .flip-banner, .property-slider .item, .fullwidth-property-slider .item, .fullwidth-home-slider .item, .address-container").each(function() {
			var attrImageBG = $(this).attr('data-background-image');
			var attrColorBG = $(this).attr('data-background-color');

	        if(attrImageBG !== undefined) {
	            $(this).css('background-image', 'url('+attrImageBG+')');
	        }

	        if(attrColorBG !== undefined) {
	            $(this).css('background', ''+attrColorBG+'');
	        }
		});
  }
    render() {
        return (
            <div>
            <section className="fullwidth margin-top-95 margin-bottom-0">

        <h3 className="headline-box">Blog & noticias</h3>

        <div className="container">
          <div className="row">

            <div className="col-md-4">

              <div className="blog-post">

                <a href="blog-post.html" className="post-img">
                  <img src="images/blog-post-01.jpg" alt="" />
                </a>

                <div className="post-content">
                  <h3><a href="/">8 Tips para encontrar tu nueva casa</a></h3>
                  <p>Nam nisl lacus, dignissim ac tristique ut, scelerisque eu massa. Vestibulum ligula nunc, rutrum in malesuada vitae. </p>

                  <a href="blog-post.html" className="read-more">Leer mas <i className="fa fa-angle-right"></i></a>
                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="blog-post">

                <a href="blog-post.html" className="post-img">
                  <img src="images/blog-post-02.jpg" alt="" />
                </a>

                <div className="post-content">
                  <h3><a href="/">Analysis de mercado 2019</a></h3>
                  <p>Nam nisl lacus, dignissim ac tristique ut, scelerisque eu massa. Vestibulum ligula nunc, rutrum in malesuada vitae. </p>

                  <a href="blog-post.html" className="read-more">Leer mas <i className="fa fa-angle-right"></i></a>
                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="blog-post">

                <a href="blog-post.html" className="post-img">
                  <img src="images/blog-post-03.jpg" alt="" />
                </a>

                <div className="post-content">
                  <h3><a href="/">¿Como conseguir un credito hipotecario?</a></h3>
                  <p>Nam nisl lacus, dignissim ac tristique ut, scelerisque eu massa. Vestibulum ligula nunc, rutrum in malesuada vitae. </p>

                  <a href="blog-post.html" className="read-more">Leer mas <i className="fa fa-angle-right"></i></a>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      <a href="/" className="flip-banner parallax" data-background="images/flip-banner-bg.jpg" data-color="#444" data-color-opacity="0.9" data-img-width="2500" data-img-height="1600">
        <div className="flip-banner-content">
          <h2 className="flip-visible">Ayudamos a que las personas y las propiedades se encuentren.</h2>
          <h2 className="flip-hidden">Ver Propiedades <i className="sl sl-icon-arrow-right"></i></h2>
        </div>
      </a>
      </div>
        );
    }
}
export default BlogNewsContainer;