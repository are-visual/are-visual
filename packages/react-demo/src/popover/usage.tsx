import { Button, Popover } from '@are-visual/react'
import { FC } from 'react'

const ButtonUsage: FC = () => {
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
        <Popover className="demo" content="哈哈哈哈哈">
          <Button>Hover Me</Button>
        </Popover>
      </div>
    </section>
  )
}

export default ButtonUsage
