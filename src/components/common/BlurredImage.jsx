import { cn } from '@/lib/utils'
import React, { useState } from 'react'

const BlurredImage = ({className, ...props}) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <img  
      {...props }
      className={cn(className, "transition-all duration-300 blur-none", !loaded ? "blur-lg " : "")} 
      onLoad={(e) => setLoaded(true) }
    />
  )
}

export default BlurredImage