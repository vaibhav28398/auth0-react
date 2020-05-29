import React,{Component} from 'react';
import {Router,Route,Switch} from 'react-router';

import Callback from './Functional/Callback';
import Auth from './utils/auth';
import Container1 from './Containers/Container1';
import history from './utils/history'

const auth=new Auth();

const handleAuthentication=(props)=>{
    if(props.location.hash){
        console.log("hia");
        auth.handleAuth()
    }
    else
    console.log("nhi hai");
}
class Routes extends Component{
    render(){
        return(
            <div>
                <Router history={history}>
                    <Switch>
        <Route  exact path='/' render={()=><Container1 auth={auth} />} />
        <Route path='/callback' render={(props)=>{handleAuthentication(props);return<Callback />}} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Routes;