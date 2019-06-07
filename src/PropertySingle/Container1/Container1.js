import React, {Component} from 'react';
import Slider from "react-slick";
// import "./container1.css";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { config } from '../../config';


class container1 extends Component {
    constructor(props) {
        super(props);
        this.images = this.props.property.images;
        this.state = {
            nav1: null,
            nav2: null,
            photoIndex: 0,
            isOpen: false,
        };
    }
    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2,
            photoIndex: 0,
            isOpen: false,
        });
    }


    render() {
        const settings = {
            slidesToShow: 6,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            centerMode: false,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 993,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                    }
                }
            ]
        };
        const settings2 = {
            slidesToShow: 1,
            responsive: [
                {
                    breakpoint: 1367
                },
                {
                    breakpoint: 993,
                    settings: {
                        centerPadding: '0'
                    }
                }
            ]
        };
        const { photoIndex, isOpen } = this.state;
        return (
            <div className="container" style={{width : '100%'}}>
                <div className="row margin-bottom-50">
                    <div className="col-md-12">
                        {/*Slider*/}
                        <div className="property-slider default">
                            <Slider {...settings2}
                                    asNavFor={this.state.nav2}
                                    ref={slider => (this.slider1 = slider)}
                            >
                            {
                                this.props.property.images.length>0
                                ?this.props.property.images.map((image, index)=>
                                <div className="item mfp-gallery" key={index}>
                                    <img 
                                        onClick={ () => this.setState({ isOpen: true, photoIndex: index }) } 
                                        src={config.baseMediaUrl+image} 
                                        alt="" 
                                        onError={()=>this.src='images/no-priview.jpg'}
                                    />
                                </div>)
                                :null
                            }
                            </Slider>
                            {isOpen && (
                                <Lightbox
                                    mainSrc={config.baseMediaUrl+this.images[photoIndex]}
                                    nextSrc={config.baseMediaUrl+this.images[(photoIndex + 1) % this.images.length]}
                                    prevSrc={config.baseMediaUrl+this.images[(photoIndex + this.images.length - 1) % this.images.length]}
                                    onCloseRequest={() => this.setState({isOpen: false} )}
                                    onMovePrevRequest={() =>
                                        this.setState({
                                            photoIndex: (photoIndex + this.images.length - 1) % this.images.length,
                                        })
                                    }
                                    onMoveNextRequest={() =>
                                        this.setState({
                                            photoIndex: (photoIndex + 1) % this.images.length,
                                        })
                                    }
                                />
                            )}
                        </div>
                        {/*Slider Thumbs*/}
                        <div className="property-slider-nav">
                            <Slider {...settings}
                                    asNavFor={this.state.nav1}
                                    ref={slider => (this.slider2 = slider)}
                            >
                            {
                                this.props.property.images.length>0
                                ?this.props.property.images.map((image, index)=>
                                <div className="item" key={index}>
                                    <img src={config.baseMediaUrl+image} alt="" 
                                        onError={()=>this.src='images/no-priview.jpg'}
                                    />
                                </div>)
                                :null
                            }
                            </Slider>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default container1;