// <row template="targetlist">
//     <label value="Targetlist:" />
//     <targetlist id="targetlist" class="" width="300" height="" flex="1" pathtype="absolute" />
//     <property id="targetlist" />
// </row>
const XULControl = require("../../core/XULControl");

class TargetList extends XULControl {
    constructor(id, label, xul, xml, attributes) {
        super('targetlist', id, label, xul, xml, attributes);
    }

    // region getter/setter
    get width() {
        return this._width;
    }

    set width(val) {
        this._width = val;
        this._updateXmlAttribute('width', this._width);
    }

    get height() {
        return this._height;
    }

    set height(val) {
        this._height = val;
        this._updateXmlAttribute('height', this._height);
    }

    get flex() {
        return this._flex;
    }

    set flex(val) {
        this._flex = val;
        this._updateXmlAttribute('flex', this._flex);
    }

    get pathtype() {
        return this._pathtype;
    }

    set pathtype(val) {
        this._pathtype = val;
        this._updateXmlAttribute('pathtype', this._pathtype);
    }

    _initProperties() {
        this._width = 300;
        this._height = "";
        this._flex = "1";
        this._pathtype = "absolute";
    }

    // endregion getter/setter

    toString() {
        return `TargetList(width=${this._width}, height=${this._height}, flex=${this._flex}, pathtype=${this._pathtype})`;
    }
}

module.exports = TargetList;