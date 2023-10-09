import React from 'react';

/**
 * A div that horizontally centers content.
 *
 * @param {object} children Child elements.
 */
export default function Center({children}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        // height: '100%',
        width: '100%'
      }}
    >
      {children}
    </div>
  )
}
