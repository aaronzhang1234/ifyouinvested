import React,{Component} from 'react';
import '../css/MoneyBar.css'
class MoneyBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            amt:1000,
            money_length:4
        }
    }
    render(){
        return(
            <div id="money_div">
              <h1 id="money_sign">$</h1>
              <input 
                value ={this.state.amt} onChange={evt=>this.updateAmt(evt)}
                id="amt_money"  
                maxLength="15"
                size={this.state.money_length +1}
                type="text"
                autoFocus="autofocus"
              />
            </div>
        )
    }
    updateAmt = (evt) =>{
        let amount = evt.target.value;

        this.setState({
            money_length:amount.length,
            amt:amount
        });
        this.props.sendAmt(amount);
    }
}
export default MoneyBar