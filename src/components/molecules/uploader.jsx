import React, { useState } from 'react';
import '../../App.css';
import iconImage from '../../assets/image/Huge-icon.png';
import Title from '../atoms/title';
import CloseIcon from '@mui/icons-material/Close';

function Uploader({ 
    textOne, 
    textTwo, 
    className, 
    selectedFile, 
    onFileSelect, 
    preview, 
    setPreview, 
    onClick, 
    clssBtnDelete, 
    handleDeleteImage ,
    disableInputWhenImageExists = false,
}) {
    const [localPreview, setLocalPreview] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onFileSelect(file); 
            setLocalPreview(URL.createObjectURL(file));
            setPreview(URL.createObjectURL(file));
        }
    };

    const getBackgroundImage = () => {
        const img = localPreview || preview;
        if (!img) return 'none';
        if (typeof img === 'string') {
            return `url(${img})`; // لوکال فایل
        } else {
            return `url(${img})`; // سروری
        }
    };

    const hasImage = localPreview || preview;

    return (
        <button className='w-full' onClick={onClick}>
            <div
                className={`upload-container flex justify-center !text-center ${className}`}
                style={{
                    backgroundImage: getBackgroundImage(),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* {(localPreview || preview) && (
                    <button  onClick={handleDeleteImage} className={clssBtnDelete}> 
                        <CloseIcon />
                    </button>
                )} */}
                {!(localPreview || preview) && (
                    <div className='grid gap-2 w-full m-auto p-2 rounded-lg'>
                        <img src={iconImage} className="m-auto" alt="" />
                        <Title>{textOne}</Title>
                        <Title>{textTwo}</Title>
                    </div>
                )}

                {(!hasImage || !disableInputWhenImageExists) && (
                    <input
                        id="video-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="upload-input"
                    />
                )}
            </div>
        </button>
    );
}

export default Uploader;