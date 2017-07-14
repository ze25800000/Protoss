import {Base} from 'base';
import {Config} from 'config';
class Address extends Base {
    constructor() {
        super();
    }

    /**
     * 设置地址信息
     * @param res
     * @returns {*}
     */
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

    /**
     * 是否为直辖市
     * @param name
     * @returns {boolean}
     */
    isCenterCity(name) {
        let centerCitys = ['北京市', '天津市', '上海市', '重庆市'],
            flag        = centerCitys.indexOf(name) >= 0;
        return flag;
    }

    /**
     * 更新保存地址
     * @param data
     * @param callback
     */
    submitAddress(data, callback) {
        data      = this._setUpAddress(data);
        var param = {
            url: 'address',
            type: 'post',
            data: data,
            sCallback: res => {
                callback && callback(true, res);
            },
            eCallback: res => {
                callback && callback(true, res);
            }
        };
        this.request(param);
    }

    _setUpAddress(res) {
        var formData = {
            name: res.userName,
            province: res.provinceName,
            city: res.cityName,
            country: res.countryName,
            mobile: res.telNumber,
            detail: res.detailInfo
        };
        return formData;
    }
}
export {Address};