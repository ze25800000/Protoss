class Home {
    constructor() {

    }

    getBannerData(id) {
        wx.request({
            url: "http://yz.com/api/v1/banner/" + id,
            method: 'GET',
            success: res => {
                console.log(res.data);
            }
        })
    }
}
export {Home};