'use client'
import React, { useState } from 'react';

export default function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const imagesByCategory = {
        'All': [
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",

            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg",
    
        ],
        'Shoes': [
           
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",

        ],
        'Bags': [
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
        ],
        'Electronics': [
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg",
            
        ],
        'Gaming': [
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",

            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
        
        ]
    };

    // Handle click on category button
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <div className="m-[100px]">
                <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
                    {Object.keys(imagesByCategory).map((category, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800 ${selectedCategory === category ? 'bg-blue-700 text-black' : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {imagesByCategory[selectedCategory].map((image, index) => (
                            <div key={index}>
                                <img className="h-auto max-w-full rounded-lg" src={image} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

