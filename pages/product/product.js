import {Product} from 'product-model';
var product = new Product();
Page({

    data: {},

    onLoad   : function (options) {
        var id       = options.id;
        this.data.id = id;
        this._loadData();
    },
    _loadData: function () {
        product.getDetailInfo(this.data.id, data => {
            console.log(data);
            this.setData({
                product: data
            });
        });
    }
});