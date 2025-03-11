import React from 'react'
import Text from '../../atoms/text'

function SalesRatingList() {
    return (
        <div>
            <Text>رتبه بندی فروش</Text>
            <ul className='mt-6 grid gap-5'>
                <li className='flex gap-2'>
                    <Text className={`bg-red-500 rounded-full w-5 text-center text-white`}>1</Text>
                    <Text>Gongzhuan No.1 shop 323,234</Text>
                </li>
                <li className='flex gap-2'>
                    <Text className={`bg-red-500 rounded-full w-5 text-center text-white`}>2</Text>
                    <Text>Gongzhuan No.1 shop 323,234</Text>
                </li>
                <li className='flex gap-2'>
                    <Text className={`bg-red-500 rounded-full w-5 text-center text-white`}>3</Text>
                    <Text>Gongzhuan No.1 shop 323,234</Text>
                </li>
                <li className='flex gap-2'>
                    <Text className={`bg-red-500 rounded-full w-5 text-center text-white`}>4</Text>
                    <Text>Gongzhuan No.1 shop 323,234</Text>
                </li>
                <li className='flex gap-2'>
                    <Text className={`bg-red-500 rounded-full w-5 text-center text-white`}>5</Text>
                    <Text>Gongzhuan No.1 shop 323,234</Text>
                </li>
            </ul>
        </div>
    )
}

export default SalesRatingList
