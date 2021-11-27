import { useContext } from 'react'
import { layoutContext } from '../context'

export const usePrefix = (after = '') => {
  return `${useContext(layoutContext)?.prefixCls}-${after}`
}
