import {Home} from 'home-model';
var home = new Home();
Page({

    /**
     * 页面的初始数据
     */
    data: {},
    onLoad(){
        this._loadData();
    },
    _loadData(){
        var id = 1;
        var data = home.getBannerData(id);
    }
});