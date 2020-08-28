import React,{Component} from 'react'
import { Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import Badge from "react-bootstrap/Badge";
import { MdShare } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { Modal } from 'react-bootstrap';
import { EmailIcon, FacebookIcon, TwitterIcon, FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";

const top = {
  marginTop:'80px'
}
const style = {
  marginTop:'10px',
  marginLeft:'0px',
  fontSize:'22px'
}
const textStyle = {
  marginTop:'5px',
  fontSize:'16px',
  color:'black !important'

}
const imageStyle = {
  marginTop:'10px'
}
const cardStyle = {
  width:'2000px !important'
}

class Card extends Component{

  constructor(){
    super()
    this.state = {
      show : false,
      temp:"",
      showCard:false,
      newsId:"",
      api:"",
      cardtype:""
    };
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpenCard = this.handleOpenCard.bind(this)
  }


  handleShow(e) {
    e.stopPropagation();
    this.setState({ show: true },()=> console.log(this.state.show));
  }
  handleClose() {

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

  render(){

    if(this.state.showCard){
      if(this.props.cardtype==="guardian"){
        let newsId = ""
        let api = ""
        newsId = this.props.newsId
        api = this.props.api
        console.log("displaying state",this.state.api)
        // const url = encodeURI('/'+newsId+'?api-key='+api+'&show-blocks=all')
        var routeObject = { 'articleId' : newsId, 'articleApi': this.state.api, 'section':this.state.section,'favorites':false,'cardtype':this.state.cardtype};
        localStorage.setItem('routeData', JSON.stringify(routeObject));
        return(<Redirect to={{pathname:"/details",search:"?id="+newsId+"?api-key="+api+"&show-blocks=all"}}/>)
      }
      if(this.props.cardtype==="ny"){
        console.log("check1",this.props.newsId)
        console.log("check2",this.props.api)
        let newsId = ""
        let api = ""
        newsId = this.props.newsId
        api = this.props.api
        // const url = encodeURI('/svc/search/v2/articlesearch.json?fq=web_url:("'+newsId+'")?api-key='+api)
        var routeObject = { 'articleId' : newsId, 'articleApi': this.state.api, 'section':this.state.section,'favorites':false,'cardtype':this.state.cardtype};
        localStorage.setItem('routeData', JSON.stringify(routeObject));
        return(<Redirect to={{pathname:"/details",search:"?id="+newsId+"?api-key="+api}}/>)
      }
    }
    else{
      return(
        <div className="container" onClick={this.handleOpenCard}>
        <div className="card mb-3" style={{cardStyle}}>
          <div className="row no-gutters">
          <div className="col-md-3">
            <img src={this.props.img} className="img-fluid" style={{imageStyle}}></img>
          </div>
          <div className="col-md-9">
              <div className="card-body">
                <div className="card-title" style={style}>
                  <b><i>{this.props.title}</i></b>
                    <button className="shareButton" onClick={this.handleShow}><MdShare /></button>
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

                      </div>
                <p className="card-text" style={textStyle}>{this.props.desc}</p>
                <i><p className="card-date">{moment(this.props.date).format('YYYY-MM-DD')}</p></i>
                <p className="card-section"><Badge className={this.props.name} variant={this.props.theme} style={{background:this.props.color,color:this.props.tcolor}}>{this.props.section.toUpperCase()}</Badge></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    }
  }
}


export default Card
