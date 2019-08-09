import React, { Component } from 'react';
import CardPanel from '../CardPanel';
import { Col, Row, Container } from "../Grid";
import TextInput from './../TextInput/index';
import Button from "../Button";
import Date from "../Date";
import './style.css'
import HeadTitle from "../HeadTitle";

import M from 'materialize-css'

import axios from 'axios'


// import 'materialize-css/dist/css/materialize.min.css';
import Modal from "../Modal";
import Cookies from 'js-cookie'

// TESTING FOR AUTOCOMPLETE
import Autocomplete from "../AutocompleteLocation";
/* global google */

// Utils
import API from '../../Utils/API'


class CreatePost extends Component {
    state = {
        // added LOCATION AND TITLE 
        info: "",
        title: "",
        location: "",
        url: '',
        tag: '',
        user_id: '',
        lat: '',
        lng: '',
        image: '',

        // TESTING AUTOCOMPLETE
        place: {}

    }

    componentDidMount() {
        M.AutoInit();
    }

    // AUTOCOMPLETE
    showPlaceDetails(place) {
        this.setState({ place });
    }


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handlePicture = async e => {
        // e.preventDefault();
        console.log(e.target.files[0])

       

        let formData = new FormData();
        // formData.append("imageName", fileName + Date.now())
        formData.append('imageData', e.target.files[0])
        formData.append("imageName", e.target.files[0].name)
        console.log(e.target.files[0])

        

        axios.post("/api/feed", formData)
            .then((res) => {
                console.log(res)
                this.setState({
                    url : res.data.imageURL
                })
            })
        //     fileName: e.target.files[0].name
        // })
    }

    addPost = async event => {
        event.preventDefault();
        console.log("Add post begins")
        var postData = {
            info: this.state.info,
            // image: this.state.image,
            tag: this.state.tag,
            user_id: this.props.user_id,
            title: this.state.title,
            location: this.state.location,
            image: this.state.url,
            lat: this.state.lat,
            lng: this.state.lng,
        }
        console.log("POST DATA:", postData)
        API.newPost(postData)
            .then(response => {
                console.log(response)
                window.location.reload()
            })
    }

