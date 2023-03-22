import styled from 'styled-components';

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
`;

export const Title = styled.h2`
  font-size: 38px;
  margin-bottom: 25px;
  text-align: center;
`;

export const ErrorDiv = styled.div`
  background-color: #e65a5a;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 350px;
  max-width: 550px;
  padding: 50px 0;
  margin: 75px auto 0;

  & h1 {
    margin: 0 0 10px 0;
  }

  & p {
    margin: 2px;
    text-align: center;
  }
`;

export const SuggestionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 350px;
  max-width: 550px;
  margin: 20px auto 0;

  & > div > a {
    padding: 0 15px
  }
`;