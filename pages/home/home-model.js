class Home {
    constructor() {

    }

    getBannerData(id,callBack) {
        wx.request({
            url: "http://yz.com/api/v1/banner/" + id,
            method: 'GET',
            success: res => {
                callBack(res);
            }
        })
    }
}
export {Home};