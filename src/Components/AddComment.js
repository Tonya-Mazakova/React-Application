import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../Actions/actions';
import Popup from '../Components/Popup';
import AddElement from '../Components/AddElement'; 





class AddComment extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            propsPopup:{
                title: "Add comment",
                showPopup: false,
                todo: 'add comment',
                body:'',
                titleInput:'Enter your email',
                titleTextarea:'Enter your comment'
            },
            propsAddElement:{
                title:'Add comment',
                post:null
            },
            id:501,
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
      }

    togglePopup() {
          this.setState(prevState => ({
            ...prevState,
            propsPopup:{
                ...prevState.propsPopup,
                showPopup: !this.state.showPopup 
            }
        }))
        }

    closePopup(todo, title, body){
        if(todo === 'add comment'){
         this.props.addComment(title, body, this.state.id, this.props.propsComments.idPost);
         document.getElementById('inputAddComment').value = '';
         document.getElementById('textAddComment').value = '';
         let id = this.state.id;
             id++;
           this.setState({
                id:id
        })   
        }
        this.setState(prevState => ({
            ...prevState,
            propsPopup:{
                ...prevState.propsPopup,
                showPopup: false 
            }
        }))
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
        comments: state.commentsReducer.items,
        loading: state.commentsReducer.loading,
        error: state.commentsReducer.error,
    };
};

const mapDispatchToProps =  {
    addComment
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddComment));






