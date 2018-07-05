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
                title: "",
                showPopup: false,
                todo: '',
                body:'',
                titleInput:'',
                titleTextarea:''
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
          this.setState({
            propsPopup:{
              title: 'Add comment',
              todo: 'add comment',
              titleInput:'Eneter your email',
              titleTextarea:'Enter your comment',
              showPopup: !this.state.showPopup    
            } 
          })
        }

    closePopup(todo, title, body){
        if(todo === 'add comment'){
         this.props.addComment(title, body, this.state.id, this.props.propsComments.idPost);
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
              titleInput:'',
              titleTextarea:'',
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
        comments: state.commentsReducer.items,
        loading: state.commentsReducer.loading,
        error: state.commentsReducer.error,
    };
};

const mapDispatchToProps =  {
    addComment
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddComment));






