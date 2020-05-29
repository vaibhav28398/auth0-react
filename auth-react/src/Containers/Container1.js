import React,{Component} from 'react';

class Container1 extends Component{
    render(){
        return(
            <div>
            <button onClick={()=>this.props.auth.login()}>Login</button>
            </div>
        )
    }
}

export default Container1;