import React, { PureComponent } from 'react';
import { Icon } from 'react-fa';
import '../css/index.sass';
import { Wrap, IconWrap, IconStyle } from './style/AddElement';



class AddElement extends PureComponent{
    render(){
        console.log('Test111111');
        console.log("Test222222");
        return (
            <Wrap className="center">
                <IconStyle className='anim'>
                <div className="svg-wrapper">
                <svg height="50" width="170" xmlns="http://www.w3.org/2000/svg">
                    <rect className="shape" height="50" width="170"/>
                    </svg>
                    <IconWrap className="center">
                        <span>{this.props.addElement.title}</span>
                        <Icon name='plus' className="indent"/>
                    </IconWrap>
                    </div>
                </IconStyle>
            </Wrap>
        )
    }  
}

export default AddElement;
