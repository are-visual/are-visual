import { FC, useState } from 'react'
import ReactScrollbar from 'react-custom-scrollbars'

import Scrollbar from './scrollbar'

const App: FC = () => {
  const [count, setCount] = useState(0)
  return (
    <>
      <button
        onClick={() => {
          setCount((v) => v + 1)
          document.querySelectorAll('img').forEach((v) => {
            v.src =
              'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
          })
        }}
      >
        加载图片{count}
      </button>
      <div className="flex space-x-5">
        <Scrollbar style={{ width: 200, height: 400, maxWidth: 200 }}>
          <div
            style={{
              width: 3000,
              background:
                'linear-gradient(45deg, hsla(239, 94%, 14%, 1) 0%, hsla(190, 68%, 50%, 1) 100%)',
            }}
          >
            <img />
            <div
              className="are-scrollbar-pr"
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                height: 500,
                color: '#fff',
              }}
            >
              123456789123456789123
            </div>
            <div
              className="are-scrollbar-pr are-scrollbar-pb"
              style={{ background: '#ddd' }}
            >
              到了
            </div>
          </div>
        </Scrollbar>
        <ReactScrollbar style={{ width: 200, height: 400 }}>
          <img />
          <div
            style={{
              width: 3000,
              height: 500,
              color: '#fff',
              background:
                'linear-gradient(45deg, hsla(239, 94%, 14%, 1) 0%, hsla(190, 68%, 50%, 1) 100%)',
            }}
          >
            123456789哈1哈2哈3哈4哈4啦2啦3啦4啦快快快1
          </div>
          <div style={{ background: '#ddd' }}>到了</div>
        </ReactScrollbar>
        <div style={{ width: 200, height: 400, overflow: 'scroll' }}>
          <img />
          <div
            style={{
              width: 3000,
              height: 500,
              color: '#fff',
              background:
                'linear-gradient(45deg, hsla(239, 94%, 14%, 1) 0%, hsla(190, 68%, 50%, 1) 100%)',
            }}
          >
            123456789哈1哈2哈3哈4哈4啦2啦3啦4啦快快快1
          </div>
          <div style={{ background: '#ddd' }}>到了</div>
        </div>
      </div>
    </>
  )
}

export default App
