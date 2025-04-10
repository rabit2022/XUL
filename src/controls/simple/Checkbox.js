const XULControl = require("../../core/XULControl");


// <row template="checkbox">
//     <label value="Checkbox:"/>
//     <checkbox className="control" id="checkbox" label="Checkbox" checked="true" tabindex="" acceskey=""/>
// </row>

class Checkbox extends XULControl {
    constructor(id, label, xul, xml, attributes) {
        super('checkbox', id, label, xul, xml, attributes);
    }

    get tabindex() {
        return this._tabindex;
    }

    // region getter/setter

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

    _initProperties() {
        // checked特殊值，只需要有就行，true,false不重要
        // this._checked = false;
        this._tabindex = "";
        this._acceskey = "";
    }

    // endregion getter/setter

    toString() {
        return `Checkbox(checked=${this._checked}, tabindex=${this._tabindex}, acceskey=${this._acceskey})`;
    }
}

module.exports = Checkbox;