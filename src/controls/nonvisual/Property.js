const XULControl = require("../../core/XULControl");

// <property template="property" id="property" />

class Property extends XULControl {
    constructor(id, xul, xml) {
        super('property', id, '', xul, xml);
    }

    _initProperties() {

    }

    _setNewAttributes() {
        let xmlObj = this.parser.parse(this.xml);
        // console.log(xmlObj);

        let propertyNode = xmlObj[this.type];

        if (this.id) {
            propertyNode['@_id'] = this.id;
        }

        this.xml = this.builder.build(xmlObj);
    }
}

module.exports = Property;