import {Cart} from '../cart/cart-model';
// import {Order} from '../order/order-model';
import {Address} from '../../utils/address';
let cart    = new Cart();
// let order   = new Order();
let address = new Address();
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var productsArr;
        this.data.account = options.account;

        productsArr = cart.getCartDataFromLocal(true);
        this.setData({
            productsArr,
            account: options.account,
            orderStatus: 0
        });
    },
    editAddress(event){
        let that = this;
        wx.chooseAddress({
            success(res){
                console.log(res);
                let addressInfo = {
                    name: res.userName,
                    mobile: res.telNumber,
                    totalDetail: address.setAddressInfo(res)
                };
                that._bindAddressInfo(addressInfo);
            }
        });
    },
    /**
     * 绑定地址信息
     * @param addressInfo
     * @private
     */
    _bindAddressInfo(addressInfo){
        this.setData({
            addressInfo
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})