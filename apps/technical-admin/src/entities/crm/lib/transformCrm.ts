import { QueryCrms } from '../api/types'
import { type CrmEntity } from '../model/types'

const filterCrm = (crm: CrmEntity | null): crm is CrmEntity => crm !== null

export const transformCrm = (crm: QueryCrms) => {
  return crm?.filter(filterCrm) ?? []
}
