import React, { useEffect, useState } from 'react'
import Text from '../../atoms/text'
import Mapp from '../mapp';
import useGetInfo from '../../db/use-get-info';

function TabLeftMap() {
    const { data } = useGetInfo();
    const defaultLat = 35.699739; // مختصات پیش‌فرض (مثلاً تهران)
    const defaultLng = 51.338097;

    // مقداردهی اولیه savedPosition با بررسی مقادیر معتبر
    const [savedPosition, setSavedPosition] = useState({
        savedLat: parseFloat(localStorage.getItem('lat')) || parseFloat(data?.lat) || defaultLat,
        savedLng: parseFloat(localStorage.getItem('lng')) || parseFloat(data?.lng) || defaultLng,
    });

    // به‌روزرسانی localStorage هنگام تغییر savedPosition
    useEffect(() => {
        if (savedPosition.savedLat && savedPosition.savedLng && !isNaN(savedPosition.savedLat) && !isNaN(savedPosition.savedLng)) {
        localStorage.setItem('lat', savedPosition.savedLat.toFixed(9));
        localStorage.setItem('lng', savedPosition.savedLng.toFixed(9));
        }
    }, [savedPosition]);

    const handleMarkerChange = ({ lat, lng }) => {
        if (!isNaN(lat) && !isNaN(lng)) {
        setSavedPosition({ savedLat: lat, savedLng: lng });
        }
    };

    const defaultStyle = {
        width: '100%',
        height: '472px',
        borderRadius: '8px',
        margin: 0,
        padding: 0,
        background: '#eee',
    };
    return (
        <div>
            <Text>موقعیت فروشگاه</Text>
            
            <div className=' mt-2 rounded-lg'>
                <Mapp
                    savedLat={savedPosition.savedLat}
                    savedLng={savedPosition.savedLng}
                    centerLat={savedPosition.savedLat}
                    centerLng={savedPosition.savedLng}
                    onMarkerChange={handleMarkerChange}
                    defaultStyle={defaultStyle}

                />
            </div>
        </div>
    )
}

export default TabLeftMap
