import Footer from './footer'
import ModalCore from './modal'

type ModalComponent = typeof ModalCore & {
  Footer: typeof Footer
}
const Modal = ModalCore as ModalComponent
Modal.Footer = Footer

export type { ModalProps } from './modal'
export { Modal }
