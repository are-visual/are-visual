import { Checkbox } from '@are-visual/react'
import { css } from '@stitches/react'
import { useMemo, useState, VFC } from 'react'

const spaceX = css({
  '> :not([hidden]) ~ :not([hidden])': {
    marginLeft: 12,
  },
})

const options = [
  { value: 1, label: '壹' },
  { value: 2, label: '贰' },
  { value: 3, label: '叁' },
  { value: 4, label: '肆' },
]

const Basic: VFC = () => {
  const [value, setValue] = useState([1, 3])

  const checkedState = useMemo(() => {
    const result = { indeterminate: false, checked: false }
    if (value.length === 0) {
      return result
    }
    const isCheckedAll = options.every((item) => value.includes(item.value))
    result.checked = isCheckedAll
    result.indeterminate = !isCheckedAll
    return result
  }, [value])

  const handleCheckedAll = () => {
    if (!checkedState.checked) {
      setValue((prevValue) => {
        const result = prevValue.slice()
        options.forEach((item) => {
          if (!result.includes(item.value)) {
            result.push(item.value)
          }
        })
        return result
      })
    } else {
      setValue([])
    }
  }

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
            justifyContent: 'center',
            flexGrow: 1,
            padding: 16,
          }}
        >
          <Checkbox
            indeterminate={checkedState.indeterminate}
            checked={checkedState.checked}
            onCheckedChange={handleCheckedAll}
          />
          <div style={{ height: 10 }} />
          <div className={spaceX()}>
            <Checkbox.Group value={value} onChange={setValue}>
              {options.map((item) => {
                return (
                  <Checkbox key={item.value} value={item.value}>
                    {item.label}
                  </Checkbox>
                )
              })}
            </Checkbox.Group>
          </div>
        </div>
        <aside style={{ padding: 16, flex: 'none', width: 250 }}>
          {/* <h3>Disabled</h3>
          <input
            type="checkbox"
            checked={indeterminate}
            onChange={(e) => {
              setIndeterminate(e.target.checked)
            }}
          /> */}
        </aside>
      </section>
    </div>
  )
}

export default Basic
