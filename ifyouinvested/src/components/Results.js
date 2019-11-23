import React,{Component} from 'react';
import accounting from 'accounting'

class Results extends Component{
    constructor(props){
        super(props);
        this.state = {
            total_amount:0
        }
    }
    findTotal =()=>{
        let stock_data = this.props.stock_data;
        let dates = Object.keys(stock_data);
        let cur_price = stock_data[dates[0]];
        let first_price = stock_data[dates[dates.length-1]];

        let amt_shares = this.props.amt/first_price;
        let total_money = Math.floor(amt_shares * cur_price); 
        let total_money_formatted = accounting.formatMoney(total_money)
        
        return <h1>{total_money_formatted}</h1>
    }
    findHighest =() =>{
        let stock_data = this.props.stock_data;
        let dates = Object.keys(stock_data);
        var highest = Math.max.apply(null, dates.map(function(x){return stock_data[x]}));
        var match = dates.filter(function(y){return stock_data[y] == highest});
        
         
        return <h1>{highest} at {match}</h1>
    }
    render(){
        return(
            <div>
                <h1>If you invested {this.props.amt} in {this.props.ticker} you would have:</h1>
                <div>
                    <this.findTotal/>
                </div>
                
                <h1>If you invested {this.props.amt} at the highest point and sold at the lowest point after that you would have:</h1>
                <div>
                    <this.findHighest/>
                </div>
            </div>
        )
    }
}
export default Results