// <row template="button">
//     <label value="Button:" align="" control="" />
//     <button class="control" id="button" label="Button" width="" flex="1" tabindex="" acceskey="" oncommand="" />
// </row>
const XULControl = require("../../core/XULControl");

class Button extends XULControl {
    constructor(id, label, xul, xml, attributes) {
        super('button', id, label, xul, xml, attributes);
    }

    // region getter/setter
    get label() {
        return this._label;
    }

    set label(val) {
        this._label = val;
        this._updateXmlAttribute('label', this._label);
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

    get tabindex() {
        return this._tabindex;
    }

    set tabindex(val) {
        this._tabindex = val;
        this._updateXmlAttribute('tabindex', this._tabindex);
    }

    get acceskey() {
        return this._acceskey;
    }

    set acceskey(val) {
        this._acceskey = val;
        this._updateXmlAttribute('acceskey', this._acceskey);
    }

    get oncommand() {
        return this._oncommand;
    }

    set oncommand(val) {
        this._oncommand = val;
        this._updateXmlAttribute('oncommand', this._oncommand);
    }

    _initProperties() {
        this._label = "Button";
        this._width = "";
        this._flex = "1";
        this._tabindex = "";
        this._acceskey = "";
        this._oncommand = "";
    }

    // endregion getter/setter

    toString() {
        return `Button(label=${this._label}, width=${this._width}, flex=${this._flex}, tabindex=${this._tabindex}, acceskey=${this._acceskey}, oncommand=${this._oncommand})`;
    }

}

module.exports = Button;