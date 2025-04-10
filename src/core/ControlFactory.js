// import Textbox from "../controls/TextBox";

const Textbox = require("../controls/simple/TextBox");
const Colorchip = require("../controls/simple/Colorchip");
const PopupSlider = require("../controls/simple/PopupSlider");
const Checkbox = require("../controls/simple/Checkbox");
const Button = require("../controls/simple/Button");
const TargetList = require("../controls/simple/TargetList");
const ChooseFile = require("../controls/simple/ChooseFile");

const ListBox = require("../controls/compound/ListBox");
const MenuList = require("../controls/compound/MenuList");
const RadioGroup = require("../controls/compound/RadioGroup");
const CheckboxGroup = require("../controls/compound/CheckboxGroup");
const XULControl = require("./XULControl");

const Property = require("../controls/nonvisual/Property");
const FlashControl = require("../controls/Flash/FlashControl");
const Label = require("../controls/simple/Label");
const Script = require("../controls/nonvisual/Script");
const Separator = require("../controls/nonvisual/Separator");
const Spacer = require("../controls/nonvisual/Spacer");


/**
 * 负责创建 XUL控件对象
 */
class ControlFactory {
    static create(type, id, label, xul, xml, attributes, items) {
        switch (type) {
            // simple controls
            case 'label':
                return new Label(id, label, xul, xml, attributes);
            case 'textbox':
                return new Textbox(id, label, xul, xml, attributes);
            case 'colorchip':
                return new Colorchip(id, label, xul, xml, attributes);
            case 'popupslider':
                return new PopupSlider(id, label, xul, xml, attributes);
            case 'checkbox':
                return new Checkbox(id, label, xul, xml, attributes);
            case 'button':
                return new Button(id, label, xul, xml, attributes);
            case 'targetlist':
                return new TargetList(id, label, xul, xml, attributes);
            case 'choosefile':
                return new ChooseFile(id, label, xul, xml, attributes);

            // complex controls
            case 'listbox':
                return new ListBox(id, label, xul, xml, attributes, items);
            case 'menulist':
                return new MenuList(id, label, xul, xml, attributes, items);
            case 'radiogroup':
                return new RadioGroup(id, label, xul, xml, attributes, items);
            case 'checkboxgroup':
                return new CheckboxGroup(id, label, xul, xml, attributes, items);

            // NON-VISUAL CONTROLS
            case 'separator':
                return new Separator(id, xul, xml);
            case 'spacer':
                return new Spacer(id, xul, xml);
            case 'property':
                return new Property(id, xul, xml);
            case 'script':
                return new Script(id, xul, xml, attributes);

            // flash controls
            case 'flash':
                return new FlashControl(id, xul, xml, attributes);

            default:
                throw new Error(`Unsupported control type: ${type}`);
        }
    }
}

module.exports = ControlFactory;