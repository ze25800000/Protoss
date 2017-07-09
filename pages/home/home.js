import {Home} from 'home-model';
import {Base} from '../../utils/base';
let home = new Home();
Page({
    data             : {},
    onLoad(){
        this._loadData();
    },
    _loadData(){
        var id = 1;
        home.getBannerData(id, res => {
            //数据绑定
            this.setData({
                'bannerArr': res
            });
        });
        home.getThemeData((res) => {
            this.setData({
                'themeArr': res
            })
        });
        home.getProductsData((res) => {
            this.setData({
                productsArr: res
            })
        });
    },
    /**
     * 点击商品跳转到商品详细页面
     * @param event
     */
    onProductsItemTap: event => {
        var id = home.getDataSet(event, 'id');
        wx.navigateTo({
            url: '../product/product?id=' + id
        })
    },
    /**
     * 点击专题跳转到专题详细页面
     * @param event
     */
    onThemeItemTap   : event => {
        var id = home.getDataSet(event, 'id');
        var name = home.getDataSet(event, 'name');
        wx.navigateTo({
            url: '../theme/theme?id=' + id + '&name=' + name
        })
    }
});