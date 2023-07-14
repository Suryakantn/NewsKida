import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
// import newJson from '../SampleOutput.json'
export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitaliseText(this.props.category)} - News Kida`
    }
    capitaliseText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    async componentDidMount() {
        this.props.setProgress(10);
        this.setState({
            pageSize: this.props.pageSize
        });
        let data = await this.getNewsHead(this.state.page, this.props.pageSize);
        this.setState({
            articles: data.articles,
            totalResults: data.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    async getNewsHead(page, pageSize) {
        this.setState({ loading: true });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.newsapikey}&page=${page}&pageSize=${pageSize}`;
        let data = await fetch(url);
        data = await data.json();
        this.props.setProgress(70);
        return data;
    }
    onPreviousClick = async () => {
        if (this.state.page > 1) {
            let data = await this.getNewsHead(this.state.page - 1, this.state.pageSize);
            this.setState({
                articles: data.articles,
                page: this.state.page - 1,
                loading: false
            });
        }
    }
    onNextClick = async () => {
        if (Math.ceil(this.state.totalResults / this.state.pageSize) > this.state.page) {
            let data = await this.getNewsHead(this.state.page + 1, this.state.pageSize);
            this.setState({
                articles: data.articles,
                page: this.state.page + 1,
                totalPages: Math.ceil(this.state.totalResults / this.state.pageSize),
                loading: false
            });
        }
    }
    fetchMoreData = async () => {
        if (Math.ceil(this.state.totalResults / this.state.pageSize) > this.state.page) {
            let data = await this.getNewsHead(this.state.page + 1, this.state.pageSize);
            this.setState({
                articles: this.state.articles.concat(data.articles),
                page: this.state.page + 1
            });
        } else {
            this.setState({
                loading: false
            });
        }
    }
    render() {
        return (
            <>
                <h1 className='text-center  my-2'>News Kida - {this.capitaliseText(this.props.category)} Top headings</h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={this.state.loading && <Loader />}
                >
                    <div className='container'>
                        <div className='row'>
                            {this.state.articles.map((elem, index) => {
                                return (
                                    <div className="col md4" key={`${elem.url}-${index}`}>
                                        <NewsItem title={elem.title?.slice(0, 45)} description={elem.description?.slice(0, 88)} newsUrl={elem.url}
                                            imageUrl={elem.urlToImage} author={elem.author} date={elem.publishedAt} source={elem.source.name} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark"
                        onClick={this.onPreviousClick}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page >= this.state.totalPages} className="btn btn-dark"
                        onClick={this.onNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
} 
