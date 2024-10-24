
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBagElement, getBagData, selectBagProducts } from './BagSlice';
import Bagbg from "../../assets/bag/bagbg.png";
import x from "../../assets/icons/x.png";
import blackcolor from "../../assets/belt/black.png";
import del from "../../assets/icons/Group 1561.png";
import Golds from "../../features/Bag/Golds/Golds";
import { useTranslation } from 'react-i18next';
import forMobile from "../Bag/Golds/styles.module.css"

const Bag = () => {
    const bagItems = useSelector(selectBagProducts);
    const dispatch = useDispatch();
    const [reserve, setReserve] = useState([]);


    useEffect(() => {
        dispatch(getBagData());
    }, [dispatch]);

    useEffect(() => {
        setReserve(bagItems);
    }, [bagItems]);

    const handleDel = (id, type) => {
        if (type === 'belt') {
            setReserve((prevItems) => prevItems.filter((item) => item.belt.id !== id));
            dispatch(deleteBagElement(id));
        } else if (type === 'gold') {
            setReserve((prevItems) => prevItems.map((item) => ({
                ...item,
                goldLetters: item.goldLetters.filter((goldItem) => goldItem.id !== id)
            })));

        }
    };

    return (
        <div className='mt-[25px] h-screen w-full text-white pt-[70px] pb-[1400px]' style={{ backgroundImage: `url(${Bagbg})`, backgroundSize: "cover", backgroundPosition: 'center' }}>
            {reserve.map((item) => (
                <BagItem key={item.id} item={item} handleDel={handleDel} />
            ))}
            <Golds />
        </div>
    );
};

