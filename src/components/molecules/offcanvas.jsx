
import { useState } from 'react';

const OffcanvasMenu = ({onClose, onClick, contentButton, isOpen, children, step, setStep}) => {
    // const [isOpen, setIsOpen] = useState(false);

    // const toggleMenu = () => setIsOpen(!isOpen);

    return (
       <>
        <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
            <button onClick={onClose} className="absolute top-4 left-4 text-gray-500 hover:text-gray-700">
                &#x2715;
            </button>
            <div className="p-4">
                {children}
            </div>
        </div>

        <button onClick={onClick} className="">
            {contentButton}
        </button>
       </>
    );
};

export default OffcanvasMenu;
