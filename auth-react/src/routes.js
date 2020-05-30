import React,{Component} from 'react';
import {Router,Route,Switch, Redirect} from 'react-router';

import Callback from './Functional/Callback';
import Auth from './utils/auth';
import Container1 from './Containers/Container1';
import history from './utils/history'
import AuthCheck from './utils/AuthCheck';
import ProtectedRoute from './Functional/protectedroutes';
import UnauthRedirect from './Functional/unauthredirect';
import Header from './Containers/header';
import Profile from './Containers/profile';
import {connect} from 'react-redux';
import * as ACTIONS from './store/actions/actions';

const auth=new Auth();

const handleAuthentication=(props)=>{
    if(props.location.hash){
        console.log("hia");
        auth.handleAuth()
    }
    else
    console.log("nhi hai");
}

const PrivateRoute=({component:Component,auth})=>(
    <Route render={props=>auth.isAuthenticated()===true?<Component auth={auth} {...props} />:
    <Redirect to={{pathname:'/redirect'}} /> 
    } />
)
class Routes extends Component{
    componentDidMount(){
        if(auth.isAuthenticated()){
            this.props.login_success();
            this.props.add_profile(auth.userProfile)
            auth.getProfile();
            setTimeout(()=>{this.props.add_profile(auth.userProfile)},2000)
        }
        else{
            this.props.login_failure();
            this.props.remove_profile();

        }
    }
    render(){
        return(
            <div>
                <Router history={history}>
                    <div>
                    <Header auth={auth}/>
                    <Switch>
        <Route  exact path='/' render={()=><Container1 auth={auth} />} />
        <Route path='/callback' render={(props)=>{handleAuthentication(props);return<Callback />}} />
        <Route path='/authcheck' render={()=><AuthCheck auth={auth}/>}/>
        <Route path='/redirect' component={UnauthRedirect} />
        <PrivateRoute path='/privateroute' auth={auth} component={ProtectedRoute} />
        <PrivateRoute path='/profile' auth={auth} component={Profile} />
                    </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch){
    return{
        login_success:()=>dispatch(ACTIONS.login_success()),
        login_failure:()=>dispatch(ACTIONS.login_failure()),
        add_profile:(profile)=>dispatch(ACTIONS.add_profile(profile)),
        remove_profile:()=>dispatch(ACTIONS.remove_profile())

    }
}

export default connect(null,mapDispatchToProps)(Routes);