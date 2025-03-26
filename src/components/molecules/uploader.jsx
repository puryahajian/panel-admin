import React, { useState } from 'react';
import '../../App.css';
import iconImage from '../../assets/image/Huge-icon.png';
import Title from '../atoms/title';

function Uploader({ textOne, textTwo, className, selectedFile, onFileSelect }) {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onFileSelect(file); 
            setPreview(URL.createObjectURL(file)); 
        }
    };

    return (
        <div className={`upload-container !text-center ${className}`}>
            <div htmlFor="video-upload" className="grid gap-2 mt-2">
                <img src={iconImage} className="m-auto" alt="" />
                <Title>{textOne}</Title>
                <Title>{textTwo}</Title>
            </div>
            <input
                id="video-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="upload-input"
            />
            {preview && selectedFile && (
                <div className="preview-container mt-2 m-auto text-center">
                    <p className="file-name flex items-center text-center m-auto">
                        <img src={preview} className="w-6 h-6" alt="" /> {selectedFile?.name}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Uploader;
