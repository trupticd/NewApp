import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdShare } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { Modal } from 'react-bootstrap';
import { Redirect} from 'react-router-dom'
import { EmailIcon, FacebookIcon, TwitterIcon, FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";
import moment from 'moment';
import Badge from "react-bootstrap/Badge";
const x = "20rem"
const y = "auto"
const z = "10"

const titleStyle = {
  marginTop:'20px',
  marginLeft:'20px',
  marginRight:'20px'
}
class SearchCard extends React.Component{
  constructor(){
    super()
    this.state = {
      show : false,
      showCard : false,
      newsId : "",
      api : "",
      cardtype:""
    }
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpenCard = this.handleOpenCard.bind(this)
  }
  componentDidMount() {
    console.log(this.props.shareURL)
  }
  handleShow(e) {
    e.stopPropagation();
    this.setState({ show: true },()=> console.log(this.state.show));
  }
  handleClose(e) {

    this.setState({ show: false });
  }
  handleOpenCard (event) {
    event.stopPropagation();
    console.log("for",event.nativeEvent.target.className);
    if(event.nativeEvent.target.localName === "span" || event.nativeEvent.target.localName === "path" || event.nativeEvent.target.localName === "circle" || event.nativeEvent.target.localName==="modal-body" || event.nativeEvent.target.localName===""){
      return;
    }
    console.log("on handleOpenCard")
    this.setState({ showCard: true,
                    newsId: this.props.newsId,
                    api:this.props.api,
                    section:this.props.section,
                    cardtype:this.props.cardtype});
  }
  render(){
    if(this.state.showCard){
      console.log("here")
      console.log(this.props.cardtype)
      if(this.props.cardtype==="guardian"){
        let newsId = ""
        let api = ""
        newsId = this.props.newsId
        api = this.props.api
        console.log("displaying state",this.state.api)
        var routeObject = { 'articleId' : newsId, 'articleApi': this.state.api, 'section':this.state.section,'favorites':false,'cardtype':this.state.cardtype};
        localStorage.setItem('routeData', JSON.stringify(routeObject));
        return(<Redirect to={{search:"?id="+newsId+"?api-key="+api+"&show-blocks=all"}}/>)
      }
      if(this.props.cardtype==="ny"){
        console.log("happened")
        console.log(this.props.newsId)
        console.log(this.props.api)
        let newsId = ""
        let api = ""
        newsId = this.props.newsId
        api = this.props.api
        routeObject = { 'articleId' : newsId, 'articleApi': this.state.api, 'section':this.state.section,'favorites':false,'cardtype':this.state.cardtype};
        localStorage.setItem('routeData', JSON.stringify(routeObject));
        return(<Redirect to={{pathname:"/details" ,search:"?id="+newsId+"?api-key="+api}}/>)
      }
    }
    else{
      return(<div className="favoriteContainer">
        <div className="card" style={{width:x,height:y}} onClick = {this.handleOpenCard}>
          <div className="card-title" style={titleStyle}><i><b><span className="cardtitle">{this.props.title}</span>
          <button className="shareButton" onClick={this.handleShow}><MdShare /></button></b></i>
          </div>
          <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="shareVia"><strong>Share Via</strong><br />
          <FacebookShareButton url={this.props.shareURL} style={{marginLeft:'50px'}} hashtag="#CSCI_571_NewsApp">
            <FacebookIcon size={50} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={this.props.shareURL} style={{marginLeft:'35px',marginRight:'35px'}} hashtags={['CSCI_571_NewsApp']}>
            <TwitterIcon size={50} round={true} />
          </TwitterShareButton>
          <EmailShareButton url={this.props.shareURL} style={{marginRight:'50px'}} subject="#CSCI_571_NewsApp">
            <EmailIcon size={50} round={true} />
          </EmailShareButton>
          </div>
          </Modal.Body>
          </Modal>
          <img src={this.props.image} class="card-img-top" alt="..."></img>
          <div class="card-body">
            <i><p className="smallcard-date">{moment(this.props.date).format('YYYY-MM-DD')}</p></i>
            <p class="searchcard-section"><Badge className={this.props.name} variant={this.props.theme} style={{background:this.props.color,color:this.props.tcolor}}>{this.props.section.toUpperCase()}</Badge></p>
          </div>
        </div>
      </div>)
    }

  }
}
export default SearchCard
