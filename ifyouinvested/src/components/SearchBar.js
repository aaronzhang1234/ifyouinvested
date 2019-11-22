import React,{Component} from 'react';
import axios from 'axios'
import Select from 'react-select'
import './SearchBar.css'
let searchTimer;
class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            ticker:"",
            search_results:[]
        }
    }
    searchFor=()=>{
        if(this.state.ticker!==""){
            let keyword = this.state.ticker;
            let av_key = "L2JPMX2ZDKA2DFUY";
            let av_search_url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+keyword+"&apikey="+av_key; 
            axios.get(av_search_url)
            .then(search_result=>{
                this.state.search_results =[];
                let search_length = Object.keys(search_result.data["bestMatches"]).length-1;
                for(let i = 0; i < search_length; i++){
                    let current_search = search_result.data["bestMatches"][i];
                    let ticker = current_search["1. symbol"];
                    let name = current_search["2. name"];
                    this.state.search_results.push({value:ticker, label:name+"("+ticker+")"});
                }
                console.log(this.state.search_results);
            });
        }
    }
    render(){
        return(
            <div>
                <Select
                    options={this.state.search_results}
                    placeholder="Select your stock"
                    onChange={evt=>this.getResults(evt)}
                    onInputChange={evt=>this.updateResults(evt)}
                />                
            </div>
        )
    }
    getResults=(evt)=>{
        console.log(evt);
    }
    updateResults = (evt) =>{
        clearTimeout(searchTimer);
        searchTimer = setTimeout(this.searchFor, 5000);
        this.setState({
            ticker:evt
        });
  }

}
export default SearchBar