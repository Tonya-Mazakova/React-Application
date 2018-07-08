import React, { PureComponent } from 'react';
import {Icon} from 'react-fa';
import '../css/index.sass';
import { LikesWrap } from './style/Likes';



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
        <LikesWrap className="center">
          <Icon name='thumbs-up' onClick={this.updateLikes} className='cursor-p'/>
          <p className="indent">{this.state.likes}</p>
        </LikesWrap>
      );
  
    }
  }
  


  export default Likes;
  