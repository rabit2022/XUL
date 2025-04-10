const XULControl = require("../../core/XULControl");
const xpath = require("xpath");
// <row template="script">
//     <script>
//         <![CDATA[
//         // JavaScript code here
//
// 		            ]]>
//                 </script>
// </row>

class Script extends XULControl {
    constructor(id, xul, xml, attributes) {
        super('script', id, '', xul, xml, attributes);
    }

    _initProperties() {

    }

    _setNewAttributes() {
        const content = this.attributes.content;

        const doc = this.domParser.parseFromString(this.xml, 'text/xml');

        // 获取 <script> 节点
        const scriptNode = xpath.select('//script', doc)[0];

        if (scriptNode) {
            // 获取现有的 CDATA 内容
            let existingContent = '';
            for (let i = 0; i < scriptNode.childNodes.length; i++) {
                if (scriptNode.childNodes[i].nodeType === 4) { // CDATA_SECTION_NODE
                    existingContent += scriptNode.childNodes[i].data;
                } else if (scriptNode.childNodes[i].nodeType === 3) { // TEXT_NODE
                    existingContent += scriptNode.childNodes[i].nodeValue;
                }
            }

            // 添加新内容到 CDATA 区段
            const newContent = existingContent + content;

            // 清除现有的子节点
            while (scriptNode.firstChild) {
                scriptNode.removeChild(scriptNode.firstChild);
            }

            // 创建新的 CDATA 节点并添加内容
            const cdataNode = doc.createCDATASection(newContent);
            scriptNode.appendChild(cdataNode);
        }

        const updatedXml = this.serializer.serializeToString(doc);
        // console.log(updatedXml);
        this.xml = updatedXml;
    }
}

module.exports = Script;