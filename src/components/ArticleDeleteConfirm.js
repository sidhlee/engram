const ArticleDeleteConfirm = ({ cancelDelete, deleteArticle }) => {
  return (
    <div className="ArticleDeleteConfirm">
      <p>Delete article?</p>
      <button className="button-sm button-success" onClick={cancelDelete}>
        Cancel
      </button>
      <button className="button-sm button-danger" onClick={deleteArticle}>
        Delete
      </button>
    </div>
  );
};

export default ArticleDeleteConfirm;
