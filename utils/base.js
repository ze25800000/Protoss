import {Config} from 'config';
import {Token} from 'token';
class Base {
    constructor() {

    }

    /**
     * 小程序发送请求
     * @param params
     */
    request(params) {
        var url  = Config.restUrl + params.url;
        var that = this;
        if (!params.type) {
            params.type = 'GET';
        }
        wx.request({
            url: url,
            data: params.data,
            method: params.type,
            header: {
                'content-type': 'application/json',
                'token': wx.getStorageSync('token')
            },
            success: res => {
                let code      = res.statusCode.toString();
                let startChar = code.charAt(0);
                if (startChar == '2') {
                    params.sCallback && params.sCallback(res.data);
                } else {
                    if (code == '401') {
                        that._refetch(params);
                    }
                    params.sCallback && params.sCallback(res.data);
                }
                params.sCallback && params.sCallback(res.data);
            },
            fail: err => {
                console.log(err);
            }
        });
    }

    _refetch(params) {
        let token = new Token();
        token.getTokenFromService(token => {
            this.request(params);
        });
    }

    /**
     * 获取元素的绑定值
     * @param event 事件
     * @param key   绑定值类型
     * @returns {*}
     */
    getDataSet(event, key) {
        return event.currentTarget.dataset[key];
    }
}
export {Base};