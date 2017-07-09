import {Base} from '../../utils/base';
class Category extends Base {
    constructor() {
        super();
    }

    getCategoryType(callback) {
        var params = {
            url      : 'category',
            sCallback: data => {
                callback && callback(data);
            }
        };
        this.request(params);

    }

    getProductsByCategory(id, callback) {
        var params = {
            url      : 'product/by_category?id=' + id,
            sCallback: data => {
                callback && callback(data)
            }
        };
        this.request(params);
    }
}
export {Category};