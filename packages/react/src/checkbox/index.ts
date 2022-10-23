import RawCheckbox, { CheckboxComponent } from './checkbox'
import Group from './checkbox-group'

export type { CheckboxProps } from './checkbox'

type CheckboxComponentType = CheckboxComponent & {
  Group: typeof Group
}

const Checkbox = RawCheckbox as CheckboxComponentType
Checkbox.Group = Group

export { Checkbox }
