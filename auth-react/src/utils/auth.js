import auth0 from 'auth0-js';
import history from './history';

export default class Auth{
    auth0=new auth0.WebAuth({
        domain:'dev-tm352hq6.auth0.com',
        clientID:'OjBiSakBjJtg4fs06rLWxzNP0Hn5AlHT',
        redirectUri:'http://localhost:3000/callback',
        responseType:'token id_token',
        scope:'openid profile email'
    })

    userProfile={}
    login=()=>{
        this.auth0.authorize()
    }

    handleAuth=()=>{
        console.log("inside handle auth")
        this.auth0.parseHash((err,authResult)=>{
            if(authResult){
                console.log('hi')
                console.log(authResult)
                localStorage.setItem('access_token',authResult.accessToken);
                localStorage.setItem('id_token',authResult.idToken)

                let expiresAt=JSON.stringify((authResult.expiresIn*1000+new Date().getTime()))
                localStorage.setItem('expiresAt',expiresAt);
                this.getProfile();
                setTimeout(()=>{history.replace('/authcheck')},2000);
            }
            else{
                console.log(err); 
            }
        })
    }

    getAccessToken=()=>{
        if(localStorage.getItem('access_token'))
        {
            console.log("Token is there")
            const accessToken=localStorage.getItem('access_token');
            return accessToken;
        }
        else
        return null;
    }

    getProfile=()=>{
        let accessToken=this.getAccessToken();
        if(accessToken)
        {
            this.auth0.client.userInfo(accessToken,(err,profile)=>{
                if(profile){
                    console.log("Profile is there");
                    this.userProfile={profile};
                }
                else{
                    console.log(err);
                    console.log("Profile not there")
                }
                
            })
        }
    }

    logout=()=>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expiresAt');
        setTimeout(()=>{history.replace('/authcheck')},200)
    }

    isAuthenticated=()=>{
        let expiresAt=JSON.parse(localStorage.getItem('expiresAt'))

        return new Date().getTime() <expiresAt;
    }
}