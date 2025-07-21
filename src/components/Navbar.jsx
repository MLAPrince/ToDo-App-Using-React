import React from 'react'

const Navbar = () => {
    return (
        <div className='bg-purple-900 flex  justify-around h-9 items-center'>
            <div className='text-white font-extrabold text-2xl'>
                iTask
            </div>
            <div className='flex box-border'>
                <span className='text-white w-28 cursor-pointer hover:font-bold transition-all-2s-ease duration-200 box-border'>Home</span>
                <span className='text-white w-28 cursor-pointer hover:font-bold transition-all-2s-ease duration-200 box-border'>Your Tasks</span>
            </div>
        </div>
    )
}

export default Navbar