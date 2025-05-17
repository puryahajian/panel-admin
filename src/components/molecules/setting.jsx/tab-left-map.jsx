import React from 'react'
import Text from '../../atoms/text'
import Mapp from '../mapp'

function TabLeftMap() {
    return (
        <div>
            <Text>ادرس سایت</Text>
            
            <div className=' mt-2 rounded-lg'>
                <Mapp/>
            </div>
        </div>
    )
}

export default TabLeftMap
