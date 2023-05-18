import React from 'react'

import { Link } from 'react-router-dom'
function Card({title,description,slug,openModal,imgUrl}) {
  console.log(imgUrl)
  return (
    
    <div
    style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
    className="border   bg-gray-50 scale-90  xs:scale-100 w-[350px] md:w-full  min-[1500px]:w-[340px!important] h-[350px] flex flex-col items-center justify-between rounded-xl overflow-hidden hover:-translate-y-1 hover:scale-95 xs:hover:scale-[1.025] transition-transform"
  >
    <a onClick={()=>openModal(slug)}>
        <img class="rounded-t-lg w-full h-36" src={imgUrl} alt=""  />

        <div
        className=" z-[5] my-5 mx-3  w-full h-64 flex flex-col justify-between items-start p-3 pt-0 bg-gray-50"
      >
        <div className="w-full flex flex-col justify-between items-start overflow-hidden ">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
       
        <h3 class="mb-3 my-3  text-black-100 font-medium">{(title.length+description.length)>150?description.substring(0,120)+"...":description}</h3>
      </div>
      </div>
      </a>
   
</div>  


   

  )
}

export default Card