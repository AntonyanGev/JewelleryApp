
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import CachedIcon from '@mui/icons-material/Cached';
import beltscolor from "../../../assets/belt/beltscolor.png"
import blackBelt from "../../../assets/belt/blackbelt.png";
import blackcolor from "../../../assets/belt/black.png";
import {
  getBelt2Data, getBeltData, selectBelt, selectBelt2, postBagData, patchcountBelt,
  patchcountBelt2,
  patchcountBeltDecriese
} from "../Belt/BeltSlice";
import { useTranslation } from 'react-i18next';
import del from "../../../assets/icons/x.png"
import { patchcountDecrement, patchcountDecrement2 } from '../Carousel/CarouselSlice';

const Belt = ({ clickedOnes, setClickedOnes, onRemoveItem, totalPrice, setTotalPrice, beltPrice, setBeltPrice, goldPrice, setgoldPrice, beltChoose, setBeltChoose, addBeltPrice, decrement }) => {
  const BeltsData = useSelector(selectBelt);
  const Belts2Data = useSelector(selectBelt2);
  const dispatch = useDispatch();
  const [newBeltId, setNewBeltId] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchParams, setSearchparams] = useSearchParams();
  const [currentBeltPrice, setCurrentBeltPrice] = useState(400);
  const { t } = useTranslation()

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const defaultBelt = {
    beltimg: blackBelt,
    img: blackcolor,
    price: 400,
    count: 0
  };

  useEffect(() => {
    dispatch(getBeltData());
    dispatch(getBelt2Data());
  }, [dispatch]);

  const handleSendData = () => {
    const data = {
         belt: {
        id: beltChoose.id,
        img: beltscolor,
        colourImg:beltChoose.img,
        price: beltPrice,
        count: beltChoose.count + 1,
      },
      goldLetters: clickedOnes.map(item => ({
        id: item.id,
        img: item.img,
        goldImg: item.gold,
        mixImg: item.mix,
        silverImg: item.silver,
        price: {
          semigold: 400,
          golden: 499,
          silver: 350
        }, 
        cash: item.cash,
        delId: item.delId,
        count: item.count + 1,
        
      })),
      totalPrice,
    };
    dispatch(postBagData(data));
  };


  

  const handleBeltClick = (beltInfo) => {
    const q = Math.random();
    setBeltChoose({ ...beltInfo, beltdId: q });
    setNewBeltId(q);
    setSearchparams({ id: q });
    const selectedBeltPrice = beltInfo.price;
    const priceDifference = selectedBeltPrice - beltPrice;
    setBeltPrice(selectedBeltPrice);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + priceDifference);
    dispatch(patchcountBelt({ ...beltInfo, id: beltInfo.id, count: beltInfo.count + 1 }));
  };


  const handleRemoveItem = (clickedItem) => {
    setClickedOnes((prevClicked) =>
      prevClicked.filter((item) => item.delId !== clickedItem.delId)
    );
    decrement(clickedItem.cash);
    if (clickedItem.count > 0) {
      if (clickedItem.src === 'carousel1') {
        dispatch(patchcountDecrement({ id: clickedItem.id, count: clickedItem.count - 1 }));
      } else if (clickedItem.src === 'carousel2') {
        dispatch(patchcountDecrement2({ id: clickedItem.id, count: clickedItem.count - 1 }));
      }
    }
  };

  return (
    <div className="bg-[#161515] pb-[40px]">
      <div className="m-auto text-center">
        <Button onClick={handleOpen}>
          <h1 className="text-white ml-[20px]">{t('Our Belt Collection')}</h1>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ backgroundColor: "#2F333A" }}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              <img src={del} className="w-[30px] h-[20px] absolute top-2 right-2 cursor-pointer" alt="delete" onClick={handleClose} />
              <div className="flex text-start text-[18px]  ">
                {BeltsData?.map((beltInfo) => (
                  <div key={beltInfo.id}>
                    <img
                      className="cursor-pointer"
                      src={beltInfo.img}
                      alt={beltInfo.colour}
                      onClick={() => {
                        handleBeltClick(beltInfo);
                        handleClose();
                      }}
                    />
                    <p className="pl-[5%]">{beltInfo.colour}</p>
                    <p className="pl-[10%]">{beltInfo.price}</p>
                  </div>
                ))}
              </div>
            </Typography>
            <Typography id="modal-modal-description" variant="h5" component="h5" sx={{ mt: 2 }}>
              <div className="flex text-start text-[18px] ">
                {Belts2Data?.map((beltInfo) => (
                  <div key={beltInfo.id}>
                    <img
                      className="cursor-pointer"
                      src={beltInfo.img}
                      alt={beltInfo.colour}
                      onClick={() => {
                         handleBeltClick(beltInfo)
                        handleClose();
                      }
                        }
                    />
                    <p className="pl-[5%]">{beltInfo.colour}</p>
                    <p className="pl-[10%]">{beltInfo.price}</p>
                  </div>
                ))}
              </div>
            </Typography>
          </Box>
        </Modal>
      </div>

      <div className="mx-[155px] mt-[50px] pt-[40px] border-[#202226] border-[1px] rounded-[7px] relative max-sm:mx-[10px]">
        <div
          className="absolute top-1 right-1 hover:rotate-180 transition-transform duration-700 cursor-pointer"
          onClick={() => {
            setClickedOnes([]);
            setBeltChoose(defaultBelt);
            setTotalPrice(400);
            setBeltPrice(400);
          }}
        >
          <CachedIcon style={{ color: "white" }} />
        </div>
        <div className="pb-[100px] max-sm:flex-wrap max-sm:overflow-y-auto max-md:flex-wrap max-md:overflow-y-auto">
          <div className="relative">
            <img src={beltChoose.beltimg || defaultBelt.beltimg} className="m-auto" alt="belt" />
            <div className="flex justify-center mt-[10px] space-x-[15px] absolute inset-0 items-center  ">
              {clickedOnes.length > 0 &&
                clickedOnes.map((clickedItem) => (
                  <div className="relative mx-[7.5px]" key={clickedItem.delId}>
                    <div className="px-[15px] py-[10px]  max-sm:w-[50px] max-sm:h-[50px]">
                      <img src={clickedItem.img} alt={clickedItem.description}  />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="mx-[20px] ">
          <h2 className="text-white text-[18px]">{t("Belt")}</h2>
          <div className="flex mt-[50px] space-x-[15px]  max-sm:flex-wrap md:flex-wrap  lg:flex-nowrap  max-sm:space-x-0 max-sm:justify-start max-sm:w-full">
            {clickedOnes.length > 0 &&
              clickedOnes.map((clickedItem) => (
                <div className="relative" key={clickedItem.delId}>
                  <div className="border-white border-[1px] rounded-[5px] max-sm:w-[55px] max-sm:h-[55px] max-md:max-w-[80px] max-md:max-h-[80px]">  {/*footer golden letters */}
                    <div className="px-[15px] py-[10px]">
                      <img src={clickedItem.img} alt="gold letter" className="w-full h-full max-sm:object-contain" />
                      <div>
                        <ClearSharpIcon
                          onClick={() => handleRemoveItem(clickedItem)}
                          style={{ color: "white" }}
                          className="absolute right-0 top-0 max-w-[15px] max-h-[20px] cursor-pointer hover:max-h-[25px]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-white text-center">
                    <p>${clickedItem.cash}</p>
                  </div>
                </div>
              ))}
            <div className="justify-end text-white absolute top-[150px] right-3 max-sm:text-[14px]">
              <p>{t("Belt price")} ${beltPrice}</p>
            </div>
            <div className="justify-end text-white absolute bottom-1 right-1 max-sm:text-[14px]">
              <p>{t("Total price")} ${totalPrice}</p>
            </div>
          </div>
          <p className="text-[#A4A4A4] m-auto text-center max-sm:mt-[15px]">© 2020 Composet. All rights reserved.</p>
          <div className="m-auto text-center my-[10px]  max-w-[100px] rounded-xl md:whitespace-nowrap ">
            <button
              className="text-blue-800 underline  text-[15px]"    /// absolute bottom-[-480px] right-5  
              onClick={handleSendData}
            >
              {t("Add to bag")}
            </button>
          </div>
        </div>
        </div>
     
      
    </div>
  );
};

export default Belt;











// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import ClearSharpIcon from '@mui/icons-material/ClearSharp';
// import CachedIcon from '@mui/icons-material/Cached';
// import beltscolor from "../../../assets/belt/beltscolor.png"
// import blackBelt from "../../../assets/belt/blackbelt.png";
// import blackcolor from "../../../assets/belt/black.png";
// import {
//   getBelt2Data, getBeltData, selectBelt, selectBelt2, postBagData, patchcountBelt,
//   patchcountBelt2,
//   patchcountBeltDecriese
// } from "../Belt/BeltSlice";
// import { useTranslation } from 'react-i18next';
// import del from "../../../assets/icons/x.png"
// import { patchcountDecrement } from '../Carousel/CarouselSlice';

// const Belt = ({ clickedOnes, setClickedOnes, onRemoveItem, totalPrice, setTotalPrice, beltPrice, setBeltPrice, goldPrice, setgoldPrice, beltChoose, setBeltChoose, addBeltPrice, decrement }) => {
//   const BeltsData = useSelector(selectBelt);
//   const Belts2Data = useSelector(selectBelt2);
//   const dispatch = useDispatch();
//   const [newBeltId, setNewBeltId] = useState();
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [searchParams, setSearchparams] = useSearchParams();
//   const [currentBeltPrice, setCurrentBeltPrice] = useState(400);
//   const { t } = useTranslation()

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 700,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

//   const defaultBelt = {
//     beltimg: blackBelt,
//     img: blackcolor,
//     price: 400,
//     count: 0
//   };

//   useEffect(() => {
//     dispatch(getBeltData());
//     dispatch(getBelt2Data());
//   }, [dispatch]);

//   const handleSendData = () => {
//     const data = {
//       belt: {
//         id: beltChoose.id,
//         img: beltscolor,
//         colourImg: beltChoose.img,
//         price: beltPrice,
//         count: beltChoose.count + 1,
//       },
//       goldLetters: clickedOnes.map(item => ({
//         id: item.id,
//         img: item.img,
//         goldImg: item.gold,
//         mixImg: item.mix,
//         silverImg: item.silver,
//         price: {
//           semigold: 400,
//           golden: 499,
//           silver: 350
//         },
//         cash: item.cash,
//         delId: item.delId,
//         count: item.count + 1,

//       })),
//       totalPrice,
//     };
//     dispatch(postBagData(data));
//   };




//   const handleBeltClick = (beltInfo) => {
//     const q = Math.random();
//     setBeltChoose({ ...beltInfo, beltdId: q });
//     setNewBeltId(q);
//     setSearchparams({ id: q });
//     const selectedBeltPrice = beltInfo.price;
//     const priceDifference = selectedBeltPrice - beltPrice;
//     setBeltPrice(selectedBeltPrice);
//     setTotalPrice((prevTotalPrice) => prevTotalPrice + priceDifference);
//     dispatch(patchcountBelt({ ...beltInfo, id: beltInfo.id, count: beltInfo.count + 1 }));
//   };



//   return (
//     <div className="bg-[#161515] pb-[40px]">
//       <div className="m-auto text-center">
//         <Button onClick={handleOpen}>
//           <h1 className="text-white ml-[20px]"> {t('Our Belt Collection')}</h1>
//         </Button>
//         <Modal
//           open={open}
//           onClick={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style} style={{ backgroundColor: "#2F333A" }}>
//             <Typography id="modal-modal-title" variant="h5" component="h2">
//               <img src={del} className="w-[30px] h-[20px] absolute top-2 right-2 cursor-pointer" />
//               <div className="flex  text-start text-[18px] ">

//                 {BeltsData?.map((beltInfo) => (
//                   <div key={beltInfo.id}>
//                     <img
//                       className="cursor-pointer"
//                       src={beltInfo.img}
//                       onClick={() => handleBeltClick(beltInfo)}
//                     />
//                     <p className="pl-[5%]">{beltInfo.colour}</p>
//                     <p className="pl-[10%]">{beltInfo.price}</p>
//                   </div>
//                 ))}
//               </div>
//             </Typography>
//             <Typography id="modal-modal-description" variant="h5" component="h5" sx={{ mt: 2 }}>
//               <div className="flex  text-start text-[18px]">
//                 {Belts2Data?.map((beltInfo) => (
//                   <div key={beltInfo.id}>
//                     <img
//                       className="cursor-pointer "
//                       src={beltInfo.img}
//                       onClick={() => handleBeltClick(beltInfo)}
//                     />
//                     <p className="pl-[5%]">{beltInfo.colour}</p>
//                     <p className="pl-[10%]">{beltInfo.price}</p>
//                   </div>
//                 ))}
//               </div>
//             </Typography>
//           </Box>
//         </Modal>
//       </div>

//       <div className="mx-[155px] mt-[50px] pt-[40px] border-[#202226] border-[1px] rounded-[7px] relative">
//         <div className="absolute top-1 right-1 hover:rotate-180 transition-transform duration-700 cursor-pointer" onClick={() => {
//           setClickedOnes([]);
//           setBeltChoose(defaultBelt);
//           setTotalPrice(400);
//           setBeltPrice(400);
//         }}>
//           <CachedIcon style={{ color: "white" }} />
//         </div>
//         <div className="pb-[100px]">
//           <div className="relative">
//             <img src={beltChoose.beltimg || defaultBelt.beltimg} className="m-auto" />
//             <div className="flex justify-center mt-[10px] space-x-[15px] absolute inset-0 items-center">
//               {clickedOnes.length > 0 && (
//                 clickedOnes.map((clickedItem) => (
//                   <div className="relative mx-[7.5px]" key={clickedItem.id}>
//                     <div className="px-[15px] py-[10px]">
//                       <img src={clickedItem.img} alt={clickedItem.description} />
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="mx-[20px]">
//           <h2 className="text-white text-[18px]">{t("Belt")}</h2>
//           <div className="flex mt-[50px] space-x-[15px]">
//             {clickedOnes.length > 0 && (
//               clickedOnes.map((clickedItem) => (
//                 <div className="relative" key={clickedItem.id}>
//                   <div className="border-white border-[1px] rounded-[5px]">
//                     <div className="px-[15px] py-[10px]">
//                       <img src={clickedItem.img} />
//                       <div>
//                         <ClearSharpIcon
//                           onClick={() => {
//                             onRemoveItem(clickedItem.delId);
//                             decrement(clickedItem.cash);
//                             if (clickedItem.count >= 0) {
//                               dispatch(patchcountDecrement({ id: clickedItem.id, count: clickedItem.count-- }))
//                             }
//                           }}
//                           style={{ color: 'white' }}
//                           className="absolute right-0 top-0 max-w-[15px] max-h-[20px] cursor-pointer hover:max-h-[25px]"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-white text-center"><p>${clickedItem.cash}</p></div>
//                 </div>
//               ))
//             )}
//             <div className="justify-end text-white absolute top-[150px] right-3">
//               <p>{t("Belt price")} ${beltPrice}</p>
//             </div>
//             <div className="justify-end text-white absolute bottom-1 right-1">
//               <p>{t("Total price")} ${totalPrice}</p>
//             </div>
//           </div>
//         </div>
//         <p className="text-[#A4A4A4] m-auto text-center">© 2020 Composet . All rights reserved.</p>
//       </div>
//       <button className="text-blue-800 underline absolute bottom-[-480px] right-5 text-[15px] " onClick={() => handleSendData()}>{t('Add to bag')}</button>
//     </div>
//   );
// };

// export default Belt;





