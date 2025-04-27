import React, { useState } from 'react'
import Text from '../../atoms/text'
import Uploader from '../uploader'
import Mapp from '../mapp'
import UseGetProfile from '../../db/use-get-profile';

function TabLeftMap({
    selectedFile,
    onFileSelect
    }) {

    const { data } = UseGetProfile();
    const [preview, setPreview] = useState(null);
    
    return (
        <div>
            <Text>تصویر جواز فروشگاه</Text>
            {data && (
                <Uploader
                    className={`mt-2`}
                    textOne={`تصویر جواز فروشگاه`}
                    textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                    selectedFile={selectedFile}
                    onFileSelect={onFileSelect}
                    preview={data?.image}
                    setPreview={setPreview}
                />
            )}

            <Text className={`mt-4`}>موقعیت مکانی</Text>
            
            <div className='mt-2 rounded-lg overflow-hidden'>
                <Mapp/>
            </div>
        </div>
    )
}

export default TabLeftMap
