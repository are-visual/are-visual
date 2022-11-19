import { Checkbox, Radio, Switch } from '@are-visual/react'
import { css } from '@stitches/react'
import { FC, useState } from 'react'

const spaceY = css({
  '> :not([hidden]) ~ :not([hidden])': {
    marginTop: 8,
  },
})

const Basic: FC = () => {
  const [disabled, setDisabled] = useState(false)
  const [checked, setChecked] = useState(false)
  const [val, setVal] = useState(2)

  console.log(val)

  return (
    <div>
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
          <div
            className={spaceY()}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Checkbox disabled>哈哈哈</Checkbox>
            <Checkbox checked disabled>
              哈哈哈
            </Checkbox>
            <Radio.Group defaultValue={1}>
              <Radio value={1} disabled>
                哈哈哈
              </Radio>
              <Radio value={2} disabled checked>
                哈哈哈
              </Radio>
            </Radio.Group>
            <Switch
              onCheckedChange={(checkedState) => {
                console.log(checkedState)
              }}
              disabled={disabled}
              defaultChecked
            >
              非受控
            </Switch>
            <Switch
              checked={checked}
              disabled={disabled}
              onCheckedChange={setChecked}
            >
              受控
            </Switch>
            <Switch
              checkedValue={1}
              uncheckedValue={2}
              checked={val === 1}
              disabled={disabled}
              onChange={setVal}
            >
              指定 Value
            </Switch>
          </div>
        </div>
        <aside
          className={spaceY()}
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
            flex: 'none',
            width: 250,
          }}
        >
          <h3>Config</h3>
          <Switch checked={disabled} onCheckedChange={setDisabled}>
            Disabled
          </Switch>
          <Switch checked={checked} onCheckedChange={setChecked}>
            Checked
          </Switch>
        </aside>
      </section>
    </div>
  )
}

export default Basic
