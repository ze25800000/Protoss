import {Base} from 'base';
import {Config} from 'config';
class Address extends Base {
    constructor() {
        super();
    }

    setAddressInfo(res) {
        let province = res.provinceName || res.province,
            city     = res.cityName || res.city,
            country  = res.countyName || res.country,
            detail   = res.detailInfo || res.detail;

        let totalDetail = city + country + detail;
        if (!this.isCenterCity(province)) {
            totalDetail = province + totalDetail;
        }
        return totalDetail;
    }

    isCenterCity(name) {
        let centerCitys = ['北京市', '天津市', '上海市', '重庆市'],
            flag        = centerCitys.indexOf(name) >= 0;
        return flag;
    }
}
export {Address};