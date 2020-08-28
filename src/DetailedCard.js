import React,{ Component } from 'react'
import moment from 'moment';
import { FaRegBookmark } from 'react-icons/fa'
import { FaBookmark } from 'react-icons/fa'
import { FiChevronDown } from 'react-icons/fi'
import { IoIosArrowUp } from 'react-icons/io'
import { EmailIcon, FacebookIcon, TwitterIcon, FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";
import commentBox from 'commentbox.io';
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const style = "detailedCard-desc"
const style1 = "detailedCard-descNY"
const style2 = "showicon"
const style3 = "notshow"

const Zoom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
  // default to 750ms, can be omitted
  // duration: 750,
});

class DetailedCard extends Component{



  constructor(props){
    super(props)
    this.state = {
      expandCard:false,
      style:"",
      style1:"",
      isLoading:true,
      articleTitle:this.props.title,
      colorBookmark:false,
      favorites:this.props.favorites
    }
    this.expandCard = this.expandCard.bind(this)
    this.runMethods = this.runMethods.bind(this)
    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)

  }
  notifyAdd = () =>toast('Saving '+this.props.title,{
    closeOnClick: false,
    position: "top-center",
    hideProgressBar: true,
    pauseOnHover: false,
    draggable: false,
    transition:Zoom,
    autoClose:3000
  });

  notifyDelete = () =>toast('Removing '+this.props.title, {
    closeOnClick: false,
    position: "top-center",
    hideProgressBar: true,
    pauseOnHover: false,
    draggable: false,
    transition:Zoom,
    autoClose:3000
  });
  componentDidMount() {
        this.removeCommentBox = commentBox('5631068925329408-proj', { defaultBoxId: this.props.articleId })

  }
  componentDidUpdate() {
    this.removeCommentBox = commentBox('5631068925329408-proj', { defaultBoxId: this.props.articleId })
  }
  componentWillUnmount() {
        this.removeCommentBox();
  }
  expandCard() {
      this.setState({ expandCard : !this.state.expandCard})
  }
  runMethods() {
      let title = this.props.title
      let image = this.props.image
      let date = this.props.date
      let section = this.props.section
      let cardtype = this.props.cardtype
      let shareURL = this.props.shareURL
      let articleId = this.props.articleId
      let articleApi = this.props.articleApi
      var testObject = { 'title': title, 'image': image, 'date': date, 'section': section,'cardtype': cardtype, 'shareURL':shareURL, 'articleId':articleId, 'articleApi':articleApi};
      // localStorage.removeItem('favoritesContainer')
      if(localStorage.getItem('favoritesContainer')===null){
        let temp = []
        console.log(typeof(temp))
        temp.push(testObject)
        localStorage.setItem('favoritesContainer',JSON.stringify(temp))
      }
      else{
        let temp1 = []
        temp1 = JSON.parse(localStorage.getItem('favoritesContainer'))
        console.log(typeof(temp1))
        temp1.push(testObject)
        localStorage.setItem('favoritesContainer',JSON.stringify(temp1))
      }
      // var temp = localStorage.getItem('favoritesContainer')
      console.log(localStorage)
      // temp.push(testObject);
      // localStorage.setItem('favoritesContainer', JSON.stringify(temp));
      // var retrievedObject = localStorage.getItem(title);
      // console.log('retrievedObject: ', JSON.parse(retrievedObject));

    }
    deleteMethods(){
      var temp = JSON.parse(localStorage.getItem('favoritesContainer'))
      for(var i = 0;i<temp.length;i++){
        if(temp[i].title===this.props.title){
          temp.splice(i,1)
          break
        }
      }
      localStorage.setItem('favoritesContainer',JSON.stringify(temp))
    }
    removeItem() {
      console.log("here")
      this.deleteMethods()
      this.notifyDelete()
      this.setState({colorBookmark:false})
      console.log(this.state.favorites)
      this.setState({favorites:!this.state.favorites},()=>console.log("this",this.state.favorites))
      console.log("this",this.state.favorites)
    }
    addItem(){
      console.log("or here")
      this.runMethods()
      this.notifyAdd()
      this.setState({colorBookmark:true})
      console.log(this.state.favorites)
      this.setState({favorites:!this.state.favorites},()=>console.log("this",this.state.favorites))
      console.log("this",this.state.favorites)
    }

