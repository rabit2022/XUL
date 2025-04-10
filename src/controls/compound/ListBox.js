// <row template="listbox">
//     <label value="Listbox:" />
//     <listbox class="control" id="listbox" width="" flex="1" rows="6" tabindex="">
//         <listitem label="Item 1" value="1" selected="" />
//         <listitem label="Item 2" value="2" selected="" />
//         <listitem label="Item 3" value="3" selected="" />
//     </listbox>
// </row>

const XULControl = require("../../core/XULControl");

class ListBox extends XULControl {
    constructor(id, label, xul, xml, attributes, items) {
        super('listbox', id, label, xul, xml, attributes, items);
    }

    // region getter/setter
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

    get rows() {
        return this._rows;
    }

    set rows(val) {
        this._rows = val;
        this._updateXmlAttribute('rows', this._rows);
    }

    get tabindex() {
        return this._tabindex;
    }

    set tabindex(val) {
        this._tabindex = val;
        this._updateXmlAttribute('tabindex', this._tabindex);
    }

    _initProperties() {
        this._width = null;
        this._flex = null;
        this._rows = 0;
        this._tabindex = null;
    }

    // endregion getter/setter
    toString() {
        return `ListBox(id=${this.id}, label=${this._label}, width=${this._width}, flex=${this._flex}, rows=${this._rows}, tabindex=${this._tabindex}, items=${this.items.map(item => item.label)})`;
    }
}

module.exports = ListBox;