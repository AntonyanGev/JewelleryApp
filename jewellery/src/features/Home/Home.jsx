import React, { useState } from 'react';
import Carousel from './Carousel/Carousel';
import Belt from './Belt/Belt';

const Home = () => {
  const [clickedOnes, setClickedOnes] = useState([]);
  const[beltChoose,setBeltChoose] = useState({})
  const [beltPrice, setBeltPrice] = useState(400);
  const [totalPrice, setTotalPrice] = useState(beltPrice);
 
  const [goldPrice, setgoldPrice] = useState(0);
  const [coast, setcoast]=useState([])
  const [coast2,setcoast2] = useState([])
  const [colourPrice,setcolourPrice]= useState([499,400,350])
  const[specific,setspecific]= useState([])
  

  const increment = (goldPrice) => {
    setTotalPrice((prevTotal) => prevTotal +  goldPrice);   
  };
  
  const addBeltPrice = (beltpr) => {
    setTotalPrice((prevTotal) => (prevTotal + -beltpr) + beltPrice);                 ///gotin avelacnelis ira gni chapov yndhanuric elni
  };
  const decrement = (goldPrice) => {
    setTotalPrice((prevTotal) => prevTotal - goldPrice);
  };
  const handleRemoveItem = (delId) => {
    setClickedOnes((prevClicked) => prevClicked.filter((item) => item.delId !== delId,))
  ;
  };


  

  return (
    <div>
   
      <Carousel
        setClickedOnes={setClickedOnes}
        clickedOnes={clickedOnes}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        beltPrice={beltPrice}
        setBeltPrice={setBeltPrice}
        increment={increment}
        goldPrice={goldPrice}
        setgoldPrice={setgoldPrice}
        addBeltPrice={addBeltPrice}
        coast={coast}
        setcoast={setcoast}
        coast2={coast2}
        setcoast2={setcoast2}
        colourPrice={colourPrice}
        setcolourPrice={setcolourPrice}
        specific={specific}
        setspecific={setspecific}
      />
      <Belt
        clickedOnes={clickedOnes}
        setClickedOnes={setClickedOnes}
        onRemoveItem={handleRemoveItem}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        beltPrice={beltPrice}
        setBeltPrice={setBeltPrice}
        goldPrice={goldPrice}
        setgoldPrice={setgoldPrice}
        beltChoose={beltChoose}
        setBeltChoose={setBeltChoose}
        coast={coast}
        setcoast={setcoast}
        coast2={coast2}
        setcoast2={setcoast2}
        addBeltPrice={addBeltPrice}
        decrement={decrement}

      />
    </div>
  );
};

export default Home;





