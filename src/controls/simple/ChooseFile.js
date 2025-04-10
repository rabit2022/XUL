// <row template="choosefile">
//     <label value="Choose File:" align="" control="" />
//     <choosefile id="choosefile" literal="false" pathtype="" required="" size="" type="" width="" flex="1" tabindex="" />
// </row>
const XULControl = require("../../core/XULControl");

class ChooseFile extends XULControl {
    constructor(id, label, xul, xml, attributes) {
        super('choosefile', id, label, xul, xml, attributes);
    }

    // region getter/setter
    get literal() {
        return this._literal;
    }

    set literal(val) {
        this._literal = val;
        this._updateXmlAttribute('literal', this._literal ? "true" : "false");
    }

    get pathtype() {
        return this._pathtype;
    }

    set pathtype(val) {
        this._pathtype = val;
        this._updateXmlAttribute('pathtype', this._pathtype);
    }

    get required() {
        return this._required;
    }

    set required(val) {
        this._required = val;
        this._updateXmlAttribute('required', this._required);
    }

    get size() {
        return this._size;
    }

    set size(val) {
        this._size = val;
        this._updateXmlAttribute('size', this._size);
    }

    get type() {
        return this._type;
    }

    set type(val) {
        this._type = val;
        this._updateXmlAttribute('type', this._type);
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

    _initProperties() {
        this._literal = false;
        this._pathtype = "";
        this._required = "";
        this._size = "";
        this._type = "";
        this._width = "";
        this._flex = "1";
        this._tabindex = "";
    }

    // endregion getter/setter

    toString() {
        return `ChooseFile(literal=${this._literal}, pathtype=${this._pathtype}, required=${this._required}, size=${this._size}, type=${this._type}, width=${this._width}, flex=${this._flex}, tabindex=${this._tabindex})`;
    }
}

module.exports = ChooseFile;