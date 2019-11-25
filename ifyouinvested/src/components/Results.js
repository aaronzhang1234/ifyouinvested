import React,{Component} from 'react';
import accounting from 'accounting';
import './Results.css';
import TimeBar from './TimeBar.js';
import loading from '../puff.svg'

class Results extends Component{
    constructor(props){
        super(props);
        this.state = {
            total_amount:-1,
            first_date: null,
            last_date: null,
            from_date:new Date(),
            to_date:new Date()            
        }
    }
    componentDidUpdate=()=>{
        if(this.state.first_date==null){
            this.stock_range();
        }
    }
    findTotal =()=>{
        let stock_data = this.props.stock_data;
        let dates = Object.keys(stock_data);

        let cur_price = stock_data[dates[0]];

        let first_date = dates[dates.length-1];
        let first_price = stock_data[dates[dates.length-1]];

        let amt_shares = this.props.amt/first_price;
        let total_money = Math.floor(amt_shares * cur_price); 
        let total_money_formatted = accounting.formatMoney(total_money)
        
        return( 
            <div>
                <h1>If you invested {this.props.amt} in {this.props.ticker} at {first_date} you would have:</h1>
                <h1>{total_money_formatted}</h1>
            </div>
        )
    }
    findHighest =() =>{        
        let stock_data = this.props.stock_data;
        let dates = Object.keys(stock_data);

        var highest = Math.max.apply(null, dates.map(function(x){return stock_data[x]}));
        var highest_match = dates.filter(function(y){return stock_data[y] === highest});    
        let highest_match_index = -1;

        for(let i = 0; i<dates.length-1; i++){
            if(dates[i] == highest_match){
                highest_match_index = i;
                break;
            }
        }

        if(highest_match_index == 0){
            return(
                <h1>With a price of {highest}, today is the highest the stock price has ever been!</h1>
            )
        } 

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
    }
    findLowest = () =>{
        let stock_data = this.props.stock_data;
        let dates = Object.keys(stock_data);

        var lowest = Math.min.apply(null, dates.map(function(x){return stock_data[x]}));
        var lowest_match = dates.filter(function(y){return stock_data[y] === lowest});    
        let lowest_match_index = -1;


        if(lowest_match_index == 0){
            return(
                <h1>With a price of {lowest}, today is the lowest the stock price has ever been!</h1>
            )
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

    }
    render(){        
        return(
            <React.Fragment>                
                <TimeBar
                    first_date={this.state.first_date}
                    last_date={this.state.last_date}
                    sendFrom = {this.getFrom}
                    sendTo = {this.getTo}
                />                
                <div className={Object.keys(this.props.stock_data).length>0?"":"hidden"}>                
                    <this.findTotal/>            
                    <this.findHighest/>
                    <this.findLowest/>            
                </div>

                <div className={Object.keys(this.props.stock_data).length>0?"hidden":""}>
                    <img 
                        src={loading}
                        alt="loading"
                    />
                </div>
                <h1 className={this.props.av_error?"":"hidden"}>
                    Error getting stock data
                </h1>
            </React.Fragment>
        )
    }
    stock_range=()=>{
        let stock_data = this.props.stock_data;
        let dates = Object.keys(stock_data);
        if(dates.length>0){
            let first_date = this.convert_string_to_date(dates[dates.length-1]);
            let last_date = this.convert_string_to_date(dates[0]);
            this.setState({
                first_date:first_date,
                last_date:last_date
            })
            return;
        }
    } 
    convert_string_to_date=(date)=>{
        let date_array = date.split("-");
        console.log(date_array)
        let month = Number(date_array[1])-1
        return(new Date(date_array[0], month, date_array[2]));
    }
    convert_date_to_string=(date)=>{
        let year = (date.getFullYear()).toString();
        let month = (date.getMonth()+1).toString();
        if(month.length<=1){
            month = "0"+month;
        }
        let day = (date.getDate()).toString();
        if(day.length<=1){
            day = "0"+day;
        }
        return ([year,month,day].join('-'));
    }
    getFrom=(from_date)=>{
        this.setState({
            from_date:from_date
        })
    }
    getTo=(to_date)=>{
        this.setState({
            to_date:to_date
        })
        let to_string = this.convert_date_to_string(to_date);
        console.log(to_string);
        let index = this.findDateIndex(to_string);
        console.log(index);
    }
    findDateIndex=(date)=>{
        let stock_data = this.props.stock_data;
        let dates = Object.keys(stock_data);
        let match_index
        for(let i = 0; i<dates.length-1; i++){
            if(dates[i] == date){
                match_index = i;
                break;
            }
        }
        return(match_index);
    }
}
export default Results