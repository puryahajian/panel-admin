import React from 'react'
import { href } from 'react-router-dom'

function Img({src, className, href}) {
    return (
        <a href={`https://baybiar.ir/${href}`}>
            <img src={`https://baybiar.ir${src}`} className={`w-16 h-16 border border-grayTitle rounded-lg ${className}`} alt="" />
        </a>
    )
}

export default Img