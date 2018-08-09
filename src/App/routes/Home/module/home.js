// LIBRARIES
import update from "immutability-helper";
import request from "../../../../utils/requestsWrapper.js";
import constants from "./actionConstants";

const {
  GET_CHART_DATA,
  SELECT_STOCK,
  TOGGLE_NUM_STOCKS_TO_SHOW,
  SCALE,
  TOGGLE_LOADER
} = constants;

//api call to get stock data
export function getChartData(payload){
  return (dispatch, store)=>{
    const { selectedStock } = store().home;
    dispatch(toggleLoader(true));
    // Send a POST request
    request({
      method: "get",
      url: "/query",
      params: {
        function:"TIME_SERIES_DAILY",
        symbol:selectedStock,
        apikey:"PMYSU8X8BFN5TIQD"
      }
    })
      .then((response)=>{
        if(response.Information){
          alert(response.Information);
        }
        dispatch(toggleLoader(false));
        console.log("response", response);
        const dataToReturn = [];
        const msft = response["Time Series (Daily)"];
        Object.keys(msft).map((val)=>{
          dataToReturn.push({key:val, ...msft[val]});
        });
        dispatch({
          type:GET_CHART_DATA,
          payload:dataToReturn.reverse()
        });
      })
      .catch((error)=>{
        dispatch(toggleLoader(false));
        console.log("error", error);

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

//toggle loader
export function toggleLoader(payload){
  return {
    type:TOGGLE_LOADER,
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

//handle toggle loader created by TOGGLE_LOADER
function handleToggleLoader(state, action){
  return update(state, {
    loading:{
      $set:action.payload
    }
  });
}
const ACTION_HANDLERS = {
  GET_CHART_DATA: handleGetChartData,
  SELECT_STOCK: handleSelectStock,
  TOGGLE_NUM_STOCKS_TO_SHOW:handleToggleNumStock,
  SCALE:handleToggleScale,
  TOGGLE_LOADER: handleToggleLoader
};

const initialState = {
  stockData:{},
  selectedStock:"MSFT",
  numberOfStocks:10,
  scale:1,
  loading: false
};

export default function HomeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
