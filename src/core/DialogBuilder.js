const Config = require('../Config');
const xpath = require("xpath");

// 负责对话框构建
class DialogBuilder {
    constructor() {
        this.parser = Config.parser;
        this.builder = Config.builder;
        this.domParser = Config.domParser;
        this.serializer = Config.serializer;

        /**
         * @type {string} dialog template parser
         */
        this.xml = this._loadDialogTemplate();

        // 加载控件模板
        /**
         * @type {{[key: string]: string}} control template parser
         */
        this.templates = this._loadControlTemplates();
    }

    /**
     * 构建对话框
     * @param {string} title - 对话框标题
     * @param {string} content - 对话框内容
     * @param {Array<number>} columns - 列宽数组
     * @returns {string} XML字符串
     */
    build(title, content, columns) {
        // if (!content.startsWith("<row>")) {
        //     content = `<row>${content}</row>`;
        // }

        const xmlObj = this.parser.parse(this.xml);

        // 设置标题
        xmlObj.dialog['@_title'] = title;

        // 添加内容
        const contentObj = this.parser.parse(`<rows>${content}</rows>`);
        xmlObj.dialog.content.grid.rows.row = contentObj.rows.row || [];

        // 设置列宽
        this.xml = this._setColumnWidths(xmlObj, columns);

        return this.xml;
    }


    _setColumnWidths(xmlObj, columns) {
        const doc = this.domParser.parseFromString(this.builder.build(xmlObj), 'text/xml');


        const labels = xpath.select('//label', doc);
        labels.forEach(label => label.setAttribute('width', columns[0]));


        const controls = xpath.select('//*[@class="control"]', doc);
        controls.forEach(control => control.setAttribute('width', columns[1]));

        // return this.parser.parse(this.serializer.serializeToString(doc));
        return this.serializer.serializeToString(doc);
    }


    // region loadTemplate

    _loadDialogTemplate() {
        const xml = Config.loadTemplate('dialog.xul');
        // return this.parser.parse(xml);
        return xml;
    }

    /**
     * 加载控件模板
     * @private
     */
    _loadControlTemplates() {
        const xml = Config.loadTemplate('controls.xul');
        const doc = this.domParser.parseFromString(xml, 'text/xml');
        const rows = xpath.select('//rows/*', doc);

        const templates = {};
        rows.forEach(node => {
            const template = node.getAttribute('template');
            if (template) {
                templates[template] = node.toString();
            }
        });

        return templates;
    }

    // endregion loadTemplate
}


module.exports = DialogBuilder;