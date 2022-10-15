import RawRadio from './radio'
import Group from './radio-group'

type RadioComponent = typeof RawRadio & {
  Group: typeof Group
}

const Radio = RawRadio as RadioComponent
Radio.Group = Group

export { Radio }
export type { RadioRender, RadioRenderFn } from './interface'
export type { CustomRadioProps, RadioChangeEvent, RadioProps } from './radio'
export type { RadioGroupProps } from './radio-group'
