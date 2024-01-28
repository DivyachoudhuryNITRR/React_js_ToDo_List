import React,{useState,useEffect} from 'react';
import "./style.css";

const UseEffect = () => {
    // const initialData=15;
   const [myNum,setMyNum] =React.useState(0);

   useEffect(()=>{
    // console.log("Hii")
    document.title=`Chats(${myNum})`
   });
//    console.log(setMyNum);

  return (
    <>
    <div className="center_div">
        <p>{myNum}</p>
        <div className="button2" onClick={()=>setMyNum(myNum+1)}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            INCR
        </div>
    </div>
    </>
  );
};

export default UseEffect;