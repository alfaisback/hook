import React, { Component } from 'react';

class NewsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsData: [],
      loading: true,
      searchQuery: '',
    };

    this.apiKey = '7740326d44ef443fa986f7be54b362ae';
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { searchQuery } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=business${encodeURIComponent(
      searchQuery
    )}&from=2023-05-01&sortBy=publishedAt&apiKey=${this.apiKey}`;

    this.setState({ loading: true });

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          loading: false,
          newsData: data.articles || [],
        });
      })
      .catch((error) => console.log(error));
  };

  handleSearch = () => {
    this.fetchData();
  };

  render() {
    const { newsData, loading, searchQuery } = this.state;

    const loadingComponent = (
      <div className="col-12 text-center mt-5" id="loadingGun">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

    const createCard = (newsData) => {
      if (newsData && newsData.length > 0) {
        return newsData.map((news) => (
          <div
            className="card col-lg-4 mx-auto my-3"
            style={{ width: '20rem' }}
            key={news.title}
          >
            <img
              src={news.urlToImage}
              className="card-img-top py-2"
              alt="img"
            />
            <div className="card-body">
              <h5 className="card-title">{news.title}</h5>
              <p className="card-text">{news.description}</p>
              <a href={news.url} className="btn btn-primary">
                Read more
              </a>
            </div>
          </div>
        ));
      } else {
        return (
          <div className="col-12 text-center mt-5 alert alert-warning">
            Data not found
          </div>
        );
      }
    };

    return (
      <div>
        <div className="input-group mt-5 mx-auto w-75">
          <input
            type="text"
            className="form-control rounded"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => this.setState({ searchQuery: e.target.value })}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleSearch}
          >
            Submit
          </button>
        </div>
        {loading ? loadingComponent : null}
        <div className="container">
          <div className="row">{createCard(newsData)}</div>
        </div>
      </div>
    );
  }
}

export default NewsComponent;
