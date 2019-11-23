import React,{Component} from 'react';
import accounting from 'accounting';
import '../App.css';
import loading from '../puff.svg'

class Results extends Component{
    constructor(props){
        super(props);
        this.state = {
            total_amount:-1,
            bad_luck_amount:-1
        }
    }
    findTotal =()=>{
        let stock_data = this.props.stock_data;
        if(Object.keys(stock_data).length > 0){
            let dates = Object.keys(stock_data);
            let cur_price = stock_data[dates[0]];
            let first_price = stock_data[dates[dates.length-1]];

            let amt_shares = this.props.amt/first_price;
            let total_money = Math.floor(amt_shares * cur_price); 
            let total_money_formatted = accounting.formatMoney(total_money)
            
            return( 
                <div>
                    <h1>If you invested {this.props.amt} in {this.props.ticker} you would have:</h1>
                    <h1>{total_money_formatted}</h1>
                </div>
            )
        }else{
            return(
                <img 
                    src={loading}
                    alt="loading"
                />
            )
        }
    }
    findHighest =() =>{        
        let stock_data = this.props.stock_data;
        if(Object.keys(stock_data).length>0){
            let dates = Object.keys(stock_data);
            var highest = Math.max.apply(null, dates.map(function(x){return stock_data[x]}));
            var highest_match = dates.filter(function(y){return stock_data[y] === highest});    
            let highest_match_index = -1;
            console.log(highest_match);

            for(let i = 0; i<dates.length-1; i++){
                console.log(dates[i]);
                if(dates[i] == highest_match){
                    highest_match_index = i;
                    break;
                }
            }
            console.log(highest_match_index);
            let post_high_dates = dates.slice(0, highest_match_index);
            var lowest = Math.min.apply(null, post_high_dates.map(function(x){return stock_data[x]}));
            var lowest_match = dates.filter(function(y){return stock_data[y] === lowest});    

            let amt_shares = this.props.amt/highest;
            let total_money = Math.floor(amt_shares * lowest); 
            let total_money_formatted = accounting.formatMoney(total_money)

            return (
                <div>
                    <h1>If you bought at the highest price of {highest} at {highest_match}</h1>
                    <h1>and then sold at the lowest price after of {lowest} at {lowest_match} you would have</h1>
                    <h1>{total_money_formatted}</h1>
                </div>
            )
        }else{
            return(
                <img 
                    src={loading}
                    alt="loading"
                />
            )
        }
    }
    findLowest = () =>{
        let stock_data = this.props.stock_data;
        if(Object.keys(stock_data).length>0){
            let dates = Object.keys(stock_data);
            var lowest = Math.min.apply(null, dates.map(function(x){return stock_data[x]}));
            var lowest_match = dates.filter(function(y){return stock_data[y] === lowest});    
            let lowest_match_index = -1;

            for(let i = 0; i<dates.length-1; i++){
                if(dates[i] == lowest_match){
                    lowest_match_index = i;
                    break;
                }
            }

            let post_low_dates = dates.slice(0, lowest_match_index);

            var highest = Math.max.apply(null, post_low_dates.map(function(x){return stock_data[x]}));
            var highest_match = dates.filter(function(y){return stock_data[y] === highest});    

            let amt_shares = this.props.amt/lowest;
            let total_money = Math.floor(amt_shares * highest); 
            let total_money_formatted = accounting.formatMoney(total_money)

            return (
                <div>
                    <h1>If you bought at the lowest price of {lowest} at {lowest_match}</h1>
                    <h1>and then sold at the highest price after of {highest} at {highest_match} you would have</h1>
                    <h1>{total_money_formatted}</h1>
                </div>
            )
        }else{
            return(
                <img 
                    src={loading}
                    alt="loading"
                />
            )
        }

    }
    render(){
        return(
            <div>                
                <this.findTotal/>            
                <this.findHighest/>
                <this.findLowest/>            
            </div>
        )
    }
}
export default Results