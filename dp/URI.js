// var path = require('path');
//
// /**
//  * URI处理工具类
//  * @namespace URI
//  */
// class URI {
//     /**
//      * 检查字符串是否为URI
//      * @param {string} str - 要检查的字符串
//      * @returns {boolean} 是否为URI
//      */
//     static isURI(str) {
//         return str && /^(file|http|https):\/\//i.test(str);
//     }
//
//     /**
//      * 将路径转换为URI
//      * @param {string} path - 文件路径
//      * @param {number} [base=0] - 基准路径类型
//      * @returns {string} 转换后的URI
//      */
//     static toURI(path, base = 0) {
//         if (!path) return '';
//         if (this.isURI(path)) return path;
//
//         // 标准化路径
//         let normalized = path.replace(/\\/g, '/');
//
//         // 处理相对路径
//         if (!normalized.startsWith('/')) {
//             normalized = path.resolve(process.cwd(), normalized);
//         }
//
//         return `file://${normalized}`;
//     }
//
//     /**
//      * 计算相对路径
//      * @param {string} base - 基础路径
//      * @param {string} target - 目标路径
//      * @returns {string} 相对路径
//      */
//     static pathTo(base, target) {
//         if (!base || !target) return target;
//
//         const relative = path.relative(
//             path.dirname(base.replace('file://', '')),
//             target.replace('file://', '')
//         );
//
//         return relative.startsWith('..') ? target : relative.replace(/\\/g, '/');
//     }
//
//     /**
//      * 获取文件扩展名
//      * @param {string} path - 文件路径
//      * @returns {string} 扩展名（小写）
//      */
//     static getExtension(path) {
//         if (!path) return '';
//         const ext = path.split('.').pop().toLowerCase();
//         return ext === path ? '' : ext;
//     }
// }
//
// module.exports = URI;