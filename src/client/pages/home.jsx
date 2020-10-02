import React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      bidValue: '',
      user: '',
      activeItem: '',
    };
  }
  componentDidMount() {
    this.checkIfAlreadyLoggedIn();
    this.fetchItems();
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

    const payload = await response.json();

    this.setState({ user: payload });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const url = `/api/bidding/${this.state.activeItem}/${this.state.bidValue}`;
    let response;
    try {
      response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const items = await response.json();
      this.setState({ items: items.items, loading: false });
    } catch (err) {
      throw err;
    }
  };

  handleChangeStatus = async (id) => {
    this.setState({ loading: true });
    const url = `/api/user/item/${id}`;
    let response;
    try {
      response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const items = await response.json();

      this.setState({ items: items.items, loading: false });
    } catch (err) {
      console.log(err);
    }
  };

  fetchItems = async () => {
    const url = '/api/items';
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
        return;
      }
      const items = await response.json();

      this.setState({ items, loading: false });
    } catch (err) {
      this.setState({ errorMsg: 'Failed to connect to server: ' + err });
      return;
    }
  };

  render() {
    if (this.state.errorMsg) {
      return <h1>{this.state.errorMsg}</h1>;
    }

    return (
      <div>
        <div className='container'>
          <h1>Auction / Bidding</h1>
          <h2>See All the Auction Items</h2>
          {this.state.loading ? (
            <h5>loading...</h5>
          ) : (
            this.state.items.map((elem) => (
              <div key={elem.id}>
                <h2>{elem.title}</h2>

                {elem.bids.length ? (
                  <h4>Highest Bid {Math.max(...elem.bids)}</h4>
                ) : (
                  'No Active Bids'
                )}

                <img src={elem.image} alt={elem.title} className='item' />
                <br />
                <Link className='btn' to={`/item/${elem.id}`}>
                  See More
                </Link>
                {this.state.user !== '' &&
                this.state.user.user._id == elem.createdBy ? (
                  <button
                    onClick={() => {
                      this.handleChangeStatus(elem.id);
                    }}
                  >
                    {elem.status ? 'Sold' : 'Change Role Sold'}
                  </button>
                ) : (
                  ''
                )}
                {this.state.user !== '' ? (
                  <>
                    {this.state.user.user._id == elem.createdBy ? (
                      ''
                    ) : (
                      <form onSubmit={this.onSubmit}>
                        <input
                          type='text'
                          onChange={(e) =>
                            this.setState({
                              bidValue: e.target.value,
                              activeItem: elem.id,
                            })
                          }
                        />
                        <button>Add Bid</button>
                      </form>
                    )}
                  </>
                ) : (
                  ''
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}
