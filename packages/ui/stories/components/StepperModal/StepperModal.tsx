import { ReactNode } from 'react'

import { Modal, ModalProps } from '../Modal'
import { Steps } from '../Steps'

interface Step {
  label: string
  content: ReactNode
  width: string | number
}

export type StepperModalProps = Omit<ModalProps, 'onHide' | 'footer' | 'visible' | 'header' | 'width'> & {
  activeStepIndex: number
  minWidth: number
  onHide?: () => void
  onStepperStepClick: (index: number) => void
  steps: Step[]
  stepsTitle: string
  visible?: boolean
}

export const StepperModal = ({
  activeStepIndex,
  minWidth,
  onHide = () => {},
  onStepperStepClick,
  steps,
  stepsTitle,
  visible = true,
  ...rest
}: StepperModalProps) => {
  return (
    <Modal
      {...rest}
      minWidth={minWidth}
      onHide={onHide}
      header={null}
      footer={null}
      visible={visible}
      width={steps[activeStepIndex].width}
      pt={{
        root: {
          className: 'gap-0',
        },
      }}
    >
      <div className="flex gap-12 mb-[59px]">
        <div>
          <h1 className="text-text-4xl-semibold-lineheight-100 leading-text-4xl-semibold-lineheight-100 m-0 mb-8">
            {stepsTitle}
          </h1>

          <Steps
            activeIndex={activeStepIndex}
            readOnly={false}
            items={steps}
            onSelect={(e) => onStepperStepClick(e.index)}
          />
        </div>

        <div data-cy="step-content">{steps[activeStepIndex].content}</div>
      </div>
    </Modal>
  )
}
