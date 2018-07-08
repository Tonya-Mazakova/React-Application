import { combineReducers } from 'redux';
import { 
    FETCH_POSTS_BEGIN, 
    FETCH_POSTS_SUCCESS, 
    FETCH_POSTS_FAILURE,
    FETCH_COMMENTS_BEGIN, 
    FETCH_COMMENTS_SUCCESS, 
    FETCH_COMMENTS_FAILURE, 
    ADD_POST,
    DELETE_POST,
    EDIT_POST,
    SORT_POSTS,
    ADD_COMMENT
} from '../Actions/actions';




const initialStatePosts = {
    items: [],
    loading: false,
    error: null
  };


const addingPost = (action, state) => {
  let items = state.items, date = null;
  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };
  date = randomDate(new Date(2012, 0, 1), new Date());
  action.payload.date = date;
  items.push(action.payload);
  return {
    ...state,
  items:[...items]
  }
};


const deletePost = (action, state)=>{
  let itemsFilter = state.items.filter((post) =>
    post.id !== action.payload.id
  );
 return {...state, items:itemsFilter};
};

const editPost = (action, state)=>{
  let itemsEdit = state.items.map((post)=>{
    if(post.id === action.payload.id){
        post.title = action.payload.title;
        post.body = action.payload.body;
      return post;
    }
    return post;  
  })  
 return {...state, items:itemsEdit};
};

const sortPosts = (action, state)=>{
  let itemsSort=[];
 /* if(action.payload.val === 'sort-0' && state.items){

  }*/
  switch(action.payload.val){
    case 'sort-0':
    case 'sort-1':
      itemsSort = state.items.reverse(); 
      return{
      ...state, 
      items:[...itemsSort]
    };
    default:
      return state;
  }

};




function postsReducer(state = initialStatePosts, action) {
  let MyState = null;
    switch(action.type) {
      case FETCH_POSTS_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_POSTS_SUCCESS:   
        let date = null, items = [];
        function randomDate(start, end) {
          return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        };
        items = action.payload.map((post)=>{
          date = randomDate(new Date(2012, 0, 1), new Date());
          post.date = date;
          return post; 
        });

        return{
          ...state,
          loading:false,
          items:items
        }  
    
      case FETCH_POSTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          items: []
        };

      case ADD_POST:  
        MyState = addingPost(action, state);
        return MyState;

      case DELETE_POST:
        return MyState = deletePost(action, state);
      
      case EDIT_POST:
        return MyState = editPost(action, state);  

      case SORT_POSTS:
        return MyState = sortPosts(action, state); 
      
        default:
        return state;
    }
};  




const initialStateComments = {
  items: [],
  loading: false,
  error: null
};

const addingComment = (action, state) => {
  let items = state.items;
  items.push(action.payload);
  return {
    ...state,
  items:[...items]
  }
};


function commentsReducer(state = initialStateComments, action) {
  let MyState = null;
  switch(action.type) {
    case FETCH_COMMENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_COMMENTS_SUCCESS:   
      return {
        ...state,
        loading: false,
        items:action.payload
      };
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };
    case ADD_COMMENT:  
        MyState = addingComment(action, state);
        return MyState;
    default:
      return state;
  }
};  





const rootReducer  = combineReducers({
    postsReducer,
    commentsReducer
});





export default rootReducer;