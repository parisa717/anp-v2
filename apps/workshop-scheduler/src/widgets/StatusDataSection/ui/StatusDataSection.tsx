import { BusinessStatusMode } from '../config/businessStatusModes'
import { StatusDataByLocationModeSection } from './StatusDataByLocationModeSection'
import { StatusDataDefaultModeSection } from './StatusDataDefaultModeSection'

type StatusDataSectionProps =
  | {
      mode: BusinessStatusMode.Default
      isAdditionalBusinessStatus: false
    }
  | {
      mode: BusinessStatusMode.Default
      isAdditionalBusinessStatus: true
    }
  | {
      mode: BusinessStatusMode.ByLocation
      isAdditionalBusinessStatus: boolean
    }

export const StatusDataSection = ({ isAdditionalBusinessStatus, mode }: StatusDataSectionProps) => {
  if (mode === BusinessStatusMode.Default) {
    if (isAdditionalBusinessStatus) {
      return <StatusDataDefaultModeSection isAdditionalBusinessStatus />
    } else {
      return <StatusDataDefaultModeSection isAdditionalBusinessStatus={false} />
    }
  } else {
    return <StatusDataByLocationModeSection isAdditionalBusinessStatus={isAdditionalBusinessStatus} />
  }
}
