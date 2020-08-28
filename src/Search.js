import React from 'react'
import SearchCard from './SearchCard'
import 'bootstrap/dist/css/bootstrap.min.css';
class Search extends React.Component{
  constructor(){
    super()
    this.state = {
      temp :[],

    }
  }
  componentWillReceiveProps(prevProps,prevState){
    // if(window.location.pathname==="/search"){
    //   var search = window.location.search.split("=")[1]
    //   localStorage.setItem('search',JSON.stringify(search))
    // }
    // else{
    //   var search = ""
    //   localStorage.setItem('search',JSON.stringify(search))
    // }
    console.log("in component did update")
    var cardData = localStorage.getItem('cardIdentifier')
    var cardtype = JSON.parse(cardData)
    if(cardtype.cardtype){
      var query = window.location.search.split('=')[1]
      var url = new URL("https://test-deploy2506.wl.r.appspot.com/searchGuardian")
      var params = {search:query}
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      fetch(url)
      .then(results => {
        return results.json();
      }).then(data => {
        let temp = data.response.results.map((news) => {
          console.log(data.response.results)
            let imageVal =""
            let setcolor = ""
            let setTcolor = ""
            let theme = ""
            let setname = ""
            let title = news.webTitle
            let section = news.sectionId
            let date = news.webPublicationDate
            let shareURL = news.webUrl
            let cardtype = "guardian"
            let newsId = news.id

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
            if(section==="world" || section==="World"){
                setcolor="BlueViolet"
                setTcolor="white"
              }
              else if(section==="politics" || section==="Politics"){
                setcolor="DarkCyan"
                setTcolor="white"
              }
              else if(section==="business" || section==="Business"){
                theme="primary"
              }
              else if(section==="technology" || section==="Technology"){
                setname="technology"
              }
              else if(section==="sport" || section==="Sport"){
                setname="sports"
              }
              else{
                setname="other"
              }
              console.log("checl",news.webUrl)
              return(<SearchCard title={news.webTitle}
                                 image={imageVal}
                                 date={news.webPublicationDate}
                                 section={news.sectionId}
                                 theme={theme}
                                 color={setcolor}
                                 tcolor={setTcolor}
                                 name={setname}
                                 shareURL={news.webUrl}
                                 cardtype={cardtype}
                                 newsId={news.id}
                                 api="f7cd7c4a-6561-42e3-9c22-61896a27a48d"/>)
          })
          if(prevState.temp!=temp){
            this.setState({temp:temp})
          }
      })
    }
    if(!cardtype.cardtype){
      var query = window.location.search.split('=')[1]
      var url = new URL("https://test-deploy2506.wl.r.appspot.com/searchNY")
      var params = {search:query}
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      fetch(url)
      .then(results => {
        return results.json();
      }).then(data => {
        if(data.hasOwnProperty("response")){
          if(data.response.hasOwnProperty("docs")){
            let temp = data.response.docs.map((news) => {
              console.log(data.response)
              let imageVal =""
              let setcolor = ""
              let setTcolor = ""
              let theme = ""
              let setname = ""
              let title = news.headline.main
              let section = news.news_desk
              let date = news.pub_date
              let shareURL = news.web_url
              let cardtype = "ny"
              let newsId = news.web_url
              if(news.hasOwnProperty("multimedia")){
                if(news.multimedia===null){
                  imageVal = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
                }
                else{
                  for(var i=0;i<news.multimedia.length;i++){
                    if(news.multimedia[i].width>=2000){
                      imageVal = "https://nyt.com/"+news.multimedia[i].url
                      break
                    }
                  }
                  if(imageVal===""){
                    imageVal = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
                  }
                }
              }
              if(section==="world" || section==="World"){
                  setcolor="BlueViolet"
                  setTcolor="white"
                }
                else if(section==="politics" || section==="Politics"){
                  setcolor="DarkCyan"
                  setTcolor="white"
                }
                else if(section==="business" || section==="Business"){
                  theme="primary"
                }
                else if(section==="technology" || section==="Technology"){
                  setname="technology"
                }
                else if(section==="sport" || section==="Sport"){
                  setname="sports"
                }
                else{
                  setname="other"
                }
                console.log(news.web_url)
                return(<SearchCard title={news.headline.main}
                                   image={imageVal}
                                   date={news.pub_date}
                                   section={news.news_desk}
                                   theme={theme}
                                   color={setcolor}
                                   tcolor={setTcolor}
                                   name={setname}
                                   shareURL={news.web_url}
                                   cardtype={cardtype}
                                   newsId={news.web_url}
                                   api="onws5eIQAm992vQD8VgYf9b8nwtGJUe1"/>)
            })
            if(prevState.temp!=temp){
              this.setState({temp:temp})
            }
          }
        }
      })
    }
  }
  componentDidMount(){
    console.log("in component did mount")
    this.props.switchFunction()
    this.props.bookmarkFunction()
    var cardData = localStorage.getItem('cardIdentifier')
    var cardtype = JSON.parse(cardData)
    if(cardtype.cardtype){
      var query = window.location.search.split('=')[1]
      var url = new URL("https://test-deploy2506.wl.r.appspot.com/searchGuardian")
      var params = {search:query}
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      fetch(url)
      .then(results => {
        return results.json();
      }).then(data => {
          let temp = data.response.results.map((news) => {
            console.log(data.response.results)
            let imageVal =""
            let setcolor = ""
            let setTcolor = ""
            let theme = ""
            let setname = ""
            let title = news.webTitle
            let section = news.sectionId
            let date = news.webPublicationDate
            let shareURL = news.webUrl
            let cardtype = "guardian"
            let newsId = news.id

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
            if(section==="world" || section==="World"){
                setcolor="BlueViolet"
                setTcolor="white"
              }
              else if(section==="politics" || section==="Politics"){
                setcolor="DarkCyan"
                setTcolor="white"
              }
              else if(section==="business" || section==="Business"){
                theme="primary"
              }
              else if(section==="technology" || section==="Technology"){
                setname="technology"
              }
              else if(section==="sport" || section==="Sport"){
                setname="sports"
              }
              else{
                setname="other"
              }
              console.log("check",news.webUrl)
              return(<SearchCard title={news.webTitle}
                                 image={imageVal}
                                 date={news.webPublicationDate}
                                 section={news.sectionId}
                                 theme={theme}
                                 color={setcolor}
                                 tcolor={setTcolor}
                                 name={setname}
                                 shareURL={news.webUrl}
                                 cardtype={cardtype}
                                 newsId={news.id}
                                 api="f7cd7c4a-6561-42e3-9c22-61896a27a48d"/>)
          })
          this.setState({temp:temp});
      })
    }
    if(!cardtype.cardtype){
      var query = window.location.search.split('=')[1]
      var url = new URL("https://test-deploy2506.wl.r.appspot.com/searchNY")
      var params = {search:query}
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      fetch(url)
      .then(results => {
        return results.json();
      }).then(data => {
        if(data.hasOwnProperty("response")){
          if(data.response.hasOwnProperty("docs")){
            console.log(data.response)
            let temp = data.response.docs.map((news) => {
              let imageVal =""
              let setcolor = ""
              let setTcolor = ""
              let theme = ""
              let setname = ""
              let title = news.headline.main
              let section = news.news_desk
              let date = news.pub_date
              let shareURL = news.web_url
              let cardtype = "ny"
              let newsId = news.web_url
              if(news.hasOwnProperty("multimedia")){
                if(news.multimedia===null){
                  imageVal = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
                }
                else{
                  for(var i=0;i<news.multimedia.length;i++){
                    if(news.multimedia[i].width>=2000){
                      imageVal = "https://nyt.com/"+news.multimedia[i].url
                      break
                    }
                  }
                  if(imageVal===""){
                    imageVal = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
                  }
                }
              }
              // console.log("this is imageVal",imageVal)
              if(section==="world" || section==="World"){
                  setcolor="BlueViolet"
                  setTcolor="white"
                }
                else if(section==="politics" || section==="Politics"){
                  setcolor="DarkCyan"
                  setTcolor="white"
                }
                else if(section==="business" || section==="Business"){
                  theme="primary"
                }
                else if(section==="technology" || section==="Technology"){
                  setname="technology"
                }
                else if(section==="sport" || section==="Sport"){
                  setname="sports"
                }
                else{
                  setname="other"
                }
                console.log(news.web_url)
                return(<SearchCard title={news.headline.main}
                                   image={imageVal}
                                   date={news.pub_date}
                                   section={news.news_desk}
                                   theme={theme}
                                   color={setcolor}
                                   tcolor={setTcolor}
                                   name={setname}
                                   shareURL={news.web_url}
                                   cardtype={cardtype}
                                   newsId={news.web_url}
                                   api="onws5eIQAm992vQD8VgYf9b8nwtGJUe1"/>)
            })
            this.setState({temp:temp});
          }
        }
      })
    }
  }
  render(){
    return(<div><div className="favWord">Results </div><div className="card-group">{this.state.temp}</div></div>)
    if(this.state.temp.length===0){
        return <h4>No results</h4>
      }
    }
}
export default Search
