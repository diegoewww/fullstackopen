import React, { useState, forwardRef, useImperativeHandle } from 'react';

const ToogleForm = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toogleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toogleVisible
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toogleVisible}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toogleVisible}>cancel</button>
      </div>
    </div>
  )
}
)

ToogleForm.displayName = 'Togglable'

export default ToogleForm