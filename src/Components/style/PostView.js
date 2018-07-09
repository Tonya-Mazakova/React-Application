import styled from 'styled-components';


const Wrapper = styled.div`
    width: 800px;
    margin: 0 auto;
`;

const PostWrap = styled.div`
    height: 300px;
    background-color: azure;
    margin: 25px auto 0;
    border: 10px solid white;
`;

const TitleWrap = styled.div`
    height: 80px;
    border-bottom: 1px solid lightgoldenrodyellow;
    background-color: antiquewhite;
    text-align: center;
    font-size: 20px;
`;

const BodyPost = styled.div`
    padding: 20px;
    line-height: 1.5;
`;

const BackWrap = styled.a`
    justify-content: flex-end;
`;

const TitlePost = styled.h5`
    line-height: 80px;
`;



export{
    Wrapper,
    PostWrap,
    TitleWrap,
    BodyPost,
    BackWrap,
    TitlePost
}