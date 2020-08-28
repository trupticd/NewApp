import React,{ Component } from 'react'
import DetailedCard from './DetailedCard'
import BounceLoader from 'react-spinners/BounceLoader'
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin-left: auto ;
  margin-right: auto ;
  /* margin-bottom: 0 auto ; */
  margin-top:300px;
`;

class DisplayCard extends Component{
  constructor(props){
    super(props)
    this.state = {
      title:"",
      date:"",
      image:"",
      desc:"",
      shareURL:"",
      cardtype:"",
      isLoading:true
    };
  }
  componentDidMount(){
    this.props.switchFunction()
    this.props.bookmarkFunction()
    setTimeout(() => this.setState({ isLoading: false }), 2000);
    console.log(this.props)
    var routeData = localStorage.getItem('routeData')
    var routeDetails = JSON.parse(routeData)
    localStorage.removeItem('routeData')
    console.log("inside component did mount",routeDetails)
    // console.log("due to small card",this.props.location)
    // this.props.switchFunction()
    // let len = ""

    if(routeDetails.cardtype==="ny"){


      var url = new URL("https://test-deploy2506.wl.r.appspot.com/extradataNY")
      params = {pathname:routeDetails.articleId , search:routeDetails.articleApi}
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      fetch(url)
      .then(results => {
        return results.json();
      }).then(data => {
        if(data.hasOwnProperty("response")){
          if(data.response.hasOwnProperty("docs")){
            let imageVal = ""
            if(data.response.docs.hasOwnProperty("0")){
              this.setState({title:data.response.docs[0].headline.main})
              this.setState({date:data.response.docs[0].pub_date})
              this.setState({desc:data.response.docs[0].abstract})
              this.setState({shareURL:data.response.docs[0].web_url})
              this.setState({articleId:routeDetails.articleId})
              this.setState({articleApi:routeDetails.articleApi})
              this.setState({cardtype:routeDetails.cardtype})
              this.setState({section:routeDetails.section})
              this.setState({favorites:routeDetails.favorites})

              console.log("this is length of multimedia",data.response.docs[0].multimedia.length)
              if(data.response.docs[0].multimedia===null){
                console.log("1")
                imageVal = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
              }
              else{
                console.log("2")
                for(var i=0;i<data.response.docs[0].multimedia.length;i++){
                  if(data.response.docs[0].multimedia[i].width>=2000){
                    imageVal = "https://nyt.com/"+data.response.docs[0].multimedia[i].url
                    break
                  }
                }
                if(imageVal===""){
                  console.log("3")
                  imageVal = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
                }
              }
              console.log("this is imageVal",imageVal)
              this.setState({image:imageVal})
            }

          }
        }
      })
    }
    if(routeDetails.cardtype==="guardian"){
      console.log("due to small card")
      let imageVal =""
      var url = new URL("https://test-deploy2506.wl.r.appspot.com/extradata"),
      params = {pathname:routeDetails.articleId, search:routeDetails.articleApi}
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      fetch(url)
      .then(results => {
        return results.json();
      }).then(data => {
        if(data.response.content.blocks.hasOwnProperty("main")){
          if(data.response.content.blocks.main.elements[0].assets.length===0){
            imageVal = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
          }
          else{
            let len
            len = data.response.content.blocks.main.elements[0].assets.length
            imageVal = data.response.content.blocks.main.elements[0].assets[len-1].file
          }
        }
        else{
          imageVal = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
        }
          console.log("this is imageVal",imageVal)
          // len = data.response.content.blocks.main.elements[0].assets.length
          this.setState({title:data.response.content.webTitle})
          this.setState({date:data.response.content.webPublicationDate})
          this.setState({image:imageVal})
          this.setState({desc:data.response.content.blocks.body[0].bodyTextSummary})
          this.setState({shareURL:data.response.content.webUrl})
          this.setState({articleId:routeDetails.articleId})
          this.setState({articleApi:routeDetails.articleApi})
          this.setState({cardtype:routeDetails.cardtype})
          this.setState({section:routeDetails.section})
          this.setState({favorites:routeDetails.favorites})
        })
    }
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
    return(<DetailedCard title={this.state.title}
                         date={this.state.date}
                         shareURL={this.state.shareURL}
                         image={this.state.image}
                         desc={this.state.desc}
                         articleId={this.state.articleId}
                         articleApi={this.state.articleApi}
                         cardtype={this.state.cardtype}
                         section={this.state.section}
                         favorites={this.state.favorites}/>)
  }
}
export default DisplayCard
