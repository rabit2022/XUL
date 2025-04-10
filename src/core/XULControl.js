const Config = require("../Config");

class XULControl {
    constructor(type, id, label, xul, xml, attributes, items) {
        this.type = type;
        this.id = id;
        this.$label = label;
        this.xul = xul;
        this.xml = xml;
        this.attributes = attributes;


        this.enumerable = !/^button|flash$/.test(type);
        this.compound = /^radiogroup|checkboxgroup|menulist|listbox$/.test(type);

        this.parser = Config.parser;
        this.builder = Config.builder;
        this.domParser = Config.domParser;
        this.serializer = Config.serializer;


        if (this.id) {
            // 初始化属性
            this._initProperties();

            // 解析XML属性
            this._initDefaultAttributes();

            // 设置xml属性
            this._setNewAttributes();
        }

        if (this.compound) {
            this._clearTemplateItems();

            this.originalItems = items;
            /**
             * { '@_label': 'Item 1', '@_value': '1', '@_selected': '' }
             * @type {Object[]}
             */
            this.items = this._initItems(items);
            // console.log(this.items);
            this._setNewItems(this.items);

        }
    }

    // region Compound Controls
    _clearTemplateItems() {
        let clearedItems = [];
        this._setNewItems(clearedItems);
    }

    _getChildrenType(parentType) {
        switch (parentType) {
            case "radiogroup":
                return "radio";
            case "checkboxgroup":
                return "checkbox";
            case "menulist":
                return "menuitem";
            case "listbox":
                return "listitem";
            default:
                throw new Error(`Invalid parent type: ${parentType}`);
        }
    }

    /**
     * 初始化项目列表，将输入的 XML 格式的字符串数组或对象数组转换为统一的对象数组格式。
     * @param {Array} items - 输入的项目列表，可以是 XML 格式的字符串数组或对象数组。
     * @returns {Array} - 转换后的对象数组，每个对象的属性带有 '@_' 前缀。
     */
    _initItems(items) {
        // 检查输入是否为数组
        if (!Array.isArray(items)) {
            throw new Error("输入必须是一个数组");
        }

        // 遍历输入数组，根据每个元素的类型进行处理
        return items.map((item) => {
            if (typeof item === "string") {
                const parsedItem = this.parser.parse(item); // 解析 XML 字符串

                // 提取解析后的属性值，并转换为所需的格式
                let childrenType = this._getChildrenType(this.type);
                const listitem = parsedItem[childrenType]
                return listitem;
            } else if (typeof item === "object") {
                // 如果是对象
                // 直接将对象的属性名添加 '@_' 前缀
                // 如果是对象，动态处理所有键并添加 '@_' 前缀
                const result = {};
                for (const key in item) {
                    if (item.hasOwnProperty(key)) {
                        result[`@_${key}`] = item[key];
                    }
                }
                return result;
            } else {
                // 如果输入的元素类型既不是字符串也不是对象，抛出错误
                throw new Error("输入数组中的元素类型无效");
            }
        });
    }

    _setNewItems(items, customType = this.type) {
        let xmlObj = this.parser.parse(this.xml);
        // console.log(xmlObj);

        let listbox = this.getNode(xmlObj, customType);
        // console.log(listbox);
        let childrenType = this._getChildrenType(this.type);
        listbox[childrenType] = items;

        this.xml = this.builder.build(xmlObj);
    }

    // endregion Compound Controls


    toString() {
        return `[object XULControl id="${this.id}" type="${this.type}"]`;
    }

    // region simple controls

    getNode(xmlObj, tagName) {
        let node = xmlObj.row[tagName];
        return node;
    }


    _updateXmlAttribute(attrName, value, customType = this.type) {
        try {
            // console.log(attrName, value);
            const xmlObj = this.parser.parse(this.xml);
            xmlObj.row[customType][`@_${attrName}`] = String(value);
            // console.log(xmlObj);
            this.xml = this.builder.build(xmlObj);
            // console.log(this.xml);
        } catch (error) {
            console.error(error);
        }
    }

    // update(settings) {
    //     if (settings[this.id] !== undefined) {
    //         this.value = settings[this.id];
    //     }
    // }
    //
    // validate() {
    //     const value = this.value;
    //
    //     if (this._required && !value.trim()) {
    //         return `Field "${this.id}" is required`;
    //     }
    //
    //     // if (this._maxLength && value.length > this._maxLength) {
    //     //     return `Text exceeds maximum length of ${this._maxLength} characters`;
    //     // }
    //
    //     if (this._pattern && !new RegExp(this._pattern).test(value)) {
    //         return `Invalid format for field "${this.id}"`;
    //     }
    //
    //     return null;
    // }

    // setRules(rules) {
    //     if (rules.required) this._required = true;
    //     if (rules.pattern) this._pattern = rules.pattern;
    //     // if (rules.maxLength) this._maxLength = rules.maxLength;
    // }

    _initProperties() {
        throw new Error('Not implemented');
    }

    _initDefaultAttributes() {
        // console.log("_initDefaultAttributes");


        const attributes = this.attributes;
        if (!attributes) return;
        try {
            const xmlObj = this.parser.parse(this.xml);

            // 获取当前控件的节点
            let controlNode = this.getNode(xmlObj, this.type);
            if (!controlNode) return;

            // 遍历所有定义的属性，动态解析 XML 中的值
            for (const [prop, defaultValue] of Object.entries(attributes)) {
                const attrName = `@_${prop}`;
                const attrValue = controlNode[attrName];

                if (attrValue !== undefined) {
                    // 根据属性类型进行解析
                    if (defaultValue === null || defaultValue === "") {
                        this[prop] = attrValue || defaultValue;
                    } else if (typeof defaultValue === 'boolean') {
                        this[prop] = attrValue === 'true';
                    } else if (typeof defaultValue === 'number') {
                        this[prop] = parseInt(attrValue, 10) || defaultValue;
                    } else {
                        this[prop] = attrValue || defaultValue;
                    }
                } else {
                    this[prop] = defaultValue;
                }
            }

            // console.log(xmlObj);
        } catch (error) {
            console.error(`Error parsing attributes for ${this.type}: ${error}`);
        }
    }

    _setNewAttributes() {

        try {
            let xmlObj = this.parser.parse(this.xml);


            let sliderNode = this.getNode(xmlObj, this.type);
            let labelNode = this.getNode(xmlObj, 'label');

            if (sliderNode) {
                sliderNode['@_id'] = this.id;
            }

            if (labelNode) {
                labelNode['@_value'] = this.$label;
            }

            // console.log(xmlObj);

            this.xml = this.builder.build(xmlObj);

            // console.log(this.xml);


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

    // endregion simple controls

}

module.exports = XULControl;