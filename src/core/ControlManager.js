class ControlManager {
    constructor() {
        this.controls = {};
    }

    addControl(control) {
        if (!control.id) {
            console.log("id为空，不能添加控件")
            return;
        }
        if (this.controls[control.id]) {
            throw new Error(`Control with id ${control.id} already exists`);
        }
        // this.controls[control.id] = control;
        this.updateControl(control);
    }

    getControl(id) {
        return this.controls[id];
    }

    updateControl(newControl) {
        this.controls[newControl.id] = newControl;
    }
}

module.exports = ControlManager;