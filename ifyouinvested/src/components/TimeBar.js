import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
class TimeBar extends Component{
    constructor(props){
        super(props);
        this.state = {            
            from_date:null,
            to_date:null
        }
    }
    isWeekday = date => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };
    render(){
        return(
            <div>
                <h1>From</h1>
                <DatePicker
                    selected={this.state.from_date}                
                    onChange={this.handleFromChange}
                    minDate={this.props.first_date}
                    maxDate={this.state.to_date==null?this.props.last_date:this.state.to_date}
                    filterDate={this.isWeekday}
                />
                <h1>To</h1>
                <DatePicker
                    selected={this.state.to_date}
                    onChange={this.handleToChange}
                    minDate={this.state.from_date==null?this.props.first_date:this.state.from_date}
                    maxDate={this.props.last_date}
                    filterDate={this.isWeekday}
                />
            </div>
        )
    }
    handleFromChange=(date)=>{
        this.props.sendFrom(date);
        this.setState({
            from_date:date
        })
    }
    handleToChange=(date)=>{
        console.log("date");
        this.props.sendTo(date);
        this.setState({
            to_date:date
        })
    }
}
export default TimeBar
