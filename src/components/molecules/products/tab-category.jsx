import React, { useState, useRef, useCallback } from 'react'
import ButtonEdit from '../../atoms/button-edit'
import Text from '../../atoms/text'
import GeneralModal from '../modal-general';
import useGetAllCategory from '../../db/use-get-all-category';
import Uploader from '../uploader';
import Input from '../../atoms/input';
import usePatchCategory from '../../db/use-patch-category';
import useDeleteCategory from '../../db/use-delete-category';
import { toast } from 'react-toastify';
import DefaultCategory from '../../../assets/image/47abcc97c2763336a579eb7937d9c6bf.jpg'
import Loading from '../../atoms/loading';
import useGetCategory from '../../db/use-get-category';

function TabCategory() {
    const [open, setOpen] = useState(false);
    const { data, isLoading:isLoadingCategory } = useGetCategory();
    const categories = data;
    console.log(categories)
    const { mutate } = usePatchCategory();
    const { mutate: mutateDeleteCategory } = useDeleteCategory()
    const [openEditCategory, setOpenEditCategory] = useState(false);
    const [openSelected, setOpenSelected] = useState(null);
    const [ selectedCategory, setSelectedCategory ] = useState();
    const [preview, setPreview] = useState();
    const selectedItem = data?.data?.find((it) => it?.id === openSelected);
    const [priority, setPriority] = useState(selectedItem?.order);
    const [nameCategory, setNameCategory] = useState(selectedItem?.name);
    const [idCategoryDelete, setIdCategoryDelete] = useState(null);
    const [nameCategoryPersian, setNameCategoryPersian] = useState(selectedItem?.om_name);
    
    // Lazy loading state
    const [displayCount, setDisplayCount] = useState(20);
    const [isLoading, setIsLoading] = useState(false);

    
    const handleEditCategory = () => {
        mutate(
            {
                selectedCategory, nameCategory, openSelected, preview, nameCategoryPersian, priority
            },
            {
                onSuccess: (data) => {
                    toast.success('ویرایش با موفقیت انجام شد')
                }
            }
        )
    }

    const handleDeleteCategory = (idCategoryDelete) => {
        mutateDeleteCategory(
            {
                idCategoryDelete
            },
            {
                onSuccess: (data) => {
                    toast.success('دسته بندی با موفقیت حذف شد')
                }
            }
        )
    }

    // Lazy loading function
    const loadMore = () => {
        if (isLoading) return;
        setIsLoading(true);
        setTimeout(() => {
            setDisplayCount((prev) => prev + 10);
            setIsLoading(false);
        }, 400);
    };

    // Intersection observer for infinite scroll
    const observer = useRef();
    const lastElementRef = useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (
                    entries[0].isIntersecting &&
                    displayCount < categories.length
                ) {
                    loadMore();
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading, displayCount, categories.length]
    );

    return (
        <div className='px-4'>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 mt-6 max-[1024px]:mt-[0px]'>
                {data?.slice(0, displayCount).map((item, index) => (
                    <div 
                        className='border border-grayTitle text-center grid gap-4 p-4 rounded-2xl' 
                        key={item?.id}
                        ref={index === displayCount - 1 ? lastElementRef : null}
                    >
                        <img 
                            src={item?.image} 
                            className=' w-full h-28 rounded-xl object-cover' 
                            loading="lazy"
                            onError={(e) => {
                                e.currentTarget.src = DefaultCategory;
                                e.currentTarget.onerror = null;
                            }}
                        />

                        <Text className={`!font-bold`}>{item?.om_name}</Text>

                        <ButtonEdit onClick={() => {
                            setOpenSelected(item?.id)
                            setOpenEditCategory(true)
                        }}>ویرایش</ButtonEdit>

                        <button onClick={() => {
                            setIdCategoryDelete(item?.id)
                            setOpen(true)
                            }}>
                            <Text className={`text-red-500`}>حذف</Text>
                        </button>
                    </div>
                ))}
                
                <GeneralModal
                    open={open}
                    handleClose={(e) => {
                        e.preventDefault()
                        setOpen(false)
                    }}
                    title="آیا می خواهید این دسته بندی را حذف کنید ؟"
                    actionText="بله"
                    actionHandler={(e) => {
                        e.preventDefault()
                        handleDeleteCategory(idCategoryDelete)
                        setOpen(false); 
                    }}
                    onClose={(e) => {
                        e.preventDefault()
                        setOpen(false); 
                    }}
                    sx={{
                        width: '400px', 
                        '@media (max-width: 600px)': {
                            width: '92%',
                        },
                    }}
                />

                <GeneralModal
                    open={openEditCategory}
                    handleClose={(e) => {
                        e.preventDefault()
                        setOpenEditCategory(false)
                        setNameCategory('')
                    }}
                    actionText="ذخیره"
                    actionHandler={(e) => {
                        e.preventDefault()
                        handleEditCategory()
                        setOpenEditCategory(false); 
                        setNameCategory('')
                    }}
                    onClose={(e) => {
                        e.preventDefault()
                        setOpenEditCategory(false);
                        setNameCategory('')
                    }}
                    sx={{
                        width: '400px', 
                        '@media (max-width: 600px)': {
                            width: '92%',
                        },
                    }}
                >
                    <div className=' text-right'>
                        <Uploader
                            textOne={`تصویر دسته بندی را اپلود کنید`}
                            // textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                            selectedFile={selectedCategory}
                            onFileSelect={setSelectedCategory}
                            preview={selectedItem?.image || preview}
                            setPreview={setPreview}
                            className={`!h-[256px] w-full max-h-[256px]`}

                        />

                        <Text className={`mt-4 mb-2`}>نام</Text>
                        <Input defaultValue={selectedItem?.name} value={nameCategory} onChange={(e) => setNameCategory(e.target.value)} className={`w-full mb-4`} placeholder={`نام دسته بندی عربی را وارد کنید`}/>

                        <div className='grid grid-cols-4 mt-4 gap-2'>
                            <div className='col-span-3'>
                                <Text className={`mb-2`}>نام عربی</Text>
                                <Input defaultValue={selectedItem?.om_name} value={nameCategoryPersian} onChange={(e) => setNameCategoryPersian(e.target.value)} className={`w-full`} placeholder={`نام دسته بندی عربی را وارد کنید`}/>
                            </div>
                            <div>
                                <Text className={`mb-2`} >اولویت</Text>
                                <Input defaultValue={selectedItem?.order} value={priority} inputMode={`numeric`} onChange={(e) => setPriority(e.target.value)} className={`!w-full `} placeholder={`1`}/>
                            </div>
                        </div>
                    </div>
                </GeneralModal>
            </div>

            {/* Loading indicator */}
            {isLoading && (
                <div className='flex justify-center mt-4'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
                </div>
            )}

            {/* Show more button */}
            {!isLoading && displayCount < (data?.data?.length || 0) && (
                <div className='flex justify-center mt-4'>
                    <button 
                        onClick={loadMore}
                        className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
                    >
                        نمایش بیشتر
                    </button>
                </div>
            )}

            <div className='flex justify-center mt-4'>
                {data?.data?.length === 0 && <Text>دسته بندی موجود نیست</Text>}
            </div>

            <div className='flex justify-center mt-6 items-center'>
                {isLoadingCategory ? <Loading/> : ''}
            </div>
        </div>
    )
}

export default TabCategory
