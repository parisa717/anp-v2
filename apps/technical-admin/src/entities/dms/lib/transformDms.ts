import { QueryDmss } from '../api/types'
import { type DmsEntity } from '../model/types'

const filterDms = (dms: DmsEntity | null): dms is DmsEntity => dms !== null

export const transformDms = (dmss: QueryDmss) => {
  return dmss?.filter(filterDms) ?? []
}
