import styled from 'styled-components';



const IconWrap = styled.div`
    height: 70px;
    justify-content: flex-end;
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



export {
    IconWrap,
    IconStyle
}