const BagItem = ({ item, handleDel }) => {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState({});
    const [goldAmount, setGoldAmount] = useState({});
    const [itemPrices, setItemPrices] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const { t } = useTranslation();
    useEffect(() => {
        const initialAmount = {};
        const initialGoldAmount = {};
        const initialItemPrices = {};

        item.goldLetters.forEach((goldItem) => {
            initialGoldAmount[goldItem.id] = goldItem.count;
            initialItemPrices[goldItem.id] = goldItem.cash * goldItem.count;
        });

        initialAmount[item.belt.id] = item.belt.count;
        initialItemPrices[item.belt.id] = item.belt.price * item.belt.count;

        setAmount(initialAmount);
        setGoldAmount(initialGoldAmount);
        setItemPrices(initialItemPrices);
    }, [item]);

    useEffect(() => {
        let totalPrice = 0;
        Object.values(itemPrices).forEach((price) => {
            totalPrice += price;
        });
        setTotalPrice(totalPrice);
    }, [itemPrices]);

    const handleGoldClick = (goldItem, type) => {
        const newPrice = goldItem.price[type] * goldAmount[goldItem.id];
        setItemPrices((prevPrices) => ({
            ...prevPrices,
            [goldItem.id]: newPrice,
        }));
    };

    const handleAmountChange = (newValue) => {
        setAmount({ ...amount, [item.belt.id]: newValue });

        const newPrice = item.belt.price * newValue;
        setItemPrices((prevPrices) => ({
            ...prevPrices,
            [item.belt.id]: newPrice,
        }));
    };

    const handleGoldAmountChange = (goldItem, newValue) => {
        setGoldAmount({ ...goldAmount, [goldItem.id]: newValue });

        const newPrice = goldItem.cash * newValue;
        setItemPrices((prevPrices) => ({
            ...prevPrices,
            [goldItem.id]: newPrice,
        }));
    };

    const handleDeleteBelt = () => {
        handleDel(item.belt.id, 'belt');
    };

    const handleDeleteGold = (goldItemId) => {
        handleDel(goldItemId, 'gold');
    };

    return (
        <div className="flex flex-col mx-[25%] bg-[#3E4148] p-2 rounded-md shadow-md max-w-[900px]  py-[50px] pt-[100px] mb-[30px] relative md:w-[50%] max-md:text-[10px] ">

            <div>
                <img src={x} className="w-[40px] h-[30px]  cursor-pointer absolute top-2 right-2  max-sm:h-[25px] max-sm:w-[32px] sm:max-h-[12px] sm:max-w-[16px]   md:max-h-[16px] md:max-w-[22px]   lg:max-h-[18px] lg:max-w-[22px]" onClick={() => dispatch(deleteBagElement(item.id))} alt="Delete" />
            </div>

            <div className={`flex  space-x-[60px] items-center text-center mx-[10px] border-b-white border-b-[1px] mb-[25px] md:space-x-[-130px]  md:text-[10px] lg:space-x-[-60px] xl:space-x-[1%] lg:text-[13px] xl:text-[18px] 2xl:space-x-[11%] 2xl:ml-[23px]  ${forMobile["custom_sm_bagDiv"]} `}>      {/* gotu nkarner guyni nkary, qanaky kargavorvum e sranov  */}


                <div className={`max-w-[280px] max-h-[60px] flex  space-x-[2%] md:space-x-[-130px] lg:space-x-[-60px] xl:space-x-[-10px] 2xl:space-x-[30px]  ${forMobile["custom_sm_bagDiv"]} ${forMobile["smallDev"]} `}>   {/* nkari yev teqster */}

                    <img className="md:w-[40px] md:h-[30px] lg:w-[60px] lg:h-[40px]  xl:w-[100px] xl:h-[60px]" src={item.belt.img} alt={`Belt ${item.id}`} />
                    <div className="flex flex-col w-[500px] h-[100px] ml-[0px]  space-y-[20px] md:space-y-[10px] ">
                        <span className={`lg:text-[10px] xl:text-[12px] md:text-[8px]  ${forMobile["custom_sm_space2"]}`}>{t(`Custom Name Bracelet`)}</span>
                        <span className={`lg:text-[10px] xl:text-[12px] md:text-[8px]  ${forMobile["custom_sm_space2"]}`}>{t('size 25x10 | width 25x10')}</span>
                    </div>
                </div>


                <div className={` flex md:space-x-[20px] md:pb-[15px] lg:pb-[10px] lg:space-x-[20px] lg:pr-[60px] xl:pr-[60px] xl:space-x-[30px] whitespace-nowrap items-center ${forMobile["custom_sm_bagCount"]} `}> {/* gotu guyny count,price */}
                    <div className=" md:w-[25px] md:h-[35px] lg:w-[30px] lg:h-[40px]  max-sm:w-[35px]  max-sm:ml-[25px] xl:w-[30px] xl:h-[40px] 2xl:mr-[20px] "><img src={item.belt.colourImg || blackcolor} alt={`Belt ${item.id}`} /></div>
                    <div className={`flex space-x-[100px] items-center md:space-x-[30px] ${forMobile["custom_sm_bagCount"]} `}>
                        <div className={forMobile.custom_sm_space2}><p >{t(`Count`)}</p> </div>
                        <input
                            type="number"
                            value={amount[item.belt.id] || 1}
                            min="0"
                            max="100"
                            onChange={(e) => handleAmountChange(e.target.value)}
                            className="w-[50px] md:w-[30px] md:h-[25px] lg:w-[50px] lg:h-[50px] sm:w-[40px]  p-2 border rounded-md text-black"
                        />
                    </div>
                    <div className="max-sm:ml-[25px]" >
                        <p>{t(`Price`)} ${itemPrices[item.belt.id] || item.belt.price}</p>
                    </div>
                </div>


            </div>

            {/* golden letetrs */}
            <div className="flex flex-col mt-[30px] pb-[10px] space-y-[50px] max-sm:mx-[35px]    ml-[20px] md:ml-[0%] lg:ml-[3%] ">
                {item.goldLetters.map((goldItem) => (
                    <div key={goldItem.id} className={`flex space-x-[50px] items-center border-b-white border-b-[1px] pb-[20px] md:space-x-[15%] md:pr-[15%] md:text-[10px] lg:space-x-[40px]  xl:ml-[5px] pr-[27%] whitespace-nowrap  ${forMobile["custom-sm-space"]}  `}>

                        <div className={`max-w-[260px]  h-[60px] md:ml-[15px] md:space-x-[25px] xl:space-x-[40px] 2xl:space-x-[60px] flex  items-center m-auto  border-white border-solid  max-sm:space-y-[10px] ${forMobile["custom-sm-space"]} ${forMobile["goldenTypes"]}`}>
                            <div className=" max-sm:mr-[130px]  ">
                            <img src={del} className={`max-w-[30px] max-h-[25px] ml-[10px] md:ml-[10px] lg:ml-[1px] sm:ml-[2px]    cursor-pointer md:max-w-[15px] md:max-h-[15px]  lg:max-w-[25px] lg:max-h-[25px] sm:max-h-[8px] sm:max-w-[8px]  ${forMobile['custom_sm_delete']} `} onClick={() => handleDeleteGold(goldItem.id)} />
                            </div>
                            <img className="md:w-[15px] md:h-[18px] lg:h-[37px] lg:w-[45px] xl:w-[45] xl:h-[45] sm:h-[15px] sm:w-[15px] lg:ml-[55px] lg:mr-[50px] max-sm:mr-[50px]  max-sm:w-[30px] max-sm:h-[85px]" src={goldItem.img} alt={`Gold letter ${goldItem.id}`} />
                            <div className="flex h-[80px] w-[70px] items-center md:w-[24px] md:h-[28px] lg:w-[60px] lg:h-[40px] 2xl:h-[80px] 2xl:w-[70px] sm:w-[10px] sm:h-[10px] max-sm:mr-[50px] ">
                                <img className="cursor-pointer" src={goldItem.goldImg} alt={`Gold letter ${goldItem.id}`} onClick={() => handleGoldClick(goldItem, 'golden')} />
                                <img className="cursor-pointer" src={goldItem.mixImg} alt={`Gold letter ${goldItem.id}`} onClick={() => handleGoldClick(goldItem, 'semigold')} />
                                <img className="cursor-pointer" src={goldItem.silverImg} alt={`Gold letter ${goldItem.id}`} onClick={() => handleGoldClick(goldItem, 'silver')} />
                            </div>
                        </div>

                    
                        <div className="flex space-x-[110px] md:pl-[5px] max-sm:flex-col max-sm:mt-[35px] max-sm:space-y-[10px]   md:space-x-[30px] lg:pl-[12%] xl:pl-[12%] xl:text-[18px] xl:space-x-[65px] 2xl:pl-[13%] 2xl:space-x-[100px] sm:text-[8px]     md:text-[10px] lg:text-[15px] lg:space-x-[25%]   items-center">
                                <p className="max-sm:ml-[35px]">{t(`Count`)}</p>
                            <div className="max-sm:pr-[50%]">
                                <input
                                    type="number"
                                    value={goldAmount[goldItem.id] || 1}
                                    min="0"
                                    max="100"
                                    onChange={(e) => handleGoldAmountChange(goldItem, e.target.value)}
                                className="lg:w-[50px] lg:p-3 md:p-1 md:w-[30px] max-sm:w-[40px]   max-sm:h-[35px] border  rounded-md text-black"
                                />
                                </div>
                            </div>
                            <div className="pr-[5%] pl-[3%] md:pl-[0%] sm:text-[8px] md:text-[10px] lg:text-[15px]  xl:text-[18px]  ">
                            <p className="max-sm:ml-[35px]">{t(`Price`)} ${itemPrices[goldItem.id] || goldItem.cash}</p>
                            </div>
                        </div>
                
                ))}
            </div>
            <div className="flex mt-[25px] justify-end mr-[28%]  md:mr-[14%] xl:mr-[27%] space-x-[13%] items-center sm:text-[8px] max-sm:flex-col max-sm:mx-auto  max-sm:space-y-[10px] md:text-[13px] lg:text-[15px] text-white">
                <p>{t(`Order price`)} ${totalPrice}</p>
                <button className="bg-blue-600 rounded-2xl px-[1px] py-[5px] w-[80px]" onClick={() => dispatch(deleteBagElement(item.id))} >{t(`Order`)}</button>
            </div>


        </div>
    );
};

