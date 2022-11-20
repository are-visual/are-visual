import { SVGProps } from 'react'

const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    {...props}
  >
    <path
      d="M19.861 1.026A2.253 2.253 0 0 1 21.75 0 2.27 2.27 0 0 1 24 2.249c0 .326-.07.649-.208.946l-.162.294-12.753 19.492a2.253 2.253 0 0 1-3.317.504l-.24-.23-6.752-7.497A2.255 2.255 0 0 1 0 14.262a2.27 2.27 0 0 1 2.25-2.249c.519 0 1.021.179 1.421.506l.24.227 4.795 5.326L19.861 1.026z"
      fillRule="nonzero"
    />
  </svg>
)
export default SvgCheck
