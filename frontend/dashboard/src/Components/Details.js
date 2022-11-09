import React, { useState, useEffect } from "react";
import axios from "axios";

function Details({ username }) {
  const [irr, setIrr] = useState([]);
  const [recc, setRecc] = useState([]);
  const [dis, setDis] = useState([]);
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
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/irrigation",
      data: {
        username: username,
      },
    }).then((e) => {
      setIrr(e.data.result);
    });
    // axios({
    //   method: "post",
    //   url: "http://127.0.0.1:5000/login",
    //   data:{
    //     username: username
    //   }
    // });
  }, [username]);

  return (
    <div className="flex h-[90vh] ml-10 mr-5 mt-5 overflow-auto justify-center items-center gap-10">
      <div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            class="w-[400px] h-[200px]"
            src="https://www.ijraset.com/images/text_version_uploads/imag%201_6047.png"
            alt="Sunset in the mountains"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Crop recommendation</div>
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
                <div className="inline-block bg-green-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-100 mr-2 mb-2">
                  Recommended:{" "}{data.recommend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            class="w-[400px] h-[200px]"
            src="https://vantageuav.com/en-us/wp-content/uploads/sites/3/2022/06/index-3-1024x443.jpg"
            alt="Sunset in the mountains"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Disease Analysis</div>
            <p class="text-gray-700 text-base"> Currently Unavailable</p>
          </div>
        </div>
      </div>
      <div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
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
  );
}

export default Details;
