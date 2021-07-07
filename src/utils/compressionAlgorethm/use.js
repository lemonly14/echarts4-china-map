const fs = require('fs')
const path = require('path')
const file = path.resolve(__dirname, './file.json')

// 引入下载模块
// const { DownloadUtil } = require('./download.js')

// 引入压缩模块
const { convert2Echarts } = require('./encodeGeoJson.js')
const zip = convert2Echarts(require('../../../public/geo-json/100000.json'))

// 压缩后的数据写入file.json
fs.writeFile(file, zip, { encoding: 'utf8' }, err => { console.log('err', err) })

// 部署上线可使用打包功能
// const load = new DownloadUtil()
// load.addFileInZip('处理json', zip)
// load.packageZipAndDownload('处理json')
