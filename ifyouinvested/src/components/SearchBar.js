import React,{Component} from 'react';
import axios from 'axios'
import './SearchBar.css'
class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            ticker:""
        }
    }
    render(){
        return(
            <div>
                <input 
                value ={this.state.ticker} onChange={evt=>this.updateTicker(evt)}
                id="stock_ticker" 
                type="text"
                />
            </div>
        )
    }
  updateTicker = (evt) =>{
    let ticker = evt.target.value;
    this.setState({
      ticker:evt.target.value
    });
    this.props.sendTicker(ticker);
  }
}
export default SearchBar