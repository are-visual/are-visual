import { Checkbox } from '@are-visual/react'
import { css } from '@stitches/react'
import { useState, VFC } from 'react'

const spaceY = css({
  '> :not([hidden]) ~ :not([hidden])': {
    marginTop: 8,
  },
})

const Basic: VFC = () => {
  const [disabled, setDisabled] = useState(false)
  const [checked, setChecked] = useState(false)
  const [val, setVal] = useState(1)

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
            <Checkbox
              onCheckedChange={(checkedState) => {
                console.log(checkedState)
              }}
              disabled={disabled}
            >
              非受控
            </Checkbox>
            <Checkbox
              checked={checked}
              disabled={disabled}
              onCheckedChange={setChecked}
            >
              受控
            </Checkbox>
            <Checkbox
              checkedValue={1}
              uncheckedValue={2}
              checked={val === 1}
              disabled={disabled}
              onChange={setVal}
            >
              指定 Value
            </Checkbox>
          </div>
        </div>
        <aside style={{ padding: 16, flex: 'none', width: 250 }}>
          <h3>Disabled</h3>
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => {
              setDisabled(e.target.checked)
            }}
          />
          <h3>Checked</h3>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              setChecked(e.target.checked)
            }}
          />
        </aside>
      </section>
    </div>
  )
}

export default Basic
