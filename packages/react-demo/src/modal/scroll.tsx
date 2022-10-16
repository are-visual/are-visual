import { Button, Modal } from '@are-visual/react'
import { useState, VFC } from 'react'

const Usage: VFC = () => {
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
        <Button onClick={() => setVisible((v) => !v)}>Open</Button>
        <Modal
          visible={visible}
          // overlayProps={{
          //   style: { backgroundColor: 'hsla(214, 53%, 23%, 0.16)' },
          // }}
          onClose={() => setVisible(false)}
          title="个人设置"
          style={{
            width: 540,
          }}
        >
          <div
            style={{
              maxHeight: 300,
              overflowY: 'auto',
              padding: '0 16px 16px 16px',
            }}
          >
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
            <div>
              Early in the day it was whispered that we should sail in a boat,
              only thou and I, and never a soul in the world would know of this
              our pilgrimage to no country and to no end.
            </div>
          </div>
          <Modal.Footer>
            <Button
              variant="highlight"
              color="red"
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
