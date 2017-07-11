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
        var cartData = cart.getCartDataFromLocal();
        var cal      = this._calcTotalAccountAndCounts(cartData);
        this.setData({
            selectedCounts: cal.selectedCounts,
            selectedTypeCounts: cal.selectedTypeCounts,
            account: cal.account,
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
    },
    _resetCartData(){
        //重新计算总金额和商品总数
        var newData = this._calcTotalAccountAndCounts(this.data.cartData);
        this.setData({
            account: newData.account,
            selectedCounts: newData.selectedCounts,
            selectedTypeCounts: newData.selectedTypeCounts,
            cartData: this.data.cartData
        })
    },
    toggleSelect(event){
        var id     = cart.getDataSet(event, 'id'),
            status = cart.getDataSet(event, 'status'),
            index  = this._getProductIndexById(id);

        this.data.cartData[index].selectStatus = !status;
        this._resetCartData();
    },
    toggleSelectAll(event){
        var status = cart.getDataSet(event, 'status') == 'true';
        var data   = this.data.cartData;
        for (let i = 0; i < data.length; i++) {
            data[i].selectStatus = !status;
        }
        this._resetCartData();
    },
    /**
     * 根据商品id获取商品数组所在下标
     * @param id
     * @returns {number}
     * @private
     */
    _getProductIndexById(id){
        var data = this.data.cartData,
            len  = data.length;
        for (let i = 0; i < len; i++) {
            if (data[i].id == id) {
                return i;
            }
        }
    }
});