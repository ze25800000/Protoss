import {Category} from 'category-model';
var category = new Category();
Page({

    data: {},

    onLoad   : function (options) {
        this._loadData();
    },
    _loadData: function () {
        category.getCategoryType(categoryData => {
            this.setData({
                categoryTypeArr: categoryData
            });
            category.getProductsByCategory(categoryData[0].id, data => {
                var dataObj = {
                    products : data,
                    topImgUrl: categoryData[0].img.url,
                    title    : categoryData[0].name
                };
                this.setData({
                    categoryProducts: dataObj
                });
            });
        });
    }
});