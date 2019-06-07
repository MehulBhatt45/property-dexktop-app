import React, { Component } from "react";
import MapWithAMarker, { PlacesWithStandaloneSearchBox } from './MapLoader';
import DragAndDrop from '../DragAndDrop/DragAndDrop';
import { config } from '../../config';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { ReactIndexedDB } from 'react-indexed-db';
const async = require('async');
const shortid = require('shortid');
const _ = require('lodash');
const cpFile = require('cp-file');



class FormContainer extends Component {

    constructor(props) {
        super(props);
        this.db = new ReactIndexedDB('propertyDB', 1);
        console.log(this.props);
        this.state = {
            isLoading: false,
            toHome: false,
            title: "",
            status: "",
            price: "",
            currency: "USD",
            images: [],
            location: {
                address: "",
                city: "",
                state: "",
                zipcode: "",
                neighborhood: ""
            },
            geoLocation: {
                "type": "Point",
                "coordinates": []
            },
            description: "",
            floorDescription: "",
            floorPlanImages: [],
            attributes: {
                area: {
                    number: "",
                    unit: ""
                },
                stype: "",
                rooms: "",
                buildingAge: "",
                bedrooms: null,
                bathrooms: null,
                hasKitchen: false,
                hasJacuzzi: false,
                hasParking: false,
                hasSecurity: false,
                hasAirConditioning: false,
                hasGarden: false,
                hasSwimmingPool: false,
                hasCentralHeating: false,
                hasLaundryRoom: false,
                hasGym: false,
                hasAlarm: false,
                hasWindowCovering: false,
            },
            files: [],
            propertyTypes: [{ "title": "Apartment" }, { "title": "House" }, { "title": "Commercial" }, { "title": "Garage" }, { "title": "Lot" }],
            floorImages: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleFloorFileChange = this.handleFloorFileChange.bind(this);
    }

    handleFloorFileChange(e) {
        this.setState({
            floorPlanImages: e.target.files
        })
    }

    componentDidMount() {
        this.db.openDatabase(1, evt => {
            evt.currentTarget.result.createObjectStore('property', { keyPath: '_id', autoIncrement: true });
        });
        if (this.props.isEdit) {
            this.db.openDatabase(1).then(() => {
                this.db.getByKey('property', this.props.property).then(property => {
                    console.log(property);
                    this.setState(property);
                }, err => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    handleDrop = (files) => {
        let fileList = this.state.files
        for (var i = 0; i < files.length; i++) {
            if (!files[i].name) return
            fileList.push(files[i])
        }
        console.log(fileList);
        this.setState({ files: fileList })
    }


    handleLocation = (langValue) => {
        console.log(langValue)
        var location = this.state.geoLocation;
        console.log(location);
        location.coordinates[0] = langValue.lat;
        location.coordinates[1] = langValue.lng;
        location.coordinates.reverse();
        this.setState({ geoLocation: location })
    }

    addToDB(payload) {
        console.log('Images: ', payload.images);
        console.log('floorImages: ', payload.floorImages);

        this.db.add('property', payload)
        .then(() => {
            swal("Successfull!", "Your property has been listed successfully.", "success", {
                buttons: {
                    "Another": true,
                    "Home": true,
                },
            }).then((value) => {
                switch (value) {

                    case "Another":
                    window.location.reload();
                    break;

                    case "Home":
                    this.setState({toHome: true})
                    break;

                    default:
                    window.location.reload();
                }
            });
            this.setState({isLoading:false});
            // window.location.reload();
        },error => {
            console.log(error);
        });
    }

    editToDB(payload) {
        this.db.update('property', payload)
            .then(() => {
                swal({
                    title: "Updated!",
                    text: "You updated property successfully!",
                    icon: "success",
                    button: true
                });
                this.setState({ isLoading: false });
                // window.location.reload();
            }, error => {
                console.log(error);
            });
    }

    handleEditSubmit(event) {
        this.setState({ isLoading: true });
        var data = new FormData();
        const { attributes, currency, description, images, location, price, status, title, geoLocation, floorImages, floorDescription } = this.state;
        const payload = { attributes, currency, description, images, location, price, status, title, geoLocation, floorImages, floorDescription };
        payload['_id'] = this.props.property;
        console.log(payload);
        data.append("property", JSON.stringify(payload));
        this.db.update('property', payload)
            .then(() => {
                if (this.state.files.length > 0) {
                    this.uploadPropertyImage(payload, true)
                } else if (this.state.floorPlanImages.length > 0) {
                    this.uploadFloorImage(payload, true);
                } else {
                    swal({
                        title: "Updated!",
                        text: "You updated property successfully!",
                        icon: "success",
                        button: true
                    });
                    this.setState({ isLoading: false });
                    // window.location.reload();
                }
            }, error => {
                console.log(error);
            }
            );
    }

    handleSubmit(event) {
        if (this.state.title &&
            this.state.attributes.stype &&
            this.state.status &&
            this.state.price &&
            this.state.attributes.area.number &&
            this.state.attributes.rooms &&
            this.state.location.address &&
            this.state.location.city &&
            this.state.location.state &&
            this.state.location.zipcode &&
            this.state.geoLocation.coordinates.length > 0) {
            // console.log(this.state);
            this.setState({ isLoading: true });
            var data = new FormData();
            const { attributes, currency, description, images, location, price, status, title, floorDescription, geoLocation, floorImages } = this.state;
            var payload = { attributes, currency, description, images, location, price, status, title, floorDescription, geoLocation, floorImages };
            payload['_id'] = shortid.generate();
            // console.log(payload);
            data.append("property", JSON.stringify(payload));
            if (this.state.files.length > 0) {
                this.uploadPropertyImage(payload)
            } else if (this.state.floorPlanImages.length > 0) {
                this.uploadFloorImage(payload);
            } else {
                this.addToDB(payload)
            }
        } else {
            swal({
                title: "Error!",
                text: "Fill up all requird fields",
                icon: "error",
                button: true
            });
        }
    }

    uploadPropertyImage(payload, isEdit = false) {
        console.log('uploadPropertyImage clalled');
        // var downloadPath = _.startsWith(this.state.files[0].path, '/') ? '/home/rao/Pictures/rojkind/property/' : 'C:\\rojkind\\property\\';
        async.eachSeries(this.state.files, (singlefile, callback) => {
            cpFile(singlefile.path, config.uploadPath + payload._id + "/" + singlefile.name).then((succssimg) => {
                payload.images.push(payload._id + "/" + singlefile.name);
                callback();
            }).catch((errorImage) => {
                console.log('erro iagems: ', errorImage);
                callback();
            });
        }, (error, repsonse) => {
            if (error) {
                console.log('final Error: ', error);
            } else if (this.state.floorPlanImages.length) {
                this.uploadFloorImage(payload, isEdit);
            } else if (isEdit) {
                this.editToDB(payload)
            } else {
                console.log('finally we here: ', payload.images);
                this.addToDB(payload);
            }
        });
    }

    uploadFloorImage(payload, isEdit = false) {
        console.log('uploadFloorImage clalled');
        async.eachSeries(this.state.floorPlanImages, (singlefile, callback) => {
            cpFile(singlefile.path, config.uploadPath + payload._id + "/floor/" + singlefile.name).then((succssimg) => {
                payload.floorImages.push(payload._id + "/floor/" + singlefile.name);
                callback();
            }).catch((errorImage) => {
                console.log('erro iagems: ', errorImage);
                callback();
            });
        }, (error, repsonse) => {
            if (error) {
                console.log('final Error: ', error);
            } else if (isEdit) {
                this.editToDB(payload)
            } else {
                console.log('finally we here: ', payload.floorImages);
                this.addToDB(payload);
            }
        });
    }

    render() {
        if (this.state.toHome === true) {
            return <Redirect to='/home' />
        }
        if (this.state.isLoading === true) {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height="100"
                        width="100"
                    />
                </div>
            );
        }
        return (
            <div className="container">
                <div className="row">

                    <div className="col-md-12">
                        <div className="submit-page">

                            {/* <div className="notification notice large margin-bottom-55">
                            <h4>Don't Have an Account?</h4>
                            <p>If you don't have an account you can create one by entering your email address in contact details section. A password will be automatically emailed to you.</p>
                        </div> */}

                            <h3>Basic Information</h3>
                            <div className="submit-section">

                                <div className="form">
                                    <h5>Property Title <i className="tip" data-tip-content="Type title that will also contains an unique feature of your property (e.g. renovated, air contidioned)"></i> <span>(*required)</span></h5>
                                    <input placeholder="Enter property title" className="search-field" type="text" name="title" value={this.state.title} onChange={(val) => { this.setState({ title: val.target.value }) }} />
                                </div>

                                <div className="row with-forms">

                                    <div className="col-md-6">
                                        <h5>Status <span>(*required)</span></h5>
                                        <select name="status" value={this.state.status} onChange={(val) => { this.setState({ status: val.target.value }) }}>
                                            <option label="blank"></option>
                                            <option value="sale">For Sale</option>
                                            <option value="rent">For Rent</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <h5>Type <span>(*required)</span></h5>
                                        <select name="type" value={this.state.attributes.stype} onChange={(val) => {
                                            var attribute = { ...this.state.attributes };
                                            attribute.stype = val.target.value;
                                            this.setState({ attributes: attribute })
                                        }}>
                                            <option label="blank"></option>
                                            {
                                                this.state.propertyTypes.map((type, index) =>
                                                    <option key={index} value={type.title}>{type.title}</option>
                                                )
                                            }
                                        </select>
                                    </div>

                                </div>


                                <div className="row with-forms">

                                    <div className="col-md-4">
                                        <h5>Price <i className="tip" data-tip-content="Type overall or monthly price if property is for rent"></i> <span>(*required)</span></h5>
                                        <div className="select-input disabled-first-option">
                                            <input placeholder="Enter price USD" type="text" data-unit="USD" name="price" value={this.state.price} onChange={(val) => { this.setState({ price: val.target.value }) }} />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <h5>Area <span> (*required)</span></h5>
                                        <div className="select-input disabled-first-option">
                                            <input placeholder="Enter area m&sup2;" type="text" data-unit="m&sup2;" name="area" value={this.state.attributes.area.number} onChange={(val) => {
                                                var attribute = { ...this.state.attributes };
                                                attribute.area.number = val.target.value;
                                                attribute.area.unit = "m2";
                                                this.setState({ attributes: attribute })
                                            }} />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <h5>Rooms <span>(*required)</span></h5>
                                        <select name="rooms" value={this.state.attributes.rooms} onChange={(val) => {
                                            var attribute = { ...this.state.attributes };
                                            attribute.rooms = val.target.value;
                                            this.setState({ attributes: attribute })
                                        }}>
                                            <option label="blank"></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="More than 5">More than 5</option>
                                        </select>
                                    </div>

                                </div>

                            </div>

                            {
                                this.props.isEdit
                                    ? <div style={{ display: 'flex', flexWrap: 'wrap', margin: 5 }}>
                                        {
                                            this.state.images.map((image, index) =>
                                                <div className="item" key={index}>
                                                    <img src={config.baseMediaUrl + image} alt=""
                                                        onError={() => this.src = 'images/no-priview.jpg'}
                                                        style={{ height: 200, margin: 5 }}
                                                    />
                                                </div>)
                                        }
                                    </div>
                                    : null
                            }


                            <h3>Property Images(drop file below or click to open file chooser)</h3>
                            <div className="col-12">
                                <DragAndDrop handleDrop={this.handleDrop}>
                                    <div style={{ height: 300, width: '100%' }}>
                                        {this.state.files.map((file, i) =>
                                            <div key={i}>{file.name}</div>
                                        )}
                                    </div>
                                </DragAndDrop>
                            </div>
                            {/* <div className="submit-section">
                            <form action="/file-upload" className="dropzone" ></form>
                        </div> */}
                            {
                                this.props.isEdit
                                    ? <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {
                                            this.state.floorImages.map((image, index) =>
                                                <div className="item" key={index}>
                                                    <img src={config.baseMediaUrl + image} alt=""
                                                        onError={() => this.src = 'images/no-priview.jpg'}
                                                        style={{ height: 200 }}
                                                    />
                                                </div>)
                                        }
                                    </div>
                                    : null
                            }

                            <h3>Floor Plan Detailed Information</h3>
                            <div className="form">
                                <h5>Floor Plan Description</h5>
                                <textarea className="WYSIWYG" name="desc" cols="40" rows="3" id="summary" spellCheck="true" value={this.state.floorDescription} onChange={(val) => {
                                    this.setState({ floorDescription: val.target.value })
                                }}></textarea>
                            </div>
                            <input placeholder="Add Images of Floor Plan" type="file" id="file" multiple onChange={this.handleFloorFileChange} />


                            <h3>Location</h3>
                            <div className="submit-section">

                                <div className="row with-forms">

                                    <div className="col-md-6">
                                        <h5>Address <span>(*required)</span></h5>
                                        <input type="text" name="address" value={this.state.location.address} onChange={(val) => {
                                            var location = { ...this.state.location };
                                            location.address = val.target.value;
                                            this.setState({ location })
                                        }} />
                                    </div>

                                    <div className="col-md-6">
                                        <h5>City <span>(*required)</span></h5>
                                        <input type="text" name="city" value={this.state.location.city} onChange={(val) => {
                                            var location = { ...this.state.location };
                                            location.city = val.target.value;
                                            this.setState({ location })
                                        }} />
                                    </div>

                                    <div className="col-md-6">
                                        <h5>State <span>(*required)</span></h5>
                                        <input type="text" name="state" value={this.state.location.state} onChange={(val) => {
                                            var location = { ...this.state.location };
                                            location.state = val.target.value;
                                            this.setState({ location })
                                        }} />
                                    </div>

                                    <div className="col-md-6">
                                        <h5>Zip-Code <span>(*required)</span></h5>
                                        <input type="text" name="pincode" value={this.state.location.zipcode} onChange={(val) => {
                                            var location = { ...this.state.location };
                                            location.zipcode = val.target.value;
                                            this.setState({ location })
                                        }} />
                                    </div>

                                    <div className="col-md-12">
                                        <PlacesWithStandaloneSearchBox
                                            onSelectLocation={this.handleLocation} /> <span>(*required )</span><span>Note: Drag and drop map marker to you location</span>
                                        <MapWithAMarker
                                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAKT-kn9iwKJgBidjQy_H89TxZud5ZQK00&v=3.exp&libraries=geometry,drawing,places"
                                            loadingElement={<div style={{ height: `100%` }} />}
                                            containerElement={<div style={{ height: `400px` }} />}
                                            mapElement={<div style={{ height: `100%` }} />}
                                            position={{ lat: Number(this.state.geoLocation.coordinates[1]), lng: Number(this.state.geoLocation.coordinates[0]) }}
                                            onSelectLocation={this.handleLocation}
                                        />
                                    </div>

                                    {/* <div className="col-md-6">
                                    <h5>Latitude</h5>
                                    <input type="text" name="lat" value={this.state.location.latitude} onChange={(val)=>{
                                        var location = {...this.state.location};
                                        location.latitude = val.target.value;
                                        this.setState({location})
                                    }}/>
                                </div>

                                <div className="col-md-6">
                                    <h5>Longitude</h5>
                                    <input type="text" name="lat" value={this.state.location.longitude} onChange={(val)=>{
                                        var location = {...this.state.location};
                                        location.longitude = val.target.value;
                                        this.setState({location})
                                    }}/>
                                </div> */}

                                </div>

                            </div>


                            <h3>Detailed Information</h3>
                            <div className="submit-section">

                                <div className="form">
                                    <h5>Description</h5>
                                    <textarea className="WYSIWYG" name="desc" cols="40" rows="3" id="summary" spellCheck="true" value={this.state.description} onChange={(val) => {
                                        this.setState({ description: val.target.value })
                                    }}></textarea>
                                </div>

                                <div className="row with-forms">

                                    <div className="col-md-4">
                                        <h5>Building Age <span>(optional)</span></h5>
                                        <select name="age" value={this.state.attributes.buildingAge} onChange={(val) => {
                                            var attribute = { ...this.state.attributes };
                                            attribute.buildingAge = val.target.value;
                                            this.setState({ attributes: attribute })
                                        }}>
                                            <option label="blank"></option>
                                            <option value="1 Years">0 - 1 Years</option>
                                            <option value="5 Years">0 - 5 Years</option>
                                            <option value="10 Years">0 - 10 Years</option>
                                            <option value="20 Years">0 - 20 Years</option>
                                            <option value="50 Years">0 - 50 Years</option>
                                            <option value="+50 Years">50 + Years</option>
                                        </select>
                                    </div>

                                    <div className="col-md-4">
                                        <h5>Bedrooms <span>(optional)</span></h5>
                                        <select name="beds" value={this.state.attributes.bedrooms ? this.state.attributes.bedrooms : ' '} onChange={(val) => {
                                            var attribute = { ...this.state.attributes };
                                            attribute.bedrooms = val.target.value;
                                            this.setState({ attributes: attribute })
                                        }}>
                                            <option label="blank"></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>

                                    <div className="col-md-4">
                                        <h5>Bathrooms <span>(optional)</span></h5>
                                        <select name="baths" value={this.state.attributes.bathrooms ? this.state.attributes.bathrooms : ' '} onChange={(val) => {
                                            var attribute = { ...this.state.attributes };
                                            attribute.bathrooms = val.target.value;
                                            this.setState({ attributes: attribute })
                                        }}>
                                            <option label="blank"></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>

                                </div>


                                <h5 className="margin-top-30">Other Features <span>(optional)</span></h5>
                                <div className="checkboxes in-row margin-bottom-20">

                                    <input id="check-2" type="checkbox" name="AirConditioning" checked={this.state.attributes.hasAirConditioning} onChange={(val) => {
                                        var attribute = { ...this.state.attributes };
                                        attribute.hasAirConditioning = val.target.checked;
                                        this.setState({ attributes: attribute })
                                    }} />
                                    <label htmlFor="check-2">Air Conditioning</label>

                                    <input id="check-3" type="checkbox" name="SwimmingPool" checked={this.state.attributes.hasSwimmingPool} onChange={(val) => {
                                        var attribute = { ...this.state.attributes };
                                        attribute.hasSwimmingPool = val.target.checked;
                                        this.setState({ attributes: attribute })
                                    }} />
                                    <label htmlFor="check-3">Swimming Pool</label>

                                    <input id="check-4" type="checkbox" name="CentralHeating" checked={this.state.attributes.hasCentralHeating} onChange={(val) => {
                                        var attribute = { ...this.state.attributes };
                                        attribute.hasCentralHeating = val.target.checked;
                                        this.setState({ attributes: attribute })
                                    }} />
                                    <label htmlFor="check-4">Central Heating</label>

                                    <input id="check-5" type="checkbox" name="LaundryRoom" checked={this.state.attributes.hasLaundryRoom} onChange={(val) => {
                                        var attribute = { ...this.state.attributes };
                                        attribute.hasLaundryRoom = val.target.checked;
                                        this.setState({ attributes: attribute })
                                    }} />
                                    <label htmlFor="check-5">Laundry Room</label>


                                    <input id="check-6" type="checkbox" name="Gym" checked={this.state.attributes.hasGym} onChange={(val) => {
                                        var attribute = { ...this.state.attributes };
                                        attribute.hasGym = val.target.checked;
                                        this.setState({ attributes: attribute })
                                    }} />
                                    <label htmlFor="check-6">Gym</label>

                                    <input id="check-9" type="checkbox" name="Jacuzzi" checked={this.state.attributes.hasJacuzzi} onChange={(val) => {
                                        var attribute = { ...this.state.attributes };
                                        attribute.hasJacuzzi = val.target.checked;
                                        this.setState({ attributes: attribute })
                                    }} />
                                    <label htmlFor="check-9">Jacuzzi</label>

                                    <input id="check-10" type="checkbox" name="Parking" checked={this.state.attributes.hasParking} onChange={(val) => {
                                        var attribute = { ...this.state.attributes };
                                        attribute.hasParking = val.target.checked;
                                        this.setState({ attributes: attribute })
                                    }} />
                                    <label htmlFor="check-10">Parking</label>

                                    <input id="check-11" type="checkbox" name="Kitchen" checked={this.state.attributes.hasKitchen} onChange={(val) => {
                                        var attribute = { ...this.state.attributes };
                                        attribute.hasKitchen = val.target.checked;
                                        this.setState({ attributes: attribute })
                                    }} />
                                    <label htmlFor="check-11">Kitchen</label>

                                    <input id="check-12" type="checkbox" name="Garden" checked={this.state.attributes.hasGarden} onChange={(val) => {
                                        var attribute = { ...this.state.attributes };
                                        attribute.hasGarden = val.target.checked;
                                        this.setState({ attributes: attribute })
                                    }} />
                                    <label htmlFor="check-12">Garden</label>

                                    <input id="check-13" type="checkbox" name="Security" checked={this.state.attributes.hasSecurity} onChange={(val) => {
                                        var attribute = { ...this.state.attributes };
                                        attribute.hasSecurity = val.target.checked;
                                        this.setState({ attributes: attribute })
                                    }} />
                                    <label htmlFor="check-13">Security</label>

                                    <input id="check-7" type="checkbox" name="Alarm" checked={this.state.attributes.hasAlarm} onChange={(val) => {
                                        var attribute = { ...this.state.attributes };
                                        attribute.hasAlarm = val.target.checked;
                                        this.setState({ attributes: attribute })
                                    }} />
                                    <label htmlFor="check-7">Alarm</label>

                                    <input id="check-8" type="checkbox" name="WindowCovering" checked={this.state.attributes.hasWindowCovering} onChange={(val) => {
                                        var attribute = { ...this.state.attributes };
                                        attribute.hasWindowCovering = val.target.checked;
                                        this.setState({ attributes: attribute })
                                    }} />
                                    <label htmlFor="check-8">Window Covering</label>

                                </div>

                            </div>


                            {/* <h3>Contact Details</h3>
                            <div className="submit-section">

                                <div className="row with-forms">

                                    <div className="col-md-4">
                                    <h5>Name</h5>
                                    <input type="text" name="name" value={this.state.name} onChange={(val)=>{}}/>
                                </div>

                                <div className="col-md-4">
                                    <h5>E-Mail</h5>
                                    <input type="text" name="email" value={this.state.email} onChange={(val)=>{}}/>
                                </div>

                                <div className="col-md-4">
                                    <h5>Phone <span>(optional)</span></h5>
                                    <input type="text" name="phone" value={this.state.phone} onChange={(val)=>{}}/>
                                </div>
                                    <div className="col-md-12">
                                        <h5>Agent <span>(*required)</span></h5>
                                        <select name="agent" value={this.state.agent._id} onChange={(val) => {
                                            this.setState({ agent: val.target.value })
                                        }}>
                                            <option label="blank"></option>
                                            {
                                                this.state.agents.map(agent =>
                                                    <option key={agent._id} value={agent._id}>{agent.name}</option>
                                                )
                                            }
                                        </select>
                                    </div>

                                </div>

                            </div> */}


                            <div className="divider"></div>
                            {
                                this.props.isEdit
                                    ? <button onClick={this.handleEditSubmit} className="button preview margin-top-5">Update <i className="fa fa-arrow-circle-right"></i></button>
                                    : <button onClick={this.handleSubmit} className="button preview margin-top-5">Add <i className="fa fa-arrow-circle-right"></i></button>
                            }

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
export default FormContainer;