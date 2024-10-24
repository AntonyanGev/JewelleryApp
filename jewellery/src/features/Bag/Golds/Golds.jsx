import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoldsData, patchGoldsCount, patchGoldsCountDecrement, goldenSlice, patchCash, deleteGoldItem } from './GoldSlice';
import del from "../../../assets/icons/Group 1561.png";
import x from "../../../assets/icons/x.png"
import { useTranslation } from 'react-i18next';
import mobile from "./styles.module.css"

const Golds = () => {
    const goldsData = useSelector(goldenSlice);
    const dispatch = useDispatch();
    const [deleteClicked, setDeleteClicked] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(getGoldsData());
    }, [dispatch]);

   
    const handleIncrement = (id, count, cash) => {
        dispatch(patchGoldsCount({ id, count: count + 1, cash }));
    };

    const handleDecrement = (id, count, cash) => {
        if (count > 0) {
            dispatch(patchGoldsCountDecrement({ id, count: count - 1, cash }));
        }
    };

    const calculateTotalPrice = () => {
        return goldsData.reduce((previousValue, currentItem) => {
            return previousValue + currentItem.golddata.itemPrice;
        }, 0);
    };

    const handleColorClick = (item, cash) => {
        dispatch(patchCash({ id: item.id, cash, count: item.golddata.count }));
    };

    const handleDelete = (id) => {
        dispatch(deleteGoldItem(id));
    };

    const handlePageDelete = () => {
        goldsData.forEach((item) => {
            dispatch(deleteGoldItem(item.id));
        });
        setDeleteClicked(true); 
    };

    return (
        <div className="text-white  bg-[#3E4148] mt-[20px]  max-w-[900px] items-center mx-[25%] rounded-lg relative">
            {goldsData.length > 0 && (
                <div className="ml-5">
                    <img src={x} className="w-[33px] h-[25px] ml-[5px]  flex-col  cursor-pointer absolute top-2 right-1   sm:max-h-[12px] sm:max-w-[16px]   md:max-h-[16px] md:max-w-[22px]   lg:max-h-[22px] lg:max-w-[28px] " onClick={handlePageDelete} />
                    {goldsData.map((item) => (
                        <div key={item.id}  className={`bg-[#3E4148] flex space-x-[80px] xl:space-x-[40px] 2xl:space-x-[60px] lg:space-x-[20px] lg:ml-[2px] md:space-x-[21px] sm:space-x-[25px] py-[25px] items-center text-center  mb-[10px] px-[25px] border-t-[1px] border-b-white ${mobile['custom-sm-space']}`}> 
                            <div><img src={del} className={`max-w-[30px] max-h-[25px] ml-[10px] md:ml-[-10px] lg:ml-[1px] sm:ml-[2px]    cursor-pointer md:max-w-[15px] md:max-h-[15px] lg:max-w-[25px] lg:max-h-[25px] sm:max-h-[8px] sm:max-w-[8px] ${mobile['custom_sm_delete']} `} onClick={() => handleDelete(item.id)} /></div>
                            <div className={`md:w-[15px] md:h-[18px] lg:h-[37px] lg:w-[25px] xl:w-[45] xl:h-[45] sm:h-[15px] ${mobile["custom_img"]}`}><img src={item.golddata.img} alt={item.id} /></div>
                            <div className='flex h-[80px] w-[70px] items-center md:w-[20px] md:h-[25px] lg:w-[60px] lg:h-[40px] 2xl:h-[80px] 2xl:w-[70px] sm:w-[10px] sm:h-[10px] '>
                                <img src={item.golddata.goldImg} className="cursor-pointer" onClick={() => handleColorClick(item, item.golddata.price.golden)} />
                                <img src={item.golddata.mixImg} className="cursor-pointer" onClick={() => handleColorClick(item, item.golddata.price.semigold)} />
                                <img src={item.golddata.silverImg} className="cursor-pointer" onClick={() => handleColorClick(item, item.golddata.price.silver)} />
                            </div>
                            <div className="flex items-center space-x-[40px] 2xl:space-x-[60px] xl:space-x-[40px] md:pl-[40px] md:text-[10px] lg:text-[15px] xl:text-[18px] sm:text-[8px]   md:space-x-[10px] sm:space-x-[7px] sm:pl-[25px] ">
                                <p className={mobile.custom_sm_space2}>{t(`Count`)}</p>
                                <div className={` flex space-x-[35%] px-[10px]  ${mobile['custom_sm_count']}`}>
                                <button className="md:pl-[25px]" onClick={() => handleDecrement(item.id, item.golddata.count, item.golddata.cash)}>–</button>
                                <p>{item.golddata.count}</p>
                                <button onClick={() => handleIncrement(item.id, item.golddata.count, item.golddata.cash)}>+</button>
                                    </div>
                            </div>
                            <div className="sm:text-[8px] md:text-[10px] lg:text-[15px] xl:text-[18px] md:whitespace-nowrap md:pl-[20px] whitespace-nowrap ">{t(`Price`)} ${item.golddata.itemPrice}</div>
                        </div>
                    ))}
                    <div className={`py-4 text-white ml-[30%] flex space-x-[70px] md:space-x-[60px] items-center sm:text-[8px] md:text-[13px] lg:text-[15px] xl:text-[15px] md:pr-[50px] ${mobile['custom_sm_total_order']}`}>
                        <div className={`p-0 flex flex-row items-center whitespace-nowrap  ${mobile['custom_sm_total']} `}>
                            <p className='mr-1  xl:whitespace-nowrap ' >{t(`Total price`)}:&nbsp;</p>
           
                            <span>${calculateTotalPrice()}</span>
                        </div>
                        <div className={`bg-blue-700 px-[25px] py-[5px] rounded-2xl md:max-w-[80px] md:max-h-[60px] ${mobile["custom_sm_order"]} `}><button onClick={handlePageDelete}>{t(`Order`)}</button></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Golds;















// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getGoldsData, patchGoldsCount, patchGoldsCountDecrement, goldenSlice, patchCash, deleteGoldItem } from './GoldSlice';
// import del from "../../../assets/icons/Group 1561.png";
// import x from "../../../assets/icons/x.png"
// import { useTranslation } from 'react-i18next';

// const Golds = () => {
//     const goldsData = useSelector(goldenSlice);
//     const dispatch = useDispatch();
//     const [deleteClicked, setDeleteClicked] = useState(false);
//     const { t } = useTranslation();

//     useEffect(() => {
//         dispatch(getGoldsData());
//     }, [dispatch]);

//     const [isScreen1320, setIsScreen1320] = useState(false);


//     const handleIncrement = (id, count, cash) => {
//         dispatch(patchGoldsCount({ id, count: count + 1, cash }));
//     };

//     const handleDecrement = (id, count, cash) => {
//         if (count > 0) {
//             dispatch(patchGoldsCountDecrement({ id, count: count - 1, cash }));
//         }
//     };

//     const calculateTotalPrice = () => {
//         return goldsData.reduce((previousValue, currentItem) => {
//             return previousValue + currentItem.golddata.itemPrice;
//         }, 0);
//     };

//     const handleColorClick = (item, cash) => {
//         dispatch(patchCash({ id: item.id, cash, count: item.golddata.count }));
//     };

//     const handleDelete = (id) => {
//         dispatch(deleteGoldItem(id));
//     };

//     const handlePageDelete = () => {
//         goldsData.forEach((item) => {
//             dispatch(deleteGoldItem(item.id));
//         });
//         setDeleteClicked(true);
//     };

//     return (
//         <div className="text-white  bg-[#3E4148] mt-[20px] items-center mx-[25%] rounded-lg relative">
//             {goldsData.length > 0 && (
//                 <div >
//                     <img src={x} className="w-[30px] h-[25px] ml-[5px]  flex-col  cursor-pointer absolute top-1 right-1" onClick={handlePageDelete} />
//                     {goldsData.map((item) => (
//                         <div key={item.id} className="bg-[#3E4148] flex space-x-[80px] py-[25px] items-center rounded-lg mb-[10px] px-[25px] border-t-[1px] border-b-white   " >
//                             <div><img src={del} className="max-w-[30px] max-h-[25px] ml-[10px] sm:ml-[5px] cursor-pointer" onClick={() => handleDelete(item.id)} /></div>
//                             <div><img src={item.golddata.img} alt={item.id} /></div>
//                             <div className='flex h-[30px] w-[30px] items-center'>
//                                 <img src={item.golddata.goldImg} className="cursor-pointer" onClick={() => handleColorClick(item, item.golddata.price.golden)} />
//                                 <img src={item.golddata.mixImg} className="cursor-pointer" onClick={() => handleColorClick(item, item.golddata.price.semigold)} />
//                                 <img src={item.golddata.silverImg} className="cursor-pointer" onClick={() => handleColorClick(item, item.golddata.price.silver)} />
//                             </div>
//                             <div className="flex space-x-[40px]">
//                                 <p>{t(`Count`)}</p>
//                                 <button onClick={() => handleDecrement(item.id, item.golddata.count, item.golddata.cash)}>–</button>
//                                 <p>{item.golddata.count}</p>
//                                 <button onClick={() => handleIncrement(item.id, item.golddata.count, item.golddata.cash)}>+</button>
//                             </div>
//                             <div>{t(`Price`)} ${item.golddata.itemPrice}</div>
//                         </div>
//                     ))}
//                     <div className="py-4 text-white ml-[60%] flex space-x-[70px] items-center">
//                         <p>{t(`Total price`)}: ${calculateTotalPrice()}</p>
//                         <div className="bg-blue-700 px-[25px] py-[5px] rounded-2xl"><button onClick={handlePageDelete}>{t(`Order`)}</button></div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Golds;