import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Slider from "react-slick";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import deleteIcon from "../../assets/icons/x.png";
import filledlike from "../../assets/icons/likefilled.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlistData,
  getWishlistData2,
  patchWishlistData,
  selectwishlistCollection,
  selectwishlistCharm,
  postcoast,
  patchWishlistData2,
  postcoast2,
  postGolds,
} from "./Wishlistslice";
import { useTranslation } from "react-i18next";
const Wishlist = () => {
  const [category, setCategory] = useState("");
  const { t } = useTranslation();
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const wishlistCollection = useSelector(selectwishlistCollection) || [];
  const wishlistCharm = useSelector(selectwishlistCharm) || [];
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [open2, setOpen2] = useState(false);
  const [modalContent2, setModalContent2] = useState([]);

  const handleSendData2 = (item) => {
    const data2 = {
      id: item.id,
      img: item.img,
      goldImg: item.gold,
      mixImg: item.mix,
      silverImg: item.silver,
      price: {
        semigold: 400,
        golden: 499,
        silver: 350,
      },
      cash: item.cash,
      delId: item.delId,
      count: item.count + 1,
      itemPrice: item.cash,
    };

    dispatch(postGolds(data2));
  };

  const handleOpen = (item) => {
    setModalContent(item);
    setOpen(true);
  };

  const handleOpen2 = (item) => {
    setModalContent2(item);
    setOpen2(true);
  };

  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);

  const handleLikeClick = (item) => {
    const updatedItem = { ...item, clicked: !item.clicked };
    dispatch(patchWishlistData({ id: item.id, clicked: updatedItem.clicked }));
    setModalContent(updatedItem);
  };

  const handleLikeClick2 = (item) => {
    const updatedItem = { ...item, clicked: !item.clicked };
    dispatch(patchWishlistData2({ id: item.id, clicked: updatedItem.clicked }));
    setModalContent2(updatedItem);
  };

  const handleColorClick = (item, price) => {
    const updatedItem = { ...item, cash: price };
    dispatch(
      postcoast({ ...item, id: item.id, delId: Math.random(), cash: price })
    );
    setModalContent(updatedItem);
  };

  const handleColorClick2 = (item, price) => {
    const updatedItem = { ...item, cash: price };
    dispatch(
      postcoast2({ ...item, id: item.id, delId: Math.random(), cash: price })
    );
    setModalContent2(updatedItem);
  };

  useEffect(() => {
    dispatch(getWishlistData());
    dispatch(getWishlistData2());
  }, [dispatch, modalContent]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 400,
    bgcolor: "#2F333A",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1256,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 565,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="bg-[#2F333A] w-full h-screen text-white px-[50px]">
      Wishlist
      <div className="mt-[100px] ml-[210px]">
        <Box
          sx={{
            width: 100,
            color: "white",
            borderStyle: "solid",
            borderColor: "red",
            border: "1px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              style={{ color: "white" }}
            >
              {t(`Category`)}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={handleChange}
              sx={{ width: 200, color: "white" }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#2F333A",
                    "& .MuiMenuItem-root": {
                      color: "white",
                    },
                  },
                },
              }}
            >
              <MenuItem value="collection">{t(`COLLECTION`)}</MenuItem>
              <MenuItem value="charm">{t(`CHARM`)}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div>{category}</div>
      </div>
      <div className="pb-[80px] px-[50px] flex justify-center max-md:mx-[60px]">
        <div className="bg-[#2F333A] rounded-[15px] py-[10px] w-full max-w-[1300px] px-[40px]">
          {category === "collection" && (
            <div className="py-[20px]">
              <Slider {...settings}>
                {wishlistCollection.length > 0 &&
                  wishlistCollection
                    .filter((item) => item.clicked)
                    .map((item, index) => (
                      <div
                        className=" mt-[80px] mx-auto pb-[20px] items-center justify-center max-w-[200px] max-h-[233px] hover:bg-[#161515] max-sm:m-auto"
                        key={index}
                      >
                        <div className="relative pb-[20px] mx-[20px] mt-[10px] items-center max-w-[180px] max-h-[140px] bg-[#3B4048] cursor-pointer">
                          <img
                            src={
                              item.clicked === false
                                ? item.like
                                : item.likeFilled
                            }
                            className="absolute top-2 right-2"
                            alt="like"
                            onClick={() => {
                              dispatch(
                                patchWishlistData({
                                  id: item.id,
                                  clicked: !item.clicked,
                                })
                              );
                            }}
                          />
                          <img
                            src={item.img}
                            alt={item.description}
                            className="m-auto pb-[20px] py-[30px]"
                          />
                          <div className="flex absolute bottom-0 right-0 mt-[20px]">
                            <img
                              className="cursor-pointer hover:pt-[3px]"
                              src={item.gold}
                              onClick={() =>
                                dispatch(
                                  postcoast({
                                    ...item,
                                    id: item.id,
                                    delId: Math.random(),
                                    cash: item.price.golden,
                                  })
                                )
                              }
                              alt="color1"
                            />
                            <img
                              className="cursor-pointer hover:pt-[3px]"
                              src={item.mix}
                              onClick={() =>
                                dispatch(
                                  postcoast({
                                    ...item,
                                    id: item.id,
                                    delId: Math.random(),
                                    cash: item.price.semigold,
                                  })
                                )
                              }
                              alt="color2"
                            />
                            <img
                              className="cursor-pointer hover:pt-[3px]"
                              src={item.silver}
                              onClick={() =>
                                dispatch(
                                  postcoast({
                                    ...item,
                                    id: item.id,
                                    delId: Math.random(),
                                    cash: item.price.silver,
                                  })
                                )
                              }
                              alt="color3"
                            />
                          </div>
                        </div>
                        <div className="flex px-[10px] text-white relative text-[14px] max-md:text-[12px] max-sm:text-[8px]">
                          <div className="flex-col">
                            <div className="px-[10px] pt-[5px] flex text-center items-center space-x-[30px]">
                              <div className="flex-col my-[0px] text-start">
                                <p>{t(`${item.custom}`)}</p>
                                <p>{t(`${item.description}`)}</p>
                              </div>
                              <p className="text-white">${item.cash}</p>
                            </div>
                            <div className="flex justify-between px-[10px]">
                              <div className="justify-start text-[13px] font-semibold underline text-[#B0B0B0] cursor-pointer hover:text-blue-500">
                                <p onClick={() => handleSendData2(item)}>
                                  {t(`Add to Bag`)}
                                </p>
                              </div>
                              <div className=" justify-end text-[13px] font-semibold underline text-[#B0B0B0] cursor-pointer hover:text-blue-500">
                                <p onClick={() => handleOpen(item)}>
                                  {t(`${item.seemore}`)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
              </Slider>
            </div>
          )}
          {category === "charm" && (
            <div className="py-[20px]">
              <Slider {...settings}>
                {wishlistCharm.length > 0 &&
                  wishlistCharm
                    .filter((item) => item.clicked)
                    .map((item2, index) => (
                      <div
                        className="mt-[80px] mx-auto pb-[20px] items-center justify-center max-w-[200px] max-h-[233px] hover:bg-[#161515]"
                        key={index}
                      >
                        <div className="relative pb-[20px] mx-[20px] mt-[10px] items-center max-w-[180px] max-h-[140px] bg-[#3B4048] cursor-pointer">
                          <img
                            src={
                              item2.clicked === false
                                ? item2.like
                                : item2.likeFilled
                            }
                            alt="like"
                            className="absolute top-2 right-2"
                            onClick={() => handleLikeClick2(item2)}
                          />
                          <img
                            src={item2.img}
                            alt={item2.description}
                            className="m-auto pb-[20px] py-[30px]"
                          />
                          <div className="flex absolute bottom-0 right-0 mt-[20px]">
                            <img
                              className="cursor-pointer hover:pt-[3px]"
                              src={item2.gold}
                              alt="color1"
                              onClick={() =>
                                handleColorClick2(item2, item2.price.golden)
                              }
                            />
                            <img
                              className="cursor-pointer hover:pt-[3px]"
                              src={item2.mix}
                              alt="color2"
                              onClick={() =>
                                handleColorClick2(item2, item2.price.semigold)
                              }
                            />
                            <img
                              className="cursor-pointer hover:pt-[3px]"
                              src={item2.silver}
                              alt="color3"
                              onClick={() =>
                                handleColorClick2(item2, item2.price.silver)
                              }
                            />
                          </div>
                        </div>
                        <div className="flex px-[10px] text-white relative text-[14px] max-md:text-[12px] max-sm:text-[8px]">
                          <div className="flex-col">
                            <div className="px-[10px] pt-[5px] flex text-center items-center space-x-[30px]">
                              <div className="flex-col my-[0px] text-start">
                                <p>{t(`${item2.custom}`)}</p>
                                <p>{t(`${item2.description}`)}</p>
                              </div>
                              <p className="text-white">
                                ${item2.cash ? item2.cash : 400}
                              </p>
                            </div>
                            <div className="flex justify-between px-[10px]">
                              <div className="justify-start text-[13px] font-semibold underline text-[#B0B0B0] cursor-pointer hover:text-blue-500">
                                <p onClick={() => handleSendData2(item2)}>
                                  {t(`Add to Bag`)}
                                </p>
                              </div>
                              <div className=" justify-end text-[13px] font-semibold underline text-[#B0B0B0] cursor-pointer hover:text-blue-500">
                                <p onClick={() => handleOpen2(item2)}>
                                  {t(`${item2.seemore}`)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
      {modalContent && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div className="flex bg-[#2F333A] space-x-[30px] pt-[10px] relative">
                <div className="absolute top-[-25px] right-[-30px] cursor-pointer">
                  <img
                    className="max-w-[40px] max-h-[40px]"
                    src={deleteIcon}
                    alt="close"
                    onClick={handleClose}
                  />
                </div>
                <div className="relative bg-[#3B4048] w-[600px] h-[240px] pt-[20px] px-[50px]">
                  <img
                    src={modalContent.img}
                    className="w-[500px] h-[200px] m-auto p-[10px]"
                  />
                  <div className="absolute top-2 right-2 cursor-pointer">
                    <img
                      src={
                        modalContent.clicked ? filledlike : modalContent.like
                      }
                      alt="like"
                      onClick={() => handleLikeClick(modalContent)}
                    />
                  </div>
                </div>
                <div className="flex-col space-y-[10px] text-[#E6E6E6] text-[16px] text-start">
                  <p>
                    {t(`${modalContent.custom}`)} <br />
                    {t(`${modalContent.description}`)}
                  </p>
                  <p>${modalContent.cash}</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquid in architecto veniam id, necessitatibus explicabo
                    temporibus et eos commodi voluptates!
                  </p>
                </div>
              </div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="flex space-x-[30px] ml-[30px]">
                <div className="w-[60px] h-[60px] rounded-[50%] border-transparent border-[1px] p-[2px] cursor-pointer shadow-black shadow-md">
                  <img
                    className="m-[15%] w-[40px] h-[40px]"
                    src={modalContent.img}
                    onClick={() =>
                      handleColorClick(modalContent, modalContent.price.golden)
                    }
                  />
                </div>
                <div className="w-[60px] h-[60px] rounded-[50%] border-transparent border-[1px] p-[2px] cursor-pointer shadow-black shadow-md">
                  <img
                    className="m-[15%] w-[40px] h-[40px]"
                    src={modalContent.img}
                    onClick={() =>
                      handleColorClick(
                        modalContent,
                        modalContent.price.semigold
                      )
                    }
                  />
                </div>
                <div className="w-[60px] h-[60px] rounded-[50%] border-transparent border-[1px] p-[2px] cursor-pointer shadow-black shadow-md">
                  <img
                    className="m-[15%] w-[40px] h-[40px]"
                    src={modalContent.img}
                    onClick={() =>
                      handleColorClick(modalContent, modalContent.price.silver)
                    }
                  />
                </div>
              </div>
            </Typography>
          </Box>
        </Modal>
      )}
      {modalContent2 && (
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div className="flex bg-[#2F333A] space-x-[30px] pt-[10px] relative">
                <div className="absolute top-[-25px] right-[-30px] cursor-pointer">
                  <img
                    className="max-w-[40px] max-h-[40px]"
                    src={deleteIcon}
                    alt="close"
                    onClick={handleClose2}
                  />
                </div>
                <div className="relative bg-[#3B4048] w-[600px] h-[240px] pt-[20px] px-[50px]">
                  <img
                    src={modalContent2.img}
                    className="w-[500px] h-[200px] m-auto p-[10px]"
                  />
                  <div className="absolute top-2 right-2 cursor-pointer">
                    <img
                      src={
                        modalContent2.clicked ? filledlike : modalContent2.like
                      }
                      alt="like"
                      onClick={() => handleLikeClick2(modalContent2)}
                    />
                  </div>
                </div>
                <div className="flex-col space-y-[10px] text-[#E6E6E6] text-[16px] text-start">
                  <p>
                    {t(`${modalContent2.custom}`)} <br />
                    {t(`${modalContent2.description}`)}
                  </p>
                  <p>${modalContent2.cash}</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquid in architecto veniam id, necessitatibus explicabo
                    temporibus et eos commodi voluptates!
                  </p>
                </div>
              </div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="flex space-x-[30px] ml-[30px]">
                <div className="w-[60px] h-[60px] rounded-[50%] border-transparent border-[1px] p-[2px] cursor-pointer shadow-black shadow-md">
                  <img
                    className="m-[15%] w-[40px] h-[40px]"
                    src={modalContent2.img}
                    onClick={() =>
                      handleColorClick2(
                        modalContent2,
                        modalContent2.price.golden
                      )
                    }
                  />
                </div>
                <div className="w-[60px] h-[60px] rounded-[50%] border-transparent border-[1px] p-[2px] cursor-pointer shadow-black shadow-md">
                  <img
                    className="m-[15%] w-[40px] h-[40px]"
                    src={modalContent2.img}
                    onClick={() =>
                      handleColorClick2(
                        modalContent2,
                        modalContent2.price.semigold
                      )
                    }
                  />
                </div>
                <div className="w-[60px] h-[60px] rounded-[50%] border-transparent border-[1px] p-[2px] cursor-pointer shadow-black shadow-md">
                  <img
                    className="m-[15%] w-[40px] h-[40px]"
                    src={modalContent2.img}
                    onClick={() =>
                      handleColorClick2(
                        modalContent2,
                        modalContent2.price.silver
                      )
                    }
                  />
                </div>
              </div>
            </Typography>
          </Box>
        </Modal>
      )}
      <div className="">
        <p className="text-[#A4A4A4] m-auto text-center pt-[5%]">
          © 2020 Composet . All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Wishlist;
