// <row template="label">
//     <label value="Label" align=""/>
// </row>
const XULControl = require("../../core/XULControl");

class Label extends XULControl {
    constructor(id, label, xul, xml, attributes) {
        super('label', id, label, xul, xml, attributes);
    }

    // region getter/setter
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this._updateXmlAttribute('label', value);
    }

    get align() {
        return this._align;
    }

    set align(align) {
        this._align = align;
        this._updateXmlAttribute('align', align);
    }

    _initProperties() {
        this._value = null;
        this._align = null;
    }

    // endregion getter/setter

    toString() {
        return `Button(label=${this._label}, width=${this._width}, flex=${this._flex}, tabindex=${this._tabindex}, acceskey=${this._acceskey}, oncommand=${this._oncommand})`;
    }
}

module.exports = Label;