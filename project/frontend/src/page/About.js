import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-green-600 mb-8">About ShopSmart Grocery Store</h1>
      
      <div className="max-w-3xl text-center text-lg text-gray-700 mb-12">
        <p>
          Welcome to <strong>ShopSmart</strong>, your number one source for all things grocery. 
          We're dedicated to giving you the very best of fresh produce, dairy, household items, and more,
          with a focus on quality, affordability, and convenience.
        </p>
        <p className="mt-4">
          Founded in 2024, ShopSmart has come a long way from its beginnings as a small local store. 
          We now serve customers all over the region and are thrilled to be a part of the eco-friendly, 
          fair-trade wing of the grocery industry.
        </p>
        <p className="mt-4">
          Our mission is to make grocery shopping easier and more accessible, while offering products that
          promote a healthier and sustainable lifestyle. Whether you are looking for everyday essentials
          or specialty organic goods, we’ve got you covered.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold text-green-600 mb-6">Meet the Team</h2>
        <p className="text-center text-gray-700 max-w-xl">
          ShopSmart is powered by a passionate team of grocery enthusiasts, dedicated to offering the best 
          products and services. From our in-store staff to our delivery team, we strive to bring quality
          and convenience to your shopping experience.
        </p>
      </div>
    </div>
  );
}

export default About;
