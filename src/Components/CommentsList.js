import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { addComment } from '../Actions/actions';
import '../css/index.sass';
import { UlComments, LiComment, InfoComment, 
         CommentEmail, TitleComment, WrapComments } from './style/CommentsList';
import Likes from '../Components/Likes';
import AddElement from '../Components/AddElement';
import Popup from '../Components/Popup';



class CommentsList extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            id: 501,
            addElement:{
                title: 'Add comment'
            },
            popup:{
                title: "Add comment",
                todo: 'add comment',
                body:'',
                topicInput:'Enter your email',
                textInput:'Enter your comment'
            }
      };
        this.closePopup = this.closePopup.bind(this);
    }

    closePopup(todo, title, body){
      if(todo === 'add comment'){
        this.props.addComment(title, body, this.state.id, this.props.id);
        document.getElementById('recipient-name').value = '';
        document.getElementById('message-text').value = '';
        let id = this.state.id;
               id++;
        this.setState(prevState => ({
            ...prevState,
            id: id
            }))
        }
    };        
  
    render(){
        if (this.props.error) {
            return <InfoComment>Error! {this.state.error.message}</InfoComment>;
          }
      
          if (this.props.loading) {
            return <InfoComment>Loading...</InfoComment>;
          }
            const renderComments = this.props.comments.map((comment)=>{
                if(comment.postId === this.props.id){
                    return (
                        <LiComment key = {comment.id}>
                            <CommentEmail>{comment.email}</CommentEmail>
                            <p>{comment.body}</p>
                            <Likes/>
                        </LiComment>)   
                }
           return null;
        })

        return (
          <div>
            <div data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" >
                <AddElement addElement={this.state.addElement} />
           </div>
           <WrapComments>
            <TitleComment>Comments</TitleComment> 
            <UlComments> 
                {renderComments} 
            </UlComments>  
           </WrapComments> 
          <Popup  closePopup={this.closePopup}
                        popup={this.state.popup}
                    />
          </div>)
    }      

}



const mapStateToProps = state => {
    return {
      comments: state.commentsReducer.items,
      loading: state.commentsReducer.loading,
      error: state.commentsReducer.error
    
    };
};

const mapDispatchToProps =  {
    addComment
  };



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsList));