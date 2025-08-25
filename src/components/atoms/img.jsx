import React from 'react'
import { href } from 'react-router-dom'

function Img({src, className, href}) {
    return (
        <a href={`https://api.nowdesign.ir/${href}`}>
            <img src={`https://api.nowdesign.ir${src}`} className={`w-14 h-14 border border-grayTitle rounded-lg ${className}`} alt="" />
        </a>
    )
}

export default Img