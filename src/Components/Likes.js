import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {Icon} from 'react-fa';
import '../css/index.sass';


const Wrapper = styled.div`
    display: flex;
    flex-direction: row;  
    justify-content: flex-end;
    align-items: baseline;
    margin-top: 15px;  
`;



class Likes extends PureComponent {

    constructor(props){
      super(props);
      this.state ={
        likes: 13,
        updated: false
      }
      this.updateLikes = this.updateLikes.bind(this);
    }
  
    updateLikes() {
      if(!this.state.updated) {
        this.setState((prevState, props) => {
          return {
            likes: prevState.likes + 1,
            updated: true
          };
        });
      } else {
        this.setState((prevState, props) => {
          return {
            likes: prevState.likes - 1,
            updated: false
          };
        });
      }
    }
  
    render(){
  
      return(
        <Wrapper>
          <Icon name='thumbs-up' onClick={this.updateLikes} className='icon-style'/>
          <p>{this.state.likes}</p>
        </Wrapper>
      );
  
    }
  }
  


  export default Likes;
  