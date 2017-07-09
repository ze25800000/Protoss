import {Base} from '../../utils/base';
class Home extends Base {
    constructor() {
        super()
    }

    getBannerData(id, callback) {
        let params = {
            url      : 'banner/' + id,
            sCallback: res => {
                callback && callback(res.items);
            }
        };
        this.request(params);
    }

    getThemeData(callback) {
        let params = {
            url      : 'theme?ids=1,2,3',
            sCallback: res => {
                callback && callback(res);
            }
        };
        this.request(params);
    }

    getProductsData(callback) {
        let params = {
            url      : 'product/recent?count=14',
            sCallback: res => {
                callback && callback(res);
            }
        };
        this.request(params);
    }
}
export {Home};