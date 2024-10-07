import React from 'react';

/**
 * A div with 100% width until max width.
 *
 * @param {object} children Child elements.
 */
export default function MaxWidth({children}) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '750px'
      }}
    >
      {children}
    </div>
  )
}
