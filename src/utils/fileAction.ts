import {utils, writeFile, read} from 'xlsx'
import ExcelJs from 'exceljs'
import {accDiv} from './mathUtils'

export function getFileSuffix(filename: string) {
  const index = filename.lastIndexOf('.')
  if (index < 0) return ''
  return filename.slice(index, filename.length)
}

export function getFileNameWithoutSubffix(filename: string) {
  const index = filename.lastIndexOf('.')
  if (index < 0) return filename
  return filename.slice(0, index)
}

export function formatFileSize(size: number) {
  let formatStr = ''
  const _b = 1024
  const _kb = 1048576 // 1024 * 1024
  // const _b = 1000
  // const _kb = 1000000
  if (size < _b) {
    formatStr = `${size}B`
  } else if (size < _kb) {
    const kb = Math.ceil(accDiv(size, _b))
    formatStr = `${kb}KB`
  } else {
    const mb = accDiv(size, _kb).toFixed(2)
    formatStr = `${mb}MB`
  }
  return formatStr
}

export function exportSheetFile(sheetData: unknown[][], filename: string) {
  const ws = utils.aoa_to_sheet(sheetData)
  const wb = utils.book_new()
  // 设置自动宽度
  const colWidth = sheetData.map((row) =>
    row.map((val) => {
      if (val == null) return { wch: 10 }
      else if ((val as string).toString().charCodeAt(0) > 255) {
        return {
          wch: (val as string).toString().length * 2 + 5
        }
      } else {
        return {
          wch: (val as string).toString().length + 5
        }
      }
    })
  )
  const result = colWidth[0]
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j]['wch'] < colWidth[i][j]['wch']) {
        result[j]['wch'] = colWidth[i][j]['wch']
      }
    }
  }
  ws['!cols'] = result
  // 设置自动宽度end
  utils.book_append_sheet(wb, ws, 'sheet')
  writeFile(wb, `${filename}.xlsx`)
}

/**
 * @description 下载、导出数据
 * @param {Object} blob
 * @param {string} fileName
 */
export function saveAs(blob: any, fileName: string) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(a.href)
  a.remove()
}

/**
 * @description 获取导入的 Excel 数据
 * @param {Object} blob
 * @returns {Promise}
 */
export function getExcelData(blob: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsBinaryString(blob)
    reader.onload = (e) => {
      let data = e?.target?.result
      if (!data) reject()
      const workBook = read(data, {
        type: 'binary'
      })
      const tempArr = Object.keys(workBook.Sheets).map((tab: string) => {
        return utils.sheet_to_json(workBook.Sheets[tab])
      })
      resolve(tempArr)
    }
  })
}

/**
 * @description 导出单个文件
 * @param {array} cols
 * @param {array} data
 */
export function exportFile(cols: Array<any>, data: Array<any>) {
  const workBook = new ExcelJs.Workbook()
  workBook.views = [
    {
      x: 0,
      y: 0,
      width: 1000,
      height: 2000,
      firstSheet: 0,
      activeTab: 1,
      visibility: 'visible'
    }
  ]
  // 设置表头数据
  const workSheet = workBook.addWorksheet('tab1')
  workSheet.columns = cols.map((a: any) => {
    return {
      header: a.title,
      key: a.key ? a.key : a.title,
      width: a.width || 120,
    }
  })
  data.forEach((a: any) => {
    workSheet.addRow(a)
  })
  // 输出
  workBook.xlsx.writeBuffer().then((data: any) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(blob, `zfText.xlsx`)
  })
}
