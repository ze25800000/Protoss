import {Theme} from 'theme-model';
var theme = new Theme();
Page({

    data: {},

    onLoad   : function (options) {
        this.data.id   = options.id;
        this.data.name = options.name;
        this._loadData();
    },
    _loadData: function () {
        theme.getProductsData(this.data.id, data => {
            console.log(data);
            this.setData({
                themeInfo: data
            });
        })
    }
});