/**
 * Fisher 精確檢定 — settings → 結果
 *
 * settings:
 *   { rowVar, colVar, successRow, successCol }
 */
import { fisherExact } from '../../lib/stats/fisherExact.js'

export function runFisherExact(rows, settings) {
  return fisherExact(
    rows,
    settings?.rowVar,
    settings?.colVar,
    settings?.successRow,
    settings?.successCol,
  )
}