export default Bag;









// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteBagElement, getBagData, selectBagProducts } from './BagSlice';
// import Bagbg from "../../assets/bag/bagbg.png";
// import x from "../../assets/icons/x.png";
// import blackcolor from "../../assets/belt/black.png";
// import del from "../../assets/icons/Group 1561.png";
// import Golds from "../../features/Bag/Golds/Golds";
// import { useTranslation } from 'react-i18next';

// const Bag = () => {
//     const bagItems = useSelector(selectBagProducts);
//     const dispatch = useDispatch();
//     const [reserve, setReserve] = useState([]);


//     useEffect(() => {
//         dispatch(getBagData());
//     }, [dispatch]);

//     useEffect(() => {
//         setReserve(bagItems);
//     }, [bagItems]);

//     const handleDel = (id, type) => {
//         if (type === 'belt') {
//             setReserve((prevItems) => prevItems.filter((item) => item.belt.id !== id));
//             dispatch(deleteBagElement(id));
//         } else if (type === 'gold') {
//             setReserve((prevItems) => prevItems.map((item) => ({
//                 ...item,
//                 goldLetters: item.goldLetters.filter((goldItem) => goldItem.id !== id)
//             })));

//         }
//     };

//     return (
//         <div className='mt-[25px] h-screen w-full text-white pt-[70px]' style={{ backgroundImage: `url(${Bagbg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//             {reserve.map((item) => (
//                 <BagItem key={item.id} item={item} handleDel={handleDel} />
//             ))}
//             <Golds />
//         </div>
//     );
// };

