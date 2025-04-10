const XULControl = require("../../core/XULControl");


// <element template="flash">
//     <flash className="control" id="flash" src="assets/flash.swf" width="250" height="100"/>
// </element>

class FlashControl extends XULControl {
    constructor(id, xul, xml, attributes) {
        super('flash', id, '', xul, xml, attributes);
    }

    // region getter/setter
    get src() {
        return this._src;
    }

    set src(val) {
        this._src = val;
        this._updateXmlAttribute('src', this._src);
    }

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

    _initProperties() {
        this._src = this.src;
        this._width = this.width;
        this._height = this.height;
    }

    // endregion getter/setter

    _updateXmlAttribute(attrName, value, customType = this.type) {
        try {
            const xmlObj = this.parser.parse(this.xml);

            // xmlObj.row[customType][`@_${attrName}`] = String(value);
            let flashNode = xmlObj["element"][this.type];
            flashNode[`@_${attrName}`] = String(value);

            this.xml = this.builder.build(xmlObj);
        } catch (error) {
            console.error(error);
        }
    }


    _setNewAttributes() {

        try {
            let xmlObj = this.parser.parse(this.xml);

            let flashNode = xmlObj["element"][this.type];

            if (flashNode) {
                flashNode['@_id'] = this.id;
            }

            this.xml = this.builder.build(xmlObj);

            const attributes = this.attributes;
            if (!attributes) return;

            for (const [name, value] of Object.entries(attributes)) {
                // 跳过空值
                if (value === undefined || value === null) continue;

                // 调用setter方法设置属性值
                this[name] = value;
            }

            // 初始化设置
            this.xul.settings[this.id] = this.value;

        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = FlashControl;