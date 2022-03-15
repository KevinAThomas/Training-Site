import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Destinations from './components/Destinations';
import User from './components/User';
import Signup from './components/Signup';
import Login from './components/Login';
import { Switch, Route } from 'react-router-dom';
import Countryfilter from './components/Countryfilter';
import Citypage from './components/Citypage';
import Resultats from './components/Resultats';
import Footer from './components/Footer';
import authentification from './services/authentification';
import Edit from './components/Edit';


// 1. redirect
// 2. state user
// 3. /desitiinations/:id

class App extends Component {


state = { user: null } 


  fetchUser = () => {
    console.log("fetch user", this.state)
    if (!this.state.user) {
      authentification.loggedin()
        .then(data => {
          console.log("user auth data", data)
          this.setState({user: data})
        })
        .catch(err => this.setState({user: false}))
      ;
    } else {
      console.log('user already in the state')
    }
  };

 
  updateUser = (data) => {
    this.setState({user: data});
  };

  componentDidMount() {
    this.fetchUser();
  }

  // state user (transformer en class-component)
  render(){
    console.log(this.state.user)
  return (
    <div className="App">
      <header>
        
      <Navbar />
      

      <Switch>
          <Route path='/homepage' component={Homepage}/>
          <Route path='/destinations' component={Destinations}/>
          <Route path='/user' render={(props) => <User userInSession = {this.state.user} history={props.history} updateUser={this.updateUser}/>}/>
          <Route path='/signup' render={(props) => <Signup history={props.history} updateUser={this.updateUser} />}/>
          <Route path='/login' render={(props) => <Login history={props.history} updateUser={this.updateUser}/>}/>
          <Route path='/countryfilter' render ={(props) => <Countryfilter history={props.history} />}/>
          <Route path='/citypage/:id' component={Citypage}/>
          <Route path='/resultats' component={Resultats}/>
          <Route path='/edit' component={Edit}/>
      </Switch>


      </header>

      <Footer />
     
    </div>
  );
 }
}

export default App;