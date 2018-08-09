import { connect } from "react-redux";
import Home from "../components/Home";
import {
  getChartData,
  selectStock,
  toggleNumStocksToShow,
  toggleScale
} from "../module/home";

const mapStateToProps = (state) => ({
  stockData: state.home.stockData,
  selectedStock: state.home.selectedStock,
  numberOfStocks: state.home.numberOfStocks,
  scale: state.home.scale,
  loading: state.home.loading
});

const mapDispatchToProps = {
  getChartData,
  selectStock,
  toggleNumStocksToShow,
  toggleScale
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);