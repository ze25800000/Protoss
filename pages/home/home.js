import {Home} from 'home-model';
var home = new Home();
Page({
    data: {},
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
            console.log(res);
            this.setData({
                'themeArr': res
            })
        });
    }
});