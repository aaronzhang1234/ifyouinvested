import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';
import Results from './components/Results.js'
import SearchBar from './components/SearchBar.js'
import MoneyBar from './components/MoneyBar.js'
import MainPage from './components/MainPage.js'
import './css/App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      show_input:true,
      ticker:null,
      amt:1000,
      stock_data:{},
      av_error:false,
      quandl_error:false
    }
    this.getStock = this.getStock.bind(this);
  }
  async getStock(){ 
    this.setState({
      show_input:false
    });

    let stock_data = {};

    let av_key = "L2JPMX2ZDKA2DFUY";
    let quandl_key = "dmJpQuks3_qwKAmRBVJP";
    let av_url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol="+this.state.ticker+"&outputsize=full&apikey="+av_key;
    let quandl_url = "https://www.quandl.com/api/v3/datasets/WIKI/"+this.state.ticker+"/data.json?api_key="+quandl_key;

    try{
      let av_response = await axios.get(av_url).catch((err)=>{
        console.log(err);
        this.setState({
          av_error:true
        });
      })
      if(av_response){      
        let av_data = av_response.data["Time Series (Daily)"];
        let av_keys = Object.keys(av_data);
        console.log(av_keys[av_keys.length-1]);
        for(let i = 0; i< av_keys.length; i++){
          let day_data = av_data[av_keys[i]]; 
          stock_data[av_keys[i]] = Number(day_data["5. adjusted close"]);
        }
      }  

      let quandl_response = await axios.get(quandl_url).catch((err)=>{
        console.log(err);
        this.setState({
          quandl_error:true
        });
      });

      if(quandl_response){
        let quandl_data = quandl_response.data["dataset_data"]["data"];
        for(let p = 0; p<quandl_data.length-1; p++){
          let quandl_info = quandl_data[p];
          stock_data[quandl_info[0]] = quandl_info[11]; 
        }
      }

      this.setState({
        stock_data:stock_data
      })
    }
    catch(err){
      console.error(err);
      this.setState({
        av_error:true,
        quandl_error:true
      });
    }
  } 
  render(){
    return(
         <Router>
          <Switch>
            <Route path="/hello">
              <MoneyBar/>
            </Route>
            <Route path="/results">
              <Results/>
            </Route>
            <Route path="/">
              <MainPage/>
            </Route>
          </Switch>
        </Router>
    );
  };
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
