import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { NotfoundComponent } from './components/notfound-component';
import Login from './pages/login';
import Signup from './pages/signup';
import HeaderComponent from './components/header-component';
import Dashboard from './pages/dashboard';
import { SingleItem } from './pages/singleItem';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      user: {},
    };
  }

  componentDidMount() {
    this.checkIfAlreadyLoggedIn();
  }

  async checkIfAlreadyLoggedIn() {
    const url = '/api/user';

    let response;

    try {
      response = await fetch(url, {
        method: 'get',
      });
    } catch (err) {
      this.setState({ errorMsg: 'Failed to connect to server: ' + err });
      return;
    }

    if (response.status === 401) {
      //that is ok
      this.updateLoggedInUserId(null);
      return;
    }

    if (response.status !== 200) {
      this.setState({
        errorMsg:
          'Failed while trying to check for login state. status code: ' +
          response.status,
      });
    } else {
      const payload = await response.json();
      this.updateLoggedInUserId(payload.userId);
      this.setState({ user: payload });
    }
  }

  updateLoggedInUserId = (userId) => {
    this.setState({ userId: userId });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <HeaderComponent
            userId={this.state.userId}
            updateLoggedInUserId={this.updateLoggedInUserId}
          />
          <Switch>
            <Route exact path='/item/:id' component={SingleItem} />
            <Route
              exact
              path='/'
              render={(props) => (
                <Home
                  {...props}
                  userId={this.state.userId}
                  user={this.state.user}
                />
              )}
            />
            <Route
              exact
              path='/dashboard'
              render={(props) => (
                <Dashboard {...props} userId={this.state.userId} />
              )}
            />

            <Route
              exact
              path='/login'
              render={(props) => (
                <Login
                  {...props}
                  userId={this.state.userId}
                  updateLoggedInUserId={this.updateLoggedInUserId}
                />
              )}
            />
            <Route
              exact
              path='/signup'
              render={(props) => (
                <Signup
                  {...props}
                  userId={this.state.userId}
                  updateLoggedInUserId={this.updateLoggedInUserId}
                />
              )}
            />

            <Route component={NotfoundComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
