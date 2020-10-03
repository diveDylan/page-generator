import * as fs from 'fs';
import * as path from 'path'
import { FormItemProps } from 'antd/es/form'
import { FormConfig } from './index.d'
import { source } from './source'

// 创建搜索表单
export function createSearchForm(path: string, formConfigs: FormConfig ) {
  const folder = path + '/components'
  fs.mkdirSync(folder)
  fs.mkdirSync(folder + '/searchForm')
  // 表单组件追加
  try {
    // 配置追加
    const {
      headers, formConfig
    } = formatFormConfig(formConfigs)
    console.log('formConfig', formConfig)
    fs.appendFileSync(
      folder + '/searchForm/index.tsx',
      headers + source.searchForm(formConfig)
    )
  } catch(e) {
    console.error('appendFileSync error', e)
  }
  

}


// 首字母大写
function upCase(str: string): string {
  return str[0].toUpperCase() + str.substr(1)
}
// 字符？
const isString = (str: any): boolean => Object.prototype.toString.call(str) === '[object String]'


// 格式化表单组件
export function formatFormConfig(formConfig: FormConfig) {
  const antdComponents: any []= []
  return {
    formConfig: 
      formConfig.formItemConfigs.map((item) => {
        item.type = item.type || formConfig.type 
        if (isString(item.children)) {
          item.children= upCase(item.children)
          antdComponents.push(item.children)
          item.children = `<${item.children}/>`
        } else {
          item.children.type = upCase(item.children.type)
          antdComponents.push(item.children.type )
          item.children = getComponents(item.children)
        }
        return item
      }),
    headers: `import {${Array.from(new Set(antdComponents)).join(',')}} from 'antd'`
  }
}

interface Option {
  label: string,
  value: string | number
  disabled?: boolean
}
interface Configs {
  type: string
  options?: Option[]
  [key: string]: any // 其他表单子元素的属性
}
const optionsTypes = ['Radio', 'Select', 'Checkbox']

function getComponents(config: Configs) {
 
    return {
      components: `<${config.type} />`,
      props: config.props
    }
}