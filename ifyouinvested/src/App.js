import React,{Component} from 'react';
import Results from './components/Results.js'
import SearchBar from './components/SearchBar.js'
import MoneyBar from './components/MoneyBar.js'
import axios from 'axios';
import loading from './puff.svg'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      show_input:true,
      ticker:"",
      amt:"",
      current_price:"",
      ipo_price:"",
    }
  }
  getStock = () =>{ 
    this.setState({
      show_input:false
    });

    let av_key = "L2JPMX2ZDKA2DFUY";
    let quandl_key = "dmJpQuks3_qwKAmRBVJP";

    let av_url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+this.state.ticker+"&interval=60min&outputsize=compact&apikey="+av_key;
    let quandl_url = "https://www.quandl.com/api/v3/datasets/WIKI/"+this.state.ticker+"/data.json?api_key="+quandl_key;

    axios.get(av_url)
    .then(av_response=>{
      let av_data = av_response.data["Time Series (60min)"];
      let current_data = av_data[Object.keys(av_data)[0]];
      let current_price = current_data["2. high"];
      this.setState({
        current_price:current_price
      });
    })
    .catch(error=>{
      console.log(error);
    })

    axios.get(quandl_url)
    .then(quandl_response=>{
      let quandl_data = quandl_response.data["dataset_data"]["data"];
      let ipo_data = quandl_data[Object.keys(quandl_data).length-1];
      let ipo_opening = ipo_data[8];
      this.setState({
        ipo_price:ipo_opening
      });
    })
    .catch(error=>{
      console.log(error)
    })

  } 
  render(){
    return(
      <div className="App">
        <header className="App-header">
          <div 
           className ={this.state.show_input ? "input_div" : "hidden"} 
          >
            <h1>HOW MUCH IS A</h1>
              <MoneyBar sendAmt={this.getAmt}/>
            <h1> INVESTMENT IN </h1>
              <SearchBar sendTicker={this.getTicker}/>            
            <h1> BOUGHT AT  </h1>
            <h1> WORTH NOW? </h1>
            <button onClick={this.getStock}>
              Press Button for Stock
            </button>
          </div>
          <div
            className={!((this.state.ipo_price)&&(this.state.current_price))&&(!this.state.show_input) ? "":"hidden"}
          >
            <img src={loading}></img>
          </div>
          <div
            className={this.state.ipo_price&&this.state.current_price?"":"hidden"}
          >       
            <Results
              ticker={this.state.ticker}
              amt={this.state.amt}
              ipo_price={this.state.ipo_price}
              current_price={this.state.current_price}/>
          </div>
        </header>
      </div>
    )
  }
  getAmt=(amt)=>{
    this.setState({
      amt:amt
    })
  }
  getTicker=(ticker)=>{
    this.setState({
      ticker:ticker
    })
  }
}

export default App;