render(){
  let descStyle = ""
  let buttonStyle = ""
  if(this.props.cardtype==="guardian"){
    descStyle = style
    buttonStyle = style2
  }
  else{
    descStyle = style1
    buttonStyle = style3
  }
  console.log("CHECK",this.state.style,this.state.style1)
    if(this.state.expandCard){
      if(this.state.favorites){
          return(
            <div className="page">
            <div className="toast-container">
            <ToastContainer
              position="top-center"
              autoClose={3000}
              newestOnTop
              rtl={false}
              pauseOnVisibilityChange={false}
              draggable={false}
              closeOnClick={false}
              /></div>
              <div className="card">
              <div className="card-body">
                <div className="detailedCard-header">
                  <div className="card-title">
                    <p><i>{this.props.title}</i></p>
                  </div>
                  <p className="detailedCard-date"><i>{moment(this.props.date).format('YYYY-MM-DD')}</i></p>
                  <div className="sharespace">
                    <FacebookShareButton url={this.props.shareURL} hashtag="#CSCI_571_NewsApp">
                      <FacebookIcon className="detailicon" size={30} round={true} />
                    </FacebookShareButton>
                    <TwitterShareButton url={this.props.shareURL} hashtags={['CSCI_571_NewsApp']}>
                      <TwitterIcon className="detailicon" size={30} round={true} />
                    </TwitterShareButton>
                    <EmailShareButton url={this.props.shareURL} subject="#CSCI_571_NewsApp">
                      <EmailIcon className="detailicon" size={30} round={true} />
                    </EmailShareButton>
                    <span className="details-bookmark" onClick={this.removeItem}><FaBookmark size={25} style={{marginBottom:'16px'}}/></span>
                  </div>
                </div>
                <img className="img-fluid" src={this.props.image}></img>

                <div className="detailedCard-desc-expanded"><p>{this.props.desc}</p></div>
                <div className="showicon" onClick={this.expandCard}><IoIosArrowUp size={25}/></div>
              </div>
              <div className="commentbox"></div>
            </div>
            </div>
          )
      }
      else{
        if(this.state.colorBookmark){
          return(<div className="page">
          <div className="toast-container">
          <ToastContainer
            position="top-center"
            autoClose={3000}
            newestOnTop
            rtl={false}
            pauseOnVisibilityChange={false}
            draggable={false}
            closeOnClick={false}
            /></div>
            <div className="card">
            <div className="card-body">
              <div className="detailedCard-header">
                <div className="card-title">
                  <p><i>{this.props.title}</i></p>
                </div>
                <p className="detailedCard-date"><i>{moment(this.props.date).format('YYYY-MM-DD')}</i></p>
                <div className="sharespace">
                  <FacebookShareButton url={this.props.shareURL} hashtag="#CSCI_571_NewsApp">
                    <FacebookIcon className="detailicon" size={30} round={true} />
                  </FacebookShareButton>
                  <TwitterShareButton url={this.props.shareURL} hashtags={['CSCI_571_NewsApp']}>
                    <TwitterIcon className="detailicon" size={30} round={true} />
                  </TwitterShareButton>
                  <EmailShareButton url={this.props.shareURL} subject="#CSCI_571_NewsApp">
                    <EmailIcon className="detailicon" size={30} round={true} />
                  </EmailShareButton>
                  <span className="details-bookmark" onClick={this.removeItem}><FaBookmark size={25} style={{marginBottom:'16px'}}/></span>
                </div>
              </div>
              <img className="img-fluid" src={this.props.image}></img>

              <div className="detailedCard-desc-expanded"><p>{this.props.desc}</p></div>
              <div className="showicon" onClick={this.expandCard}><IoIosArrowUp size={25}/></div>
            </div>
            <div className="commentbox"></div>
          </div>
          </div>
        )
        }
        if(!this.state.colorBookmark){
          return(
            <div className="page">
            <div className="toast-container"><ToastContainer
              position="top-center"
              autoClose={4000}
              newestOnTop={false}
              rtl={false}
              pauseOnVisibilityChange
              draggable
              closeOnClick={false}
              /></div>
              <div className="card promoting-card">
                <div className="detailedCard-header">
                  <div className="detailedCard-title">
                    <p><i>{this.props.title}</i></p>
                  </div>
                  <p className="detailedCard-date"><i>{moment(this.props.date).format('YYYY-MM-DD')}</i></p>
                  <div className="sharespace">
                    <FacebookShareButton url={this.props.shareURL} hashtag="#CSCI_571_NewsApp">
                      <FacebookIcon className="detailicon" size={30} round={true} />
                    </FacebookShareButton>
                    <TwitterShareButton url={this.props.shareURL} hashtags={['CSCI_571_NewsApp']}>
                      <TwitterIcon className="detailicon" size={30} round={true} />
                    </TwitterShareButton>
                    <EmailShareButton url={this.props.shareURL} subject="#CSCI_571_NewsApp">
                      <EmailIcon className="detailicon" size={30} round={true} />
                    </EmailShareButton>
                    <span className="details-bookmark" onClick={this.addItem}><FaRegBookmark size={25} style={{marginBottom:'16px'}}/></span>

                  </div>
                </div>
                <img className="img-fluid" src={this.props.image}></img>
                <div className="detailedCard-desc-expanded"><p>{this.props.desc}</p></div>
                <div className="showicon" onClick={this.expandCard}><IoIosArrowUp size={25}/></div>
              </div>
              <div className="commentbox"></div>
            </div>
          )
        }
      }
    }
    else{
      if(this.state.favorites){
          return(
            <div className="page">
            <div className="toast-container"><ToastContainer
              position="top-center"
              autoClose={4000}
              newestOnTop={false}
              rtl={false}
              pauseOnVisibilityChange
              draggable
              closeOnClick={false}

              /></div>
              <div className="card promoting-card">
                <div className="detailedCard-header">
                  <div className="detailedCard-title">
                    <p><i>{this.props.title}</i></p>
                  </div>
                  <p className="detailedCard-date"><i>{moment(this.props.date).format('YYYY-MM-DD')}</i></p>
                  <div className="sharespace">
                    <FacebookShareButton url={this.props.shareURL} hashtag="#CSCI_571_NewsApp">
                      <FacebookIcon className="detailicon" size={30} round={true} />
                    </FacebookShareButton>
                    <TwitterShareButton url={this.props.shareURL} hashtags={['CSCI_571_NewsApp']}>
                      <TwitterIcon className="detailicon" size={30} round={true} />
                    </TwitterShareButton>
                    <EmailShareButton url={this.props.shareURL} subject="#CSCI_571_NewsApp">
                      <EmailIcon className="detailicon" size={30} round={true} />
                    </EmailShareButton>
                    <span className="details-bookmark" onClick={this.removeItem}><FaBookmark size={25} style={{marginBottom:'16px'}}/></span>
                  </div>
                </div>
                <img className="img-fluid" src={this.props.image}></img>
                <div className={descStyle}><p>{this.props.desc}</p></div>
                <div className={buttonStyle} onClick={this.expandCard}><FiChevronDown size={25}/></div>
              </div>
              <div className="commentbox"></div>
            </div>
          )


      }
      else{
        if(this.state.colorBookmark){
          return(<div className="page">
          <div className="toast-container"><ToastContainer
            position="top-center"
            autoClose={4000}
            newestOnTop={false}
            rtl={false}
            pauseOnVisibilityChange
            draggable
            closeOnClick={false}

            /></div>
            <div className="card promoting-card">
              <div className="detailedCard-header">
                <div className="detailedCard-title">
                  <p><i>{this.props.title}</i></p>
                </div>
                <p className="detailedCard-date"><i>{moment(this.props.date).format('YYYY-MM-DD')}</i></p>
                <div className="sharespace">
                  <FacebookShareButton url={this.props.shareURL} hashtag="#CSCI_571_NewsApp">
                    <FacebookIcon className="detailicon" size={30} round={true} />
                  </FacebookShareButton>
                  <TwitterShareButton url={this.props.shareURL} hashtags={['CSCI_571_NewsApp']}>
                    <TwitterIcon className="detailicon" size={30} round={true} />
                  </TwitterShareButton>
                  <EmailShareButton url={this.props.shareURL} subject="#CSCI_571_NewsApp">
                    <EmailIcon className="detailicon" size={30} round={true} />
                  </EmailShareButton>
                  <span className="details-bookmark" onClick={this.removeItem}><FaBookmark size={25} style={{marginBottom:'16px'}}/></span>
                </div>
              </div>
              <img className="img-fluid" src={this.props.image}></img>
              <div className={descStyle}><p>{this.props.desc}</p></div>
              <div className={buttonStyle} onClick={this.expandCard}><FiChevronDown size={25}/></div>
            </div>
            <div className="commentbox"></div>
          </div>
        )
        }
        if(!this.state.colorBookmark){
          return(
            <div className="page">
            <div className="toast-container"><ToastContainer
              position="top-center"
              autoClose={4000}
              newestOnTop={false}
              rtl={false}
              pauseOnVisibilityChange
              draggable
              closeOnClick={false}

              /></div>
              <div className="card promoting-card">
                <div className="detailedCard-header">
                  <div className="detailedCard-title">
                    <p><i>{this.props.title}</i></p>
                  </div>
                  <p className="detailedCard-date"><i>{moment(this.props.date).format('YYYY-MM-DD')}</i></p>
                  <div className="sharespace">
                    <FacebookShareButton url={this.props.shareURL} hashtag="#CSCI_571_NewsApp">
                      <FacebookIcon className="detailicon" size={30} round={true} />
                    </FacebookShareButton>
                    <TwitterShareButton url={this.props.shareURL} hashtags={['CSCI_571_NewsApp']}>
                      <TwitterIcon className="detailicon" size={30} round={true} />
                    </TwitterShareButton>
                    <EmailShareButton url={this.props.shareURL} subject="#CSCI_571_NewsApp">
                      <EmailIcon className="detailicon" size={30} round={true} />
                    </EmailShareButton>
                    <span className="details-bookmark" onClick={this.addItem}><FaRegBookmark size={25} style={{marginBottom:'16px'}}/></span>

                  </div>
                </div>
                <img className="img-fluid" src={this.props.image}></img>
                <div className={descStyle}><p>{this.props.desc}</p></div>
                <div className={buttonStyle} onClick={this.expandCard}><FiChevronDown size={25}/></div>
              </div>
              <div className="commentbox"></div>
            </div>
          )
        }
      }
    }
  }
}
export default DetailedCard
