export const FETCH_POSTS_BEGIN   = 'FETCH_POSTS_BEGIN';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_COMMENTS_BEGIN   = 'FETCH_COMMENTS_BEGIN';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';
export const ADD_POST = 'ADD_POST';
export const ADD_DATE_POST = 'ADD_DATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const SORT_POSTS = 'SORT_POSTS';
export const ADD_COMMENT = 'ADD_COMMENT';






export function fetchPosts() {
  return dispatch => {
    dispatch(fetchPostsBegin());
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchPostsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchPostsFailure(error)));
  };
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};




export const fetchPostsBegin = () => ({
  type: FETCH_POSTS_BEGIN
});


export const fetchPostsSuccess = (posts) =>({
  type: FETCH_POSTS_SUCCESS,
  payload: posts
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: { error }
});

export const addPost = (theme, text, id, userId) => ({
  type: ADD_POST,
  payload: {title: theme, body: text, id: id, userId}

});

export const addDateToPost = (theme, text, id, userId) => ({
  type: ADD_DATE_POST,
  payload: {title: theme, body: text, id: id, userId}

});

export const deletePost = id =>({
  type: DELETE_POST,
  payload: {id:id}
});

export const editPost = (theme, text, id) => ({
  type: EDIT_POST,
  payload: {title: theme, body: text, id: id}

});

export const sortPosts = (val) => ({
  type: SORT_POSTS,
  payload: {val: val}

});



export function fetchComments() {
  return dispatch => {
    dispatch(fetchCommentsBegin());
    return fetch("https://jsonplaceholder.typicode.com/comments")
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchCommentsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchCommentsFailure(error)));
  };
};



export const fetchCommentsBegin = () => ({
  type: FETCH_COMMENTS_BEGIN
});


export const fetchCommentsSuccess = (comments) =>({
  type: FETCH_COMMENTS_SUCCESS,
  payload: comments
});

export const fetchCommentsFailure = (error) => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: { error }
});

export const addComment = (email, text, id, postId) => ({
  type: ADD_COMMENT,
  payload: {email: email, body: text, id: id, postId}

});





