import React, { Component } from 'react'
import "./Login.css";
import GoogleLogin from 'react-google-login';
import API from "../../utils/API";


export default class login extends Component {

    setUserData = ({ _id, email, name, googleId, imageUrl }) => {
        //this is the main id that we want to be using when quering the database
        localStorage.setItem("uniqueId", _id);
        localStorage.setItem("email", email);
        localStorage.setItem("name", name);
        localStorage.setItem("googleId", googleId);
        localStorage.setItem("imageUrl", imageUrl);
        localStorage.setItem("auth", true);
    }

    responseGoogle = (response) => {
        if (response.profileObj) {
            const { email, name, googleId, imageUrl } = response.profileObj;

            //set the local storage


            //we are currently searching the database for the google id
            //this determines if the user has created an account and at least
            //signed in for the first time
            API.findGoogleUser(googleId).then(res => {


                if (res.data.length) {
                    console.log("user found");
                    this.setUserData(res.data[0]);

                    //if user is found, we can redirect them to the home page
                    this.props.history.push("/home");
                } else {

                    //if user is not found, we need to create them before sending them to the home page
                    console.log("user not found");


                    //create object to send to database
                    var newUser = {
                        email: email,
                        name: name,
                        googleId: googleId,
                        imageUrl: imageUrl
                    };


                    API.createGoogleUser(newUser).then(res => {
                        //we are going to call the function that sends over the newly created user data
                        //we are going to local storage their data
                        this.setUserData(res.data);
                        //redirect to the home page
                        this.props.history.push("/home");
                    });
                }
            })




            // //we need to check if the user exists

            // this.props.history.push("/home");

        } else {
            //if we get nothing back, keep user on this page
            //and delete there data
            localStorage.clear();
            this.props.history.push("/");
        }


    }

    render() {
        return (
            <div className="wrapper">
                <div className="center">
                    <GoogleLogin
                        clientId="1091759121186-ulnjhhnlut7t1tf8ts0ntl7ktsv99sl4.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle} />
                </div>
            </div>
        )
    }
}
