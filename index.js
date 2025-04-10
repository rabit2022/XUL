const XUL = require('./src/xul');

// 创建简单对话框
const dialog = new XUL('我的对话框')
// .addTextbox('用户名', 'username', { prompt: '请输入用户名'  })
// .addColorchip('颜色', 'color', { color: '#ff0000' })
// .addPopupSlider('年龄', 'age', {value: 25, minvalue: 18, maxvalue: 99})
// .addCheckbox('记住我','remember', { tabindex: 1 })
// .addListbox('列表', 'listbox', {width: 200, flex: 1, rows: 5},
//     // ['<listitem label="Item 1" value="1" selected="true" />', '<listitem label="Item 2" value="2" />'])
//     [{label: 'Item 1', value: 1, selected: true}, {label: 'Item 2', value: 2, selected: false}])
// .addMenuList('列表', 'menu', {width: 200, flex: 1, rows: 5},
//     [{label: 'Item 1', value: 1, selected: true}, {label: 'Item 2', value: 2, selected: false}])
// .addCheckboxGroup('兴趣', 'interests', {groupbox:false},
//     [{label: '编程', checked: true, tabindex: 1, accesskey: 'p'},
//      {label: '设计', checked: false, tabindex: 2, accesskey: 'd'},
//      {label: '音乐', checked: false, tabindex: 3, accesskey: 'm'}])
// .addSeparator()
// .addSpacer()
// .addProperty('username')
// .addFlash('flash',{
//     src: 'http://www.w3school.com.cn/i/movie.swf',
//     width: 300,
//     height: 200,
// })
// .addLabel('Hello, world!', 'label1')
.addScript('script1', 'alert("Hello, world!");')
    .addSeparator("sep1")
//     .updateControl("script1","",{content: "alert('Hello,');"})
    .addMenuList('菜单', 'ascii-art-menu', {}, [
        {label: '一万人', value: '-'},
        {label: '一万人就', value: '-'},
        {label: '一万人在', value: '-'},
        {label: '一万人有', value: '-'}])
    .addEvent("focus",'ascii-art-menu',
        function() {
            fl.trace("focus");
    }
    )

// function createDialog(params1, params2) {
// }

// const dialog = XUL.factory(
//     {
//         name: 'dialog', params: ["param1", "param2"]
//     }
//     // createDialog
// ).updateControl("dialog_param1", "用户名", {required: true}, null)
    // .addEvent("create", "dialog_param1", function () {
    //     console.log("create");
    //     return true;
    // })

console.log(dialog.xml);