    render() {


        // AUTOCOMPLETE
        const AddressDetails = props => {
            return (
                <div>
                    {/* <pre>{JSON.stringify(props.place, null, 2)}</pre> */}
                    {/* <pre>{JSON.stringify(props.place, null, 4)}</pre> */}
                    {/* {console.log(props.place.address_components)} */}

                    {
                        typeof props.place.geometry !== 'undefined' ? console.log
                            //LATITUDE
                            // (props.place.geometry.location.lat() : console.log("Hey not now")
                            //LONGITUDE
                            (props.place.geometry.location.lng()) : console.log("Hey not now")
                    }

                </div>
            )
        };

return(
    // IF MODAL DOESN'T WORK WITH AUTOCOMPLETE
            // <div id="content">

            //     {/* USER ID */}
            //     <h2 value={this.state.user_id}></h2>
            //     {/* <Container> */}
            //         {/* <CardPanel style={{opacity: 1}}> */}
            //         <CardPanel>
            //             <HeadTitle style={{fontSize: "1.333rem"}}>Create a Post</HeadTitle>
            //             {/* <Container> */}
            //                 <form>
            //                     {/* <Date className="col s6" /> */}
            //                     {/* <TextInput>Where are you?</TextInput> */}
            //                     {/* AUTOCOMPLETE TESTING */}
            //                     <Autocomplete name='location' onPlaceChanged={this.showPlaceDetails.bind(this)} />
            //                     <AddressDetails name = "location" place={this.state.place} />

            //                     {/* <label htmlFor="location">Where are you?</label> */}

            //                     {/* <TextInput className="col s6">Title</TextInput> */}
            //                     <input placeholder="Title" id="title" name="title" type="text" className="validate" value={this.state.title} onChange={this.handleInputChange} />
            //                     {/* <label htmlFor="title">Title</label> */}


            //                     {/* <TextInput>Record Your Journey</TextInput> */}
            //                     <input placeholder="Record your journey" id="description" name="info" type="text" className="validate" value={this.state.info} onChange={this.handleInputChange} />
            //                     {/* COMMENTED OUT FOR NOW */}
            //                     {/* <label htmlFor="description">Record?</label> */}

            //                     <input placeholder="Tag" id="tag" name="tag" type="text" className="validate" value={this.state.tag} onChange={this.handleInputChange} />

            //                     <input placeholder="lat" id="lat" name="lat" type="text" className="validate" value={this.state.lat} onChange={this.handleInputChange} />
            //                     <input placeholder="lng" id="lng" name="lng" type="text" className="validate" value={this.state.lng} onChange={this.handleInputChange} />
            //                     <Button onClick={this.addPost} >Submit</Button>
            //                     </form>

            //                 </CardPanel>
                                
            //                 </div>
// IF MODAL DOENS'T WORK WITH AUTOCOMPLETE





// IF MODAL WORKS WITH AUTOCOMPLETE
<div>
                <Row>
                    <Container>
                        <Container>
                            <CardPanel>
                                <Row>
                                {/* <h6>Post About a Trip!</h6> */}
                                <a className=" waves-light btn-large modal-trigger blue" href="#modal1">Create Post</a>
                                </Row>
                            </CardPanel>
                        </Container>
                    </Container>
                </Row>
                <div id="modal1" className="modal">

                    {/* USER ID */}
                    <h2 value={this.state.user_id}></h2>
                    <Container>
                        <CardPanel>
                            <Container>
                                <form>
                                    {/* <Date className="col s6" /> */}
                                    {/* <TextInput>Where are you?</TextInput> */}
                                    {/* AUTOCOMPLETE TESTING */}
                                    <Row>
                                        <Col size="s6">
                                            <Autocomplete name='location' onPlaceChanged={this.showPlaceDetails.bind(this)} />
                                            <AddressDetails name="location" place={this.state.place} />
                                        </Col>

                                        {/* <label htmlFor="location">Where are you?</label> */}

                                        {/* <TextInput className="col s6">Title</TextInput> */}
                                        <Col size="s6">
                                            <input placeholder="Title" id="title" name="title" type="text" className="validate" value={this.state.title} onChange={this.handleInputChange} />
                                        </Col>
                                        {/* <label htmlFor="title">Title</label> */}
                                    </Row>

                                    <Row>
                                        {/* <TextInput>Record Your Journey</TextInput> */}
                                        <Col size="s6">
                                            <input placeholder="Record your journey" id="description" name="info" type="text" className="validate" value={this.state.info} onChange={this.handleInputChange} />
                                        </Col>
                                        {/* COMMENTED OUT FOR NOW */}
                                        {/* <label htmlFor="description">Record?</label> */}
                                        <Col size="s6">
                                            <input placeholder="Tag" id="tag" name="tag" type="text" className="validate" value={this.state.tag} onChange={this.handleInputChange} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col size="s6">
                                            <input placeholder="lat" id="lat" name="lat" type="text" className="validate" value={this.state.lat} onChange={this.handleInputChange} />
                                        </Col>
                                        <Col size="s6">
                                            <input placeholder="lng" id="lng" name="lng" type="text" className="validate" value={this.state.lng} onChange={this.handleInputChange} />
                                        </Col>
                                    </Row>




                                    {/* UPLOAD IMAGE */}
                                    <Row>
                                        <div className="file-field input-field">
                                        <div className="btn blue">
                                            <span>Upload Photo</span>
                                            <input
                                                type='file'
                                                onChange={this.handlePicture}
                                            />
                                            {/* <input type='file' onChange={this.handlePicture} ref={(ref) => { this.uploadInput = ref }} /> */}
                                        </div>
                                        <div className="file-path-wrapper">
                                            <input className="file-path validate" />
                                        </div>
                                    </div>
                                    </Row>

                                    {/* DANNY IMAGE */}
                                    {/* <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="Placeholder" id="image" type="text" className="validate" />
                            <label htmlFor="image">Image</label>
                        </div>
                    </div>  */}


                                    <Button onClick={this.addPost} >Submit</Button>
                                </form>
                            </Container>
                        </CardPanel>
                    </Container>

                </div>
            </div>

            
            )
        }
        
    }




export default CreatePost;