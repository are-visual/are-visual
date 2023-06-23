import { ScrollView, ScrollViewProps } from '@are-visual/react'
import { FC, useState } from 'react'

import Stage from '../components/stage'

const ScrollViewUsage: FC = () => {
  const [scrollbar, setScrollbar] = useState<ScrollViewProps['scrollbar']>()
  return (
    <Stage
      aside={
        <>
          <h3>Scrollbar</h3>
          <select
            value={scrollbar === undefined ? 'default' : scrollbar}
            onChange={(e) => {
              if (e.target.value === 'default') {
                setScrollbar(undefined)
              } else {
                setScrollbar(e.target.value as typeof scrollbar)
              }
            }}
          >
            <option value="default">default</option>
            <option value="none">none</option>
            <option value="x">x</option>
            <option value="y">y</option>
          </select>
        </>
      }
    >
      <ScrollView
        className="border border-gray-400"
        style={{ height: 200, width: 300 }}
        scrollbar={scrollbar}
      >
        {Array(100)
          .fill(null)
          .map((item, index) => {
            return (
              <div key={index} className="whitespace-nowrap">
                {index + 1} - Content - Content - Content - Content - Content -
                Content
              </div>
            )
          })}
      </ScrollView>
    </Stage>
  )
}

export default ScrollViewUsage
