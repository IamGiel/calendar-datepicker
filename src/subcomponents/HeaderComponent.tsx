import React, { ReactNode } from 'react'
import './HeaderComponent.css'

interface Iheader {
  containerClass?: string;
  childClass?: string;
  children?: ReactNode;
}

export const HeaderComponent = ({containerClass, childClass, children}:Iheader) => {
  return (
    <div className={`${containerClass} header-component`}>
      { // all children will share classname
        React.Children.map(children, (child)=> {
          return React.cloneElement(child as React.ReactElement, {
            className: `${childClass}`
          })
        })
      }
    </div>
  )
}
