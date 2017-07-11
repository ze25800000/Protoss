import {Base} from '../../utils/base';
class Cart extends Base {
    constructor() {
        super();
        this._storageKeyName = 'cart';
    }

    /**
     * 加入到购物车
     * 如果之前没有样的商品，则直接添加一条新的记录， 数量为 counts
     * 如果有，则只将相应数量 + counts
     * @params:
     * item - {obj} 商品对象,
     * counts - {int} 商品数目,
     * */
    add(item, counts) {
        var cartData  = this.getCartDataFromLocal();
        var isHasInfo = this._isHasThatOne(item.id, cartData);
        if (isHasInfo.index == -1) {
            item.counts       = counts;
            item.selectStatus = true; //设置选中状态
            cartData.push(item);
        } else {
            cartData[isHasInfo.index].counts += counts;
        }
        wx.setStorageSync(this._storageKeyName, cartData);
    }

    /**
     * 从缓存中读取购物车数据
     * @returns {*}
     */
    getCartDataFromLocal() {
        var res = wx.getStorageSync(this._storageKeyName);
        if (!res) {
            res = [];
        }
        return res;
    }

    /**
     * 计算购物车内商品总数
     * @param flag
     * @returns {number}
     */
    getCartTotalCounts(flag) {
        var data   = this.getCartDataFromLocal();
        var counts = 0;
        for (var i = 0; i < data.length; i++) {
            if (flag) {
                if (data[i].selectStatus) {
                    counts += data[i].counts;
                }
            } else {
                counts += data[i].counts;
            }
        }
        return counts;
    }

    /**
     * 判断某个商品是否已经被添加到购物车中，
     * 并且返回这个商品的数据以及所在数组中的序号
     * @param id
     * @param arr
     * @returns {{index: number}}
     * @private
     */
    _isHasThatOne(id, arr) {
        var item,
            result = {index: -1};
        for (let i = 0; i < arr.length; i++) {
            item = arr[i];
            if (item.id == id) {
                result = {
                    index: i,
                    data: item
                };
                break;
            }
        }
        return result;
    }

    /**
     * 修改商品数目
     * @param id 商品id
     * @param counts 数目
     * @private
     */
    _changeCounts(id, counts) {
        var cartData = this.getCartDataFromLocal(),
            hasInfo  = this._isHasThatOne(id, cartData);
        if (hasInfo.index != -1) {
            if (hasInfo.data.counts > 1) {
                cartData[hasInfo.index].counts += counts;
            }
        }
        //更新本地缓存
        wx.setStorageSync(this._storageKeyName, cartData);
    }

    addCounts(id) {
        this._changeCounts(id, 1);
    }

    cutCounts(id) {
        this._changeCounts(id, -1);
    }
}
export {Cart};