import React from 'react'
import { TbHexagonLetterSFilled } from "react-icons/tb";

const FilterProduct = ({category,onClick,isActive}) => {
  return (
   <div onClick={onClick}>
    <div className={`text-2xl p-4   text-white   rounded-full cursor-pointer1 ${isActive ? "bg-slate-900 text-white" : "bg-orange-500"}`}>
    <TbHexagonLetterSFilled />
    </div>
    <p className='text-sm  text-center font-medium my-1 capitalize'>{category}</p>
   </div>
  )
}

export default FilterProduct
