
const XUL = require('./src/xul');

// 创建简单对话框
const dialog = new XUL('我的对话框')
    .addScript('script1', 'alert("Hello, world!");')
    .updateControl("script1", "", { content: "alert('Hello,');" })
    .addMenuList('菜单', 'ascii-art-menu', {}, [
        { label: '一万人', value: '-' },
        { label: '一万人就', value: '-' },
        { label: '一万人在', value: '-' },
        { label: '一万人有', value: '-' }
    ])
    .addEvent("focus", 'ascii-art-menu', function () {
        fl.trace("focus");
    });

console.log(dialog.xml);