import React from 'react'
import { Link } from 'react-router-dom'

const SidebarItems = ({title, url, className, img}) => {
    return (

        <Link to={url} className={className}>
            <img
                className={img.className}
                aria-hidden="true"
                src={img.src}
            />

            <span className="ml-3">{title}</span>
        </Link>

    )
}

export default SidebarItems
