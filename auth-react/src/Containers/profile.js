import React, {Component} from 'react';

import {connect} from 'react-redux';

class Profile extends Component{

    RenderProfile=(props)=>(
        <div>
            <h1>{props.profile.profile.nickname}</h1>
            <br />
            <img src={props.profile.profile.picture} alt=""/>
            <br />
            <h1>{props.profile.profile.name}</h1>
            <h1>{props.profile.profile.email}</h1>
        </div>
    )
    render(){
        return(
            <div>
                 <this.RenderProfile profile={this.props.profile} />
            </div>

        )
    }
}

function mapStateToProps(state){
    return{
        profile: state.auth_reducer.profile
    }
}
export default connect(mapStateToProps)(Profile);