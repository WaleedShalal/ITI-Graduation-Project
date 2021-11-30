import React from "react";
import timeImage from "./time-clock.png";
import Background from "./time-bg.jpg";
import "./Time.scss";
function Time() {
  const d = new Date();
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return (
    <div className="widget whitish low-opacity">
      <img src={timeImage} alt="" />
      <div
        className="bg-image"
        style={{ backgroundImage: `url(${Background})` }}
      ></div>
      <div className="date-time">
        <div className="realtime">
          <span id="hours">
            {d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()}
          </span>
          <span id="point">:</span>
          <span id="min">{d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}</span>
        </div>
        <span id="date">{weekday[d.getDay()]+','+ months[d.getMonth()]+','+d.getFullYear()}</span>
      </div>
    </div>
  );
}

export default Time;
