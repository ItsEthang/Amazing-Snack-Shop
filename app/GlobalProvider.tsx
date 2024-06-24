import  { PropsWithChildren } from 'react'
import { CartProvider } from './context/CartContext'

const GlobalProvider = ({children}: PropsWithChildren) => {
  return (
    <CartProvider>{children}</CartProvider>
  )
}

export default GlobalProvider