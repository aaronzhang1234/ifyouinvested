import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import DropDown from 'react-dropdown';
import './TimeBar.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-dropdown/style.css';
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
        const from_options =[
            {value:this.props.important_dates["IPO"] ,label:"IPO"},
            {value:this.props.important_dates["HIGHEST"] ,label:"Highest"},
            {value:this.props.important_dates["LOWEST"] ,label:"Lowest"}
        ]
        const to_options=[
            {value:this.props.important_dates["CURRENT"] ,label:"Current"},
            {value:this.props.important_dates["NEXT_HIGHEST"] ,label:"Next Highest"},
            {value:this.props.important_dates["NEXT_LOWEST"] ,label:"Next Lowest"}
        ]
        return(
            <div id="time-bar-div">
                <div id="from-bar-div">
                    <h1>From</h1>
                    <DropDown
                        options={from_options}                        
                        placeholder="Select a date to begin"
                        onChange={this.handleFromChange}                        
                    /> 
                    <DatePicker
                        selected={this.state.from_date}                
                        onChange={this.handleFromChange}
                        minDate={this.props.first_date}
                        maxDate={this.state.to_date==null?this.props.last_date:this.state.to_date}
                        filterDate={this.isWeekday}
                    />
                </div>
                <div id="to-bar-div">
                    <h1>To</h1>
                    <DropDown
                        options={to_options}
                        placeholder="Select an ending date"
                        onChange={this.handleToChange}
                    /> 
                    <DatePicker
                        selected={this.state.to_date}
                        onChange={this.handleToChange}
                        minDate={this.state.from_date==null?this.props.first_date:this.state.from_date}
                        maxDate={this.props.last_date}
                        filterDate={this.isWeekday}
                    />
                </div>
            </div>
        )
    }
    handleFromChange=(date)=>{
        let from_value = date["value"]?date["value"]: date;
        this.props.sendFrom(from_value);
        this.setState({
            from_date:from_value
        })
    }
    handleToChange=(date)=>{
        let to_value = date["value"]?date["value"]: date;
        this.props.sendTo(to_value);
        this.setState({
            to_date:to_value
        })
    }
}
export default TimeBar
