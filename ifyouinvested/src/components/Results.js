import React,{Component} from 'react';

class Results extends Component{
    constructor(props){
        super(props);
        this.state = {
            total_amount:0
        }
    }
    findTotal =()=>{
        let amt_shares = this.props.amt/this.props.ipo_price;
        let total_money = Math.floor(amt_shares * this.props.current_price); 
        return <h1>{total_money}</h1>
    }
    render(){
        return(
            <div>
                <h1>If you invested {this.props.amt} in {this.props.ticker} you would have:</h1>
                <div>
                    <this.findTotal/>
                </div>
            </div>
        )
    }
}
export default Results