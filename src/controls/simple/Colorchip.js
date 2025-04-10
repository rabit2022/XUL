// <row template="colorchip">
//     <label value="Colorchip:" />
//     <colorchip class="control" id="colorchip" color="" format="hex" width="100" />
// </row>

const Config = require("../../Config");
const XULControl = require("../../core/XULControl");

class Colorchip extends XULControl {
    constructor(id, label, xul, xml, attributes) {
        super('colorchip', id, label, xul, xml, attributes);
    }

    // region getter/setter
    get color() {
        return this._color;
    }

    set color(val) {
        this._color = val;
        this._updateXmlAttribute('color', this._color);
    }

    get format() {
        return this._format;
    }

    set format(val) {
        this._format = val;
        this._updateXmlAttribute('format', this._format);
    }

    get width() {
        return this._width;
    }

    set width(val) {
        this._width = val;
        this._updateXmlAttribute('width', this._width);
    }

    _initProperties() {
        this._color = "";
        this._format = "hex";
        this._width = 100;
    }

    // endregion getter/setter

    // _updateXmlAttribute(attrName, value) {
    //     const attributes = this.attributes;
    //     if (!attributes) return;
    //     try {
    //         const xmlObj = this.parser.parse(this.xml);
    //
    //         // 更新不同结构中的属性值
    //         xmlObj.row.colorchip[`@_${attrName}`] = value;
    //
    //         this.xml = this.builder.build(xmlObj);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    toString() {
        return `Colorchip(color=${this._color}, format=${this._format}, width=${this._width})`;
    }
}

module.exports = Colorchip;