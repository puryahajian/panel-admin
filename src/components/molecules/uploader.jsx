import React, { useState } from 'react'
import '../../App.css'
import iconImage from '../../assets/image/Huge-icon.png'
import Text from '../atoms/text';
import Title from '../atoms/title';

function Uploader({textOne, textTwo,className, selectedFile,setSelectedFile}) {
    // const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
    return (
        <div className={`upload-container text-center ${className}`}>
            <img src={iconImage} className='m-auto' alt="" />
            <div htmlFor="video-upload" className=" grid gap-2 mt-2">
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
