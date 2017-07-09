import {Base} from '../../utils/base';
class Product extends Base {
    constructor() {
        super();
    }

    getDetailInfo(id, callback) {
        var params = {
            url      : "product/" + id,
            sCallback: data => {
                callback && callback(data);
            }
        };
        this.request(params);
    }
}
export {Product};