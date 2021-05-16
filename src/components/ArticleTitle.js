const ArticleTitle = ({ href, title }) => {
  return (
    <h3 className="article-name">
      {href ? (
        <a href={href} target="_blank" rel="noreferrer">
          {title}
        </a>
      ) : (
        <span>{title}</span>
      )}
    </h3>
  );
};

export default ArticleTitle;
