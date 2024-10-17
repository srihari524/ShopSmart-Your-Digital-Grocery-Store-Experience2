import React from 'react'
import { FiPlusCircle } from "react-icons/fi";
import { LuMinusCircle } from "react-icons/lu";
import { MdRemoveCircle } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { decreaseQty, deleteCartItem, increaseQty } from '../redux/productSlide';




const CartProduct = ({id,name,category,qty,total,image,price}) => {

const dispatch = useDispatch()
  return (
    <div className='bg-slate-200 p-2 flex gap-4 rounded border border-slate-400'>
       <div className='p-3 bg-white rounded overflow-hidden'>
           <img src={image} alt='cartitems' className='h-28 w-40 object-cover'/>
       </div>
       <div className="flex flex-col gap-1 w-full">
         <div className='flex justify-between'>
         <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-2xl">
           {name}
            
         </h3>
         <div className='cursor-pointer text-3xl font-bold hover:text-red-500' onClick={()=>dispatch(deleteCartItem(id))}>
           <MdRemoveCircle />
         </div>
         </div>
         <p className=" text-slate-500  font-medium text-2xl capitalize">{category}</p>
         <p className=" font-bold md:text-xl">
           <span className="text-red-500 ">₹</span>
           <span>{price}</span> 
         </p>
         <div className='flex justify-between '>
         <div className="flex gap-3 items-center">
         <button onClick={()=>dispatch(decreaseQty(id))}  className="bg-slate-700 text-white text-xl mt-2 rounded hover:bg-red-500 px-4 py-3"><LuMinusCircle /></button>
         <p className='text-xl font-bold p-1'>{qty}</p>
         <button onClick={()=>dispatch(increaseQty(id))} className="bg-slate-700 text-white  text-xl mt-2 rounded hover:bg-red-500 px-4 py-3"><FiPlusCircle /></button>
         </div>
         <div className='flex items-center font-bold gap-2'>
           <p>Total:</p>
           <p><span className='text-red-600 font-bold'>₹</span>{total}</p>
         </div>
         </div>
         
       </div>
       
    </div>
  )
}

export default CartProduct
