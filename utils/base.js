import {Config} from 'config';
class Base {
    constructor() {
        this.baseRequestUrl = 'http://yz.com/api/v1';
    }

    request(params) {
        var url = this.baseRequestUrl + Config.restUrl;
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
                params.sCallBack && params.sCallBack(res);
            },
            fail   : err => {
                console.log(err);
            }
        })
    }
}