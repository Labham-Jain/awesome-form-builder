import { createContext, ReactNode, useState } from "react"
import ElementModel from "./ElementModel";

interface Props {
  children: ReactNode
}

export type ElementTypes = 'input.password' | 'input.email' | 'input.url' | 'input.text' | 'input.number' | 'input.color' | 'input.checkbox' | 'input.toggle' | 'input.textarea' | 'multi.select';

interface ContextType {
  setElementType: (type: ElementTypes | undefined) => void;
  setModelTitle: (title: string) => void;
}

export const ElementModelCtx = createContext<ContextType>({setElementType: () => {}, setModelTitle: () => {}})

const ElementModelContext = ({children}: Props) => {
  const [elementType, setElementType] = useState<ElementTypes | undefined>()
  const [modelTitle, setModelTitle] = useState<string>('')

  return (
    <ElementModelCtx.Provider value={{setElementType, setModelTitle}}>
      {elementType ? <ElementModel modelTitle={modelTitle} type={elementType} /> : null}
      {children}
    </ElementModelCtx.Provider>
  )
}

export default ElementModelContext