const EventEmitter = require('eventemitter3');

// 枚举类型 create command change
var EventType = {
    CREATE: "create",
    COMMAND: "command",
    CHANGE: "change",
    FOCUS: "focus",
};

class XULEvent {
    constructor(type, control, xul) {
        // 事件类型
        this.type = type;
        // 关联的控件
        this.control = control;
        // XUL 实例
        this.xul = xul;
    }
}

class EventManager {
    static EventType = EventType;

    constructor(xul) {
        this.xul = xul;
        this.emitter = new EventEmitter();
    }

    /**
     * 添加事件监听器
     * @param {string} eventType - 事件类型
     * @param {string} controlId - 控件 ID
     * @param {function(XULEvent, Object)} handler - 事件处理函数，接收一个 XULEvent 实例和一个 eventData 对象
     */
    add(eventType, controlId, handler) {
        const eventName = this.getEventName(eventType, controlId);
        this.emitter.on(eventName, handler);
    }

    getEventName(eventType, controlId) {
        return `${eventType}:${controlId}`;
    }

    /**
     * 触发事件
     * @param {string} eventType - 事件类型
     * @param {string} controlId - 控件 ID
     * @param {Object} eventData - 事件数据，传递给事件处理函数
     */
    trigger(eventType, controlId, eventData) {
        const eventName = this.getEventName(eventType, controlId);
        const control = this.xul.controlManager.getControl(controlId);
        const event = new XULEvent(eventType, control, this.xul);
        this.emitter.emit(eventName, event, eventData);
    }

}

module.exports = EventManager;