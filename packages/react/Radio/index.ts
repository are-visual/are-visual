import RawRadio from './Radio'
import Group from './RadioGroup'

type RadioComponent = typeof RawRadio & {
  Group: typeof Group
}

const Radio = RawRadio as RadioComponent
Radio.Group = Group

export { Radio }
export type { RadioProps } from './Radio'
export type { RadioGroupProps } from './RadioGroup'
