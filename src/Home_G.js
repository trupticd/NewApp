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
class Home extends Component{
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
    fetch('https://test-deploy2506.wl.r.appspot.com/guardian')
    .then(results => {
      return results.json();
    }).then(data => {
      let temp = data.response.results.map((news) => {
        let imageVal = ""
        let setcolor = ""
        let setTcolor = ""
        let theme = ""
        let setname = ""
        let newsShare = ""
        let parameter = ""
        parameter = news.id
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
        if(news.sectionId==="world" || news.sectionId==="World"){
          setcolor="BlueViolet"
          setTcolor="white"
        }
        else if(news.sectionId==="politics" || news.sectionId==="Politics"){
          setcolor="DarkCyan"
          setTcolor="white"
        }
        else if(news.sectionId==="business" || news.sectionId==="Business"){
          theme="primary"
        }
        else if(news.sectionId==="technology" || news.sectionId==="Technology"){
          setname="technology"
        }
        else if(news.sectionId==="sport" || news.sectionId==="Sport"){
          setname="sports"
        }
        else{
          theme="other"
        }
        return(
          <Card title={news.webTitle}
                img={imageVal}
                section={news.sectionId}
                date={news.webPublicationDate}
                desc={news.blocks.body[0].bodyTextSummary}
                theme={theme}
                color={setcolor}
                tcolor={setTcolor}
                name={setname}
                shareURL={newsShare}
                param={parameter}
                newsId={news.id}
                api="f7cd7c4a-6561-42e3-9c22-61896a27a48d"
                cardtype="guardian"/>
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
export default Home
