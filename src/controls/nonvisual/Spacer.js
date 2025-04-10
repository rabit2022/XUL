// <row template="spacer">
//     <spacer/>
//     <label/>
// </row>

const XULControl = require("../../core/XULControl");

class Spacer extends XULControl {
    constructor(id, xul, xml) {
        super('spacer', id, '', xul, xml);
    }

    _initProperties() {
    }

    _setNewAttributes() {
    }
}

module.exports = Spacer;