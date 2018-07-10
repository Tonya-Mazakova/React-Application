import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import '../css/index.sass';



class Popup extends PureComponent {
    constructor(props){
        super(props);
        this.state={
          todo:'',
          title:'',
          topicPopup:'',
          textPopup:''
        };
        this.closePopup = this.closePopup.bind(this);
        this.renderPopup = this.renderPopup.bind(this);
        this.handleChangeTopic = this.handleChangeTopic.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
      }

    closePopup(todo) {
      this.props.closePopup(todo, this.state.topicPopup, this.state.textPopup);
    }    

    handleChangeTopic(e){
      let value = e.target.value;
      this.setState({ topicPopup: value});
    }

    handleChangeText(e){
      let value = e.target.value;
      this.setState({ textPopup: value});
    }
    
    renderPopup(){     
      return(
      <div>
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content color-base">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">{this.props.popup.title}</h5>
                <button type="button" className="close rotate-close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className="size-close">&times;</span>
                </button>
                </div>
              <div className="modal-body">
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>{this.closePopup(this.props.popup.todo)}}>Ok</button>
                </div>
              </div>
            </div>
          </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content color-base">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{this.props.popup.title}</h5>
                <button type="button" className="close rotate-close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className="size-close">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">{this.props.popup.topicInput}</label>
                  <input type="text" className="form-control" id="recipient-name" onChange={this.handleChangeTopic}/>
                </div>
                <div className="form-group">
                  <label htmlFor="message-text" className="col-form-label">{this.props.popup.textInput}</label>
                  <textarea className="form-control" id="message-text" onChange={this.handleChangeText}></textarea>
                </div>
                </form>
              </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>{this.closePopup(this.props.popup.todo)}}>Ok</button>
            </div>
          </div>
        </div>
      </div>  
    </div>
      )
    }

    render() {
      return (<div>{this.renderPopup()}</div>)
      }
    }
 

  const mapStateToProps = state => {
    return {
      posts: state.postsReducer.items,
      loadingPosts: state.postsReducer.loading,
      errorPosts: state.postsReducer.error,
    };
};



export default withRouter(connect(mapStateToProps)(Popup));