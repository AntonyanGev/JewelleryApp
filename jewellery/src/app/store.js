import { configureStore } from '@reduxjs/toolkit';
import carouselForHome from '../features/Home/Carousel/CarouselSlice'
import collectionOfBelts from "../features/Home/Belt/BeltSlice"
import wishlistsData  from "../features/Wishlist/Wishlistslice"
import bagProd from  "../features/Bag/BagSlice"

import gold from '../features/Bag/Golds/GoldSlice'

export const store = configureStore({
  reducer: {
    home:carouselForHome,
    belts:collectionOfBelts,
    wishlist:wishlistsData,
    bag:bagProd,
    gold:gold

  },
});
