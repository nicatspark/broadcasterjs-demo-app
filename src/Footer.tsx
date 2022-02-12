import { Pageflipper } from './Pageflipper'
import { Contact } from './pages/pages.styles'

export const Footer = () => {
  return (
    <div className='footer'>
      <Contact>
        <a href='mailto:nicolas@hervy.se'>nicolas@hervy.se</a>
      </Contact>
      <Pageflipper />
    </div>
  )
}