// const BagItem = ({ item, handleDel }) => {
//     const dispatch = useDispatch();
//     const [amount, setAmount] = useState({});
//     const [goldAmount, setGoldAmount] = useState({});
//     const [itemPrices, setItemPrices] = useState({});
//     const [totalPrice, setTotalPrice] = useState(0);
//     const { t } = useTranslation();
//     useEffect(() => {
//         const initialAmount = {};
//         const initialGoldAmount = {};
//         const initialItemPrices = {};

//         item.goldLetters.forEach((goldItem) => {
//             initialGoldAmount[goldItem.id] = goldItem.count;
//             initialItemPrices[goldItem.id] = goldItem.cash * goldItem.count;
//         });

//         initialAmount[item.belt.id] = item.belt.count;
//         initialItemPrices[item.belt.id] = item.belt.price * item.belt.count;

//         setAmount(initialAmount);
//         setGoldAmount(initialGoldAmount);
//         setItemPrices(initialItemPrices);
//     }, [item]);

//     useEffect(() => {
//         let totalPrice = 0;
//         Object.values(itemPrices).forEach((price) => {
//             totalPrice += price;
//         });
//         setTotalPrice(totalPrice);
//     }, [itemPrices]);

//     const handleGoldClick = (goldItem, type) => {
//         const newPrice = goldItem.price[type] * goldAmount[goldItem.id];
//         setItemPrices((prevPrices) => ({
//             ...prevPrices,
//             [goldItem.id]: newPrice,
//         }));
//     };

//     const handleAmountChange = (newValue) => {
//         setAmount({ ...amount, [item.belt.id]: newValue });

//         const newPrice = item.belt.price * newValue;
//         setItemPrices((prevPrices) => ({
//             ...prevPrices,
//             [item.belt.id]: newPrice,
//         }));
//     };

//     const handleGoldAmountChange = (goldItem, newValue) => {
//         setGoldAmount({ ...goldAmount, [goldItem.id]: newValue });

//         const newPrice = goldItem.cash * newValue;
//         setItemPrices((prevPrices) => ({
//             ...prevPrices,
//             [goldItem.id]: newPrice,
//         }));
//     };

//     const handleDeleteBelt = () => {
//         handleDel(item.belt.id, 'belt');
//     };

//     const handleDeleteGold = (goldItemId) => {
//         handleDel(goldItemId, 'gold');
//     };

