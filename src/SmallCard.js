import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom'
import moment from 'moment';
import { MdShare } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { Modal } from 'react-bootstrap';
import Badge from "react-bootstrap/Badge";
import { EmailIcon, FacebookIcon, TwitterIcon, FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const x = "20rem"
const y = "auto"
const z = "10"

const Zoom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
});
const titleStyle = {
  marginTop:'20px',
  marginLeft:'20px',
  marginRight:'20px'
}

class SmallCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      show : false,
      showCard : false,
      newsId : "",
      api : "",
      cardtype:"",
      storage: [],

    }
    this.handleShow = this.handleShow.bind(this)
    this.handleClose= this.handleClose.bind(this)
    this.deleteFavorite = this.deleteFavorite.bind(this)
    this.handleOpenCard = this.handleOpenCard.bind(this)

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
    this.setState({ showCard: true,
                    newsId: this.props.newsId,
                    api:this.props.api,
                    section:this.props.section,
                    cardtype:this.props.cardtype});
  }
  deleteFavorite (e) {
    e.stopPropagation()
    this.props.toastAction(this.props.title)
    var temp = JSON.parse(localStorage.getItem('favoritesContainer'))
    for(var i = 0;i<temp.length;i++){
      if(temp[i].title===this.props.title){
        temp.splice(i,1)
        break
      }
    }
    localStorage.setItem('favoritesContainer',JSON.stringify(temp))
    this.props.action()
  }
  render(){
    if(this.state.deleteCard){
      toast('Removing '+this.props.title, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        transition:Zoom
      });
    }
    if(this.state.showCard){
      if(this.props.cardtype==="GUARDIAN"){
        let newsId = ""
        let api = ""
        let cardtype = "guardian"
        newsId = this.props.newsId
        api = this.props.api
        console.log("displaying state",this.state.api)
        var routeObject = { 'articleId' : newsId, 'articleApi': this.state.api, 'section':this.state.section,'favorites':true,'cardtype':cardtype};
        localStorage.setItem('routeData', JSON.stringify(routeObject));
        return(<Redirect to={{pathname:"/details" ,search:"?id="+newsId+"?api-key="+api+"&show-blocks=all"}}/>)
      }
      if(this.props.cardtype==="NYTIMES"){
        console.log(this.props.newsId)
        console.log(this.props.api)
        let newsId = ""
        let api = ""
        let cardtype = "ny"
        newsId = this.props.newsId
        api = this.props.api
        var routeObject = { 'articleId' : newsId, 'articleApi': this.state.api, 'section':this.state.section,'favorites':true,'cardtype':cardtype};
        localStorage.setItem('routeData', JSON.stringify(routeObject));
        return(<Redirect to={{pathname:"/details", search:"?id="+newsId+"?api-key="+api}}/>)
      }
    }
    else{
      return(
        <div className="favoriteContainer">
          <div className="card" style={{width:x,height:y}} onClick = {this.handleOpenCard}>
            <div className="card-title" style={titleStyle}><i><b>{this.props.title}
            <button className="shareButton" onClick={this.handleShow}><MdShare /></button>
            <button className="shareButton" onClick={this.deleteFavorite}><MdDelete /></button>
            </b></i></div>
            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="shareVia"><strong>Share Via</strong><br />
            <FacebookShareButton style={{marginLeft:'50px'}} url={this.props.shareURL} hashtag="#CSCI_571_NewsApp">
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
              <div className="smallcard-date"><i>{moment(this.props.date).format('YYYY-MM-DD')}</i></div>
              <div className="controller"><div><Badge className={this.props.name} variant={this.props.theme} style={{background:this.props.color,color:this.props.tcolor}}>{this.props.section}</Badge></div>
              <div className="smallcard-type"><Badge className={this.props.cardclass}>{this.props.cardtype}</Badge></div></div>
            </div>
          </div>
        </div>)
    }

  }
}

export default SmallCard
