import { Button, Overlay } from '@are-visual/react'
import { FC, useState } from 'react'

const ButtonUsage: FC = () => {
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
        <Button onClick={() => setVisible(true)}>Open</Button>
        <Overlay visible={visible} onClick={() => setVisible(false)} />
      </div>
    </section>
  )
}

export default ButtonUsage
