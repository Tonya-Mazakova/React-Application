import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {Icon} from 'react-fa';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import '../css/index.sass';





const PopupWrap = styled.div`
    display:${(props) => props.showPopup ? 'block' : 'none'};
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0,0,0, 0.5);
`; 

const PopupInner = styled.div`
    text-align: center;
    position: absolute;
    left: ${(props) => props.edit ? '27%' : '30%'};
    right: ${(props) => props.edit ? '27%' : '30%'};
    top: ${(props) => props.edit ? '20%' : '30%'};
    bottom: ${(props) => props.edit ? '20%' : '30%'};
    margin: 0 auto;
    padding: 15px 25px 0 25px;
    background-color: lightgoldenrodyellow;
`; 

const TitlePopup = styled.h2`
    margin-top: ${(props) => props.edit ? '10px' : '35px'};
`;


const FormPopup = styled.form`
    display: flex;
    flex-direction:column;
    margin-top: ${(props) => props.edit ? '10px' : '70px'};
    line-height: 35px;
`;

const InputTopic = styled.input`
    height: 40px;
    width: 100%;
    margin: 0 auto;
`;

const TextareaPopup = styled.textarea`
    margin: 0 auto;
    height: 235px;
    width: 100%;
`;

const ButtonPopup = styled.button`
    font-weight: bold;
    height: 40px;
    width: 160px;
    cursor: pointer;
    background-color: ${(props) => props.publish ? 'greenyellow' : 'transparent'};
    margin-right: ${(props) => props.publish ? '0' : '20px'};
    border: ${(props)=>props.publish ? 'none' : '1px solid greenyellow'};
    &:hover&{
        opacity: 0.8;
        border: ${(props)=>props.publish ? 'none' : '2px solid greenyellow'};
    }
`;

const ButtonWrap = styled.div`
    margin-top: 10px;
    
`;

class Popup extends PureComponent {
    constructor(props){
        super(props);
        this.state={
          topicPopup:'',
          textPopup:'',
          hoverClose: false
        };
        this.closePopup = this.closePopup.bind(this);
        this.renderPopup = this.renderPopup.bind(this);
        this.handleChangeTopic = this.handleChangeTopic.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
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

    toggleHover(){
      this.setState({
        hover: !this.state.hover
      })
    }

    renderPopup(){

      if(this.props.propsPopup.todo === 'delete post'){
        return (
        <PopupWrap showPopup={this.props.propsPopup.showPopup}>
            <PopupInner>
              <TitlePopup>{this.props.propsPopup.title}</TitlePopup>
              <Icon onClick={this.props.closePopup} name="times" className='icon-close'/>
                  <FormPopup>
                    <ButtonWrap>
                      <ButtonPopup onClick={this.props.closePopup} type="button">Cancel</ButtonPopup>
                      <ButtonPopup onClick={()=>{this.closePopup(this.props.propsPopup.todo)}} publish type="button">Ok</ButtonPopup>
                    </ButtonWrap>
                  </FormPopup>   
          </PopupInner>
        </PopupWrap>)
      }
      else if(this.props.propsPopup.todo === 'edit post' || 'add post' || 'add comment'){
        let id = '';
        switch(this.props.propsPopup.todo){
          case 'edit post':
            id = 'EditPost';
          break;
          case 'add post':
            id = 'AddPost';
          break;  
          case 'add comment':
            id = 'AddComment';
          break;
          default:
            id = '';
        }
         
       return (
          <PopupWrap id='Popup' showPopup={this.props.propsPopup.showPopup}>
            <PopupInner edit>
              <TitlePopup edit>{this.props.propsPopup.title}</TitlePopup>
              <Icon onClick={this.props.closePopup} name="times" className='icon-close'/>
                  <FormPopup edit>
                    <label htmlFor="topic">{this.props.propsPopup.titleInput}</label><InputTopic id={"input"+id} type="text" onChange={this.handleChangeTopic}/>
                    <label htmlFor="text">{this.props.propsPopup.titleTextarea}</label><TextareaPopup id={"text"+id} type="text" onChange={this.handleChangeText}/>
                    <ButtonWrap>
                      <ButtonPopup onClick={this.props.closePopup} type="button">Cancel</ButtonPopup>
                      <ButtonPopup onClick={()=>{this.closePopup(this.props.propsPopup.todo)}} publish type="button">Ok</ButtonPopup>
                    </ButtonWrap>
                  </FormPopup>   
            </PopupInner>
          </PopupWrap>)  
        }
    }

    render() {
      return(
        <div>{this.renderPopup()}</div>
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



export default withRouter(connect(mapStateToProps)(Popup));