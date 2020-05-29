import auth0 from 'auth0-js';

export default class Auth{
    auth0=new auth0.WebAuth({
        domain:'dev-tm352hq6.auth0.com',
        clientID:'OjBiSakBjJtg4fs06rLWxzNP0Hn5AlHT',
        redirectUri:'http://localhost:3000/callback',
        responseType:'token id_token',
        scope:'openid profile email'
    })
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

            }
            else{
                console.log(err); 
            }
        })
    }

    logout=()=>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expiresAt');

    }

    isAuthenticated=()=>{
        let expiresAt=JSON.parse(localStorage.getItem('expiresAt'))

        return new Date().getTime() <expiresAt;
    }
}