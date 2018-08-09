import React, { Component } from "react";

//Components
import SideMenu from "./SideMenu";

import "./HomeStyles.css";

//default constants
const xPadding = 30;
const yPadding = 30;
const maxY = 200;

class HomePage extends Component {
  componentDidMount() {
    this.props.getChartData();
  }
  componentDidUpdate(prevProps, prevState){
    if (prevProps.stockData !== this.props.stockData){
      this.drawOnCanvas();
    }
    if (prevProps.numberOfStocks !== this.props.numberOfStocks){
      this.props.getChartData();
    }

  }
  drawOnCanvas() {
    if (Array.isArray(this.props.stockData) || this.props.stockData.length) {

      const { stockData, numberOfStocks} = this.props;

      console.log("drawing", stockData.length);
      //get canvas from ref
      const graph = this.refs.canvas;

      //to draw to 2d
      const ctx = this.refs.canvas.getContext("2d");

      ctx.clearRect(0, 0, graph.width, graph.height);

      const data = stockData;

      if (numberOfStocks !== "all"){
        data.length = 10;
      }
      //shorten array to for visibilty purposes

      //console.log("msft", Object.keys(msft))
      //console.log("graph", this.refs.canvas.height)

      //draw graph outline
      ctx.beginPath();
      ctx.moveTo(xPadding, 0);
      ctx.lineTo(xPadding, graph.height - yPadding);
      ctx.lineTo(graph.width, graph.height - yPadding);
      ctx.stroke();

      //populate x axis with the dates
      data.map((obj, index)=>{
        //console.log("obj", obj);
        return ctx.fillText(obj.key, this.getXPixel(index, data), graph.height - yPadding + 20);
      });

      //populate y axis with numbers from 1 to 200 in multiples of 10
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for (var i = 0; i < maxY; i += 10) {
        ctx.fillText(i, xPadding - 10, this.getYPixel(i));
      }

      /**stoke line on graph for low just some guides for my coding purposes
      ctx.strokeStyle = '#f00';
      ctx.beginPath();
      console.log("first low", data[0]["3. low"]);
      ctx.moveTo(this.getXPixel(0, data), this.getYPixel(data[0]["3. low"]));

      for(var i = 1; i < data.length; i ++) {
        ctx.lineTo(this.getXPixel(i, data), this.getYPixel(data[i]["3. low"]));
      }
      ctx.stroke();

      //dots
      //ctx.fillStyle = '#333';

      //////Low ended

      //stoke line on graph for high just some guides for my coding purposes
      ctx.strokeStyle = '#00FF00';
      ctx.beginPath();
      console.log("first high", data[0]["2. high"]);
      ctx.moveTo(this.getXPixel(0, data), this.getYPixel(data[0]["2. high"]));

      for(var i = 1; i < data.length; i ++) {
        ctx.lineTo(this.getXPixel(i, data), this.getYPixel(data[i]["2. high"]));
      }
      ctx.stroke();
      **/


      //drawing the grid lines => mhhh
      let gridValue = 0;
      const maxValue = graph.width;
      Array(maxValue).fill().map((_) => i * i).forEach((obj, index)=>{
        //console.log("index", index)
        //var gridX = graph.width * (1 - gridValue / maxValue) + 10;
        ctx.strokeStyle = "#eee";
        ctx.beginPath();
        ctx.moveTo(xPadding + gridValue, 0);
        ctx.lineTo(xPadding + gridValue, graph.height - yPadding);
        ctx.stroke();
        gridValue += 10;
      });



      data.map((obj,index)=>{
        if (obj["4. close"] > obj["1. open"]){
          //draw bullish bar
          this.drawBar(ctx, this.getXPixel(index, data), this.getYPixel(obj["2. high"]), 5, (this.getYPixel(obj["3. low"]) - this.getYPixel(obj["2. high"])) , "#00FF00");

          //drall small bullish bars
          this.drawSmallBar(ctx, this.getXPixel(index, data), this.getYPixel(obj["1. open"]), 10, 5, "#00FF00", -5);
          this.drawSmallBar(ctx, this.getXPixel(index, data), this.getYPixel(obj["4. close"]), 10, 5, "#00FF00", 5);
        } else {
          //draw bearish bar
          this.drawBar(ctx, this.getXPixel(index, data), this.getYPixel(obj["2. high"]), 5, (this.getYPixel(obj["3. low"]) - this.getYPixel(obj["2. high"])) , "#f00");

          //draw small bearish bars
          this.drawSmallBar(ctx, this.getXPixel(index, data), this.getYPixel(obj["1. open"]), 10, 5, "#f00", -5);
          this.drawSmallBar(ctx, this.getXPixel(index, data), this.getYPixel(obj["4. close"]), 10, 5, "#f00", 5);
        }

      });

    }

  }

  drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    ctx.restore();
  }

  drawSmallBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color, addPadding){
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX + addPadding,upperLeftCornerY,width,height);
    ctx.restore();
  }

  drawLine(ctx, startX, startY, endX, endY,color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.restore();
  }

  /**getMaxY() {
    var max = 0;

    for(var i = 0; i < data.values.length; i ++) {
        if(data.values[i].Y > max) {
            max = data.values[i].Y;
        }
    }

    max += 10 - max % 10;
    return max;
  }**/
  getXPixel(val, dataArray) {
    const graph = this.refs.canvas;
    return ((graph.width - xPadding) / dataArray.length) * val + (xPadding * 1.5);
  }

  getYPixel(val) {
    const graph = this.refs.canvas;
    return graph.height - (((graph.height - yPadding) / maxY) * val) - yPadding;
  }

  render() {
    const stockList = [
      "MSFT",
      "AAPL",
      "INTC"
    ];
    const {
      selectStock,
      scale,
      selectedStock,
      toggleNumStocksToShow,
    } = this.props;
    return (
      <div className="row wrapper">
        <div className="col-xs-4">
          <SideMenu stockList={stockList} selectStock={selectStock} selectedStock={selectedStock}/>
        </div>
        <div className="col-xs-6">
          <div className={`canvasWrapper ${(scale === 2) ? "scroll" : ""}`}>
            <canvas id="canvas" ref="canvas" width={800} height={600}/>
          </div>
        </div>
        <div className="col-xs-2">
          <h6>For visibilty toggle how much data to show</h6>
          <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group mr-2" role="group" aria-label="First group">
              <button type="button" className="btn btn-secondary" onClick={()=>toggleNumStocksToShow(10)}>Show 10</button>
            </div>
            <div className="btn-group mr-2" role="group" aria-label="Second group">
              <button type="button" className="btn btn-secondary" onClick={()=>toggleNumStocksToShow("all")}>Show All</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;