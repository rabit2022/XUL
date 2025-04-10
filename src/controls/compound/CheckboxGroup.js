const XULControl = require("../../core/XULControl");

// <row template="checkboxgroup">
//     <label value="Checkbox Group:"/>
//     <vbox className="control" groupbox="true">
//         <checkbox className="control" id="checkbox[0]" label="Checkbox 1" checked="true" tabindex="" acceskey=""/>
//         <checkbox className="control" id="checkbox[1]" label="Checkbox 2" checked="true" tabindex="" acceskey=""/>
//         <checkbox className="control" id="checkbox[2]" label="Checkbox 3" checked="true" tabindex="" acceskey=""/>
//     </vbox>
// </row>

class CheckboxGroup extends XULControl {
    constructor(id, label, xul, xml, attributes, items) {
        super('checkboxgroup', id, label, xul, xml, attributes, items);
    }

    // region getter/setter
    get groupbox() {
        return this._groupbox;
    }

    set groupbox(val) {
        this._groupbox = val;
        this._updateXmlAttribute('groupbox', this._groupbox ? "true" : "false");
    }

    _initProperties() {
        this._groupbox = false;
    }

    // endregion getter/setter

    toString() {
        return `CheckboxGroup(id=${this.id}, label=${this._label}, groupbox=${this._groupbox}, items=${this.items.map(item => item.label)})`;
    }

    _setNewItems(items, customType = this.type) {
        super._setNewItems(items, "vbox");
    }

    _updateXmlAttribute(attrName, value, customType = this.type) {
        super._updateXmlAttribute(attrName, value, "vbox");
    }
}

module.exports = CheckboxGroup;