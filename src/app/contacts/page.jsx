import React from 'react';
import { MdEmail } from "react-icons/md";


const page = () => {
    return (
        <div className='relative mb-28'>
            
            <div className="bg-[url('https://cdn.pixabay.com/photo/2022/09/21/17/02/blue-background-7470781_1280.jpg')] h-[450px] bg-no-repeat bg-cover  w-full text-center pt-4">
             <h1 className="text-white text-[2.25rem] font-[800] leading-9 tracking-tight pb-2">
            যোগাযোগ করুন</h1>
             <p className="text-[1.25rem] text-gray-200 w-2/5 mx-auto">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
       
        </div>

        {/* form start */}

      <div className="absolute top-1/3 lg:left-1/3 sm:left-16 md:left-1/4 ">
      <div className="w-[100%]  border border-gray-300 shadow-md rounded-lg py-10 px-5 space-y-6 bg-[#f3f5ff]">
      
      <form >
        <div className="flex gap-4">
        <div className="mb-4 flex-1">
          <label className="block text-gray-900 font-bold  text-sm  mb-2">নাম</label>
          <input
            type="text"
            name="name"
           
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="আপনার নাম লিখুন"
            required
          />
        </div>

        <div className="mb-4 flex-1">
          <label className="block text-sm text-gray-900 font-bold  mb-2">ইমেইল</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="আপনার ইমেইল লিখুন"
            required
          />
        </div>
        
        </div>
        



        <div className="mb-4">
          <label className="block text-sm text-gray-900 font-bold  mb-2">বিষয়</label>
          <input
            type="text"
            name="subject"
           
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="বিষয়"
            required
          />
        </div>
       
        

        <div className="mb-4">
          <label className="block text-sm text-gray-900 font-bold  mb-2">আপনার বার্তা</label>
          <textarea
            name="message"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            rows="5"
            placeholder="এখানে আপনার বার্তা লিখুন"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full text-white font-bold text-md bg-[#2746F1] py-3 mt-6 px-4 rounded-md hover:bg-blue-600 transition"
        >
          বার্তা পাঠান
        </button>
      </form>
    </div>
      </div>
            
        
      
      {/* form end */}

      <div className='-bottom-[90%] absolute grid grid-cols-3 items-center'>
        <div className='text-center'>
          <spana className="p-5 bg-slate-400 inline-block rounded-lg"><MdEmail /></spana> 
          <h1>Email us:</h1>
          <p className=''>Email us for general queries, including marketing and partnership opportunities.</p>
          <a href='hello@flowbite.com' className='text-blue-600'>hello@flowbite.com</a>


        </div>

        <div className='text-center'>
          <spana className="p-5 bg-slate-400 inline-block rounded-lg"><MdEmail /></spana> 
          <h1>Email us:</h1>
          <p className=''>Email us for general queries, including marketing and partnership opportunities.</p>
          <a href='hello@flowbite.com' className='text-blue-600'>hello@flowbite.com</a>


        </div>


        <div className='text-center'>
          <spana className="p-5 bg-slate-400 inline-block rounded-lg"><MdEmail /></spana> 
          <h1>Email us:</h1>
          <p className=''>Email us for general queries, including marketing and partnership opportunities.</p>
          <a href='hello@flowbite.com' className='text-blue-600'>hello@flowbite.com</a>

         
        </div>
       
      </div>
      
      </div>
    );
};

export default page;