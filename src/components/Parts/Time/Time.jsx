import moment from "moment";
import "./Time.scss";
function Time() {
  return (
    <div className="widget whitish low-opacity wrapper">
      <div className="snow layer1 a"></div>
     <div className="snow layer1"></div> 
     <div className="snow layer2 a"></div>
     <div className="snow layer2"></div>
     <div className="snow layer3 a"></div>
     <div className="snow layer3"></div>
      <div
        className="bg-image"
        style={{
          backgroundImage: `url(https://i.postimg.cc/tChmsCDn/image.jpg})`,
        }}
      ></div>
      <div className="date-time d-flex flex-column">
        <div className="realtime">
          <span id="hours">{moment().format("LT")}</span>
        </div>
        <span id="date">{moment().format("LL")}</span>
      </div>
    </div>
  );
}

export default Time;
