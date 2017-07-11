import {Cart} from 'cart-model';
var cart = new Cart();
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    onLoad: function (options) {

    },
    onShow: function () {
        var cartData   = cart.getCartDataFromLocal();
        var countsInfo = cart.getCartTotalCounts(true);
        this.setData({
            selectedCount: countsInfo,
            cartData: cartData
        })
    },
    _calcTotalAccountAndCounts: function (data) {
        var len                = data.length,
            //需要计算的总价格，排除未选中的商品
            account            = 0,

            //购买商品的总个数
            selectedCounts     = 0,

            //购买商品种类的总数
            selectedTypeCounts = 0;
        var multiple           = 100;
        for (let i = 0; i < len; i++) {
            if (data[i].selectStatus) {
                //为避免 0.05+0.01=0.060 000 000 000 000 005 的问题，乘以100*100
                account += data[i].counts * multiple * Number(data[i].price) * multiple;
                selectedCounts += data[i].counts;
                selectedTypeCounts++;
            }
        }
        return {
            selectedCounts: selectedCounts,
            selectedTypeCounts: selectedTypeCounts,
            account: account / (multiple * multiple)
        }
    }
});