//     return (
//         <div className="flex flex-col mx-[25%] bg-[#3E4148] p-2 rounded-md shadow-md max-w-[900px] py-[50px] pt-[100px] mb-[30px] relative md:w-[50%] max-md:text-[10px]">
//             <div>
//                 <img src={x} className="w-[40px] h-[30px] cursor-pointer absolute top-2 right-2" onClick={() => dispatch(deleteBagElement(item.id))} alt="Delete" />
//             </div>
//             <div className="flex  space-x-[60px] items-center text-center mx-[25px] border-b-white border-b-[1px] mb-[25px] max-md:space-x-[-2px]">
//                 <div className="w-[280px] h-[60px] flex space-x-[2%] max-md:space-x-[-10px]">

//                     <img className="max-md:w-[60px] max-md:h-[40px] w-[90px] h-[60px]" src={item.belt.img} alt={`Belt ${item.id}`} />
//                     <div className="flex flex-col w-[400px] h-[100px] ml-[0px] space-y-[20px] md:space-y-[10px]">
//                         <span className="text-[12px]">{t(`Custom Name Bracelet`)}</span>
//                         <span className="text-[12px]">{t('size 25x10 | width 25x10')}</span>
//                     </div>
//                 </div>

//                 <div><img src={item.belt.colourImg || blackcolor} alt={`Belt ${item.id}`} /></div>
//                 <div className='flex space-x-[100px] items-center md:space-x-[40px]'>
//                     <p>{t(`Count`)}</p>
//                     <input
//                         type="number"
//                         value={amount[item.belt.id] || 1}
//                         min="0"
//                         max="100"
//                         onChange={(e) => handleAmountChange(e.target.value)}
//                         className="w-[60px] p-2 border rounded-md text-black"
//                     />
//                 </div>
//                 <div >
//                     <p>{t(`Price`)} ${itemPrices[item.belt.id] || item.belt.price}</p>
//                 </div>
//             </div>
//             <div className="flex flex-col mt-[30px] pb-[10px] space-y-[50px] ml-[40px]">
//                 {item.goldLetters.map((goldItem) => (
//                     <div key={goldItem.id} className="flex space-x-[150px] items-center border-b-white border-b-[1px] pb-[20px] md:space-x-[15%]">
//                         <div className="w-[260px] h-[60px] flex items-center m-auto border-white border-solid">
//                             <img src={del} className="w-[30px] h-[30px] mr-[15px]" onClick={() => handleDeleteGold(goldItem.id)} />

//                             <img src={goldItem.img} alt={`Gold letter ${goldItem.id}`} />
//                             <div className="flex w-[25px] h-[25px] m-auto">
//                                 <img className="cursor-pointer" src={goldItem.goldImg} alt={`Gold letter ${goldItem.id}`} onClick={() => handleGoldClick(goldItem, 'golden')} />
//                                 <img className="cursor-pointer" src={goldItem.mixImg} alt={`Gold letter ${goldItem.id}`} onClick={() => handleGoldClick(goldItem, 'semigold')} />
//                                 <img className="cursor-pointer" src={goldItem.silverImg} alt={`Gold letter ${goldItem.id}`} onClick={() => handleGoldClick(goldItem, 'silver')} />
//                             </div>
//                         </div>
//                         <div className="flex space-x-[100px] items-center">
//                             <p>{t(`Count`)}</p>
//                             <input
//                                 type="number"
//                                 value={goldAmount[goldItem.id] || 1}
//                                 min="0"
//                                 max="100"
//                                 onChange={(e) => handleGoldAmountChange(goldItem, e.target.value)}
//                                 className="w-[60px] p-2 border rounded-md text-black"
//                             />
//                         </div>
//                         <div className="mr-[]">
//                             <p>{t(`Price`)} ${itemPrices[goldItem.id] || goldItem.cash}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className="flex mt-[25px] justify-end mr-[5%] space-x-[10%] items-center text-white">
//                 <p>{t(`Order price`)} ${totalPrice}</p>
//                 <button className="bg-blue-600 rounded-2xl px-[10px] py-[5px] w-[150px]" onClick={() => dispatch(deleteBagElement(item.id))} >{t(`Order`)}</button>
//             </div>
//         </div>
//     );
// };

// export default Bag;




