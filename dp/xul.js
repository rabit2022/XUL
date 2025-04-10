// const fs = require('fs');
// const path = require('path');
// const {XMLParser, XMLBuilder} = require('fast-xml-parser');
// const {DOMParser, XMLSerializer} = require('xmldom');
// const xpath = require('xpath');
// const EventEmitter = require('eventemitter3');
//
//
//
//
// /**
//  * XUL 对话框主类
//  * @class XUL
//  * @extends EventEmitter
//  */
// class XUL extends EventEmitter {
//     // 基础结构和核心方法
//     /**
//      * 创建XUL对话框实例
//      * @param {string} [title='xJSFL'] - 对话框标题
//      */
//     constructor(title = 'xJSFL') {
//         super();
//
//         // 初始化 XML 处理器
//         this.parser = new XMLParser(Config.parserOptions);
//         this.builder = new XMLBuilder(Config.builderOptions);
//         this.domParser = new DOMParser();
//         this.serializer = new XMLSerializer();
//
//         // 控件集合
//         this.controls = {};
//         // 设置对象
//         this.settings = {};
//         // Flash控件数据
//         this.flashData = null;
//         // 事件处理器
//         this.events = {};
//         // 验证规则
//         this.rules = {};
//         // 列宽
//         this.columns = [100, 180];
//         // 错误信息
//         this.error = null;
//         // 对话框ID
//         this.id = -1;
//         // 对话框内容
//         this.content = '';
//         // 分隔符模板
//         this.separator = '</rows></grid><separator /><grid><columns><column flex="1" /><column flex="2" /></columns><rows>';
//         // 对话框标题
//         this.title = '';
//         // 是否已构建
//         this.built = false;
//         // 是否打开
//         this.open = false;
//         // 是否已接受
//         this.accepted = false;
//
//         // 对话框XML模板
//         this.xml = this._loadDialogTemplate();
//         // 加载控件模板
//         this.templates = this._loadControlTemplates();
//
//
//         this.setTitle(title);
//     }
//
//
//     // --------------------------------------------------------------------------------
//     // shorthand addition of controls
//
//     /**
//      * Add control using shorthand notation
//      * @param    {String}    str                A string of the format "property:value,type:Label=values,type:Label=values, ..."
//      * @returns    {XUL}                        The XUL dialog
//      */
//     add(str) {
//         //TODO Add xml:<xml attr="value"> functionality
//
//         // variables
//         var controls = Utils.parseExpression(str);
//         var rxControl = /(\||\w*:)?([^=]*)=?(.*)/
//         var rxObj = /([^:,]+):([^,]+)/;
//
//         // parse
//         //     for each(var control
//         // in
//         //     controls
//         // )
//         for (var control of controls) {
//             // variables
//             var matches = control.match(rxControl);
//             var control = matches[1].trim().replace(':', '');
//             var label = matches[2].trim();
//             var value = matches[3].trim();
//
//             // control
//             if (control === '') {
//                 control = 'textbox';
//             }
//
//             // handle properties
//             if (/^(title|columns|width|xml)$/.test(control)) {
//                 value = label;
//                 label = '';
//             }
//
//             // compound value
//             else if (/^[\[{]/.test(value)) {
//                 // variables
//                 var isObject = value[0] == '{';
//                 var values = value.substring(1, value.length - 1).split(',');
//
//                 // loop through the array and convert elements to values / objects
//                 for (var i = 0; i < values.length; i++) {
//                     if (isObject) {
//                         var matches = values[i].match(rxObj)
//                         if (matches) {
//                             var lab = matches[1].trim();
//                             var val = matches[2].trim();
//                             values[i] = {label: lab, value: val};
//                         }
//                     } else {
//                         var val = values[i].trim();
//                         values[i] = /^(popupslider|slider|numeric)$/.test(control) ? val : {label: val, value: val};
//                     }
//                 }
//
//                 // update control type
//                 if (control == 'textbox') {
//                     control = 'dropdown';
//                 }
//
//                 // re-assign values
//                 value = values;
//             }
//
//             // debug
//             //inspect([control, label, value])
//
//             // add control
//             switch (control) {
//                 // single controls
//
//                 case 'button':
//                     this.addButton(label);
//                     break;
//
//                 case 'checkbox':
//                     this.addCheckbox(label, null, {checked: value});
//                     break;
//
//                 case 'color':
//                 case 'colorchip':
//                 case 'colorpicker':
//                     this.addColorchip(label, null, {value: value});
//                     break;
//
//                 case 'expression':
//                     this.addExpression(label, null, {value: value});
//                     break;
//
//                 case 'choosefile':
//                 case 'openfile':
//                 case 'file':
//                     this.addFile(label, null);
//                     break;
//
//                 case 'savefile':
//                 case 'save':
//                     this.addFile(label, null, {value: '', type: 'save'});
//                     break;
//
//                 case 'flash':
//                     this.setFlash(label, control, value);
//                     break;
//
//                 case 'value':
//                 case 'number':
//                 case 'numeric':
//                 case 'slider':
//                 case 'popupslider':
//                     this.addSlider(label, null, value);
//                     break;
//
//                 case 'targetlist':
//                     this.addTargetlist(label, null, {value: value});
//                     break;
//
//                 case 'text':
//                 case 'textbox':
//                 case 'textfield':
//                     this.addTextbox(label, null, {value: value});
//                     break;
//
//                 case 'textarea':
//                     this.addTextbox(label, null, {value: value, multiline: true});
//                     break;
//
//                 // compound controls
//
//                 case 'checkboxgroup':
//                 case 'checkboxes':
//                     this.addCheckboxgroup(label, null, value);
//                     break;
//
//                 case 'radiogroup':
//                 case 'radios':
//                 case 'radio':
//                     this.addRadiogroup(label, null, value);
//                     break;
//
//                 case 'list':
//                 case 'listbox':
//                     this.addListbox(label, null, value);
//                     break;
//
//                 case 'menulist':
//                 case 'dropdown':
//                     this.addDropdown(label, null, value);
//                     break;
//
//                 // other
//
//                 case 'xml':
//                     this.addXML(value);
//                     break;
//
//                 case 'label':
//                     this.addLabel(label, null);
//                     break;
//
//                 case 'property':
//                     this.addProperty(value);
//                     break;
//
//                 case 'spacer':
//                 case '-':
//                     this.addSpacer();
//                     break;
//
//                 case 'separator':
//                 case '|':
//                     this.addSeparator();
//                     break;
//
//                 // properties
//
//                 case 'title':
//                     this.setTitle(value);
//                     break;
//
//                 case 'width':
//                     this.setWidth(parseInt(value));
//                     break;
//
//                 case 'columns':
//                     this.setColumns(Utils.parseValue(value));
//                     break;
//
//                 default:
//                     xjsfl.debug.error('XUL.add(): Undefined control type "' + control + '"');
//             }
//
//             // output
//             //inspect([matches[0]..trim(), control, label, value], 'Add');
//         }
//         // return
//         return this;
//     }
//
//     /**
//      * 解析函数信息
//      * @param {Function} fn - 要解析的函数
//      * @returns {Object|null} 解析结果
//      * @private
//      */
//     _parseFunction(fn) {
//         const fnStr = fn.toString();
//         const matches = fnStr.match(/function\s+(\w+)\s*\(([^)]*)\)/);
//         if (matches && matches[2]) {
//             const params = matches[2].split(',').map(p => p.trim()).filter(p => p);
//             return {name: matches[1], params};
//         }
//         return null;
//     }
//
//     /**
//      * 生成控件ID
//      * @param {string} label - 标签文本
//      * @returns {string} 生成的ID
//      * @private
//      */
//     _makeId(label) {
//         if (!label) return '';
//         return label.split(/[^\w]/)[0].toLowerCase();
//     }
//
//     /**
//      * 添加控件
//      * @param {string} type - 控件类型
//      * @param {string} id - 控件ID
//      * @param {string} label - 控件标签
//      * @param {string} xml - 控件XML
//      * @param {Object} [attributes] - 属性
//      * @param {Object} [validation] - 验证规则
//      * @param {Object} [events] - 事件
//      * @param {boolean} [user] - 是否用户自定义
//      * @returns {XUL} XUL实例
//      * @private
//      */
//     _addControl(type, id, label, xml, attributes = {}, validation, events, user = false) {
//         const xmlObj = this.parser.parse(xml);
//         const element = user ? xmlObj : xmlObj[type];
//
//         id = id || this._makeId(label);
//
//         if (xmlObj.label && xmlObj.label.value) {
//             xmlObj.label.value = label ? `${label} : ` : ' ';
//         }
//
//         if (this.controls[id]) {
//             throw new Error(`XUL.addControl(): Cannot add <${type}> control - duplicate id "${id}"`);
//         }
//
//         if (element) {
//             element.id = id;
//             for (const attr in attributes) {
//                 if (/^(value|checked)$/.test(attr)) {
//                     this.settings[id] = attributes[attr];
//                 } else {
//                     element[attr] = attributes[attr];
//                 }
//             }
//         }
//
//         if (attributes && attributes.width > this.columns[1]) {
//             this.columns[1] = attributes.width;
//         }
//
//         // 特殊控件处理
//         switch (type) {
//             case 'targetlist':
//                 if (xmlObj.property) {
//                     xmlObj.property.id = id;
//                 }
//                 break;
//
//             case 'radiogroup':
//             case 'menulist':
//             case 'listbox':
//                 // 处理选中项
//                 break;
//         }
//
//         if (validation) {
//             this._addValidation(id, validation);
//         }
//
//         if (events) {
//             this._addEvents(id, events);
//         }
//
//         const xmlString = this.builder.build(xmlObj);
//         this.controls[id] = new XULControl(id, type, this, xmlString);
//
//         if (!user) {
//             this.addXML(xmlString, false, true);
//         }
//
//         return this;
//     }
//
//     /**
//      * 添加验证规则
//      * @param {string} id - 控件ID
//      * @param {Object} validation - 验证规则
//      * @returns {XUL} XUL实例
//      * @private
//      */
//     _addValidation(id, validation) {
//         if (!this.rules[id]) {
//             this.rules[id] = {};
//         }
//
//         for (const rule in validation) {
//             this.rules[id][rule] = validation[rule];
//         }
//
//         return this;
//     }
//
//     /**
//      * 添加事件处理器
//      * @param {string} id - 控件ID
//      * @param {Object} events - 事件
//      * @returns {XUL} XUL实例
//      * @private
//      */
//     _addEvents(id, events) {
//         for (const name in events) {
//             this.addEvent(id, name, events[name]);
//         }
//         return this;
//     }
//
//     // 控件添加方法
//
//     /**
//      * 添加文本输入框控件
//      * @param {string} label - 标签文本
//      * @param {string} [id] - 控件ID
//      * @param {Object} [attributes] - 额外属性
//      * @param {Object} [validation] - 验证规则
//      * @param {Object} [events] - 事件处理器
//      * @returns {XUL} XUL实例
//      */
//     addTextbox(label, id, attributes = {}, validation, events) {
//         const xml = this.templates.textbox;
//         return this._addControl('textbox', id, label, xml, attributes, validation, events);
//     }
//
//     /**
//      * 添加滑动条控件
//      * @param {string} label - 标签文本
//      * @param {string} [id] - 控件ID
//      * @param {Array|number} [values] - 值数组或单个值
//      * @param {Object} [attributes] - 额外属性
//      * @param {Object} [validation] - 验证规则
//      * @param {Object} [events] - 事件处理器
//      * @returns {XUL} XUL实例
//      */
//     addSlider(label, id, values, attributes = {}, validation, events) {
//         if (!Array.isArray(values)) {
//             values = [values || 0, 0, 100];
//         }
//
//         attributes = {...attributes, value: values[0]};
//         const xml = this.templates.popupslider;
//
//         // 更新XML中的属性
//         let xmlObj = this.parser.parse(xml);
//
//         // xmlObj.popupslider.value = values[0];
//         // xmlObj.popupslider.minvalue = values[1];
//         // xmlObj.popupslider.maxvalue = values[2];
//
//         xmlObj = xmlObj.row;
//         xmlObj.popupslider['@_value'] = values[0];
//         xmlObj.popupslider['@_minvalue'] = values[1];
//         xmlObj.popupslider['@_maxvalue'] = values[2];
//
//         const updatedXml = this.builder.build(xmlObj);
//
//         return this._addControl('popupslider', id, label, updatedXml, attributes, validation, events);
//     }
//
//     /**
//      * 添加复选框控件
//      * @param {string} label - 标签文本
//      * @param {string} [id] - 控件ID
//      * @param {Object} [attributes] - 额外属性
//      * @param {Object} [validation] - 验证规则
//      * @returns {XUL} XUL实例
//      */
//     addCheckbox(label, id, attributes = {}, validation) {
//         const xml = this.templates.checkbox;
//         let xmlObj = this.parser.parse(xml);
//
//         // xmlObj.checkbox.label = label;
//         xmlObj = xmlObj.row;
//         xmlObj.checkbox['@_label'] = label;
//
//         const updatedXml = this.builder.build(xmlObj);
//
//         id = id || this._makeId(label);
//         return this._addControl('checkbox', id, '', updatedXml, attributes, validation);
//     }
//
//     /**
//      * 添加颜色选择器控件
//      * @param {string} label - 标签文本
//      * @param {string} [id] - 控件ID
//      * @param {Object} [attributes] - 额外属性
//      * @param {Object} [validation] - 验证规则
//      * @param {Object} [events] - 事件处理器
//      * @returns {XUL} XUL实例
//      */
//     addColorchip(label, id, attributes = {}, validation, events) {
//         const xml = this.templates.colorchip;
//         attributes = {...attributes};
//
//         if (attributes.value) {
//             let value = String(attributes.value);
//             if (value.startsWith('0x')) {
//                 attributes.format = 'hex';
//             } else if (value.startsWith('#')) {
//                 attributes.format = 'string';
//             } else {
//                 attributes.format = 'string';
//                 if (!isNaN(parseInt(value))) {
//                     value = '#' + Utils.pad(parseInt(value).toString(16).toUpperCase());
//                 } else {
//                     value = '#' + value;
//                 }
//                 attributes.value = value;
//             }
//         }
//
//         return this._addControl('colorchip', id, label, xml, attributes, validation, events);
//     }
//
//     /**
//      * 添加文件选择控件
//      * @param {string} label - 标签文本
//      * @param {string} [id] - 控件ID
//      * @param {Object} [attributes] - 额外属性
//      * @param {Object} [validation] - 验证规则
//      * @param {Object} [events] - 事件处理器
//      * @returns {XUL} XUL实例
//      */
//     addFile(label, id, attributes = {}, validation, events) {
//         const xml = this.templates.choosefile;
//         return this._addControl('choosefile', id, label, xml, attributes, validation, events);
//     }
//
//     /**
//      * 添加按钮控件
//      * @param {string} label - 按钮文本
//      * @param {string} [id] - 控件ID
//      * @param {Object} [attributes] - 额外属性
//      * @param {Object} [events] - 事件处理器
//      * @returns {XUL} XUL实例
//      */
//     addButton(label, id, attributes = {}, events) {
//         const xml = this.templates.button;
//         attributes = {...attributes, label};
//         id = id || this._makeId(label);
//         return this._addControl('button', id, '', xml, attributes, null, events);
//     }
//
//     /**
//      * 添加列表框控件
//      * @param {string} label - 标签文本
//      * @param {string} [id] - 控件ID
//      * @param {Array|Object} values - 列表值
//      * @param {Object} [attributes] - 额外属性
//      * @param {Object} [validation] - 验证规则
//      * @param {Object} [events] - 事件处理器
//      * @returns {XUL} XUL实例
//      */
//     addListbox(label, id, values, attributes = {}, validation, events) {
//         const xml = this.templates.listbox;
//         const updatedXml = this._addChildren(xml, 'listbox', values);
//         return this._addControl('listbox', id, label, updatedXml, attributes, validation, events);
//     }
//
//     /**
//      * 添加下拉菜单控件
//      * @param {string} label - 标签文本
//      * @param {string} [id] - 控件ID
//      * @param {Array|Object} values - 菜单项
//      * @param {Object} [attributes] - 额外属性
//      * @param {Object} [validation] - 验证规则
//      * @param {Object} [events] - 事件处理器
//      * @returns {XUL} XUL实例
//      */
//     addDropdown(label, id, values, attributes = {}, validation, events) {
//         const xml = this.templates.menulist;
//         const updatedXml = this._addChildren(xml, 'menupop', values);
//         return this._addControl('menulist', id, label, updatedXml, attributes, validation, events);
//     }
//
//     /**
//      * 添加单选按钮组控件
//      * @param {string} label - 标签文本
//      * @param {string} [id] - 控件ID
//      * @param {Array|Object} values - 单选按钮项
//      * @param {Object} [attributes] - 额外属性
//      * @returns {XUL} XUL实例
//      */
//     addRadiogroup(label, id, values, attributes = {}) {
//         const xml = this.templates.radiogroup;
//         const updatedXml = this._addChildren(xml, 'radiogroup', values, attributes.selected);
//         return this._addControl('radiogroup', id, label, updatedXml, attributes);
//     }
//
//     /**
//      * 添加复选框组控件
//      * @param {string} label - 标签文本
//      * @param {string} [id] - 控件ID
//      * @param {Array|Object} values - 复选框项
//      * @param {Object} [attributes] - 额外属性
//      * @param {Object} [validation] - 验证规则
//      * @returns {XUL} XUL实例
//      */
//     addCheckboxgroup(label, id, values, attributes = {}, validation) {
//         const xml = this.templates.checkboxgroup;
//         const updatedXml = this._addChildren(xml, 'vbox', values, id || label.toLowerCase());
//         return this._addControl('checkboxgroup', id, label, updatedXml, attributes, validation);
//     }
//
//     /**
//      * 添加目标列表控件
//      * @param {string} label - 标签文本
//      * @param {string} [id] - 控件ID
//      * @param {Object} [attributes] - 额外属性
//      * @param {Object} [validation] - 验证规则
//      * @param {Object} [events] - 事件处理器
//      * @returns {XUL} XUL实例
//      */
//     addTargetlist(label, id, attributes = {}, validation, events) {
//         const xml = this.templates.targetlist;
//         return this._addControl('targetlist', id, label, xml, attributes, validation, events);
//     }
//
//     /**
//      * 添加隐藏属性控件
//      * @param {string} id - 属性ID
//      * @returns {XUL} XUL实例
//      */
//     addProperty(id) {
//         const xml = this.templates.property;
//         const xmlObj = this.parser.parse(xml);
//         xmlObj.property.id = id;
//
//         const updatedXml = this.builder.build(xmlObj);
//
//         return this._addControl('property', id, id, updatedXml);
//     }
//
//     /**
//      * 为复合控件添加子项
//      * @param {string} xml - 父控件XML
//      * @param {string} parentName - 父元素名称
//      * @param {Array|Object} values - 子项值
//      * @param {string} [selected] - 选中项的值
//      * @returns {string} 更新后的XML
//      * @private
//      */
//     _addChildren(xml, parentName, values, selected) {
//         const xmlObj = this.parser.parse(xml);
//         const parent = this._findParentElement(xmlObj, parentName);
//
//         if (!parent) return xml;
//
//         // 清空现有子项
//         parent[parentName] = Array.isArray(parent[parentName]) ? [] : {};
//
//         // 添加新子项
//         let index = 0;
//         for (const key in values) {
//             const value = values[key];
//             const item = this._createChildItem(value, key, index, selected, parentName);
//
//             if (!parent[parentName]['#text']) {
//                 parent[parentName]['#text'] = '';
//             }
//             parent[parentName]['#text'] += item;
//             index++;
//         }
//
//         return this.builder.build(xmlObj);
//     }
//
//     /**
//      * 查找父元素
//      * @param {Object} xmlObj - 解析后的XML对象
//      * @param {string} parentName - 父元素名称
//      * @returns {Object|null} 父元素对象
//      * @private
//      */
//     _findParentElement(xmlObj, parentName) {
//         for (const key in xmlObj) {
//             if (key === parentName) {
//                 return xmlObj;
//             }
//             if (typeof xmlObj[key] === 'object') {
//                 const found = this._findParentElement(xmlObj[key], parentName);
//                 if (found) return found;
//             }
//         }
//         return null;
//     }
//
//     /**
//      * 创建子项元素
//      * @param {*} value - 子项值
//      * @param {string} key - 键名
//      * @param {number} index - 索引
//      * @param {string} [selected] - 选中项的值
//      * @param {string} parentName - 父元素名称
//      * @returns {string} 子项XML字符串
//      * @private
//      */
//     _createChildItem(value, key, index, selected, parentName) {
//         let itemValue, itemLabel, subId;
//
//         if (value && typeof value === 'object' && value.label) {
//             itemValue = value.value;
//             itemLabel = value.label;
//             subId = value.value;
//         } else {
//             if (Array.isArray(value)) {
//                 itemValue = value[index];
//                 itemLabel = value[index];
//                 subId = value[index];
//             } else {
//                 itemValue = value;
//                 itemLabel = key;
//                 subId = value;
//             }
//         }
//
//         const isSelected = (selected === undefined && index === 0) || value == selected;
//         const selectedAttr = isSelected ? ' selected="true"' : '';
//         const idAttr = parentName ? ` id="${parentName}[${subId}]"` : '';
//
//         return `<${parentName.slice(0, -1)} value="${itemValue}" label="${itemLabel}"${idAttr}${selectedAttr}/>`;
//     }
//
//     // 对话框显示与事件处理
//
//     /**
//      * 添加XML到对话框
//      * @param {string|XML} xml - XML字符串或节点
//      * @param {boolean} [breakOutOfRows=false] - 是否跳出rows容器
//      * @param {boolean} [dontParse=false] - 是否不解析控件
//      * @returns {XUL} XUL实例
//      */
//     addXML(xml, breakOutOfRows = false, dontParse = false) {
//         let xmlStr = typeof xml === 'string' ? xml : xml.toString();
//
//         if (!dontParse) {
//             // 解析XML中的控件
//             const doc = this.domParser.parseFromString(`<temp>${xmlStr}</temp>`, 'text/xml');
//             const types = ['textbox', 'popupslider', 'checkbox', 'colorchip', 'choosefile',
//                 'button', 'listbox', 'menulist', 'radiogroup', 'targetlist', 'property'];
//
//             types.forEach(type => {
//                 const nodes = xpath.select(`//${type}`, doc);
//                 nodes.forEach(node => {
//                     const id = node.getAttribute('id');
//                     const value = node.getAttribute('value');
//                     this._addControl(type, id, null, node.toString(), {value}, null, null, true);
//                 });
//             });
//
//             // 获取处理后的子节点
//             xmlStr = Array.from(doc.documentElement.childNodes)
//                 .map(node => node.toString())
//                 .join('');
//         }
//
//         // 处理非row元素
//         if (!xmlStr.includes('<row')) {
//             if (breakOutOfRows) {
//                 xmlStr = this.separator.replace('<separator />', xmlStr);
//             } else {
//                 xmlStr = `<row>${xmlStr}</row>`;
//             }
//         }
//
//         this.content += xmlStr;
//         return this;
//     }
//
//     /**
//      * 添加分隔线
//      * @param {string} [label] - 可选标签
//      * @returns {XUL} XUL实例
//      */
//     addSeparator(label) {
//         let xml = this.templates.separator;
//         if (label) {
//             const xmlObj = this.parser.parse(xml);
//             xmlObj.separator.label = label;
//             xml = this.builder.build(xmlObj);
//         }
//         return this.addXML(xml);
//     }
//
//     /**
//      * 添加空白间隔
//      * @returns {XUL} XUL实例
//      */
//     addSpacer() {
//         return this.addXML(this.templates.spacer);
//     }
//
//     /**
//      * 添加标签
//      * @param {string} label - 标签文本
//      * @param {string} [id] - 控件ID
//      * @returns {XUL} XUL实例
//      */
//     addLabel(label, id) {
//         const xml = this.templates.label;
//         const xmlObj = this.parser.parse(xml);
//
//         const width = this.columns.reduce((sum, col) => sum + col, 0);
//         xmlObj.label.width = width;
//         xmlObj.label.value = label;
//
//         return this.addXML(this.builder.build(xmlObj));
//     }
//
//     /**
//      * 添加脚本
//      * @param {string|Function} script - 脚本内容或函数
//      * @returns {XUL} XUL实例
//      */
//     addScript(script) {
//         const scriptStr = typeof script === 'function' ? script.toString() : script;
//         return this.addXML(`<script><![CDATA[${scriptStr}]]></script>`);
//     }
//
//     /**
//      * 设置Flash控件
//      * @param {string} uriOrPath - SWF文件路径
//      * @param {number} [width=250] - 宽度
//      * @param {number} [height=100] - 高度
//      * @param {Object|XML} [data] - 附加数据
//      * @param {string[]} [properties] - 属性列表
//      * @returns {XUL} XUL实例
//      */
//     setFlash(uriOrPath, width = 250, height = 100, data, properties) {
//         const xml = this.templates.flash;
//         const xmlObj = this.parser.parse(xml);
//
//         const uri = URI.toURI(uriOrPath, 1);
//         const src = URI.pathTo(path.join(__dirname, 'core/ui/'), uri);
//
//         // 更新flash属性
//         const flashNode = xmlObj.row.flash;
//         flashNode['@_src'] = src;
//         flashNode['@_width'] = width;
//         flashNode['@_height'] = height;
//
//         const updatedXml = this.builder.build(xmlObj.row);
//
//         this._addControl('flash', 'flash', null, updatedXml, {width, height});
//         this.setXML(updatedXml);
//
//         // 更新对话框尺寸
//         this.xml.dialog['@_width'] = width;
//         this.xml.dialog['@_height'] = height;
//
//         if (data) {
//             this.setFlashData(data);
//         }
//
//         if (properties) {
//             properties.forEach(prop => this.addProperty(prop));
//         }
//
//         return this;
//     }
//
//     /**
//      * 设置Flash数据
//      * @param {Object|XML} data - 要存储的数据
//      * @returns {XUL} XUL实例
//      */
//     setFlashData(data) {
//         this.flashData = data;
//
//         // 实际实现中可能需要将数据保存到特定位置供Flash读取
//         const dataPath = path.join(__dirname, 'temp', 'flash_data.json');
//         fs.writeFileSync(dataPath, JSON.stringify(data), 'utf-8');
//
//         return this;
//     }
//
//     /**
//      * 替换整个对话框XML
//      * @param {string|XML} xml - 新的XML内容
//      * @returns {XUL} XUL实例
//      */
//     setXML(xml) {
//         this.controls = {};
//         this.events = {};
//         this.settings = {};
//
//         const xmlStr = typeof xml === 'string' ? xml : xml.toString();
//         this.content = this._parseUserXML(xmlStr);
//         return this;
//     }
//
//     /**
//      * 设置控件值
//      * @param {Object|XML} values - 值对象或XML
//      * @returns {XUL} XUL实例
//      */
//     setValues(values) {
//         if (typeof values === 'xml') {
//             const nodes = values.children();
//             for (let i = 0; i < nodes.length(); i++) {
//                 const node = nodes[i];
//                 this.setValue(node.name(), String(node));
//             }
//         } else {
//             for (const id in values) {
//                 this.setValue(id, values[id]);
//             }
//         }
//         return this;
//     }
//
//     /**
//      * 设置单个控件值
//      * @param {string} id - 控件ID
//      * @param {*} value - 值
//      * @returns {XUL} XUL实例
//      */
//     setValue(id, value) {
//         if (this.controls[id]) {
//             this.settings[id] = String(value);
//         }
//         return this;
//     }
//
//     /**
//      * 设置对话框属性
//      * @param {Object} props - 属性对象
//      * @returns {XUL} XUL实例
//      */
//     setProperties(props) {
//         for (const name in props) {
//             const value = props[name];
//             switch (name) {
//                 case 'title':
//                     this.setTitle(value);
//                     break;
//                 // 可以添加其他属性处理
//             }
//         }
//         return this;
//     }
//
//     /**
//      * 设置对话框按钮
//      * @param {string} buttons - 按钮字符串，如"accept,cancel"
//      * @returns {XUL} XUL实例
//      */
//     setButtons(buttons) {
//         // const xmlObj = this.parser.parse(this.xml);
//         // xmlObj.dialog.buttons = buttons;
//         // this.xml = this.builder.build(xmlObj);
//         this.xml.dialog.buttons = buttons;
//         return this;
//     }
//
//     /**
//      * 设置列宽
//      * @param {number[]} columns - 列宽数组
//      * @returns {XUL} XUL实例
//      */
//     setColumns(columns) {
//         if (Array.isArray(columns)) {
//             this.columns = columns;
//         }
//         return this;
//     }
//
//     /**
//      * 设置对话框宽度
//      * @param {number} width - 宽度值
//      * @returns {XUL} XUL实例
//      */
//     setWidth(width) {
//         // const xmlObj = this.parser.parse(this.xml);
//         // xmlObj.dialog.width = width;
//         // this.xml = this.builder.build(xmlObj);
//         this.xml.width = width;
//         return this;
//     }
//
//     /**
//      * 设置对话框标题
//      * @param {string} title - 标题文本
//      * @returns {XUL} XUL实例
//      */
//     setTitle(title) {
//         if (!this.xml) return this;
//
//         // const xmlObj = this.parser.parse(this.xml);
//         // xmlObj.dialog.title = ` ${title}`;
//         // this.xml = this.builder.build(xmlObj);
//         this.xml.dialog.title = ` ${title}`;
//
//         this.title = title;
//         return this;
//     }
//
//     /**
//      * 添加事件监听
//      * @param {string|string[]} ids - 控件ID或数组
//      * @param {string|string[]} types - 事件类型或数组
//      * @param {Function} callback - 回调函数
//      * @param {Object} [scope] - 回调作用域
//      * @returns {XUL} XUL实例
//      */
//     addEvent(ids, types, callback, scope) {
//         // 全局事件处理
//         if (arguments.length === 2 && typeof types === 'function') {
//             const type = ids;
//             if (!/^initialize|prevalidate|postvalidate$/.test(type)) {
//                 throw new Error(`XUL.addEvent(): invalid event type "${type}"`);
//             }
//
//             if (!this.events[type]) {
//                 this.events[type] = {};
//             }
//
//             this.events[type] = callback;
//             return this;
//         }
//
//         // 控件事件处理
//         types = String(types).replace(/click/g, 'command');
//
//         const idArr = Utils.toArray(ids);
//         const typeArr = Utils.toArray(types);
//
//         idArr.forEach(id => {
//             typeArr.forEach(type => {
//                 if (!/^command|change|setfocus|create$/.test(type)) {
//                     throw new Error(`XUL.addEvent(): invalid event type "${type}"`);
//                 }
//
//                 if (!this.events[type]) {
//                     this.events[type] = {};
//                 }
//
//                 this.events[type][id] = callback;
//             });
//         });
//
//         if (scope) {
//             this.setEventScope(scope);
//         }
//
//         return this;
//     }
//
//     /**
//      * 设置事件作用域
//      * @param {Object} scope - 作用域对象
//      * @returns {XUL} XUL实例
//      */
//     setEventScope(scope) {
//         this.scope = scope;
//         return this;
//     }
//
//     /**
//      * 处理事件
//      * @param {string} type - 事件类型
//      * @param {string} id - 控件ID
//      * @private
//      */
//     handleEvent(type, id) {
//         switch (type) {
//             case 'initialize':
//                 // 初始化时设置所有控件值
//                 Object.values(this.controls).forEach(control => {
//                     control.update(this.settings);
//                 });
//                 break;
//
//             case 'prevalidate':
//             case 'postvalidate':
//                 if (this.events[type] && typeof this.events[type] === 'function') {
//                     const event = new XULEvent(type, null, this, fl.xmlui);
//                     this.events[type].call(this.scope || this, event);
//                 }
//                 break;
//
//             case 'create':
//             case 'change':
//             case 'command':
//             case 'setfocus':
//                 if (this.events[type] && this.events[type][id]) {
//                     const callback = this.events[type][id];
//                     if (typeof callback === 'function') {
//                         const control = this.controls[id];
//                         const event = new XULEvent(type, control, this, fl.xmlui);
//                         callback.call(this.scope || this, event);
//                     }
//                 }
//                 break;
//         }
//     }
//
//     /**
//      * 加载外部XUL文件
//      * @param {string} pathOrURI - 文件路径或URI
//      * @returns {XUL} XUL实例
//      */
//     load(pathOrURI) {
//         const xmlStr = fs.readFileSync(URI.toURI(pathOrURI).replace('file://', ''), 'utf-8');
//         const xmlObj = this.parser.parse(xmlStr);
//
//         if (xmlObj.dialog && xmlObj.dialog.title) {
//             this.setTitle(xmlObj.dialog.title);
//         }
//
//         this.setXML(this.builder.build(xmlObj.dialog || xmlObj));
//         return this;
//     }
//
//     /**
//      * 显示对话框
//      * @param {Function} [onAccept] - 接受回调
//      * @param {Function} [onCancel] - 取消回调
//      * @returns {XUL} XUL实例
//      */
//     show(onAccept, onCancel) {
//         // if (!fl.getDocumentDOM()) {
//         //   fl.createDocument();
//         // }
//
//         if (!this.built) {
//             this._build();
//         }
//
//         delete this.settings.dismiss;
//         this.open = true;
//         this.accepted = false;
//
//         // 实际实现中需要调用Flash的XMLUI显示方法
//         // this.settings = xjsfl.ui.show(this);
//         this.settings = {dismiss: 'accept'};
//         this.open = false;
//
//         // 处理结果
//         if (this.settings) {
//             // 清理引号
//             for (const name in this.settings) {
//                 this.settings[name] = this.settings[name].replace(/^"([\s\S]*?)"$/, '$1');
//                 // let newValue = this.settings[name];
//                 // this.settings[name] = newValue.replace(/^"([\s\S]*?)"$/, '$1');
//             }
//
//             const args = Utils.getValues(this.values);
//
//             if (this.settings.dismiss === 'accept') {
//                 this.accepted = true;
//
//                 // 验证前事件
//                 this.handleEvent('prevalidate');
//                 this.error = null;
//
//                 // 验证控件
//                 for (const control of Object.values(this.controls)) {
//                     const error = control.validate();
//                     if (error) {
//                         this.error = error;
//                         break;
//                     }
//                 }
//
//                 // 验证后事件
//                 this.handleEvent('postvalidate');
//
//                 if (this.error) {
//                     alert(this.error);
//                     // return this.show(onAccept, onCancel);
//                     return;
//                 } else if (onAccept) {
//                     onAccept.apply(this, args);
//                 }
//             } else if (onCancel) {
//                 onCancel.apply(this, args);
//             }
//         }
//
//         return this;
//     }
//
//     /**
//      * 关闭对话框
//      * @param {boolean} [accept=false] - 是否接受
//      * @returns {void}
//      */
//     close(accept = false) {
//         accept ? fl.xmlui.accept() : fl.xmlui.cancel();
//     }
//
//     /**
//      * 构建对话框XML
//      * @private
//      */
//     _build() {
//         // 添加内容到controls节点
//         const controlsNode = this._findControlsNode(this.xml);
//         if (controlsNode) {
//             const contentObj = this.parser.parse(`<temp>${this.content}</temp>`);
//             controlsNode.row = [...(controlsNode.row || []), ...contentObj.temp.row];
//         }
//
//         // 添加事件处理器
//         const eventTypes = {
//             button: 'create command',
//             checkbox: 'create',
//             radiogroup: 'create',
//             colorchip: 'create change',
//             flash: 'create',
//             listbox: 'create change setfocus',
//             menulist: 'create change setfocus',
//             popupslider: 'create',
//             targetlist: 'create',
//             textbox: 'create change',
//             property: 'create'
//         };
//
//         // 使用xpath查询节点
//         const doc = this.domParser.parseFromString(this.builder.build(this.xml), 'text/xml');
//
//         for (const type in eventTypes) {
//             const events = eventTypes[type].split(' ');
//             const nodes = xpath.select(`//${type}`, doc);
//
//             nodes.forEach(node => {
//                 const id = node.getAttribute('id');
//                 events.forEach(event => {
//                     node.setAttribute(`on${event}`,
//                         `if(window.xjsfl)xjsfl.ui.handleEvent('{xulid}','${event}','${id}');`);
//                 });
//             });
//
//             // 更新XML对象
//             this.xml = this.parser.parse(this.serializer.serializeToString(doc));
//         }
//
//         // 设置列宽
//         this._setColumnWidths(this.xml);
//
//         // 替换分隔符
//         let xmlStr = this.builder.build(this.xml);
//         xmlStr = xmlStr.replace(/<row template="separator"\/>/g, this.separator);
//
//         // 添加xulid属性
//         if (!this.xml.dialog.property) {
//             this.xml.dialog.property = [];
//         }
//         this.xml.dialog.property.push({
//             '@_id': 'xulid',
//             '@_value': '{xulid}'
//         });
//
//         this.built = true;
//     }
//
//     /**
//      * 查找controls节点
//      * @param {Object} xmlObj - 解析后的XML对象
//      * @returns {Object|null} controls节点
//      * @private
//      */
//     _findControlsNode(xmlObj) {
//         if (xmlObj.dialog && xmlObj.dialog.grid && xmlObj.dialog.grid.rows) {
//             return xmlObj.dialog.grid.rows;
//         }
//         return null;
//     }
//
//     /**
//      * 查找指定类型的节点
//      * @param {Object} xmlObj - 解析后的XML对象
//      * @param {string} type - 节点类型
//      * @returns {Array} 找到的节点数组
//      * @private
//      */
//     _findNodes(xmlObj, type) {
//         const doc = this.domParser.parseFromString(this.builder.build(xmlObj), 'text/xml');
//         const nodes = xpath.select(`//${type}`, doc);
//
//         // 将DOM节点转换回对象形式
//         return nodes.map(node => {
//             const nodeStr = this.serializer.serializeToString(node);
//             return this.parser.parse(nodeStr);
//         });
//     }
//
//     /**
//      * 设置列宽
//      * @param {Object} xmlObj - 解析后的XML对象
//      * @private
//      */
//     _setColumnWidths(xmlObj) {
//         const doc = this.domParser.parseFromString(this.builder.build(xmlObj), 'text/xml');
//
//         // 设置标签宽度
//         const labels = xpath.select('//label', doc);
//         labels.forEach(label => {
//             label.setAttribute('width', this.columns[0]);
//         });
//
//         // 设置控件宽度
//         const controls = xpath.select('//*[@class="control"]', doc);
//         controls.forEach(control => {
//             control.setAttribute('width', this.columns[1]);
//         });
//
//         // 更新XML对象
//         this.xml = this.parser.parse(this.serializer.serializeToString(doc));
//     }
//
//     /**
//      * 获取对话框值
//      * @type {Object}
//      */
//     get values() {
//         if (!this.settings) return null;
//
//         const values = {};
//         for (const id in this.controls) {
//             if (this.controls[id].enumerable) {
//                 values[id] = this.controls[id].value;
//             }
//         }
//         return values;
//     }
//
//     /**
//      * 返回字符串表示
//      * @returns {string}
//      */
//     toString() {
//         const title = this.xml ?
//             this.parser.parse(this.xml).dialog.title.trim() : '';
//         return `[object XUL id="${this.id}" title="${title}" controls:${Object.keys(this.controls).length}]`;
//     }
// }
//
//
// module.exports = {
//     XUL,
//     XULControl,
//     Utils,
//     URI
// };


