import { useState, VFC } from 'react'

import { Button } from '../../button'
import { Modal } from '../index'

const Usage: VFC = () => {
  const [visible, setVisible] = useState(true)

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
        <Modal
          visible={visible}
          onClose={() => setVisible(false)}
          title="Look"
          closeOnClickOutside={false}
          centered
          style={{
            width: 540,
          }}
        >
          <div
            style={{
              maxHeight: 300,
              overflowY: 'auto',
              padding: '0 14px 14px 14px',
            }}
          >
            Early in the day it was whispered that we should sail in a boat,
            only thou and I, and never a soul in the world would know of this
            our pilgrimage to no country and to no end.
          </div>
          <Modal.Footer defaultBg={false}>
            <Button
              variant="highlight"
              style={{ marginRight: 8 }}
              onClick={() => {
                setVisible(false)
              }}
            >
              取消
            </Button>
            <Button variant="filled" color="blue">
              保存
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <aside style={{ padding: 16, flex: 'none', width: 250 }}>
        {/* <h3>Position</h3>
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
        </select> */}
      </aside>
    </section>
  )
}

export default Usage
