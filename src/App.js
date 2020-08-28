import React,{ Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Home"
import World from "./World"
import Politics from "./Politics"
import Business from "./Business"
import Technology from "./Technology"
import Sports from "./Sports"
import Home_G from "./Home_G"
import World_G from "./World_G"
import Politics_G from "./Politics_G"
import Business_G from "./Business_G"
import Technology_G from "./Technology_G"
import Sports_G from "./Sports_G"
import Navbar from "./Navbar"
import DisplayCard from "./DisplayCard"
import Bookmark from "./Bookmark"
import Search from "./Search"
import './App.css';


class App extends Component{

  constructor(){
    super()
    this.state = {

      displaySwitch:true,
      colorBookmark:false
    }
    this.displaySwitch = this.displaySwitch.bind(this)
    this.colorBookmark = this.colorBookmark.bind(this)
  }

  componentDidMount() {

    // localStorage.setItem('favoritesContainer',temp[])
  }
  displaySwitch() {
    if(window.location.pathname.includes("/favorites") || window.location.pathname.includes("/details") || window.location.pathname.includes("/search")) {
      this.setState({displaySwitch:false})
    }
    else{
      this.setState({displaySwitch:true})
    }
  }
  colorBookmark() {
    console.log(window.location.pathname)
    if(window.location.pathname.includes("/favorites")) {
      this.setState({colorBookmark:true})
    }
    if(window.location.pathname.includes("/details") || window.location.pathname.includes("/search")){
      console.log("here")
      this.setState({colorBookmark:false})
    }
  }
  render(){
    return (
      <div className="App">
      <Router>
        <Navbar displaySwitch={this.state.displaySwitch} colorBookmark={this.state.colorBookmark}/>
        <Switch>
              <Route path="/ny" render={routeProps =>{return<Home switchFunction = {this.displaySwitch}/>}} exact/>
              <Route path="/world" render={routeProps =>{return<World switchFunction = {this.displaySwitch}/>}} exact/>
              <Route path="/politics" render={routeProps =>{return<Politics switchFunction = {this.displaySwitch}/>}} exact/>
              <Route path="/business" render={routeProps =>{return<Business switchFunction = {this.displaySwitch}/>}} exact/>
              <Route path="/technology" render={routeProps =>{return<Technology switchFunction = {this.displaySwitch}/>}} exact/>
              <Route path="/sports" render={routeProps =>{return<Sports switchFunction = {this.displaySwitch}/>}} exact/>
              <Route path="/guardian" render={routeProps =>{return<Home_G switchFunction = {this.displaySwitch}/>}} exact/>
              <Route path="/guardianworld" render={routeProps =>{return<World_G switchFunction = {this.displaySwitch}/>}} exact/>
              <Route path="/guardianpolitics" render={routeProps =>{return<Politics_G switchFunction = {this.displaySwitch}/>}} exact/>
              <Route path="/guardianbusiness" render={routeProps =>{return<Business_G switchFunction = {this.displaySwitch}/>}} exact/>
              <Route path="/guardiantechnology" render={routeProps =>{return<Technology_G switchFunction = {this.displaySwitch}/>}} exact/>
              <Route path="/guardiansports" render={routeProps =>{return<Sports_G switchFunction = {this.displaySwitch}/>}} exact/>
              <Route path="/favorites" render={routeProps =>{return<Bookmark switchFunction = {this.displaySwitch} bookmarkFunction = {this.colorBookmark}/>}} exact/>
              <Route path="/search" render={routeProps =>{return<Search switchFunction = {this.displaySwitch} bookmarkFunction = {this.colorBookmark}/>}} exact/>
              <Route path="/details" render={routeProps =>{return<DisplayCard switchFunction = {this.displaySwitch} bookmarkFunction = {this.colorBookmark}/>}}/>

          </Switch>
      </Router>
      </div>
    );
  }

}


export default App;
