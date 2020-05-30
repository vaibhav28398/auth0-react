import React, {Component} from 'react';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Header extends Component{

    state={
        nums:[
            {id:'a'},
            {id:'b'},
            {id:'c'}
        ]
    }
    render(){
        return(
            <div>
                <Link to='/' >
                    Home
                </Link>
                <Link to='/privateroute' >
                    privateroute
                </Link>
                {!this.props.is_authenticated
                ?<button onClick={()=>this.props.auth.login()}>Login</button>
                :<button onClick={()=>this.props.auth.logout()}>Logout</button>
            }
                
            </div>

        )
    }
}

function mapStateToProps(state){
    return{
        is_authenticated:state.auth_reducer.is_authenticated
    }
}
export default connect(mapStateToProps)(Header);