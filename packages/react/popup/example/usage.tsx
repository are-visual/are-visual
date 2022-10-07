import { useState, VFC } from 'react'

import { Button } from '../../Button'
import { Popup, PopupPosition } from '../index'

const Usage: VFC = () => {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState<PopupPosition>('center')

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
        <Button onClick={() => setVisible((v) => !v)}>Open</Button>
        <Popup
          visible={visible}
          position={position}
          onClose={() => setVisible(false)}
          style={{
            backgroundColor: '#fff',
            width: 540,
            padding: 16,
            borderRadius: 8,
          }}
        >
          <h1>Content</h1>
          <p>
            Early in the day it was whispered that we should sail in a boat,
            only thou and I, and never a soul in the world would know of this
            our pilgrimage to no country and to no end.
          </p>
        </Popup>
      </div>
      <aside style={{ padding: 16, flex: 'none', width: 250 }}>
        <h3>Position</h3>
        <select
          value={position}
          onChange={(e) => {
            setPosition(e.target.value as PopupPosition)
          }}
        >
          <option value="top">top</option>
          <option value="bottom">bottom</option>
          <option value="left">left</option>
          <option value="right">right</option>
          <option value="center">center</option>
          <option value="x-center">x-center</option>
        </select>
      </aside>
    </section>
  )
}

export default Usage
