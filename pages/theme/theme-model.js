import {Base} from '../../utils/base';
class Theme extends Base {
    constructor() {
        super();
    }

    /**
     * 获取主题下的商品列表
     * @param id  主题的id号
     * @param callback
     */
    getProductsData(id, callback) {
        let params = {
            url      : 'theme/' + id,
            sCallback: data => {
                callback && callback(data)
            }
        };
        this.request(params);
    }
}
export {Theme};