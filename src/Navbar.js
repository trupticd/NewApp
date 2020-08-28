import React, {Component} from 'react'
import { Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Switch from 'react-switch'
import { FiBookmark } from 'react-icons/fi'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import 'bootstrap/dist/css/bootstrap.min.css'
import AsyncSelect from 'react-select/lib/Async';
import _ from "lodash";
var query =""
const x = "25"
class Navigation extends Component {
  constructor(){
    super()
    this.state = {
      checked: false,
      value : "",
      showStorage :false,
      showSearch:"",
      results:[],
      searchWord:""
     }

    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.demo = this.demo.bind(this)
    this.displayOptions = this.displayOptions.bind(this)
  }
  componentWillReceiveProps = (nextProps) =>{
    if(window.location.pathname!=='/search'){
      this.setState({searchWord: null})
    }
  }
  componentDidMount(){
    console.log("in NAVBAR",this.props.activeTab)
    var pos = JSON.parse(localStorage.getItem('switch'))
    this.setState({checked:pos},() => {
    })
  }
  handleChange(checked) {
    this.setState({checked},() => {
      localStorage.setItem('switch',JSON.stringify(this.state.checked));
    })
  }
  handleSearch (newValue) {
   query = newValue
   console.log("query",query)
   this.setState({searchWord:query})
   console.log(this.state.searchWord)
   this.setState({showSearch:true})
 }
 demo(){
   if(this.state.showSearch){
     const url = '/search'
     return(<Redirect to={{pathname : url, search : "?q="+query.label}} />)
   }
  }
displayOptions = async (newValue:string) => {
  if(newValue!=""){
    try {
      const response = await fetch(
        `https://indrajeet-kane.cognitiveservices.azure.com/bing/v7.0/suggestions?mkt=en-US&q=${newValue}`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": "a20832270c7a4644916cfdd6730f69d4"
          }
        }
      );
      const data = await response.json();
      const resultsRaw = data.suggestionGroups[0].searchSuggestions;
      const results = resultsRaw.map(result => ({ label: result.displayText, value: result.url }));
      this.setState({ results:results },()=>console.log("state set to",this.state.results));
    } catch (error) {
      console.error(`Error fetching search ${newValue}`);
    }
    return Promise.resolve(this.state.results)
  }

  };
  render(){
      var id = { 'cardtype':this.state.checked};
      localStorage.setItem('cardIdentifier', JSON.stringify(id));
      if(this.props.displaySwitch){
      if(this.state.checked){

        return(<div>
        <Navbar bg="primary" variant="dark" expand="lg">
        <div className="search-box">
          <AsyncSelect
            value={this.state.searchWord}
            placeholder="Enter keyword .."
            loadOptions={_.debounce(this.displayOptions,{
            leading: true
          })}
            defaultOptions
            onChange={e => this.handleSearch(e)}
          /></div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link as={Link} href="guardian" to="/guardian">Home</Nav.Link>
          <Nav.Link as={Link} href="guardianworld" to="/guardianworld">World</Nav.Link>
          <Nav.Link as={Link} href="guardianpolitics" to="/guardianpolitics">Politics</Nav.Link>
          <Nav.Link as={Link} href="guardianbusiness" to="/guardianbusiness">Business</Nav.Link>
          <Nav.Link as={Link} href="guardiantechnology" to="/guardiantechnology">Technology</Nav.Link>
          <Nav.Link as={Link} href="guardiansports" to="/guardiansports">Sports</Nav.Link>
          </Nav>
          <div className="switch-class">


          <Link to="/favorites" style={{textDecoration:'none',color:'white',marginTop:x}}><FaRegBookmark size={20}/></Link>

          </div>

          <div className="buttons">
          <span className="NY">NYTimes</span>

            <Switch

              checked={this.state.checked}
              onChange={this.handleChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={45}
              className="react-switch"
              id="material-switch"
              />
              <span className="Guardian">Guardian</span>
              </div>


          </Navbar.Collapse>
        </Navbar>
        {this.demo()}

        </div>
        )
      }
      if(!this.state.checked){
        return (
          <div>
          <Navbar bg="primary" variant="dark" expand="lg">
          <div className="search-box">
            <AsyncSelect
            value={this.state.searchWord}
              placeholder="Enter keyword .."
              loadOptions={_.debounce(this.displayOptions, 1000,{
              leading: true
            })}
              defaultOptions
              onChange={e => this.handleSearch(e)}
            /></div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" defaultActiveKey="ny">
            <Nav.Link as={Link} href="ny" to="/ny">Home</Nav.Link>
            <Nav.Link as={Link} href="world" to="/world">World</Nav.Link>
            <Nav.Link as={Link} href="politics" to="/politics">Politics</Nav.Link>
            <Nav.Link as={Link} href="business" to="/business">Business</Nav.Link>
            <Nav.Link as={Link} href="technology" to="/technology">Technology</Nav.Link>
            <Nav.Link as={Link} href="sports" to="/sports">Sports</Nav.Link>
            </Nav>
            <div className="switch-class">


            <Link to="/favorites" style={{textDecoration:'none',color:'white',marginTop:x}}><FaRegBookmark size={20}/></Link>

            </div>

            <div className="buttons">
            <span className="NY">NYTimes</span>

              <Switch

                checked={this.state.checked}
                onChange={this.handleChange}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={20}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={45}
                className="react-switch"
                id="material-switch"
                />
                <span className="Guardian">Guardian</span>
                </div>


            </Navbar.Collapse>
          </Navbar>
          {this.demo()}

          </div>
        )
      }
    }
    if(!this.props.displaySwitch){
      if(this.props.colorBookmark){
        if(this.state.checked){


            return(<div>
            <Navbar  bg="primary" variant="dark" expand="lg">
            <div className="search-box">
              <AsyncSelect
              value={this.state.searchWord}
                placeholder="Enter keyword .."
                loadOptions={_.debounce(this.displayOptions, 1000, {
                leading: true
              })}
                defaultOptions
                onChange={e => this.handleSearch(e)}
              /></div>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
              <Nav.Link as={Link} href="guardian" to="/guardian">Home</Nav.Link>
              <Nav.Link as={Link} href="guardianworld" to="/guardianworld">World</Nav.Link>
              <Nav.Link as={Link} href="guardianpolitics" to="/guardianpolitics">Politics</Nav.Link>
              <Nav.Link as={Link} href="guardianbusiness" to="/guardianbusiness">Business</Nav.Link>
              <Nav.Link as={Link} href="guardiantechnology" to="/guardiantechnology">Technology</Nav.Link>
              <Nav.Link as={Link} href="guardiansports" to="/guardiansports">Sports</Nav.Link>
              </Nav>
              <div className="switch-class">


              <Link to="/favorites" style={{textDecoration:'none',color:'white',marginTop:x}}><FaBookmark size={20}/></Link>

                  </div>

              </Navbar.Collapse>
            </Navbar>
            {this.demo()}

            </div>
            )
          }
          if(!this.state.checked){
            return (
              <div>
              <Navbar bg="primary" variant="dark" expand="lg">
              <div className="search-box">
                <AsyncSelect
                value={this.state.searchWord}
                  placeholder="Enter keyword .."
                  loadOptions={_.debounce(this.displayOptions, 1000, {
                  leading: true
                })}
                  defaultOptions
                  onChange={e => this.handleSearch(e)}
                /></div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link as={Link} href="ny" to="/ny">Home</Nav.Link>
                <Nav.Link as={Link} href="wold" to="/world">World</Nav.Link>
                <Nav.Link as={Link} href="politics" to="/politics">Politics</Nav.Link>
                <Nav.Link as={Link} href="business" to="/business">Business</Nav.Link>
                <Nav.Link as={Link} href="technology" to="/technology">Technology</Nav.Link>
                <Nav.Link as={Link} href="sports" to="/sports">Sports</Nav.Link>
                </Nav>
                <div className="switch-class">


                <Link to="/favorites" style={{textDecoration:'none',color:'white',marginTop:x}}><FaBookmark size={20}/></Link>

                    </div>

                </Navbar.Collapse>
              </Navbar>
              {this.demo()}

              </div>
            )
          }
        }
        if(!this.props.colorBookmark){
          if(this.state.checked){


              return(<div>
              <Navbar bg="primary" variant="dark" expand="lg" defaultActiveKey="/guardian">
              <div className="search-box">
                <AsyncSelect
                value={this.state.searchWord}
                  placeholder="Enter keyword .."
                  loadOptions={_.debounce(this.displayOptions, 1000, {
                  leading: true
                })}
                  defaultOptions
                  onChange={e => this.handleSearch(e)}
                /></div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link as={Link} href="guardian" to="/guardian">Home</Nav.Link>
                <Nav.Link as={Link} href="guardianworld" to="/guardianworld">World</Nav.Link>
                <Nav.Link as={Link} href="guardianpolitics" to="/guardianpolitics">Politics</Nav.Link>
                <Nav.Link as={Link} href="guardianbusiness" to="/guardianbusiness">Business</Nav.Link>
                <Nav.Link as={Link} href="guardiantechnology" to="/guardiantechnology">Technology</Nav.Link>
                <Nav.Link as={Link} href="guardiansports" to="/guardiansports">Sports</Nav.Link>
                </Nav>
                <div className="switch-class">


                <Link to="/favorites" style={{textDecoration:'none',color:'white',marginTop:x}}><FaRegBookmark size={20}/></Link>

                    </div>

                </Navbar.Collapse>
              </Navbar>
              {this.demo()}

              </div>
              )
            }
            if(!this.state.checked){
              return (
                <div>
                <Navbar bg="primary" variant="dark" expand="lg">
                <div className="search-box">
                  <AsyncSelect
                  value={this.state.searchWord}
                    placeholder="Enter keyword .."
                    loadOptions={_.debounce(this.displayOptions, 1000, {
                    leading: true
                  })}
                    defaultOptions
                    onChange={e => this.handleSearch(e)}
                  /></div>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                  <Nav.Link as={Link} href="ny" to="/ny">Home</Nav.Link>
                  <Nav.Link as={Link} href="world" to="/world">World</Nav.Link>
                  <Nav.Link as={Link} href="politics" to="/politics">Politics</Nav.Link>
                  <Nav.Link as={Link} href="business" to="/business">Business</Nav.Link>
                  <Nav.Link as={Link} href="technology" to="/technology">Technology</Nav.Link>
                  <Nav.Link as={Link} href="sports" to="/sports">Sports</Nav.Link>
                  </Nav>
                  <div className="switch-class">


                  <Link to="/favorites" style={{textDecoration:'none',color:'white',marginTop:x}}><FaRegBookmark size={20}/></Link>

                      </div>

                  </Navbar.Collapse>
                </Navbar>
                {this.demo()}

                </div>
              )
            }
          }
        }
      }
}

export default Navigation;