// ... 其他方法保持相同签名 ...
//     // 1.控件创建方法
//     addSlider(label, id, values, attributes, validation, events)
//     addCheckbox(label, id, attributes, validation)
//     addColorchip(label, id, attributes, validation, events)
//     addFile(label, id, attributes, validation, events)
//     addButton(label, id, attributes, events)
//
// // 复合控件
//     addListbox(label, id, values, attributes, validation, events)
//     addDropdown(label, id, values, attributes, validation, events)
//     addRadiogroup(label, id, values, attributes)
//     addCheckboxgroup(label, id, values, attributes, validation)
//     addTargetlist(label, id, attributes, validation, events)
//
// // 辅助元素
//     addSeparator(label)
//     addSpacer()
//     addLabel(label, id)
//     addProperty(id)
//     addXML(xml, breakOutOfRows, dontParse)
//     addScript(script)
//
//
//     // 2.对话框配置方法
//     setTitle(title)
//     setButtons(buttons) // "accept,cancel"
//     setColumns(columns) // [100, 200]
//     setWidth(width)
//     setProperties(props)
//     setFlash(uriOrPath, width, height, data, properties)
//     setFlashData(data)
//
//     // 3. 值操作方法
//     setValues(values) // {id: value}
//     setValue(id, value)
//     get values() // 返回所有控件值的对象
//
//     // 4. 事件方法
//     addEvent(ids, types, callback, scope)
//     setEventScope(scope)
//
//     // 5.对话框生命周期方法
//     show(onAccept, onCancel) // 返回Promise
//     close(accept = false)
//
//     // 6.静态工厂方法
//     static factory(props)
//     static create(props, accept, cancel, defaults)
//
//     // 7.其他
//     load(pathOrURI) // 从文件加载
//     saveAs(pathOrURI) // 保存到文件
//     toString()
//
//     // 获取内部管理器实例
//     get controlManager()
//     get eventManager()
//     get dialogManager()