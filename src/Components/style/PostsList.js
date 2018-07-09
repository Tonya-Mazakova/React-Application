import styled from 'styled-components';



const LiPost = styled.li`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    background-color:azure;
    margin: 0 auto 10px;
    padding: 0;
    box-shadow:0 0.25rem 0.75rem rgba(0, 0, 0, .05);
`;

const BPost = styled.p`
    margin-top: 10px;
    line-height: 1.4;
    padding-right: 5px;
`;

const IconStyle = styled.span`
    width:100%;
    font-size: 15px;
    cursor: pointer;
    border-right: 1px solid #e5e5e5;
    &:last-child{
        border-right:none;
    }
    &:hover&{
        //color:#007bff;
        color: #05F2AE;
    }
`;

const WrapPost = styled.div`
    padding: 12px 0 0 12px;
    justify-content: space-between;
`;

const WrapTitle = styled.div`
    justify-content: space-between;
`;

const Loading = styled.p`
    text-align: center;
    margin-top: 30px;
`;

const IconWrap = styled.div`
    padding: 5px;
`;

const WrapAddPost = styled.div`
    width: 100px;
    text-align: right;
`;

const Wrapper = styled.div`
    justify-content: flex-end;
`;



export{
    LiPost,
    BPost,
    IconStyle,
    WrapPost,
    WrapTitle,
    Loading,
    IconWrap,
    WrapAddPost,
    Wrapper
}
