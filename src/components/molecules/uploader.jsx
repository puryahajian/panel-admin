import React, { useState } from 'react';
import '../../App.css';
import iconImage from '../../assets/image/Huge-icon.png';
import Title from '../atoms/title';

function Uploader({ textOne, textTwo, className, selectedFile, onFileSelect, preview, setPreview, classDelete,onClick }) {
    const [localPreview, setLocalPreview] = useState('');

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
            return `url(${img})`; // سروری
        }
    };


    return (
        <div
            className={`upload-container flex !text-center ${className}`}
            style={{
            backgroundImage: getBackgroundImage(),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}
        >
            {!(localPreview || preview) && (
                <div className='grid gap-2 w-full m-auto p-2 rounded-lg'>
                    <img src={iconImage} className="m-auto" alt="" />
                    <Title className={`text-[11px] max-[480px]:text-[16px]`}>{textOne}</Title>
                    <Title>{textTwo}</Title>
                </div>
            )}

            {/* {(localPreview || preview) && (
                <div
                    className={`absolute top-2 left-2 bg-gray-800 bg-opacity-45 rounded-full px-1 w-7 h-7 flex justify-center items-center cursor-pointer hover:bg-opacity-100 transition ${classDelete}`}
                    onClick={onClick}
                >
                    <span className="text-white text-xs font-bold">✕</span>
                </div>
            )} */}

            <input
                id="video-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="upload-input"
            />
        </div>
    );
}

export default Uploader;