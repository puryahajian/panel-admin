import React from 'react'
import { href } from 'react-router-dom'

function Img({src, className, href}) {
    return (
        <a href={`https://nbzarchi.ir${href}`}>
            <img src={`https://nbzarchi.ir${src}`} className={`w-14 h-14 border border-grayTitle rounded-lg ${className}`} alt="" />
        </a>
    )
}

export default Img