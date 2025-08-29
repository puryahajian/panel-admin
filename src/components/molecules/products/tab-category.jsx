import React, { useState } from 'react'
import ButtonEdit from '../../atoms/button-edit'
import Text from '../../atoms/text'
import GeneralModal from '../modal-general';
import useGetAllCategory from '../../db/use-get-all-category';
import Uploader from '../uploader';
import Input from '../../atoms/input';
import usePatchCategory from '../../db/use-patch-category';
import useDeleteCategory from '../../db/use-delete-category';
import { toast } from 'react-toastify';

function TabCategory() {
    const [open, setOpen] = useState(false);
    const { data } = useGetAllCategory();
    // console.log(data)
    const { mutate } = usePatchCategory();
    const { mutate: mutateDeleteCategory } = useDeleteCategory()
    const [openEditCategory, setOpenEditCategory] = useState(false);
    const [openSelected, setOpenSelected] = useState(null);
    const [ selectedCategory, setSelectedCategory ] = useState();
    const [preview, setPreview] = useState();
    const selectedItem = data?.data?.find((it) => it?.id === openSelected);
    // console.log(selectedItem)
    const [nameCategory, setNameCategory] = useState(selectedItem?.name);
    const [idCategoryDelete, setIdCategoryDelete] = useState(null);
    const [nameCategoryPersian, setNameCategoryPersian] = useState(selectedItem?.om_name);

    
    const handleEditCategory = () => {
        // console.log(selectedCategory, nameCategory, openSelected, preview)
        mutate(
            {
                selectedCategory, nameCategory, openSelected, preview, nameCategoryPersian
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

    return (
        <div className='px-4'>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] pt-4 gap-3 mt-6 max-[1024px]:mt-[0px]'>
            {data?.data?.map((item) => (
                <div className='border border-grayTitle text-center grid gap-4 p-4 rounded-2xl' key={item?.id}>
                    <img src={item?.image} className=' w-full h-28 rounded-xl' alt="" />

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


                    <Text className={`mt-4 mb-2`}>نام عربی</Text>
                    <Input defaultValue={selectedItem?.om_name} value={nameCategoryPersian} onChange={(e) => setNameCategoryPersian(e.target.value)} className={`w-full mb-4`} placeholder={`نام دسته بندی فارسی را وارد کنید`}/>
                </div>
            </GeneralModal>
        </div>

        <div className='flex justify-center mt-4'>
            {data?.length === 0 && <Text>دسته بندی موجود نیست</Text>}
        </div>
        </div>
    )
}

export default TabCategory
