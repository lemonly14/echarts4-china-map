var fs = require('fs')
const path = require('path')
const PUBLIC_PATH = path.resolve(__dirname, 'nanhai1.svg')

// 获取svg文件
const fileContent = fs.readFileSync(PUBLIC_PATH, 'UTF-8')
console.log('fileContent', fileContent)

// 提取d元素列表
const filterTextList = subStringMulti(fileContent, 'd="', '"/>')

// 消除换行符
filterTextList.forEach(item => {
  item.replace(/\n|\r/g, '')
})

// 输出结果
const finalText = filterTextList.reduce((acc, cur) => {
  return acc + cur
})
console.log('finalText++++++++++++', finalText.replace(/[\r\n]/g, ' '))

// 正则处理svg文件
function subStringMulti(text, begin, end) {
  var regex
  if (end === '\\n') { regex = new RegExp(begin + '(.+)', 'g') } else { regex = new RegExp(begin + '([\\s\\S]+?)' + end, 'g') }
  try {
    var result
    var blocks = []
    while ((result = regex.exec(text)) != null) {
      blocks.push(result[1].trim())
    }
    return blocks
    // return text.match(regex);
  } catch (err) {
    return null
  }
}
