import {Base} from '../../utils/base';
class Home extends Base {
    constructor() {
        super()
    }

    getBannerData(id, callBack) {
        var params = {
            url      : 'banner/' + id,
            sCallBack: res => {
                callBack && callBack(res.items);
            }
        };
        this.request(params);
    }
}
export {Home};