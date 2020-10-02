import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  doLogout = async () => {
    const url = '/api/logout';

    let response;

    try {
      response = await fetch(url, { method: 'post' });
    } catch (err) {
      alert('Failed to connect to server: ' + err);
      return;
    }

    if (response.status !== 204) {
      alert('Error when connecting to server: status code ' + response.status);
      return;
    }

    this.props.updateLoggedInUserId(null);
    this.props.history.push('/');
  };

  renderLoggedIn(userID) {
    return (
      <div className='right-options'>
        <p className='right-option'>Signed in as {userID}</p>
        <Link to='/dashboard' className='right-option'>
          Dashboard
        </Link>
        <a className='right-option' onClick={this.doLogout}>
          Logout
        </a>
      </div>
    );
  }

  renderNotLoggedIn() {
    return (
      <div className='right-options'>
        <p className='right-option'>You're not logged in</p>
        <Link to='/login' className='right-option'>
          Login
        </Link>
      </div>
    );
  }

  render() {
    const userId = this.props.userId;

    let content;
    if (!userId) {
      content = this.renderNotLoggedIn();
    } else {
      content = this.renderLoggedIn(userId);
    }

    return (
      <div className='header'>
        <div className='left-options'>
          <Link to='/' className='left-option'>
            Home
          </Link>
        </div>

        {content}
      </div>
    );
  }
}

export default withRouter(HeaderComponent);
