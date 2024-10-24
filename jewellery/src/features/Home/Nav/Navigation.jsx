import React, { useState } from 'react';
import wishlist from "../../../assets/icons/Nav.icons/Wishlist.svg";
import bag from "../../../assets/icons/Nav.icons/Bag.svg";
import arrowdown from "../../../assets/icons/Nav.icons/arrowdown.svg";
import { Link } from 'react-router-dom';
import Header from '../../locale/Header/Header';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
    const { t } = useTranslation();

    const Links = [
        { name: "HOME" },
        { img: wishlist, name: "WISHLIST" },
        { img: bag, name: "BAG" },
    ];

    const [open, setOpen] = useState(false);
    const [showLanguages, setShowLanguages] = useState(false);

    return (
        <div className='shadow-md w-full fixed top-0 left-0 z-[1]'>
            <div className='md:flex items-center justify-between bg-[#2A2C33] py-4 md:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-white'>
                    COMPOSET
                </div>

                <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden text-white flex items-center justify-center'>
                    <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-[#2A2C33] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20' : 'top-[-490px]'}`}>
                    {Links.map((link) => (
                        <Link
                            to={link.name === "HOME" ? "/" : "/" + link.name.toLowerCase()}
                            key={link.name}
                            className={`md:ml-8 text-[16px] text-white md:my-0 my-7 flex items-center ${open ? 'flex-col' : ''}`}
                        >
                            {link.img && (
                                <div className="mx-[15px] hover:border--4 border-indigo-500">
                                    <img src={link.img} alt={t(link.name)} />
                                </div>
                            )}
                            <p>{t(link.name)}</p>
                        </Link>
                    ))}

                    <li
                        className='md:ml-8 text-[16px] text-white md:my-0 my-7 flex items-center cursor-pointer relative'
                        onClick={() => setShowLanguages(!showLanguages)}
                    >
                        <p>RU</p>
                        <div className="mx-[15px] hover:border-b-4 border-indigo-500 ">
                            <img src={arrowdown} alt="RU" />
                        </div>
                        {showLanguages && (
                            <div className='absolute top-full mt-2 space-y-[10px]'>
                                <Header visible={showLanguages} />
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navigation;
