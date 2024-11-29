import { Dms } from '@/shared/api/types.generated'

import { GetDmssQuery } from './Dms.generated'

/**
 * This is an example interface
 */

export type DmsDTO = Dms
export type QueryDmss = GetDmssQuery['dmss']
