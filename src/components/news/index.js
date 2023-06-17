import React, { useEffect, memo } from "react";



const News = ({ list }) => {
  
  return(
<>
  {
    list.map((item,index)=>{
      return <div key={index}>
      <div> bydet logo</div> 
      <div>{item.author}</div>
      
      </div>
    })
  }
  </>
  )
};

export default memo(News);
