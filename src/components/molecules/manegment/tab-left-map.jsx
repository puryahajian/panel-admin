import React from 'react'
import Text from '../../atoms/text'
import Uploader from '../uploader'
import Mapp from '../mapp'
import UseGetProfileDoctor from '../../db/use-get-profile-doctor';

function TabLeftMap({
    selectedFile,
    onFileSelect
    }) {

    const { data } = UseGetProfileDoctor();

    return (
        <div>
            <Text>تصویر جواز پزشک</Text>
            {data && (
                <Uploader
                    className={`mt-2`}
                    textOne={`تصویر جواز پزشک`}
                    textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                    selectedFile={selectedFile}
                    onFileSelect={onFileSelect}
                    preview={data?.certificate}
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
