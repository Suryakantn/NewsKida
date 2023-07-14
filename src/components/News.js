import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
// import newJson from '../SampleOutput.json'
const News = (props) => {
    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(false);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(5);
    const [pageSize, setpageSize] = useState(5);
    const capitaliseText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
    }, [])

    const updateNews = async () => {
        document.title = `${capitaliseText(props.category)} - News Kida`
        props.setprogress(10);
        setpageSize(props.pageSize);
        let data = await getNewsHead(page, props.pageSize);
        setarticles(data.articles);
        settotalResults(data.totalResults);
        setloading(false);
        props.setprogress(100);
    }
    const getNewsHead = async (page, pageSize) => {
        setloading(true);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.newsapikey}&page=${page}&pageSize=${pageSize}`;
        let data = await fetch(url);
        data = await data.json();
        props.setprogress(70);
        return data;
    }
    // const onPreviousClick = async () => {
    //     if (page > 1) {
    //         let data = await getNewsHead(page - 1, pageSize);
    //         setarticles(data.articles);
    //         setpage(page - 1);
    //         setloading(false);
    //     }
    // }
    // const onNextClick = async () => {
    //     if (Math.ceil(totalResults / pageSize) > page) {
    //         let data = await getNewsHead(page + 1, pageSize);
    //         setarticles(data.articles);
    //         setpage(page + 1);
    //         setloading(false);
    //     }
    // }
    const fetchMoreData = async () => {
        props.setprogress(10);
        if (Math.ceil(totalResults / pageSize) > page) {
            let data = await getNewsHead(page + 1, pageSize);
            setarticles(articles.concat(data.articles));
            setpage(page + 1);
        } else {
            setloading(false);
        }
        props.setprogress(100);
    }
    return (
        <>
            <h1 className='text-center' style={{ marginBottom: '35px', marginTop: '90px' }}>News Kida - {capitaliseText(props.category)} Top headings</h1>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={true}
                loader={loading && <Loader />}
            >
                <div className='container'>
                    <div className='row'>
                        {articles.map((elem, index) => {
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
                    <button type="button" disabled={page <= 1} className="btn btn-dark"
                        onClick={onPreviousClick}>&larr; Previous</button>
                    <button type="button" disabled={page >= totalPages} className="btn btn-dark"
                        onClick={onNextClick}>Next &rarr;</button>
                </div> */}
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News;