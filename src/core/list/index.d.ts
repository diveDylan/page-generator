/**
 * @description list page types
 */
import { FormItemProps } from 'antd/es/form'


export interface FormItemConfig extends FormItemProps {
  value?: any
  type?: 'form' | 'info'
}

export interface FormConfig {
  type: 'form' | 'info',
  formItemConfigs: FormItemConfig[]
}