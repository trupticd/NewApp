import React from 'react'
import SmallCard from './SmallCard'
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const z ="16"
const Zoom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
});
class Bookmark extends React.Component{
  constructor(){
    super()
    this.state = {
      temp : [],
      title : "",
      image : "",
      date : "",
      section : "",
      cardtype : "",
      shareURL : "",
      articleId : "",
      articleApi : ""
    };
    this.handler = this.handler.bind(this)
  }
  notifyDelete = (newValue:string) =>{ console.log("reacted in toast"); toast('Removing '+newValue, {
    closeOnClick: false,
    position: "top-center",
    hideProgressBar: true,
    pauseOnHover: false,
    draggable: false,
    transition:Zoom,
    autoClose:3000
  })};
  handler() {

    console.log("reached")
    var carddata =""
    var data = []
    // localStorage.removeItem('switch')
    var data = JSON.parse(localStorage.getItem('favoritesContainer'))
    console.log("to display small cards",data)
    var temp = data.map(card => {
      var fix = ""
      var fix1 = ""
      var setcolor = ""
      var setTcolor = ""
      var theme = ""
      var setname = ""
      var setclassname =""
      var cardsetTcolor = ""
      var cardsetcolor = ""
      if(card.section==="world" || card.section==="World"){
        setcolor="BlueViolet"
        setTcolor="white"
        card.section="WORLD"
      }
      else if(card.section==="politics" || card.section==="Politics"){
        setcolor="DarkCyan"
        setTcolor="white"
        card.section = "POLITICS"
      }
      else if(card.section==="business" || card.section==="Business"){
        theme="primary"
        card.section="BUSINESS"
      }
      else if(card.section==="technology" || card.section==="Technology"){
        setname="technology"
        card.section="TECHNOLOGY"
      }
      else if(card.section==="sport" || card.section==="Sport"){
        setname="sports"
        card.section="SPORTS"
      }
      else{
        setname="other"
        fix = card.section
        fix1= fix.toUpperCase()
        card.section=fix1
      }
      if(card.cardtype==="ny"){
        setclassname="nytimes"
        card.cardtype = "NYTIMES"
      }
      if(card.cardtype==="guardian"){
        setclassname="guardian"
        card.cardtype="GUARDIAN"
      }
      console.log("section",card.section)
      return(<SmallCard title={card.title}
                        image={card.image}
                        date={card.date}
                        section={card.section}
                        cardtype={card.cardtype}
                        shareURL={card.shareURL}
                        newsId={card.articleId}
                        api={card.articleApi}
                        theme={theme}
                        color={setcolor}
                        tcolor={setTcolor}
                        name={setname}
                        cardsetcolor={cardsetcolor}
                        cardsetTcolor={cardsetTcolor}
                        cardclass={setclassname}
                        action={this.handler}
                        toastAction={this.notifyDelete}/>)
    })
    if(this.state.temp!=temp){
      this.setState({temp})
    }
  }


  componentDidMount(){

    this.props.switchFunction()
    this.props.bookmarkFunction()
    // this.forceUpdate()
    console.log("reached")
    var carddata =""
    var data = []
    // localStorage.removeItem('switch')
    var data = JSON.parse(localStorage.getItem('favoritesContainer'))
    console.log("to display small cards",data)
    var temp = data.map(card => {
      var fix = ""
      var fix1 = ""
      var setcolor = ""
      var setTcolor = ""
      var theme = ""
      var setname = ""
      var setclassname =""
      var cardsetTcolor = ""
      var cardsetcolor = ""
      if(card.section==="world" || card.section==="World"){
        setcolor="BlueViolet"
        setTcolor="white"
        card.section="WORLD"
      }
      else if(card.section==="politics" || card.section==="Politics"){
        setcolor="DarkCyan"
        setTcolor="white"
        card.section = "POLITICS"
      }
      else if(card.section==="business" || card.section==="Business"){
        theme="primary"
        card.section="BUSINESS"
      }
      else if(card.section==="technology" || card.section==="Technology"){
        setname="technology"
        card.section="TECHNOLOGY"
      }
      else if(card.section==="sport" || card.section==="Sport"){
        setname="sports"
        card.section="SPORTS"
      }
      else{
        setname="other"
        fix = card.section
        fix1= fix.toUpperCase()
        card.section=fix1
      }
      if(card.cardtype==="ny"){
        setclassname="nytimes"
        card.cardtype = "NYTIMES"
      }
      if(card.cardtype==="guardian"){
        setclassname="guardian"
        card.cardtype="GUARDIAN"
      }
      console.log("section",card.section)
      return(<SmallCard title={card.title}
                        image={card.image}
                        date={card.date}
                        section={card.section}
                        cardtype={card.cardtype}
                        shareURL={card.shareURL}
                        newsId={card.articleId}
                        api={card.articleApi}
                        theme={theme}
                        color={setcolor}
                        tcolor={setTcolor}
                        name={setname}
                        cardsetcolor={cardsetcolor}
                        cardsetTcolor={cardsetTcolor}
                        cardclass={setclassname}
                        action={this.handler}
                        toastAction={this.notifyDelete}/>)
    })
    this.setState({ temp:temp})
  }
  render(){
    console.log(this.state.temp)
      if(this.state.temp.length===0){
        return(<div>
          <ToastContainer
          position="top-center"
          autoClose={3000}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnVisibilityChange={false}
          draggable={false}
          /><h4 style={{textAlign:"center"}}>You have no saved articles</h4></div>)
      }
      else{
        return(
          <div>
          <ToastContainer
          position="top-center"
          autoClose={3000}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnVisibilityChange={false}
          draggable={false}
          />
          <div className="favWord">Favorites </div>
          <div className="card-group">{this.state.temp}</div></div>
        )
      }



  }
}
export default Bookmark
