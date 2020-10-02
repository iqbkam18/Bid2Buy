import React from 'react';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      errorMsg: '',
      description: '',
      title: '',
      price: '',
      imageUrl: '',
    };
  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.fetchUserItems();
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { title, description, price, imageUrl } = this.state;

    const body = {
      title,
      description,
      price,
      imageUrl,
    };

    console.log(body);

    const url = '/api/add/item';
    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data) {
        this.setState({ items: data.items, loading: false });
      }
    } catch (err) {
      this.setState({ errorMsg: 'Failed to connect to server: ' + err });
      return;
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchUserItems = async () => {
    const url = '/api/user/items';
    let response;
    try {
      response = await fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200 && response.status !== 204) {
        this.setState({
          errorMsg:
            'Error when connecting to server: status code ' + response.status,
        });
        setTimeout(() => {
          this.props.history.push('/');
        }, 1000);
        return;
      }
      const data = await response.json();

      this.setState({ items: data.items, loading: false });
    } catch (err) {
      this.setState({ errorMsg: 'Failed to connect to server: ' + err });
      return;
    }
  };

  render() {
    if (this.state.errorMsg) {
      return <h1>Please Login To View Dashboard Information</h1>;
    }
    return (
      <div>
        <div className='container'>
          <h1>Your Items</h1>

          <h3>Add New Items</h3>
          <form onSubmit={this.onSubmit}>
            <input
              onChange={(e) => {
                this.setState({
                  title: e.target.value,
                });
              }}
              type='text'
              placeholder='Title'
            />
            <input
              onChange={(e) => {
                this.setState({
                  price: e.target.value,
                });
              }}
              type='text'
              placeholder='Starting price'
            />
            <input
              onChange={(e) => {
                this.setState({
                  imageUrl: e.target.value,
                });
              }}
              type='text'
              placeholder='Add Image Url'
            />
            <input
              onChange={(e) => {
                this.setState({
                  description: e.target.value,
                });
              }}
              type='text'
              placeholder='Description'
            />
            <input type='submit' value='Add Product' />
          </form>
          {this.state.loading ? (
            <h5>loading...</h5>
          ) : (
            this.state.items.map((elem) => (
              <div key={elem.id}>
                <h2>{elem.title}</h2>
                <h5>Total Bids ({elem.bids.length})</h5>
                <img src={elem.image} alt={elem.title} className='item' />
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}
