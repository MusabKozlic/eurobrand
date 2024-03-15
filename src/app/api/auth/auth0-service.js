// auth0-service.js
import auth0 from 'auth0-js';
import auth0Config from './auth0-config';

class Auth0Service {
    auth0 = new auth0.WebAuth({
        domain: auth0Config.domain,
        clientID: auth0Config.clientId,
        redirectUri: auth0Config.redirectUri,
        audience: auth0Config.audience,
        responseType: 'token id_token',
        scope: 'openid profile email',
    });

    login = () => {
        this.auth0.authorize();
    };

    handleAuthentication = () => {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (err) return reject(err);
                resolve(authResult);
            });
        });
    };

    logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    };
}

const auth0Service = new Auth0Service();
export default auth0Service;
