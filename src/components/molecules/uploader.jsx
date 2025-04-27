import React, { useState } from 'react'
import '../../App.css'
import iconImage from '../../assets/image/Huge-icon.png'
import Text from '../atoms/text';
import Title from '../atoms/title';

function Uploader({textOne, textTwo,className, selectedFile,setSelectedFile, preview}) {
    // const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const getBackgroundImage = () => {
        if (!preview) return 'none';
        if (preview.startsWith('blob:')) {
            return `url(${preview})`; // لوکال فایل
        } else {
            return `url(https://mediplant.ir${preview})`; // سروری
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
