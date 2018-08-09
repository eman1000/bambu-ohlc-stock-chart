import React from "react";
import "./SideMenuStyles.css";

const SideMenu = ({stockList, selectStock, selectedStock}) => (
  <div id="stockMenu">
    <ul>
      {
        stockList.map((val, index)=>{
          return (
            <li key={index} onClick={()=>selectStock(val)}><a className={(selectedStock === val) ? "active" : ""}>{val}</a></li>
          );
        })

      }
    </ul>
  </div>
);

export default SideMenu;


