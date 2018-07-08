import React, { PureComponent } from 'react';
import { Icon } from 'react-fa';
import '../css/index.sass';
import { IconWrap, IconStyle } from './style/AddElement';



class AddElement extends PureComponent{
    render(){
        return (
            <IconWrap className="center">
                <IconStyle className='anim'>
                    <span>{this.props.addElement.title}</span>
                    <Icon name='plus' className="indent"/>
                </IconStyle>
            </IconWrap>
        
        )
    }  
}



export default AddElement;
