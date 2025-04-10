const XULControl = require("../../core/XULControl");


// <row template="menulist">
//     <label value="Menu List:"/>
//     <menulist className="control" id="menulist" editable="" width="" flex="1" tabindex="" oncreate="" onsetfocus="">
//         <menupop className="control" id="menupop">
//             <menuitem label="Item 1" value="1" selected=""/>
//             <menuitem label="Item 2" value="2" selected=""/>
//             <menuitem label="Item 3" value="3" selected=""/>
//         </menupop>
//     </menulist>
// </row>

class MenuList extends XULControl {
    constructor(id, label, xul, xml, attributes, items) {
        super('menulist', id, label, xul, xml, attributes, items);
    }

    // region getter/setter
    get editable() {
        return this._editable;
    }

    set editable(val) {
        this._editable = val;
        this._updateXmlAttribute('editable', this._editable);
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

    get oncreate() {
        return this._oncreate;
    }

    set oncreate(val) {
        this._oncreate = val;
        this._updateXmlAttribute('oncreate', this._oncreate);
    }

    get onsetfocus() {
        return this._onsetfocus;
    }

    set onsetfocus(val) {
        this._onsetfocus = val;
        this._updateXmlAttribute('onsetfocus', this._onsetfocus);
    }

    _initProperties() {
        this._editable = null;
        this._width = null;
        this._flex = null;
        this._tabindex = null;
        this._oncreate = null;
        this._onsetfocus = null;
    }

    // endregion getter/setter

    toString() {
        return `MenuList(id=${this.id}, label=${this._label}, width=${this._width}, flex=${this._flex}, tabindex=${this._tabindex}, editable=${this._editable}, oncreate=${this._oncreate}, onsetfocus=${this._onsetfocus}, items=${this.items.map(item => item.label)})`;
    }

    _setNewItems(items) {
        let xmlObj = this.parser.parse(this.xml);
        // console.log(xmlObj);

        let listbox = this.getNode(xmlObj, this.type);
        let childrenType = this._getChildrenType(this.type);
        listbox.menupop[childrenType] = items;

        this.xml = this.builder.build(xmlObj);
    }
}

module.exports = MenuList;