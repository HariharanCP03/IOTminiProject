import React, { useState, useEffect } from "react";
import axios from "axios";

function Details({ username , backfromcroprecom}) {
  const [irr, setIrr] = useState([]);

  useEffect(() => {
    axios({
        method: "post",
        url: "http://127.0.0.1:5000/irrigation",
        data: {
          username: username,
        },
      }).then((e) => {
        setIrr(e.data.result);
      });
    }, [username]);
  return (
    <div className="Irrigation_bg">
      <button type="button" class="py-2.5 px-5 ml-2 mt-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:white dark:bg-white dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={backfromcroprecom}>Back</button>
        <div className="flex h-[100vh] overflow-auto justify-center items-center gap-10" >
      <div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-300">
          <img
            class="w-[400px] h-[200px]"
            src="https://www.agrivi.com/wp-content/uploads/2017/11/wepik-2022513-9459.jpg"
            alt="Sunset in the mountains"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Irrigation</div>
            <div className="flex flex-col gap-10">
              {irr.map((data) => (
                <div>
                  <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Status : {data.status}
                  </div>
                  <div className="inline-block bg-green-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-100 mr-2 mb-2">
                    Time : {data.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Details;
