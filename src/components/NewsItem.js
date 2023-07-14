import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className='my-3'>
            <div className="card" style={{ width: "18rem" }}>
                <div style={{ display: "flex", justifyContent: 'flex-end', position: 'absolute', right: 0 }}>
                    <span className="badge rounded-pill bg-danger" style={{ left: '87%' }}>
                        {source}
                    </span>
                </div>
                <img src={imageUrl ? imageUrl : 'https://cdn.mos.cms.futurecdn.net/eiHmqCXcRz2p9sXFTesQy5-1200-80.jpg'} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="card-text">By {author ? author : 'Unknown Source'} on {new Date(date).toGMTString()} </small> </p>
                    <a href={`${newsUrl}`} target='_blank' rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem;