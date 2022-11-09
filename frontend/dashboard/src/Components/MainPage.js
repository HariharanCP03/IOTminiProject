import React from "react";

function MainPage({ pageChanger }) {
  return (
    <div className="flex flex-col h-[90vh] ml-10 mr-5 mt-5 overflow-auto">
      <div className="w-[100wh] flex-[0.3]">
        <img
          src="https://www.theindiaforum.in/sites/default/files/styles/cover_story/public/field/image/2022/06/21/ramkumar-radhakrishnan-wikimedia-1622193304-1622193304.jpeg"
          alt="farming"
        ></img>
      </div>
      <div className="flex justify-between items-center mt-10 gap-8 flex-[0.7]">
        <button
          class="bg-transparent hover:bg-orange-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full h-full"
          onClick={pageChanger}
        >
          Crop recommendation
        </button>
        <button
          class="bg-transparent hover:bg-orange-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full h-full"
          onClick={pageChanger}
        >
          Irrigation Details
        </button>
        <button
          class="bg-transparent hover:bg-orange-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full h-full"
          onClick={pageChanger}
        >
          Disease Analysis
        </button>
      </div>
    </div>
  );
}

export default MainPage;
