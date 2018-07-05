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
            propsPopup:{
                showPopup: false,
                todo: '',
                title:'',
                body:'',
                titleInput:'',
                titleTextarea:''
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
          this.setState({
            propsPopup:{
              title: 'Add post',
              todo: 'add post',
              titleInput:'Topic of the post',
              titleTextarea: 'Post text',
              showPopup: !this.state.showPopup    
            } 
          })
        }

    closePopup(todo, title, body){
        if(todo === 'add post'){
            let length = this.props.posts.length,
            userId = this.props.posts[(--length)].userId; 
         this.props.addPost(title, body, this.state.id, (++userId));
         let id = this.state.id;
             id++;
            this.setState({
                id:id
        })   
        }
        this.setState({
            propsPopup:{
              title: '',
              todo: '',
              showPopup: false    
            }  
          })
    };        

    render(){
        return (
            <div>
               <AddElement propsAddElement={this.state.propsAddElement} togglePopup={this.togglePopup}/>
                <Popup  closePopup={this.closePopup}
                        propsPopup={this.state.propsPopup}
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






