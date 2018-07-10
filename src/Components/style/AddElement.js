import styled from 'styled-components';


const Wrap = styled.div`
    height: 70px;
    justify-content: flex-end;
`;

const IconWrap = styled.div`
    position: relative;
    top: -90px;
`;

const IconStyle = styled.div`
    height:70px;
    line-height:70px;
    cursor:pointer;
    &:hover&{
       //transform: scale(1.2);
    }
`;



export {
    Wrap,
    IconWrap,
    IconStyle
}