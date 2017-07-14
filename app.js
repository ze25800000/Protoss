import {Token} from 'utils/token';
App({
    onLaunch(){
        let token = new Token();
        token.verify();
    }
});