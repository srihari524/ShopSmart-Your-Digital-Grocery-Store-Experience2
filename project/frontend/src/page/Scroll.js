import React, { useRef } from 'react'
import CardFeature from '../component/CardFeature';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useSelector } from 'react-redux';

const Scroll = () => {
    const productData = useSelector((state) => state.product.productList);
 
    const homeProductCartListVegetables = productData.filter(
        (el) => el.category === "vegetable",
        []
      );
  
  const loadingArrayFeature = new Array(10).fill(null);
  const slideProductRef1 = useRef();
  const nexProduct = () => {
    slideProductRef1.current.scrollLeft += 200;
  };
  const prevProduct = () => {
    slideProductRef1.current.scrollLeft -= 200;
  };

  return (
    <div className="">
    <div className="flex w-full items-center">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">
        Fresh Vegetables
      </h2>

      <div className="ml-auto flex gap-4">
        <button
          onClick={prevProduct}
          className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
        >
          <GrFormPrevious />
        </button>
        <button
          onClick={nexProduct}
          className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
        >
          <GrFormNext />
        </button>
      </div>
    </div>
    <div
      className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
      ref={slideProductRef1}
    >
      {homeProductCartListVegetables[0]
        ? homeProductCartListVegetables.map((el) => {
            return (
              <CardFeature
                key={el._id + "vegetable"}
                id={el._id}
                name={el.name}
                category={el.category}
                price={el.price}
                image={el.image}
              />
            );
          })
        : loadingArrayFeature.map((el, index) => (
            <CardFeature
              loading="Loading...."
              key={index + "CartLoading"}
            />
          ))}
    </div>
  </div>
  )
}

export default Scroll
