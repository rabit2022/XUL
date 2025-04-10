//
//
// /**
//  * 工具函数集合
//  * @namespace Utils
//  */
// class Utils {
//     /**
//      * 解析逗号分隔的表达式字符串为数组
//      * @param {string} str - 要解析的字符串
//      * @returns {string[]} 解析后的字符串数组
//      */
//     static parseExpression(str) {
//         if (!str) return [];
//         return str.split(',').map(item => item.trim());
//     }
//
//
//     /**
//      * 将值转换为数组
//      * @param {*} value - 要转换的值
//      * @returns {Array} 转换后的数组
//      */
//     static toArray(value) {
//         if (value === undefined || value === null) return [];
//         return Array.isArray(value) ? value : [value];
//     }
//
//     /**
//      * 尝试解析字符串为原始值
//      * @param {string} value - 要解析的字符串
//      * @returns {*} 解析后的值
//      */
//     static parseValue(value) {
//         if (typeof value !== 'string') return value;
//
//         try {
//             // 尝试解析为JSON
//             const parsed = JSON.parse(value);
//             if (parsed !== null && typeof parsed === 'object') {
//                 return parsed;
//             }
//             return value;
//         } catch (e) {
//             // 处理特殊情况
//             if (value.toLowerCase() === 'true') return true;
//             if (value.toLowerCase() === 'false') return false;
//             if (!isNaN(value) && value.trim() !== '') {
//                 return Number(value);
//             }
//             return value;
//         }
//     }
//
//     /**
//      * 数字补零
//      * @param {number|string} num - 要补零的数字
//      * @param {number} [size=2] - 补零后的长度
//      * @returns {string} 补零后的字符串
//      */
//     static pad(num, size = 2) {
//         let s = String(num);
//         while (s.length < size) s = '0' + s;
//         return s;
//     }
//
//     /**
//      * 检查是否为数组
//      * @param {*} value - 要检查的值
//      * @returns {boolean} 是否为数组
//      */
//     static isArray(value) {
//         return Array.isArray(value);
//     }
//
//     /**
//      * 从对象中提取值
//      * @param {Object} obj - 源对象
//      * @returns {Array} 值数组
//      */
//     static getValues(obj) {
//         return obj ? Object.values(obj) : [];
//     }
// }
//
// module.exports = Utils;