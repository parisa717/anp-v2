import { Checkbox, CheckboxProps } from 'primereact/checkbox'
import { ColumnFilterElementTemplateOptions } from 'primereact/column'

interface DataTableCheckboxProps extends Omit<CheckboxProps, 'checked' | 'onChange'> {}

export const DataTableCheckbox = ({
  filterApplyCallback,
  value,
  ...props
}: ColumnFilterElementTemplateOptions & DataTableCheckboxProps) => {
  return <Checkbox checked={!!value} onChange={({ target }) => filterApplyCallback(target.checked)} {...props} />
}

DataTableCheckbox.displayName = 'DataTableCheckbox'
