import {Product} from 'product-model';
var product = new Product();
Page({

    data: {
        id           : null,
        countsArray  : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        productCounts: 1
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
                product: data
            });
        });
    },
    bindPickerChange: function (event) {
        var index         = event.detail.value;
        var selectedCount = this.data.countsArray[index];
        this.setData({
            productCounts: selectedCount
        })
    }
});