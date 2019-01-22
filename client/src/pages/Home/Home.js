import React, { Component } from 'react'


export default class home extends Component {

    state = {
        auth: false,
        name: "",
        email: "",
        uniqueId: "",
        imageUrl: ""
    }
    componentDidMount() {
        var auth = localStorage.getItem("auth");
        var name = localStorage.getItem("name");
        var email = localStorage.getItem("email");
        var uniqueId = localStorage.getItem("uniqueId");
        var imageUrl = localStorage.getItem("imageUrl");

        if (auth && name && email && uniqueId && imageUrl) {
            this.setState({
                auth: auth,
                name: name,
                email: email,
                uniqueId: uniqueId,
                imageUrl: imageUrl
            })
        } else {
            // this is how we redirect to a different page
            this.props.history.push("/");
        }

    }
    logout = () => {
        localStorage.clear();
        this.props.history.push("/");

    }

    render() {
        return (
            <div className="jumbotron text-center">
                <h2>{this.state.name}</h2>

                <button onClick={this.logout} type="button" className="btn btn-warning">Log Out</button>


            </div>
        )
    }
}
