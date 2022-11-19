import { Button, Portal } from '@are-visual/react'
import { FC, useState } from 'react'

const Usage: FC = () => {
  const [visible, setVisible] = useState(false)
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
        <div id="foo" />
        <Button
          onClick={() => {
            setVisible((v) => !v)
          }}
        >
          Click
        </Button>
        <Portal visible={visible} target="#foo">
          {visible && (
            <>
              <p>123</p>
              <p>456</p>
            </>
          )}
        </Portal>
      </div>
    </section>
  )
}

export default Usage
