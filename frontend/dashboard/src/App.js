import React, { useState } from "react";
import LoginPage from "./Components/LoginPage";
import MainPage from "./Components/MainPage";
import axios from "axios";
import Details from "./Components/Details";
import CropDetails from"./Components/CropDetails";
import IrrigationDetails from"./Components/IrrigationDetails";

function App() {
  const [isUser, setIsUser] = useState(false);
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [details, setDetails] = useState(false);
  const [cropDetails, setCropDetails] = useState(false);
  const [irrDetails, setIrrDetails] = useState(false);
  const [image, setImage] = useState(null);


  const setter = (data) => {
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/login",
      data: {
        username: data.username,
        password: data.password,
      },
    }).then((e) => {
      if (e.data.result === "true") {
        setIsUser(true);
        setLogin(false);
        setUsername(data.username);
      } else {
        window.location.reload();
        console.log("wrong credentials");
      }
    });
  };

  const pageChanger = () => {
    setDetails(true);
    setIsUser(false);
  };
  const pageChangerCroprecom = () => {
    setCropDetails(true);
    setIsUser(false);
  };
  const pageChangerIrrDetails = () => {
    setCropDetails(false);
    setIrrDetails(true);
    setIsUser(false);
  };
  const  backfromcroprecom= () => {
    setIsUser(true);
    setLogin(false);
    setCropDetails(false);
    setIrrDetails(false);
  };

  return (
    <div>
      <div className="h-[2px] bg-orange-500"></div>
      {isUser && <MainPage pageChanger={pageChanger} 
      pageChangerCroprecom={pageChangerCroprecom} 
      pageChangerIrrDetails={pageChangerIrrDetails} 
      imageSetter={setImage}
      image = {image}
      />}

      {login && <LoginPage setter={setter} />}
      {details && <Details username={username} />}
      {cropDetails && <CropDetails username={username} backfromcroprecom={backfromcroprecom}/>}
      {irrDetails && <IrrigationDetails username={username} backfromcroprecom={backfromcroprecom}/>}
    </div>
  );
}

export default App;
