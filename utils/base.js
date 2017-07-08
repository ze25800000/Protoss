import {Config} from 'config';
class Base {
    constructor() {

    }

    request(params) {
        var url = Config.restUrl + params.url;
        if (!params.type) {
            params.type = 'GET';
        }
        wx.request({
            url    : url,
            data   : params.data,
            method : params.type,
            header : {
                'content-type': 'application/json',
                'token'       : wx.getStorageSync('token')
            },
            success: res => {
                params.sCallback && params.sCallback(res.data);
            },
            fail   : err => {
                console.log(err);
            }
        })
    }
}
export {Base};