import React, { Component } from 'react';
import InputFormComponent from '../components/input-form-component';
import { withRouter, Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      password: '',
      errorMsg: null,
    };
  }

  onUserIdChange = (event) => {
    this.setState({ userId: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  doLogIn = async () => {
    const { userId, password } = this.state;

    const url = '/api/login';

    const payload = { userId: userId, password: password };

    let response;

    try {
      response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      this.setState({ errorMsg: 'Failed to connect to server: ' + err });
      return;
    }

    if (response.status === 401) {
      this.setState({ errorMsg: 'Invalid userId/password' });
      return;
    }

    if (response.status !== 204) {
      this.setState({
        errorMsg:
          'Error when connecting to server: status code ' + response.status,
      });
      return;
    }

    this.setState({ errorMsg: null });
    this.props.updateLoggedInUserId(userId);
    this.props.history.push('/dashboard');
  };

  render() {
    let error = <div />;
    if (this.state.errorMsg) {
      error = (
        <div className='errorMsg'>
          <p>{this.state.errorMsg}</p>
        </div>
      );
    }

    return (
      <div className='form-container'>
        <h3>Log in User</h3>

        <InputFormComponent
          type='text'
          value={this.state.userId}
          onChange={this.onUserIdChange}
          label='Username'
        />
        <InputFormComponent
          type='password'
          value={this.state.password}
          onChange={this.onPasswordChange}
          label='Password'
        />
        {error}
        <button onClick={this.doLogIn}>Log in</button>
        <br />
        <Link to='/signup'>Dont have account ? click here to signup.</Link>
      </div>
    );
  }
}

export default withRouter(Login);
