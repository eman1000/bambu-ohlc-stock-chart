// LIBRARIES
import update from "immutability-helper";
import request from "../../../../utils/requestsWrapper.js";
import constants from "./actionConstants";

const {
  GET_CHART_DATA,
  SELECT_STOCK,
  TOGGLE_NUM_STOCKS_TO_SHOW,
  SCALE
} = constants;

//api call to get stock data
export function getChartData(payload){
  return (dispatch, store)=>{
    const { selectedStock } = store().home;
    //dispatch(toggleLoader(true));
    // Send a POST request
    request({
      method: "get",
      url: "/query",
      params: {
        function:"TIME_SERIES_MONTHLY",
        symbol:selectedStock,
        apikey:"PMYSU8X8BFN5TIQD"
      }
    })
      .then((response)=>{
        console.log("response", response);
        const dataToReturn = [];
        const msft = response["Monthly Time Series"];
        Object.keys(msft).map((val)=>{
          dataToReturn.push({key:val, ...msft[val]});
        });
        dispatch({
          type:GET_CHART_DATA,
          payload:dataToReturn.reverse()
        });
      })
      .catch((error)=>{

      });
  };
}

//select a stock
export function selectStock(payload){
  return (dispatch, store)=>{
    dispatch({
      type:SELECT_STOCK,
      payload
    });
    dispatch(getChartData());
  };
}


//switch the number of stocks to show
export function toggleNumStocksToShow(payload){
  return {
    type:TOGGLE_NUM_STOCKS_TO_SHOW,
    payload
  };
}

//scale
export function toggleScale(payload){
  return {
    type:SCALE,
    payload
  };
}

//////////////////
//ACTION HANDLERS
//////////////////

//handle get stock data from api created by GET_CHART_DATA
function handleGetChartData(state, action){
  return update(state, {
    stockData:{
      $set: action.payload
    }
  });
}

//handle select stock created by SELECT_STOCK
function handleSelectStock(state, action){
  return update(state, {
    selectedStock:{
      $set:action.payload
    }
  });
}

//handle toggle the number of stocks to show created by TOGGLE_NUM_STOCKS_TO_SHOW
function handleToggleNumStock(state, action){
  return update(state, {
    numberOfStocks:{
      $set:action.payload
    }
  });
}

//handle toggle scale SCALE
function handleToggleScale(state, action){
  return update(state, {
    scale:{
      $set:action.payload
    }
  });
}
const ACTION_HANDLERS = {
  GET_CHART_DATA: handleGetChartData,
  SELECT_STOCK: handleSelectStock,
  TOGGLE_NUM_STOCKS_TO_SHOW:handleToggleNumStock,
  SCALE:handleToggleScale
};

const initialState = {
  stockData:{},
  selectedStock:"MSFT",
  numberOfStocks:10,
  scale:1
};

export default function HomeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
