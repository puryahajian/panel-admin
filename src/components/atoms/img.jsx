import React from 'react'
import { href } from 'react-router-dom'

function Img({src, className, href}) {
    return (
        <a href={`https://mediplant.ir/${href}`}>
            <img src={`https://mediplant.ir${src}`} className={`w-16 h-16 border border-grayTitle rounded-lg ${className}`} alt="" />
        </a>
    )
}

export default Img
