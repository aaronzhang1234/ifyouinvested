import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
class TimeBar extends Component{
    constructor(props){
        super(props);
        this.state = {            
        }
    }
    render(){
        return(
            <div>
                <DatePicker/>
            </div>
        )
    }
}
export default TimeBar
