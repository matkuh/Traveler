import React, { Component } from "react";
import NavBar from "../components/NavBar"
import Post from "../components/Post"
import { Col, Row, Container } from "../components/Grid";
import CardPanel from "../components/CardPanel"
import HeadTitle from "../components/HeadTitle"
import SearchChip from "../components/SearchChips"
import Button from "../components/Button"
// import Footer from "../components/Footer"
// import SearchFor from "../components/SearchFor";
import Background from "../assets/bg9.jpg"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Feed from "../pages/Feed";


import M from "materialize-css";





// Utils

import API from "../Utils/API"
import { setServers } from "dns";

const divStyle = {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
};


const styles = {
    // position: 'fixed',
    left: '0',
    bottom: '0',
    marginTop: '30%',
    width: '100%',
    backgroundColor: '#2196f3',
    color: 'white',
    textAlign: 'center',
    opacity: '1'
}


class Discover extends Component {
    state = {
        user_id: this.props.user_id,
        tag: '',
        searched: false,
        posts: []
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    followUser = (id) => {
        console.log("WE FOLLOWED THE USER")
        // console.log(event.target.data("user_id"))
        const idPackage = {
            user_id: this.state.user_id,
            follow_id: parseInt(id)
        }
        console.log(idPackage)

        API.followUser(idPackage).then(res => console.log(res))

    }

    handleFormSubmit = event => {
        event.preventDefault()

        // added==================================
        // if (!this.state.tag) {
        //     // alert("don't refresh me");
        //     return false;
        // } else {
        //     // alert("yass");
        // }

        // end add==================================

        this.setState({ searched: true })
        var postQuery = this.state.tag
        console.log(postQuery)

        API.getPostSearch(postQuery).then(res => {
            console.log("Searched Posts xD")
            console.log(res)
            this.setState({
                posts: res.data,
            })
            // window.location.reload()
        })
    }

    handleChipClick = event => {
        event.preventDefault();

        this.setState({ searched: true })
        console.log("CLICKED SEARCH")
    }



    // For now until we figure out how to get posts based on tags!
    async componentDidMount() {
        M.Chips.init()
        if (this.state.searched === false) {
            console.log("DISCOVER PAGE")
            API.getPosts().then(res => {
                console.log(res.data)
                this.setState({
                    posts: res.data
                })
            })
        }
    }

    render() {
        return (
            <div style={divStyle}>

                <Container>
                    <HeadTitle>Discover</HeadTitle>
                    <Container>
                        <Row>

                            <div className="input-field col s12 bgSearchBar blue-text" >
                                <Col size="s10">
                                    <i className=" material-icons prefix" style={{ marginTop: "10px" }}>search</i>
                                    <input type="text" id="discoversearch" name="tag" value={this.state.tag} onChange={this.handleInputChange} />
                                    {/* <label htmlFor="autocomplete-input">Discover</label> */}
                                </Col>
                                <Col size="s2">
                                    <Button style={{ marginTop: "10px" }} onClick={this.handleFormSubmit}>
                                        <i className="material-icons">search</i>
                                    </Button>
                                </Col>
                            </div>

                        </Row>
                    </Container>
                    <Row>

                        {(this.state.posts.length) ? this.state.posts.map((post, i) => (
                            <SearchChip
                                key={i}
                                name="tag"
                                value={this.state.tag}
                                tag={post.tag}
                                user_id={post.user_id}
                                onClick={this.handleInputChange}
                            />
                        )) : "No Posts"}

                    </Row>
                    {/* <CardPanel> */}
                    <Container>
                        <Container>
                            {(this.state.posts.length) ? this.state.posts.map((post, i) => (
                                <Row className="center">

                                    <Post
                                        follow={true}
                                        followUser={this.followUser}
                                        key={i}
                                        title={post.title}
                                        info={post.info}
                                        location={post.location}
                                        tag={post.tag}
                                        user_id={post.user_id}
                                        image={post.image}
                                    />
                                </Row>

                            )) : "No Posts"}
                        </Container>

                    </Container>
                    {/* </CardPanel> */}

                </Container>
                {/* <BackgroundSlider images={[image4, image5, image6]} duration={5} transition={2} /> */}
                <CardPanel style={styles}></CardPanel>
            </div>
        );
    }



}

export default Discover;