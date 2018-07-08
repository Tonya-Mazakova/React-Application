import styled from 'styled-components';



const UlComments = styled.ul`
    padding: 20px;
    background-color: azure;
`;

const LiComment = styled.li`
    height: 150px;
    border-bottom: 1px solid;
`;

const InfoComment = styled.div`
    text-align: center;
    margin-top: 20px;
`;

const CommentEmail = styled.p`
    padding-top: 10px;
    margin-bottom: 7px;
    font-weight: bold;
`;

const TitleComment = styled.h2`
    margin: 20px 0;
    padding-bottom: 20px;
    border-bottom: 1px solid;
    border-width: 5px;
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