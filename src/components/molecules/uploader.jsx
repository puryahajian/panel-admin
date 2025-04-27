import React, { useState } from 'react'
import '../../App.css'
import iconImage from '../../assets/image/Huge-icon.png'
import Text from '../atoms/text';
import Title from '../atoms/title';

function Uploader({textOne, textTwo,className, selectedFile,onFileSelect, preview, setPreview}) {
    // const [selectedFile, setSelectedFile] = useState(null);
    const [localPreview, setLocalPreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onFileSelect(file); 
            setLocalPreview(URL.createObjectURL(file));
        }
    };

    const getBackgroundImage = () => {
        const img = localPreview || preview;
        if (!img) return 'none';
        if (img.startsWith('blob:')) {
            return `url(${img})`; // لوکال فایل
        } else {
            return `url(https://mediplant.ir${img})`; // سروری
        }
    };

    return (
        <div 
            className={`upload-container !text-center ${className}`}
            style={{
            backgroundImage: getBackgroundImage(),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}>
            <div htmlFor="video-upload" className=" grid gap-2 p-2 mt-2 bg-[#0000008f] rounded-lg w-max m-auto">
                <img src={iconImage} className='m-auto' alt="" />
                <Title>{textOne}</Title>
                <Title>{textTwo}</Title>
            </div>
            <input
                id="video-upload"
                type="file"
                accept="jpg/*"
                onChange={handleFileChange}
                className="upload-input"
            />
            {selectedFile && (
                <p className="file-name">فایل انتخاب شده: {selectedFile?.name}</p>
            )}
        </div>
    )
}

export default Uploader
