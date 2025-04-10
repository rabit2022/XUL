// <row template="popupslider">
//     <label value="Popupslider:"/>
//     <popupslider className="control" id="popupslider" value="" minvalue="0" maxvalue="100" orientation="horz"
//                  tabindex="" width="60" flex=""/>
// </row>

const XULControl = require("../../core/XULControl");
const Config = require("../../Config");

class PopupSlider extends XULControl {
    constructor(id, label, xul, xml, attributes) {
        super('popupslider', id, label, xul, xml, attributes);
    }

    // region getter/setter
    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this._updateXmlAttribute('value', this._value);
    }

    get minvalue() {
        return this._minvalue;
    }

    set minvalue(val) {
        this._minvalue = val;
        this._updateXmlAttribute('minvalue', this._minvalue);
    }

    get maxvalue() {
        return this._maxvalue;
    }

    set maxvalue(val) {
        this._maxvalue = val;
        this._updateXmlAttribute('maxvalue', this._maxvalue);
    }

    get orientation() {
        return this._orientation;
    }

    set orientation(val) {
        this._orientation = val;
        this._updateXmlAttribute('orientation', this._orientation);
    }

    get tabindex() {
        return this._tabindex;
    }

    set tabindex(val) {
        this._tabindex = val;
        this._updateXmlAttribute('tabindex', this._tabindex);
    }

    get width() {
        return this._width;
    }

    set width(val) {
        this._width = val;
        this._updateXmlAttribute('width', this._width);
    }

    get flex() {
        return this._flex;
    }

    set flex(val) {
        this._flex = val;
        this._updateXmlAttribute('flex', this._flex);
    }

    _initProperties() {
        this._value = "";
        this._minvalue = 0;
        this._maxvalue = 100;
        this._orientation = "horz";
        this._tabindex = "";
        this._width = 60;
        this._flex = "";
    }

    // endregion getter/setter

    // _updateXmlAttribute(attrName, value) {
    //     const attributes = this.attributes;
    //     if (!attributes) return;
    //     try {
    //         const xmlObj = this.parser.parse(this.xml);
    //
    //         xmlObj.row.popupslider[`@_${attrName}`] = value;
    //
    //         this.xml = this.builder.build(xmlObj);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    toString() {
        return `PopupSlider(value=${this._value}, minvalue=${this._minvalue}, maxvalue=${this._maxvalue}, orientation=${this._orientation}, tabindex=${this._tabindex}, width=${this._width}, flex=${this._flex})`;
    }
}

module.exports = PopupSlider;