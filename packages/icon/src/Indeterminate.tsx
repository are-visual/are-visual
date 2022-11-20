import { SVGProps } from 'react'

const SvgIndeterminate = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 8 2" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7 0a1 1 0 0 1 .117 1.993L7 2H1A1 1 0 0 1 .883.007L1 0h6z" />
  </svg>
)
export default SvgIndeterminate
