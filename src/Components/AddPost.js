import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost } from '../Actions/actions';
import Popup from '../Components/Popup';
import AddElement from '../Components/AddElement';





class AddPost extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            popup:{
                showPopup: false,
                todo: 'add post',
                title:'Add post',
                body:'',
                titleInput:'Topic of the post',
                titleTextarea:'Post text'
            },
            id:101,
            propsAddElement:{
                title:'Add post'
            } 
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
      }


      togglePopup() {
          this.setState(prevState => ({
            ...prevState,
            popup:{
                ...prevState.popup,
                showPopup: !this.state.showPopup 
            }
        }))
        }

    closePopup(todo, title, body){
        if(todo === 'add post'){
            let length = this.props.posts.length,
            userId = this.props.posts[(--length)].userId; 
         this.props.addPost(title, body, this.state.id, (++userId));
         document.getElementById('inputAddPost').value = '';
         document.getElementById('textAddPost').value = '';
         let id = this.state.id;
             id++;
            this.setState({
                id:id
        })   
        }
        this.setState(prevState => ({
            ...prevState,
            popup:{
                ...prevState.popup,
                showPopup: false 
            }
        }))  
    };        

    render(){
        return (
            <div>
               <AddElement propsAddElement={this.state.propsAddElement} togglePopup={this.togglePopup}/>
                <Popup  closePopup={this.closePopup}
                        popup={this.state.popup}
                    />
            </div>
        )
    }  


}




const mapStateToProps = state => {
    return {
      posts: state.postsReducer.items,
      loadingPosts: state.postsReducer.loading,
      errorPosts: state.postsReducer.error,
    };
};

const mapDispatchToProps =  {
    addPost
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPost));






