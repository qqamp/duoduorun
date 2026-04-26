/**
 * z 檢定（比例）— settings → 結果
 *
 * settings:
 *   { type: 'one' | 'two',
 *     var1, successLevel, p0,            // one
 *     groupVar, valueVar, successLevel } // two
 */
import { oneProp, twoProp } from '../../lib/stats/zProp.js'

export function runZProp(rows, settings) {
  const type = settings?.type || 'one'
  if (type === 'one') {
    return oneProp(rows, settings?.var1, settings?.successLevel, settings?.p0)
  }
  if (type === 'two') {
    return twoProp(rows, settings?.groupVar, settings?.valueVar, settings?.successLevel)
  }
  return { error: 'unknown-type' }
}
