import React,{Component} from 'react';
import Results from './components/Results.js'
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      show_button:true,
      ticker:"",
      amt:"",
      current_price:"",
      ipo_price:""
    }
  }
  getStock = () =>{   
    this.setState({
      show_button:false
    });

    let av_url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+this.state.ticker+"&interval=60min&outputsize=compact&apikey=L2JPMX2ZDKA2DFUY" 
    let quandl_url = "https://www.quandl.com/api/v3/datasets/WIKI/"+this.state.ticker+"/data.json?api_key=dmJpQuks3_qwKAmRBVJP";

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
           className ={this.state.show_button ? "input_div" : "hidden"} 
          >
            <input 
              value ={this.state.ticker} onChange={evt=>this.updateTicker(evt)}
              id="stock_ticker" 
              type="text"
            />
            <br/>
            <input 
              value ={this.state.amt} onChange={evt=>this.updateAmt(evt)}
              id="amt_money"  
              type="text"
            />
            <br/>
            <button onClick={this.getStock}>
              Press Button for Stock
            </button>
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
  updateAmt = (evt) =>{
    this.setState({
      amt:evt.target.value
    });
  }
  updateTicker = (evt) =>{
    this.setState({
      ticker:evt.target.value
    });
  }
}

export default App;
