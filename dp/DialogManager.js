//
// // 负责对话框生命周期
// class DialogManager {
//     constructor(xulInstance) {
//         this.xul = xulInstance;
//         this.dialog = null;
//     }
//
//     show() {
//         if (!this.xul.built) {
//             this.xul._build();
//         }
//
//         this.dialog = fl.xmlui.show(this.xul.xml);
//         return this;
//     }
//
//     close(accept = false) {
//         if (this.dialog) {
//             accept ? this.dialog.accept() : this.dialog.cancel();
//         }
//         return this;
//     }
//
//     handleEvent(type, id) {
//         // 事件处理逻辑
//     }
// }
//
// module.exports = DialogManager;