import React from 'react'
import Text from '../../atoms/text'
import Title from '../../atoms/title'

function ListOrders() {
    const styleTwo = {
        borderLeft: '1px solid #bcbcbc',
        paddingLeft: '8px'
    }
    return (
        <div className='flex'>
            <ul className='grid gap-3'>
                <li>
                    <Text> 3,222 ريال</Text>
                </li>
                <li>
                    <Text> 3,222 ريال</Text>
                </li>
                <li>
                    <Text> 3,222 ريال</Text>
                </li>
                <li>
                    <Text> 3,222 ريال</Text>
                </li>
                <li>
                    <Text> 3,222 ريال</Text>
                </li>
                <li>
                    <Text> 3,222 ريال</Text>
                </li> 
            </ul>

            <ul className='mr-3 grid gap-3'>
                <li style={styleTwo}>
                    <Title>25.65%</Title>
                </li>
                <li style={styleTwo}>
                    <Title>25.65%</Title>
                </li>
                <li style={styleTwo}>
                    <Title>25.65%</Title>
                </li>
                <li style={styleTwo}>
                    <Title>25.65%</Title>
                </li>
                <li style={styleTwo}>
                    <Title>25.65%</Title>
                </li>
                <li style={styleTwo}>
                    <Title>25.65%</Title>
                </li>
            </ul>

            {/* <ul className='mr-10 grid gap-3'>
                <li>
                    <Text>Elit mauris</Text>
                </li>
                <li>
                    <Text>Elit mauris</Text>
                </li>
                <li>
                    <Text>Elit mauris</Text>
                </li>
                <li>
                    <Text>Elit mauris</Text>
                </li>
                <li>
                    <Text>Elit mauris</Text>
                </li>
                <li>
                    <Text>Elit mauris</Text>
                </li>
            </ul> */}
        </div>
    )
}

export default ListOrders
