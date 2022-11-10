import React from "react";

function MainPage({ pageChanger ,pageChangerCroprecom,pageChangerIrrDetails, imageSetter, image}) {
  console.log(image);
  return (
    <div className="flex flex-col h-[90vh] ml-10 mr-5 mt-5 overflow-auto">
      <div className="w-[100wh] flex-[0.3] ">
        <img
          src="https://www.theindiaforum.in/sites/default/files/styles/cover_story/public/field/image/2022/06/21/ramkumar-radhakrishnan-wikimedia-1622193304-1622193304.jpeg"
          alt="farming"
        ></img>
      </div>
      <div className="flex justify-between items-center mt-10 gap-8 flex-[0.7] scale-x-100 ">
        
        <a class="flex flex-col items-center bg-white rounded-lg hover:scale-95 border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="object-cover w-full h-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwye5x8TLEMBbWkEjlFRQqJlvRJBPBP2VQxQ&usqp=CAU" alt=""/>
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">CROP RECOMMENDATION</h5>
                <button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800" onClick={pageChangerCroprecom}>
              Crop recommendation</button>
            </div>
        </a>
        <a class="flex flex-col items-center bg-white rounded-lg hover:scale-95 border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://www.danfoss.com/media/6541/irrigation_new.jpg?anchor=center&mode=crop&width=1050" alt=""/>
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">IRRIGATION</h5>
                <button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800" onClick={pageChangerIrrDetails}>
                Irrigation</button>
            </div>
        </a>
        <a class="flex flex-col items-center hover:scale-95 bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://cdn.britannica.com/90/94190-050-C0BA6A58/Cereal-crops-wheat-reproduction.jpg" alt=""/>
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">DISEASE ANALYSIS</h5>
                <button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800" onClick={pageChanger}>
              Disease Analysis</button>
              <input className="rounded-lg text-white "
                type="file" 
                id="file" 
                name="file" 
                accept="image/*" 
                required
                value={image}
                onChange = {(e) => {
                  imageSetter(e.target.files[0])
                  console.log(e.target.files)
                }}
              ></input>
            </div>
        </a>
     
      </div>
    </div>
  );
}

export default MainPage;
