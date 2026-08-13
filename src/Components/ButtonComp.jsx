import React from 'react'
import Link from 'next/link'

export const ButtonComp = ({ text, href, onClick, type = "button" }) => {
    const buttonClasses =
        "border border-[#808080a1] p-2 px-4 rounded-md cursor-pointer hover:bg-[#8080802f] transition-all duration-300 active:scale-95";

    if (href) {
        return (
            <Link href={href} className={buttonClasses}>
                {text}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={buttonClasses}>
            {text}
        </button>
    );
};