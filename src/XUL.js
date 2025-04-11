const DialogBuilder = require("./core/DialogBuilder");
const ControlManager = require("./core/ControlManager");
const ControlFactory = require("./core/ControlFactory");
const EventManager = require("./core/EventManager");
const Config = require("./Config");

// const DialogManager = require("./core/DialogManager");


class XUL {
    constructor(title = 'xJSFL') {
        // super();

        this.parser = Config.parser;
        this.builder = Config.builder;
        this.domParser = Config.domParser;
        this.serializer = Config.serializer;

        // 核心组件
        this.dialogBuilder = new DialogBuilder();
        this.controlManager = new ControlManager();
        this.eventManager = new EventManager(this);
        // this.dialogManager = new DialogManager(this);

        // 状态
        // 存储控制值
        this.settings = {};

        this.columns = [100, 180];
        this.title = title;

        // 初始化
        // 加载控件模板
        this.templates = this.dialogBuilder.templates;

    }

    // region properties
    get xml() {
        return this.dialogBuilder.build(this.title, this._content, this.columns);
    }

    get _content() {
        let _content = '';

        let controls = this.controlManager.controls;
        // 遍历controls对象的每个键值对
        for (let key in controls) {
            if (controls.hasOwnProperty(key)) { // 确保是对象自身的属性，而不是继承的属性
                const control = controls[key];
                _content += control.xml;

                // 处理事件
                const eventType = EventManager.EventType.CREATE;
                const controlId = control.id;
                this.eventManager.trigger(eventType, controlId, {control: control});
            }
        }
        return _content;
    }

    // region simple controls

    /**
     * 工厂方法，创建XUL实例
     * @param {Object} props - 控件定义或函数
     * @returns {XUL} XUL实例
     */
    static factory(props) {
        const xul = new XUL();
        if (!xul.dialogBuilder.xml || !props) throw new Error('DialogBuilder not initialized or props not provided');

        if (typeof props === 'object' && props.name && props.params) {
            props.params.forEach(param => {
                const id = props.name + '_' + param;
                xul.addTextbox(param, id);
            });

            xul.title = `Dialog for "${props.name}"`;
            return xul;
        } else {
            throw new Error('Invalid props');
        }
    }

    updateControl(id, label, attributes, items, triggerEvent = true) {
        let origionalControl = this.controlManager.getControl(id);
        if (!origionalControl) {
            throw new Error(`Control with id ${id} not found`);
        }

        let type = origionalControl.type;

        const xml = this.templates[type];
        let newControl = ControlFactory.create(type, id, label, this, xml, attributes, items);

        this.controlManager.updateControl(newControl);

        // 如果需要触发事件，则触发事件
        if (triggerEvent) {
            // 触发事件
            const eventType = EventManager.EventType.CHANGE;
            this.eventManager.trigger(eventType, id, {control: newControl});
        }

        return this;
    }

    // region 控件创建方法
    _addControl(type, id, label, attributes, items) {
        const xml = this.templates[type];

        const control = ControlFactory.create(type, id, label, this, xml, attributes, items);
        if (!control.id) {
            throw new Error('Invalid control id');
        }

        this.controlManager.addControl(control);

        return this;
    }

    addLabel(label, id) {
        return this._addControl('label', id, label);
    }

    addTextbox(label, id, attributes) {
        return this._addControl('textbox', id, label, attributes);
    }

    addColorchip(label, id, attributes) {
        return this._addControl('colorchip', id, label, attributes);
    }

    addPopupSlider(label, id, attributes) {
        return this._addControl('popupslider', id, label, attributes);
    }

    addCheckbox(label, id, attributes) {
        return this._addControl('checkbox', id, label, attributes);
    }

    // endregion simple controls

    addButton(label, id, attributes) {
        return this._addControl('button', id, label, attributes);
    }

    addTargetList(label, id, attributes) {
        return this._addControl('targetlist', id, label, attributes);
    }

    addChooseFile(label, id, attributes) {
        return this._addControl('choosefile', id, label, attributes);
    }

    // region compound controls
    addListbox(label, id, attributes, items) {
        return this._addControl('listbox', id, label, attributes, items);
    }

    // endregion compound controls

    // region NON-VISUAL CONTROLS

    addMenuList(label, id, attributes, items) {
        return this._addControl('menulist', id, label, attributes, items);
    }

    addRadioGroup(label, id, attributes, items) {
        return this._addControl('radiogroup', id, label, attributes, items);
    }

    addCheckboxGroup(label, id, attributes, items) {
        return this._addControl('checkboxgroup', id, label, attributes, items);
    }

    addSeparator(id) {
        return this._addControl('separator', id);
    }

    // endregion NON-VISUAL CONTROLS

    // spacer
    addSpacer(id) {
        return this._addControl('spacer', id);
    }

    // endregion 控件创建方法

    addProperty(id) {
        return this._addControl('property', id);
    }

    addScript(id, content) {
        return this._addControl('script', id, '', {content: content});
    }

    // endregion properties

    addFlash(id, attributes) {
        return this._addControl('flash', id, '', attributes);
    }

    /**
     * 添加事件监听器
     * @param {string} eventType - 事件类型
     * @param {string} controlId - 控件 ID
     * @param {function()} handler - 事件处理函数，接收一个 XULEvent 实例和一个 eventData 对象
     */
    addEvent(eventType, controlId, handler) {
        let origionalControl, newAttributes;

        switch (eventType) {
            case EventManager.EventType.CREATE:
            case EventManager.EventType.CHANGE:
                this.eventManager.add(eventType, controlId, handler);
                break;
            case EventManager.EventType.COMMAND:
                // only for buttons clicked event
                origionalControl = this.controlManager.getControl(controlId);

                newAttributes = origionalControl.attributes;
                newAttributes["oncommand"] = this._onlyFunctionBody(handler);

                this.updateControl(controlId, origionalControl.label, newAttributes, [], false);
                break;
            // FOCUS
            case EventManager.EventType.FOCUS:
                // only for menulist focused event
                origionalControl = this.controlManager.getControl(controlId);

                newAttributes = origionalControl.attributes;
                newAttributes["onsetfocus"] = this._onlyFunctionBody(handler);

                this.updateControl(controlId, origionalControl.label, newAttributes, origionalControl.originalItems, false);
                break;
            default:
                throw new Error(`Invalid event type: ${eventType}`);
        }
        return this;
    }

    _onlyFunctionBody(func) {
        // 源码
        const handlerString = func.toString();
        // 使用正则表达式提取函数体内容
        const match = handlerString.match(/function\s*\([^)]*\)\s*\{([\s\S]*)\}/);

        if (match && match[1]) {
            const functionBody = match[1].trim();
            // console.log("函数体内容:", functionBody);
            const functionBodyWithoutComments = functionBody.replace(/"/g, "'");
            return functionBodyWithoutComments;
        } else {
            throw new Error("Invalid function body");
        }
    }
}


module.exports = XUL;