import React, { useState } from 'react'
import '../../App.css'
import iconImage from '../../assets/image/Huge-icon.png'
import Text from '../atoms/text';
import Title from '../atoms/title';

function Uploader({textOne, textTwo,className}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };
    return (
        <div className={`upload-container text-center ${className}`}>
            <div htmlFor="video-upload" className=" grid gap-2 mt-2">
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
            {preview && selectedFile && (
                <div className="preview-container mt-2 m-auto">
                    <p className="file-name flex items-center"><img src={preview} className='w-6 h-6' alt="" /> {selectedFile?.name}</p>
                    {/* <img src={preview} alt="Preview" className="selected-image" /> */}
                </div>
            )}
        </div>
    )
}

export default Uploader
