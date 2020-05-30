import React,{Component} from 'react';
import {connect} from 'react-redux';

class Container1 extends Component{
    render(){
        return(
            <div>dddd
            <button onClick={()=>console.log(this.props.user_profile)}>Gett Profile</button>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        user_profile:state.auth_reducer.profile
    }
}


export default connect(mapStateToProps)(Container1);