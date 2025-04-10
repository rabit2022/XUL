// <row template="separator">
//     <separator/>
// </row>

const XULControl = require("../../core/XULControl");

class Separator extends XULControl {
    constructor(id, xul, xml) {
        super('separator', id, '', xul, xml);
    }

    _initProperties() {
    }

    _setNewAttributes() {
    }
}

module.exports = Separator;