import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Icon } from 'react-fa';
import '../css/index.sass';



const iconStyle = {
    paddingLeft: '10px'
};


const IconWrapper = styled.div`
    height: 70px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const IconStyle = styled.div`
    width:132px;
    height:70px;
    line-height:70px;
    cursor:pointer;
    &:hover&{
       transform: scale(1.2);
    }
`;




class AddElement extends PureComponent{

    render(){
        return (
            <IconWrapper >
                <IconStyle className='anim'>
                    <span>{this.props.addElement.title}</span>
                    <Icon name='plus' style={iconStyle}/>
                </IconStyle>
           
            </IconWrapper>
        
        )
    }  


}



export default AddElement;
