import type { Meta, StoryObj } from '@storybook/react'
import { ColumnFilterElementTemplateOptions } from 'primereact/column'
import { useState } from 'react'

import { DataTableCheckbox } from './DataTableCheckbox'

const meta: Meta<typeof DataTableCheckbox> = {
  title: 'DataTable/DataTableCheckbox',
  component: DataTableCheckbox,
}

export default meta

type Story = StoryObj<typeof DataTableCheckbox>

const DefaultStoryComponent = () => {
  const [value, setValue] = useState(false)

  const columnFilterElementTemplateOptions: ColumnFilterElementTemplateOptions = {
    value,
    filterApplyCallback: (checked) => {
      setValue(checked)
    },
    filterModel: {},
    filterCallback: () => {},
    index: 0,
    field: 'connected',
  }

  return (
    <div>
      <DataTableCheckbox {...columnFilterElementTemplateOptions} />
      <br />
      <br />
      Filter active: {value ? 'Only checked items' : 'All items'}
    </div>
  )
}

export const Default: Story = {
  render: DefaultStoryComponent,
}
