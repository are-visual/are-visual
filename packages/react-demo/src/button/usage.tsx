import { Button, ButtonProps, Switch } from '@are-visual/react'
import { FC, useState } from 'react'

const ButtonUsage: FC = () => {
  const [variant, setVariant] = useState<ButtonProps['variant']>('default')
  const [color, setColor] = useState<ButtonProps['color']>('gray')
  const [size, setSize] = useState<ButtonProps['size']>('middle')
  const [fullWidth, setFullWidth] = useState(false)
  const [label, setLabel] = useState('Are Visual')
  const [rounded, setRounded] = useState<number | string>()
  const [disabled, setDisabled] = useState(false)
  const [bgColor, setBgColor] = useState('#f1f3f5')
  const [loading, setLoading] = useState(false)

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
      </div>
      <aside
        className="space-y-[8px]"
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
          flex: 'none',
          width: 250,
        }}
      >
        <h3>Background color</h3>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => {
            setBgColor(e.target.value)
          }}
        />
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
      </aside>
    </section>
  )
}

export default ButtonUsage
