import React from 'react'
import Text from '../../atoms/text'
import ButtonExisting from '../../atoms/button-existing'
import ButtonEdit from '../../atoms/button-edit'
import Title from '../../atoms/title'

function ListDiscount() {
    return (
        <>
            <div className='mt-4 flex gap-4 border p-2 rounded-2xl items-center max-[992px]:hidden'>
                <div>
                    <Text>1</Text>
                </div>
                <div className='grid grid-cols-11 w-full mr-4 items-center'>
                    <div className=' col-span-2'>
                        <Text>غدیر خم</Text>
                    </div>
                    <div className=' col-span-2'>
                        <Text>qadir1404</Text>
                    </div>
                    <div className=' col-span-2'>
                        <Text>از ۱ اسفند تا ۳ اسفند</Text>
                    </div>
                    <div className=''>
                        <Text>۱۰۰ / ۳</Text>
                    </div>
                    <div className=' col-span-3 flex justify-end gap-4'>
                        <ButtonExisting
                            // onClick={() => handleEditProduct(item.id, item.exist)}
                            className={`bg-red-500 border-transparent`}
                            >
                                {/* {item?.exist === true ? 'فعال' : 'غیر فعال'} */}
                                فعال
                        </ButtonExisting>
                    
                        <ButtonEdit>
                            ویرایش
                        </ButtonEdit>
                    </div>
                    <div className=' flex justify-center items-center'>
                        <button>
                            <Text className={`text-red-500`}>
                                حذف
                            </Text>
                        </button>
                    </div>
                </div>
            </div>

            <div className='gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] hidden max-[992px]:grid max-[990px]:mb-14'>
                {/* {data?.results.map((item, index) => {
                    const category = dataCategory?.results.find((c) => c?.id === item?.category_id)
                    return( */}
                        <div className='border border-grayTitle rounded-2xl p-4'>
                            <div className='w-full grid gap-1'>
                                <div className='flex justify-between items-center'>
                                    <Title> نام کمپین یا تخفیف :</Title>
                                    <Text>kk</Text>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <Title>کد تخفیف :</Title>
                                    <Text>kk</Text>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <Title>تاریخ اعتبار :</Title>
                                    <Text>2000 </Text>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <Title> تعداد کاربران :</Title>
                                    <Text>2000 </Text>
                                </div>
                            </div>
                            <div className='grid grid-cols-3 gap-3 mt-4'>
                                <ButtonExisting 
                                    // onClick={() => handleEditProduct(item.id, item.exist)}
                                    // className={`${item?.exist === true ? '' : 'bg-red-500 border-transparent'}`}
                                    >
                                        {/* {item?.exist === true ? 'فعال' : 'غیر فعال'} */}
                                        فعال
                                </ButtonExisting>
                            
                                <ButtonEdit 
                                >
                                        ویرایش
                                </ButtonEdit>

                                <button >
                                    <Text className={`text-red-500`}>
                                        حذف
                                    </Text>
                                </button>
                            </div>
                        </div>
                    {/* )
                })} */}
            </div>
        </>
    )
}

export default ListDiscount
