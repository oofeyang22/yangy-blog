const Category = ({_id, title, summary, content, cover, createdAt,author}) => {
    return (
        <div className='post'>
        <div className='image'>
          <Link to={`/post/${_id}`}>
            <img src={'http://localhost:4000/'+cover} alt="none"/>
          </Link>

        </div>
        <div className='texts'>
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>

          <p className='info'>

            <a className='author'>{author.username}</a>
            <time>{formatISO9075(new Date(createdAt))}</time>
            {/*<time>{format(new Date(createdAt),'MMM d, yy HH:mm')}</time>*/}
          </p>
          <p className='summary'>{summary}</p>
        </div>

    </div>
    )
};

export default Category;