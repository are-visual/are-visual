import { Button, ButtonProps, Switch } from '@are-visual/react'
import { FC, useState } from 'react'

const variant: ButtonProps['variant'][] = [
  'default',
  'outline',
  'filled',
  'same',
  'text-same',
  'highlight',
  'text',
]

const ButtonUsage: FC = () => {
  const [color, setColor] = useState<ButtonProps['color']>('gray')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

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
          flexGrow: 1,
          padding: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexGrow: 1,
            padding: 16,
          }}
        >
          {variant.map((item) => {
            return (
              <Button
                key={item}
                variant={item}
                color={color}
                disabled={disabled}
                loading={loading}
              >
                {item}
              </Button>
            )
          })}
        </div>
        <div
          style={{
            padding: 18,
            backgroundColor: '#E5E5E5',
          }}
        >
          <Button
            variant="white"
            color={color}
            disabled={disabled}
            loading={loading}
          >
            white
          </Button>
        </div>
      </div>
      <aside style={{ padding: 16, flex: 'none', width: 250 }}>
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
        <Switch checked={loading} onChange={setLoading}>
          Loading
        </Switch>
        <Switch checked={disabled} onChange={setDisabled}>
          Disabled
        </Switch>
      </aside>
    </section>
  )
}

export default ButtonUsage
