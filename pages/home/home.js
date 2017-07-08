import {Home} from 'home-model';
var home = new Home();
Page({
    data: {},
    onLoad(){
        this._loadData();
    },
    _loadData(){
        var id   = 1;
        var data = home.getBannerData(id, (res) => {
            console.log(res);
            //数据绑定
            this.setData({
                'bannerArr': res
            });
        });
    }

});