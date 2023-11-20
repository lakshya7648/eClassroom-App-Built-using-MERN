import React from 'react'

const EmptyItemsComp = ({ message, subMessage }) => {
    return (
        <div className="empty-items-show-box mt-6 md:w-[60rem] h-full flex flex-col items-center justify-center">
            <img src="/images/NoItems.png" alt="No Items" className="w-60 h-60"/>

            <p className='message-display text-center my-4  text-2xl font-semibold md:text-3xl'>
                {message}
            </p>
            <span className='sub-message-display text-center font-light text-xl'>
                { subMessage }
            </span>
        </div>
    )
}

export default EmptyItemsComp
