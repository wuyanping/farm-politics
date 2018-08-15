const utils = {
    isString: function (StringToCheck) {
        return Object.prototype.toString.call(StringToCheck) === '[object String]'
    },
    isBoolean: function (BooleanToCheck) {
        return Object.prototype.toString.call(BooleanToCheck) === '[object Boolean]'
    },
    isNumber: function (NumberToCheck) {
        return Object.prototype.toString.call(NumberToCheck) === '[object Number]'
    },
    isObject: function (objectToCheck) {
        return Object.prototype.toString.call(objectToCheck) === '[object Object]'
    },
    isArray: function (ArrayToCheck) {
        return Object.prototype.toString.call(ArrayToCheck) === '[object Array]'
    },
    isFunction: function (FunctionToCheck) {
        return Object.prototype.toString.call(FunctionToCheck) === '[object Function]'
    },
    serializeData: function (data) {
        let params = {}
        data.forEach(v => {
            // 自定义序列化处理表单数据
            if (v.customSerializeFn) {
                params = Object.assign(params, v.customSerializeFn(v))
            } else if (v.name) {
                params[v.name] = v.value
            } else {
                params[v.field] = v.value
            }
        })

        return params
    },
    /**
     * [findPropertyInObject 在对象中查找属性]
     * @Author   szh
     * @DateTime 2018-03-01
     * @param    {String}   prop [属性]
     * @param    {Object}   obj  [查找属性的对象]
     * @return   {Boolean}       [是否存在对象中]
     */
    findPropertyInObject: function (prop, obj) {
        return Object.keys(obj).includes(prop)
    },
    getStyle: function (element, attr) {
        if (window.getComputedStyle) {
            return getComputedStyle(element, null)[attr]
        } else {
            return element.currentStyle[attr]
        }
    }
}

export default utils
