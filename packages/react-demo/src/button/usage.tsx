import { Button, ButtonProps, Switch } from '@are-visual/react'
import { FC, useState } from 'react'

import Stage from '../components/stage'

const ButtonUsage: FC = () => {
  const [variant, setVariant] = useState<ButtonProps['variant']>('default')
  const [color, setColor] = useState<ButtonProps['color']>('gray')
  const [size, setSize] = useState<ButtonProps['size']>('middle')
  const [fullWidth, setFullWidth] = useState(false)
  const [label, setLabel] = useState('Are Visual')
  const [rounded, setRounded] = useState<number | string>()
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <Stage
      aside={
        <>
          <h3>variant</h3>
          <select
            value={variant}
            onChange={(e) => {
              setVariant(e.target.value as typeof variant)
            }}
          >
            <option value="default">default</option>
            <option value="filled">filled</option>
            <option value="same">same</option>
            <option value="white">white</option>
            <option value="outline">outline</option>
            <option value="text">text</option>
            <option value="text-same">text-same</option>
            <option value="highlight">highlight</option>
          </select>
          <h3>color</h3>
          <select
            value={color}
            onChange={(e) => {
              setColor(e.target.value as typeof color)
            }}
          >
            <option value="gray">gray</option>
            <option value="blue">blue</option>
            <option value="red">red</option>
            <option value="green">green</option>
            <option value="orange">orange</option>
            <option value="none">none</option>
          </select>
          <h3>size</h3>
          <select
            value={size}
            onChange={(e) => {
              setSize(e.target.value as typeof size)
            }}
          >
            <option value="large">large</option>
            <option value="middle">middle</option>
            <option value="small">small</option>
            <option value="none">none</option>
          </select>
          <h3>Rounded</h3>
          <input
            style={{ width: '100%', border: '1px solid #dfdfdf' }}
            type="text"
            value={rounded}
            onChange={(e) => {
              setRounded(e.target.value)
            }}
          />
          <Switch checked={fullWidth} onChange={setFullWidth}>
            FullWidth
          </Switch>
          <Switch checked={loading} onChange={setLoading}>
            Loading
          </Switch>
          <Switch checked={disabled} onChange={setDisabled}>
            Disabled
          </Switch>
          <h3>Label</h3>
          <input
            style={{ width: '100%', border: '1px solid #dfdfdf' }}
            type="text"
            value={label}
            onChange={(e) => {
              setLabel(e.target.value)
            }}
          />
        </>
      }
      wrapClassName="items-stretch"
      className="self-center text-center h-full"
      style={{
        backgroundColor: variant === 'white' ? '#f1f3f5' : undefined,
      }}
    >
      <Button
        variant={variant}
        color={color}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled}
        rounded={rounded}
        loading={loading}
      >
        {label}
      </Button>
    </Stage>
  )
}

export default ButtonUsage
