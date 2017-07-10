import {Product} from 'product-model';
import {Cart} from '../cart/cart-model';
var cart    = new Cart();
var product = new Product();
Page({

    data: {
        id              : null,
        countsArray     : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        productCounts   : 1,
        currentTabsIndex: 0,
        cartTotalCount  : 0
    },

    onLoad          : function (options) {
        var id       = options.id;
        this.data.id = id;
        this._loadData();
    },
    _loadData       : function () {
        product.getDetailInfo(this.data.id, data => {
            console.log(data);
            this.setData({
                cartTotalCounts: cart.getCartTotalCounts(),
                product        : data
            });
        });
    },
    bindPickerChange: function (event) {
        var index         = event.detail.value;
        var selectedCount = this.data.countsArray[index];
        this.setData({
            productCounts: selectedCount
        })
    },
    onTabsItemTap   : function (event) {
        var index = product.getDataSet(event, 'index');
        this.setData({
            currentTabsIndex: index
        })
    },
    onAddingToCartTap(){
        this.addToCart();
        // var counts = this.data.cartTotalCount + this.data.productCounts;
        this.setData({
            cartTotalCounts: cart.getCartTotalCounts(),
        });
    },
    addToCart(){
        var temObj = {};
        var keys   = ['id', 'name', 'main_img_url', 'price'];
        for (var key in this.data.product) {
            if (keys.indexOf(key) >= 0) {
                temObj[key] = this.data.product[key];
            }
        }
        cart.add(temObj, this.data.productCounts);
    }
});