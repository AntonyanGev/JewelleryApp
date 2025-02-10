import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  getData2,
  selectCarousel,
  selectStatus,
  selectCarousel2,
  postData,
  post2Data,
  patchcoast,
  patchcoast2,
  patchcount,
  patchcount2,
} from "./CarouselSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import deleteIcon from "../../../assets/icons/x.png";
import filledlike from "../../../assets/icons/likefilled.png";
import { useTranslation } from "react-i18next";

const Carousel = ({
  setClickedOnes,
  clickedOnes,
  beltPrice,
  increment,
  setcoast,
  coast2,
  setcoast2,
}) => {
  const carouselhome = useSelector(selectCarousel);
  console.log(carouselhome, "carouselhome");
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();
  const carouselhome2 = useSelector(selectCarousel2);

  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [open2, setOpen2] = useState(false);
  const [modalContent2, setModalContent2] = useState([]);
  const { t } = useTranslation();

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
    bgcolor: "#2F333A",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
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

  const handleLikeClick = (item) => {
    dispatch(postData({ id: item.id, clicked: !item.clicked }));
    setModalContent((prevContent) => ({
      ...prevContent,
      clicked: !prevContent.clicked,
    }));
  };

  const handleLikeClick2 = (item) => {
    dispatch(post2Data({ id: item.id, clicked: !item.clicked }));
    setModalContent2((prevContent2) => ({
      ...prevContent2,
      clicked: !prevContent2.clicked,
    }));
  };

  const handleItemClick = (item) => {
    if (clickedOnes.length < 13) {
      setClickedOnes((prevClickedOnes) => [
        ...prevClickedOnes,
        { ...item, delId: Math.random(), cash: item.cash },
      ]);
    }

    increment(item.cash, beltPrice);
  };

  const handleColorClick = (item, price) => {
    setcoast({ ...item, id: item.id, delId: Math.random(), cash: price });
    dispatch(
      patchcoast({ ...item, id: item.id, delId: Math.random(), cash: price })
    );
    // setClickedOnes((prevClickedOnes) => [...prevClickedOnes, { ...item, delId:Math.random(),cash: price }]);
    setModalContent({
      ...item,
      id: item.id,
      delId: Math.random(),
      cash: price,
    });
  };

  const handleColorClick2 = (item, price) => {
    setcoast2({ ...item, id: item.id, delId: Math.random(), cash: price });
    dispatch(
      patchcoast2({ ...item, id: item.id, delId: Math.random(), cash: price })
    );
    /// setClickedOnes((prevClickedOnes) => [...prevClickedOnes, {...item,delId:Math.random(), cash: price }]);
    setModalContent2({
      ...item,
      id: item.id,
      delId: Math.random(),
      cash: price,
    });
  };

  useEffect(() => {
    dispatch(getData());
    dispatch(getData2());
  }, [dispatch, coast2]);

  return (
    <div className="bg-[#161515] py-[80px] px-[50px] flex justify-center  max-sm:m-[0px]">
      <div className="bg-[#2F333A] rounded-[15px] py-[10px] w-full max-w-[1300px] px-[40px] ">
        <div className="py-[20px]">
          <h1 className="text-white ml-[20px]">{t("COLLECTION")}</h1>
          <Slider {...settings}>
            {carouselhome?.map((item, index) => (
              <div
                className="mt-[80px] mx-auto pb-[20px] items-center justify-center max-w-[200px] max-h-[233px] hover:bg-[#161515] max-sm:m-auto"
                key={index}
              >
                <div className="relative pb-[20px] mx-[20px] mt-[10px] items-center max-w-[180px] max-h-[140px] bg-[#3B4048] cursor-pointer">
                  <img
                    src={item.clicked === false ? item.like : item.likeFilled}
                    className="absolute top-2 right-2"
                    alt="like"
                    onClick={() => handleLikeClick(item)}
                  />
                  <img
                    src={item.img}
                    alt={item.description}
                    className="m-auto pb-[20px] py-[30px]"
                    onClick={() => {
                      handleItemClick(item);
                      dispatch(
                        patchcount({ id: item.id, count: item.count + 1 })
                      );
                    }}
                  />
                  <div className="flex absolute bottom-0 right-0 mt-[20px]">
                    <img
                      className="cursor-pointer hover:pt-[3px]"
                      src={item.gold}
                      alt="color1"
                      onClick={() => {
                        handleColorClick(item, item.price.golden);
                      }}
                    />
                    <img
                      className="cursor-pointer hover:pt-[3px]"
                      src={item.mix}
                      alt="color2"
                      onClick={() =>
                        handleColorClick(item, item.price.semigold)
                      }
                    />
                    <img
                      className="cursor-pointer hover:pt-[3px]"
                      src={item.silver}
                      alt="color3"
                      onClick={() => handleColorClick(item, item.price.silver)}
                    />
                  </div>
                </div>
                <div className="flex px-[10px] text-white relative text-[14px] max-md:text-[12px] max-sm:text-[8px]">
                  <div className="flex-col">
                    <div className="px-[10px] pt-[5px] flex text-center items-center space-x-[30px]">
                      <div className="flex-col my-[0px] text-start">
                        <p>{t(`${item.custom}`)}</p>
                        <p className="whitespace-nowrap">
                          {t(`${item.description}`)}
                        </p>
                      </div>
                      <p className="text-white">${item.cash}</p>
                    </div>
                    <div className="flex justify-end text-[16px] font-semibold underline text-[#B0B0B0] cursor-pointer hover:text-blue-500">
                      <p onClick={() => handleOpen(item)}>
                        {t(`${item.seemore}`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="py-[20px]">
          <h1 className="text-white ml-[20px]"> {t("CHARM")}</h1>
          <Slider {...settings}>
            {carouselhome2.map((item2, index) => (
              <div
                className="mt-[80px] mx-auto pb-[20px] items-center justify-center max-w-[200px] max-h-[233px] hover:bg-[#161515]"
                key={index}
              >
                <div className="relative pb-[20px] mx-[20px] mt-[10px] items-center max-w-[180px] max-h-[140px] bg-[#3B4048] cursor-pointer">
                  <img
                    src={
                      item2.clicked === false ? item2.like : item2.likeFilled
                    }
                    alt="like"
                    className="absolute top-2 right-2"
                    onClick={() => handleLikeClick2(item2)}
                  />
                  <img
                    src={item2.img}
                    alt={item2.description}
                    className="m-auto pb-[20px] py-[30px]"
                    onClick={() => {
                      handleItemClick(item2);
                      dispatch(
                        patchcount2({ id: item2.id, count: item2.count + 1 })
                      );
                    }}
                  />
                  <div className="flex absolute bottom-0 right-0 mt-[20px]">
                    <img
                      className="cursor-pointer hover:pt-[3px]"
                      src={item2.gold}
                      alt="color1"
                      onClick={() => {
                        handleColorClick2(item2, item2.price.golden);
                      }}
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
                        <p className="whitespace-nowrap">
                          {t(`${item2.description}`)}
                        </p>
                      </div>
                      <p className="text-white">${item2.cash}</p>
                    </div>
                    <div className="flex justify-end text-[16px] font-semibold underline text-[#B0B0B0] cursor-pointer hover:text-blue-500">
                      <p onClick={() => handleOpen2(item2)}>
                        {t(`${item2.seemore}`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="max-sm:w-[400px] max-sm:h-[400px]">
        {modalContent && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className=" max-sm:w-[120%] max-sm:h-[110%]   md:h-[85%]  lg:h-[90%] sm:mr-[25px]"
          >
            <Box className="" sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className="flex bg-[#2F333A] space-x-[30px]  pt-[10px]  relative  max-sm:px-[2px] max-sm:space-y-[10px] max-sm:flex-col">
                  <div className="absolute top-[-25px] right-[-30px] cursor-pointer">
                    <img
                      className="max-w-[40px] max-h-[40px] "
                      src={deleteIcon}
                      alt="close"
                      onClick={handleClose}
                    />
                  </div>
                  <div className="relative bg-[#3B4048] w-[600px] h-[240px] pt-[20px] px-[15px] lg:px-[20px] xl:px-[40px] xl:py-[40px] max-sm:w-[150px] max-sm:h-[120px]  md:w-[200px] md:h-[100px] xl:h-[165px] xl:w-[250px]">
                    <img
                      src={modalContent.img}
                      className="w-[500px] h-[200px] m-auto p-[10px] max-sm:w-[80px] max-sm:h-[100px]  md:w-[100px] md:h-[70px] xl:w-[80px] xl:h-[100px]"
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
                  <div className="flex-col space-y-[10px] text-[#E6E6E6]  lg:text-[16px] text-start md:text-[12px] max-sm:text-[10px]">
                    <p>
                      {t(`${modalContent.custom}`)} <br />{" "}
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
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                className=" "
              >
                <div className="flex space-x-[30px] ml-[30px]">
                  <div className="w-[60px] h-[60px] rounded-[50%] border-transparent border-[1px] p-[2px] cursor-pointer shadow-black shadow-md  max-sm:w-[30px] max-sm:h-[30px] max-md:w-[40px] max-md:h-[40px]">
                    <img
                      className="m-[15%] w-[40px] h-[40px] max-sm:w-[20px] max-sm:h-[20px] max-md:w-[30px] max-md:h-[30px]"
                      src={modalContent.img}
                      onClick={() =>
                        handleColorClick(
                          modalContent,
                          modalContent.price.golden
                        )
                      }
                    />
                  </div>
                  <div className="w-[60px] h-[60px] rounded-[50%] border-transparent border-[1px] p-[2px] cursor-pointer shadow-black shadow-md  max-sm:w-[30px] max-sm:h-[30px] max-md:w-[40px] max-md:h-[40px]">
                    <img
                      className="m-[15%] w-[40px] h-[40px] max-sm:w-[20px] max-sm:h-[20px] max-md:w-[30px] max-md:h-[30px]"
                      src={modalContent.img}
                      onClick={() =>
                        handleColorClick(
                          modalContent,
                          modalContent.price.semigold
                        )
                      }
                    />
                  </div>
                  <div className="w-[60px] h-[60px] rounded-[50%] border-transparent border-[1px] p-[2px] cursor-pointer shadow-black shadow-md  max-sm:w-[30px] max-sm:h-[30px] max-md:w-[40px] max-md:h-[40px]">
                    <img
                      className="m-[15%] w-[40px] h-[40px] max-sm:w-[20px] max-sm:h-[20px] max-md:w-[30px] max-md:h-[30px] "
                      src={modalContent.img}
                      onClick={() =>
                        handleColorClick(
                          modalContent,
                          modalContent.price.silver
                        )
                      }
                    />
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
        )}
      </div>
      {modalContent2 && (
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className=" max-sm:w-[120%] max-sm:h-[110%]   md:h-[85%]  lg:h-[90%] sm:mr-[25px]"
        >
          <Box className="" sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div className="flex bg-[#2F333A] space-x-[30px]  pt-[10px]  relative  max-sm:px-[2px] max-sm:space-y-[10px] max-sm:flex-col">
                <div className="absolute top-[-25px] right-[-30px] cursor-pointer">
                  <img
                    className="max-w-[40px] max-h-[40px] "
                    src={deleteIcon}
                    alt="close"
                    onClick={handleClose2}
                  />
                </div>
                <div className="relative bg-[#3B4048] w-[600px] h-[240px] pt-[20px] px-[15px] lg:px-[20px] xl:px-[40px] xl:py-[40px] max-sm:w-[150px] max-sm:h-[120px]  md:w-[200px] md:h-[100px] xl:h-[165px] xl:w-[250px]">
                  <img
                    src={modalContent2.img}
                    className="w-[500px] h-[200px] m-auto p-[10px] max-sm:w-[80px] max-sm:h-[100px]  md:w-[100px] md:h-[70px] xl:w-[80px] xl:h-[100px]"
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
                <div className="flex-col space-y-[10px] text-[#E6E6E6]  lg:text-[16px] text-start md:text-[12px] max-sm:text-[10px]">
                  <p>
                    {t(`${modalContent2.custom}`)} <br />{" "}
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
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              className=" "
            >
              <div className="flex space-x-[30px] ml-[30px]">
                <div className="w-[60px] h-[60px] rounded-[50%] border-transparent border-[1px] p-[2px] cursor-pointer shadow-black shadow-md  max-sm:w-[30px] max-sm:h-[30px] max-md:w-[40px] max-md:h-[40px]">
                  <img
                    className="m-[15%] w-[40px] h-[40px] max-sm:w-[20px] max-sm:h-[20px] max-md:w-[30px] max-md:h-[30px]"
                    src={modalContent2.img}
                    onClick={() =>
                      handleColorClick2(
                        modalContent2,
                        modalContent2.price.golden
                      )
                    }
                  />
                </div>
                <div className="w-[60px] h-[60px] rounded-[50%] border-transparent border-[1px] p-[2px] cursor-pointer shadow-black shadow-md  max-sm:w-[30px] max-sm:h-[30px] max-md:w-[40px] max-md:h-[40px]">
                  <img
                    className="m-[15%] w-[40px] h-[40px] max-sm:w-[20px] max-sm:h-[20px] max-md:w-[30px] max-md:h-[30px]"
                    src={modalContent2.img}
                    onClick={() =>
                      handleColorClick2(
                        modalContent2,
                        modalContent2.price.semigold
                      )
                    }
                  />
                </div>
                <div className="w-[60px] h-[60px] rounded-[50%] border-transparent border-[1px] p-[2px] cursor-pointer shadow-black shadow-md  max-sm:w-[30px] max-sm:h-[30px] max-md:w-[40px] max-md:h-[40px]">
                  <img
                    className="m-[15%] w-[40px] h-[40px] max-sm:w-[20px] max-sm:h-[20px] max-md:w-[30px] max-md:h-[30px] "
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
    </div>
  );
};

export default Carousel;
