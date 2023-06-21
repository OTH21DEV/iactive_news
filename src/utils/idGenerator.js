import React from 'react'

export const idGenerator = () => {
  return Math.random().toString(2).substring(2)+new Date().getTime().toString(36)
}

// export default idGenerator