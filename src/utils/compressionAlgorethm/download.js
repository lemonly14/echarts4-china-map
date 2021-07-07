
const pkg = require('file-saver')
const { saveAs } = pkg
const JsZip = require('jszip')
class DownloadUtil {
  constructor() {
    this.zip = new JsZip()
  }
  // 添加文件到zip
  addFileInZip(fileName, content, option) {
    this.zip.file(fileName, content, option)
  }
  // 添加文件夹到zip
  addFolderInZip(folderName) {
    return this.zip.folder(folderName)
  }
  // 打包成blob（二进制数据）
  packageZip2blob() {
    return this.zip.generateAsync({ type: 'zip' })
  }
  // 打包并下载(默认打包成blob)
  packageZipAndDownload(zipName, type = 'zip') {
    this.zip.generateAsync({ type }).then(content => {
      saveAs(content, zipName)
    })
  }
}

module.exports = { DownloadUtil }
