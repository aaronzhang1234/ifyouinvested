import React,{Component} from 'react';
import axios from 'axios'
import AsyncSelect from 'react-select/async'
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
    async searchFor(evt){
        if(evt!==""){
            let keyword = evt;
            let av_key = "L2JPMX2ZDKA2DFUY";
            let av_search_url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+keyword+"&apikey="+av_key; 
            let search_result = await axios.get(av_search_url)
            let search_results =[];
            let search_length = Object.keys(search_result.data["bestMatches"]).length-1;
            for(let i = 0; i < search_length; i++){
                let current_search = search_result.data["bestMatches"][i];
                let ticker = current_search["1. symbol"];
                let name = current_search["2. name"];
                search_results.push({value:ticker, label:name+"("+ticker+")"});
            }
            console.log(search_results);
            return search_results;
        }    
    };
    render(){
        return(
            <div>
                <AsyncSelect 
                    cacheOptions 
                    defaultOptions
                    onChange ={this.getResults}
                    loadOptions={this.updateResults}
                />  
            </div>
        )
    }
    getResults=(evt)=>{
        console.log(evt);
        this.props.sendTicker(evt.value);
    }
    updateResults = evt =>
        new Promise(resolve=>{
            clearTimeout(searchTimer);
            searchTimer = setTimeout(()=>{
                resolve(this.searchFor(evt));
            }, 2000);
        });
}
export default SearchBar