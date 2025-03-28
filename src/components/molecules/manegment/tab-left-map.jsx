import React from 'react'
import Text from '../../atoms/text'
import Uploader from '../uploader'
import Mapp from '../mapp'

function TabLeftMap({
    selectedFile,
    onFileSelect
    }) {
    return (
        <div>
            <Text>تصویر جواز پزشک</Text>

            <Uploader
                className={`mt-2`}
                textOne={`تصویر جواز پزشک`}
                textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                selectedFile={selectedFile}
                onFileSelect={onFileSelect}
            />

            <Text className={`mt-4`}>موقعیت مکانی</Text>
            
            <div className='mt-2 rounded-lg overflow-hidden'>
                <Mapp/>
            </div>
        </div>
    )
}

export default TabLeftMap
