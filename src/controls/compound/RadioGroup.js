const XULControl = require("../../core/XULControl");

// <row template="radiogroup">
//     <label value="Radio Group:"/>
//     <radiogroup className="control" id="radiogroup" tabindex="" groupbox="true">
//         <radio label="Radio 1" selected="" value="1" acceskey=""/>
//         <radio label="Radio 2" selected="" value="2" acceskey=""/>
//         <radio label="Radio 3" selected="" value="3" acceskey=""/>
//     </radiogroup>
// </row>

class RadioGroup extends XULControl {
    constructor(id, label, xul, xml, attributes, items) {
        super('radiogroup', id, label, xul, xml, attributes, items);
    }

    // region getter/setter
    get tabindex() {
        return this._tabindex;
    }

    set tabindex(val) {
        this._tabindex = val;
        this._updateXmlAttribute('tabindex', this._tabindex);
    }

    get groupbox() {
        return this._groupbox;
    }

    set groupbox(val) {
        this._groupbox = val;
        this._updateXmlAttribute('groupbox', this._groupbox ? "true" : "false");
    }

    _initProperties() {
        this._tabindex = null;
        this._groupbox = false;
    }

    // endregion getter/setter

    toString() {
        return `RadioGroup(id=${this.id}, label=${this._label}, tabindex=${this._tabindex}, groupbox=${this._groupbox}, items=${this.items.map(item => item.label)})`;
    }
}

module.exports = RadioGroup;