import styled from 'styled-components';



const UlComments = styled.ul`
    background-color: azure;
`;

const LiComment = styled.li`
    height: 150px;
    border-bottom: 1px solid;
    padding-top: 10px;
`;

const InfoComment = styled.div`
    text-align: center;
    margin-top: 20px;
`;

const CommentEmail = styled.p`
    margin-bottom: 7px;
    font-weight: bold;
`;

const TitleComment = styled.h3`
    margin: 20px 0;
    border-bottom: 1px solid;
    border-width: 3px;
`;

const WrapComments = styled.div`
    background-color: azure;
    padding: 15px;
`;



export{
    UlComments,
    LiComment,
    InfoComment,
    CommentEmail,
    TitleComment,
    WrapComments
}