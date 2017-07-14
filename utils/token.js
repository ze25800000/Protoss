import {Config} from 'config';

class Token {
    constructor() {
        this.verifyUrl = Config.restUrl + 'token/verify';
        this.tokenUrl  = Config.restUrl + 'token/user';
    }

    /**
     * 验证缓存中是否有token
     */
    verify() {
        let token = wx.getStorageSync('token');
        if (!token) {
            this.getTokenFromService();
        } else {
            this._verifyFromService(token);
        }
    }

    /**
     * 携带令牌去服务器校验令牌
     * @param token
     * @private
     */
    _verifyFromService(token) {
        let that = this;
        wx.request({
            url: that.verifyUrl,
            method: 'post',
            data: {
                token: token
            },
            success: res => {
                let valid = res.data.isValid;
                if (!valid) {
                    that.getTokenFromService();
                }
            }
        })
    }

    /**
     * 从服务器获取Token
     * @param callback
     */
    getTokenFromService(callback) {
        let that = this;
        wx.login({
            success: res => {
                wx.request({
                    url: that.tokenUrl,
                    method: 'post',
                    data: {
                        code: res.code
                    },
                    success: res => {
                        wx.setStorageSync('token', res.data.token);
                        callback && callback(res.data.token);
                    }
                });
            }
        });
    }
}
export {Token};