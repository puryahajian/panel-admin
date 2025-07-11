import React, { useState } from 'react';
import '../../App.css';
import iconImage from '../../assets/image/Huge-icon.png';
import Title from '../atoms/title';

function Uploader({ textOne, textTwo, className, selectedFile, onFileSelect, preview, setPreview }) {
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
                    <Title>{textOne}</Title>
                    <Title>{textTwo}</Title>
                </div>
            )}
            <input
                id="video-upload"
                type="file"
                accept="xlsx/*"
                onChange={handleFileChange}
                className="upload-input"
            />
        </div>
    );
}

export default Uploader;