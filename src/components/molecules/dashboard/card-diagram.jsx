import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Text from '../../atoms/text';
import TextBold from '../../atoms/text-bold';

function CardDiagram({contentTitle, children,contentFooter, contentBold, className}) {
    return (
        <div className={` border border-gray-300 py-4 px-6 rounded-2xl grid gap-1 content-between ${className}`}>
            <div className='flex justify-between items-start'>
                <div className='block'>
                    <Text>{contentTitle}</Text>
                    <TextBold>{contentBold}</TextBold>

                </div>
                <ErrorOutlineIcon/>
            </div>
            
            {children}

            <div>
                <hr className='mb-2'/>
                <Text>{contentFooter}</Text>
            </div>
        </div>
    )
}

export default CardDiagram
