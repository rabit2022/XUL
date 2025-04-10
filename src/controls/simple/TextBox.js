const Config = require("../../Config");
const XULControl = require("../../core/XULControl");


// <row template="textbox">
//     <label value="Textbox:"/>
//     <textbox className="control" id="textbox" value="" maxlength="" prompt="" size="" multiline="false" width=""
//              flex="1"/>
// </row>

class Textbox extends XULControl {
    constructor(id, label, xul, xml, attributes) {
        super('textbox', id, label, xul, xml, attributes);
    }

    // region 属性访问器
    get value() {
        return this.xul.settings[this.id] || '';
    }

    set value(val) {
        let strVal = String(val);

        // 应用maxlength限制
        if (this._maxLength && strVal.length > this._maxLength) {
            strVal = strVal.substring(0, this._maxLength);
        }

        this.xul.settings[this.id] = strVal;
        this._updateXmlAttribute('value', strVal);
    }

    get multiline() {
        return this._multiline;
    }

    set multiline(state) {
        this._multiline = !!state;
        this._updateXmlAttribute('multiline', this._multiline);
    }

    get maxLength() {
        return this._maxLength;
    }

    set maxLength(length) {
        this._maxLength = Number.isInteger(length) ? length : null;
        this._updateXmlAttribute('maxlength', this._maxLength);
    }

    get prompt() {
        return this._prompt;
    }

    set prompt(text) {
        this._prompt = String(text);
        this._updateXmlAttribute('prompt', this._prompt);
    }

    get size() {
        return this._size;
    }

    set size(val) {
        this._size = val ? parseInt(val) : null;
        this._updateXmlAttribute('size', this._size);
    }

    get width() {
        return this._width;
    }

    set width(val) {
        this._width = val ? parseInt(val) : null;
        this._updateXmlAttribute('width', this._width);
    }

    get flex() {
        return this._flex;
    }

    set flex(val) {
        this._flex = val ? parseInt(val) : 1;
        this._updateXmlAttribute('flex', this._flex);
    }

    /**
     * 初始化文本框属性
     */
    _initProperties() {
        this._multiline = false;
        this._maxLength = null;
        this._prompt = '';
        this._required = false;
        this._pattern = null;
        this._size = null;
        this._value = '';
        this._width = null;
        this._flex = 1;
    }

    // endregion 属性访问器

    // ========== 功能方法 ==========

    // /**
    //  * 更新XML属性
    //  * @private
    //  */
    // _updateXmlAttribute(attrName, value) {
    //     try {
    //         const xmlObj = this.parser.parse(this.xml);
    //         xmlObj.row.textbox[`@_${attrName}`] = value;
    //         this.xml = this.builder.build(xmlObj);
    //     } catch (error) {
    //         console.error(`Error updating XML attribute ${attrName}: ${error}`);
    //     }
    // }

    /**
     * 验证文本框值
     */
    validate() {
        const value = this.value;

        if (this._required && !value.trim()) {
            return `Field "${this.id}" is required`;
        }

        if (this._maxLength && value.length > this._maxLength) {
            return `Text exceeds maximum length of ${this._maxLength} characters`;
        }

        if (this._pattern && !new RegExp(this._pattern).test(value)) {
            return `Invalid format for field "${this.id}"`;
        }

        return null;
    }

    /**
     * 字符串表示
     */
    toString() {
        return `Textbox (id="${this.id}" value="${this.value}" multiline=${this.multiline} maxLength=${this.maxLength} prompt="${this.prompt}" size=${this.size} width=${this.width} flex=${this.flex})`;
    }


}

module.exports = Textbox;