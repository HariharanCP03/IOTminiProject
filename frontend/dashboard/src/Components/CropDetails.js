import React, { useState, useEffect } from "react";
import axios from "axios";

function Details({ username ,backfromcroprecom}) {
  // const [irr, setIrr] = useState([]);
  const [recc, setRecc] = useState([]);
  // const [dis, setDis] = useState([]);
  const [names, setNames] = useState([
    "N",
    "P",
    "K",
    "Temperature",
    "Humidity",
    "pH",
    "Rainfall",
  ]);

  useEffect(() => {
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/get_recommend",
      data: {
        username: username,
      },
    }).then((e) => {
      setRecc(e.data.result);
    });
  }, [username]);
  return (
    <div className="crop_recom_bg">
      <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={backfromcroprecom}>Back</button>
      <div className="flex h-[100vh] overflow-auto justify-center items-center gap-10" >
        <div>
          <div class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-300 p-5">
            <img
              class="w-[400px] h-[200px]"
              src="https://www.ijraset.com/images/text_version_uploads/imag%201_6047.png"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2 text-center">Crop recommendation</div>
              <p class="text-gray-700 text-base"></p>
            </div>
            <div className="flex flex-col gap-10">
              {recc.map((data) => (
                <div>
                  {data.data.map((d, i) => (
                    <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {names[i]} : {" "} {d}
                    </div>
                  ))}
                  <br></br>
                  <div className="inline-block bg-green-600 rounded-full m-5 px-10 py-1 text-sm font-semibold text-gray-100">
                    Recommended:{" "}{data.recommend}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
