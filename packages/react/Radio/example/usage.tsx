import { useState, VFC } from 'react'

import { Radio, RadioGroupProps } from '../index'

const RadioUsage: VFC = () => {
  const [disabled, setDisabled] = useState(false)
  const [direction, setDirection] =
    useState<RadioGroupProps<unknown>['direction']>('x')
  const [value, setValue] = useState(2)
  const [spacing, setSpacing] = useState('10px')

  return (
    <section
      style={{
        display: 'flex',
        border: '1px solid #e9ecef',
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          padding: 16,
        }}
      >
        <Radio.Group
          disabled={disabled}
          value={value}
          spacing={spacing}
          direction={direction}
          onChange={setValue}
        >
          <Radio value={1}>Radio Option 1</Radio>
          <Radio value={2} disabled={false}>
            Radio Option 2
          </Radio>
          <Radio value={3}>Radio Option 3</Radio>
        </Radio.Group>
      </div>
      <aside style={{ padding: 16, flex: 'none', width: 250 }}>
        <h3>Direction</h3>
        <select
          value={direction}
          onChange={(e) => {
            setDirection(e.target.value as 'x' | 'y')
          }}
        >
          <option value="x">x</option>
          <option value="y">y</option>
        </select>
        <h3>Disabled</h3>
        <input
          type="checkbox"
          checked={disabled}
          onChange={(e) => {
            setDisabled(e.target.checked)
          }}
        />
        <h3>Spacing</h3>
        <input
          style={{ width: '100%', border: '1px solid #dfdfdf' }}
          type="text"
          value={spacing}
          onChange={(e) => {
            setSpacing(e.target.value)
          }}
        />
      </aside>
    </section>
  )
}

export default RadioUsage
