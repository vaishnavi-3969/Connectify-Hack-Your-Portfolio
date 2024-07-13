import React from 'react';

const Reviews = () => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="bg-[#A6CFD5] flex justify-center items-center min-h-screen p-10">
      <div className="md:w-3/5 w-3/4 px-10 flex flex-col gap-2 p-5 bg-[#0D0221] text-white">
        <h1 className="py-5 text-lg">Testimonials</h1>
        <div className="flex bg-[#26408B] bg-opacity-20 border border-gray-200 rounded-md">
          <ion-icon className="py-4 p-3" name="search-outline"></ion-icon>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Testimonials"
            className="p-2 bg-transparent focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full py-2">
          <span className="px-2 p-1 hover:bg-blue-400 bg-[#0D0221] bg-opacity-30">Networking</span>
          <span className="px-2 p-1 hover:bg-blue-400 bg-[#0D0221] bg-opacity-30">Mentorship</span>
          <span className="px-2 p-1 hover:bg-blue-400 bg-[#0D0221] bg-opacity-30">Access</span>
          <span className="px-2 p-1 hover:bg-blue-400 bg-[#0D0221] bg-opacity-30">Features</span>
          <span className="px-2 p-1 hover:bg-blue-400 bg-[#0D0221] bg-opacity-30">Value</span>
          <span className="px-2 p-1 hover:bg-blue-400 bg-[#0D0221] bg-opacity-30">Support</span>
        </div>

        {/* Item Container */}
        <div className="flex flex-col gap-3 mt-14">
          <div className="flex flex-col gap-4 bg-[#26408B] p-4">
            {/* Profile and Rating */}
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="w-7 h-7 text-center rounded-full bg-red-500">B</div>
                <span>Brad Pitt</span>
              </div>
              <div className="flex p-1 gap-1 text-orange-300">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-half"></ion-icon>
              </div>
            </div>

            <div>
              This platform has significantly improved my portfolio. The projects and feedback are incredibly valuable!
            </div>

            <div className="flex justify-between">
              <span>{currentDate}</span>
              <button className="p-1 px-2 bg-[#0D0221] hover:bg-[#0F084B] border border-[#0F084B] bg-opacity-60">
                <ion-icon name="share-outline"></ion-icon> Share
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-[#26408B] p-4">
            {/* Profile and Rating */}
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="w-7 h-7 text-center rounded-full bg-yellow-500">A</div>
                <span>Angelina Jolie</span>
              </div>
              <div className="flex p-1 gap-1 text-orange-300">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
              </div>
            </div>

            <div>
              The AI-driven resume analysis and job description summarization are game-changers. Highly recommend this to everyone looking to boost their career!
            </div>

            <div className="flex justify-between">
              <span>{currentDate}</span>
              <button className="p-1 px-2 bg-[#0D0221] hover:bg-[#0F084B] border border-[#0F084B] bg-opacity-60">
                <ion-icon name="share-outline"></ion-icon> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
