import {Category} from 'category-model';
var category = new Category();
Page({

    data: {},

    onLoad   : function (options) {
        this._loadData();
    },
    _loadData: function () {
        category.getCategoryType(data => {
            console.log(data);
            this.setData({
                categoryTypeArr: data
            });
        });
    }
});