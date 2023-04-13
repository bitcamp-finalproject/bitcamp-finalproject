import React, {useState, useEffect} from "react";
import axios from "axios";
import SettingPrompt from "./SettingPrompt"

function AlamSetting(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/alarmSetting")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <div id="setting-feild" style={{ width: "100%", height: "100%",
      color: "white"  
    }}>

      <div style={{ width:"250px", marginLeft: "5%", marginTop: "5%",
        boxSizing: "border-box", borderBottom: "1px solid rgba(255,255,255,0.5)"
      }}>{props.title}</div>
      
      <div style={{width: "100%", height: "100%",
        display: "flex", justifyContent: "center"
      }}>
        <div style={{marginTop:"3%"}}>
        {data.length > 0 && data.map((settingList) => (
          <SettingPrompt key={settingList.typeNo} 
          classKey={settingList.typeNo} 
          data={{typeNo: settingList.typeNo, 
            title: settingList.typeName,
            description: settingList.description,
            rangeState: settingList.memberNo === 0 ? 1 : 2,
            memberNo: settingList.memberNo}}
          settingType={"alarmSetting"} isFlag={true} requestBody={{ typeNo: "", memberNo: ""}} stateArray={[1,2]} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default AlamSetting;
