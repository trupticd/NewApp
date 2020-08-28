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

class Technology extends Component{
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
    fetch('https://test-deploy2506.wl.r.appspot.com/guardiantechnology')
    .then(results => {
      return results.json();
    }).then(data => {
      let temp = data.response.results.map((news) => {
        let imageVal = ""
        let newsShare = ""
        if(news.hasOwnProperty("webUrl")){
          newsShare = news.webUrl
        }
        else{
          newsShare = "http://www.google.com"
        }
        if(news.blocks.hasOwnProperty("main")){
          if(news.blocks.main.elements[0].assets.length===0){
            imageVal = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
          }
          else{
            let len
            len = news.blocks.main.elements[0].assets.length
            imageVal = news.blocks.main.elements[0].assets[len-1].file
          }
        }
        else{
          imageVal = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
        }
        // console.log("this is imageVal",imageVal)
        return(
          <Card title={news.webTitle}
                img={imageVal}
                section={news.sectionId}
                date={news.webPublicationDate}
                desc={news.blocks.body[0].bodyTextSummary}
                name="technology"
                shareURL={newsShare}
                newsId={news.id}
                api="f7cd7c4a-6561-42e3-9c22-61896a27a48d"
                cardtype="guardian" />
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
          <BounceLoader css={override} color="#4A90E2" size="32px"/>
          <h5 className="loading">Loading</h5>
        </div>
      ); // render the loading component
    }
    return(
      <div>{this.state.temp}</div>
    )
  }
}
export default Technology
