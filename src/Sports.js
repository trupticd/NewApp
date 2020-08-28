import React,{Component} from "react"
import Card from './card'
import BounceLoader from 'react-spinners/BounceLoader'
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin-left: auto ;
  margin-right: auto ;
  /* margin-bottom: 0 auto ; */
  margin-top:300px;
`;
class Sports extends Component{
  constructor(){
    super();
    this.state = {
      temp:[],
      isLoading:true
    };
  }
  componentDidMount(){
    this.props.switchFunction()
    setTimeout(() => this.setState({ isLoading: false }), 2000);
    fetch('https://test-deploy2506.wl.r.appspot.com/sports')
    .then(results => {
      return results.json();
    }).then(data => {
      let temp = data.results.map((news) => {
        let newsShare = ""
        let setname = ""
        if(news.hasOwnProperty("url")){
          newsShare = news.url
        }
        else{
          newsShare = "http://www.google.com"
        }
        let imageVal =""
        if(news.multimedia===null){
          imageVal = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
        }
        else{
          for(var i=0;i<news.multimedia.length;i++){
            if(news.multimedia[i].width>=2000){
              imageVal = news.multimedia[i].url
              break
            }
          }
          if(imageVal===""){
            imageVal = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
          }
        }
        // console.log("this is imageVal",imageVal)
        if(news.section==="sports" || news.section==="Sports"){
          setname="sports"
        }
        else{
          setname="other"
        }
        return(
          <Card title={news.title}
                img={imageVal}
                section={news.section}
                date={news.published_date}
                desc={news.abstract}
                theme=""
                name={setname}
                shareURL={newsShare}
                cardtype="ny"
                newsId={newsShare}
                api="onws5eIQAm992vQD8VgYf9b8nwtGJUe1"
                type="nytimes" />
        )
      })
      this.setState({temp:temp});
      console.log("data",this.state.temp);
    })
  }

  render(){
    if(this.state.isLoading) {
      return (
        <div>
          <BounceLoader css={override} color="#005BD4" size="32px"/>
          <h5 className="loading">Loading</h5>
        </div>
      ); // render the loading component
    }
    return(
      <div>{this.state.temp}</div>
    )
  }
}
export default Sports
