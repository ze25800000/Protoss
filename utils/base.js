import {Config} from 'config';
class Base {
    constructor() {

    }

    /**
     * 小程序发送请求
     * @param params
     */
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