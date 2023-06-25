import React, { HTMLAttributes } from 'react'
import { isDev } from '../lib/helpers'

type Props = HTMLAttributes<HTMLPreElement> & {
  value: Object
}

const JsonDump: React.FC<Props> = ({ value, ...props }) => {
  if (!isDev()) {
    return null
  }

  return (
    <pre
      style={{
        border: '1px solid grey',
        background: '#f5f5f5',
        margin: '10px auto',
        padding: '10px',
        ...props.style,
      }}
      {...props}
    >
      {JSON.stringify(value, null, 2)}
    </pre>
  )
}

export default JsonDump
