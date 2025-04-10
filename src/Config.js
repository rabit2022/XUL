const {XMLParser, XMLBuilder} = require("fast-xml-parser");
const {DOMParser, XMLSerializer} = require("xmldom");

var isNode = typeof process !== "undefined" && process.versions && process.versions.node
var isFlash = !isNode && typeof fl !== "undefined";

// XML 解析器配置
const parserOptions = {
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    alwaysCreateTextNode: true,  // 确保所有节点都被创建
    isArray: (name, jpath, isAttribute) => {
        // 明确指定哪些节点应作为数组处理
        // return ['row', 'column'].includes(name);
        return false;
    },
    textNodeName: '#text',       // 文本节点名称
    cdataTagName: '__cdata',     // CDATA 标签名称
    commentTagName: '__comment'  // 注释标签名称
};

// XML 构建器配置
const builderOptions = {
    attributeNamePrefix: '@_',   // 属性前缀（与解析器匹配）
    ignoreAttributes: false,     // 不忽略属性
    format: true,                // 格式化输出
    indentBy: '  ',              // 缩进字符
    suppressEmptyNode: false     // 不压缩空节点
};

class Config {
    static parser = new XMLParser(parserOptions);
    static builder = new XMLBuilder(builderOptions);
    static domParser = new DOMParser();
    static serializer = new XMLSerializer();

    /**
     * 加载XML模板文件
     * @param {string} templateName - 模板文件名
     * @returns {string} XML字符串
     */
    static loadTemplate(templateName) {
        if (isNode) {
            // const path = require("path");
            const path = require("path");
            const fs = require("fs");

            const templatePath = path.join(__dirname, './templates/', templateName);
            return fs.readFileSync(templatePath, 'utf-8');
        } else if (isFlash) {
            const dirname = $ProjectFileDir$;

            var template = '';
            requirejs(
                ['os', 'open'],
                function (os, open) {
                    var templatePath = os.path.join(
                        dirname,
                        './config/xul/',
                        templateName
                    );
                    // with (open(templatePath, 'r')) {
                    //     template = f.read();
                    // }
                    // 使用eval来执行非严格模式的代码
                    eval(`
                        with (open("${templatePath}", 'r')) {
                            template = f.read();
                        }
                    `);
                }
            );

            return template;
        } else {
            throw new Error("Unsupported environment");
        }
    }
}


module.exports = Config;