import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    width: 100%;
    background: #f3f2f2;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

    padding: 22px 26px;

    h1 {
      font-size: 48px;
      font-weight: 700;
      color: #547eff;
      flex: 1;
      text-align: center;
    }

    div {
      margin: 0 auto;
      width: 100%;
      max-width: 1100px;
      display: flex;
      align-items: center;
    }

    button {
      border: 0;
      background: transparent;

      svg {
        color: #547eff;
        transition: color 0.5s;

        &:hover {
          color: ${shade(0.1, '#547EFF')};
        }
      }
    }
  }
`;

export const UseListContainer = styled.main`
  width: 100%;
  max-width: 1100px;
  margin: 80px auto 26px auto;
  background: #fff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 41px;

    .search-input {
      min-width: 450px;
      height: 50px;
    }

    > div:last-of-type {
      display: flex;
      align-items: center;
    }

    h2 {
      font-size: 24px;
      font-weight: 500;
      color: #547eff;
    }

    span {
      font-size: 12px;
      font-weight: 400;
      color: #9f9999;
    }

    button {
      border: 0;
      padding: 13px;
      border-radius: 10px;
      background: #f3f2f2;
      margin-right: 15px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

      display: flex;
      align-items: center;
      justify-content: center;

      transition: background-color 0.75s;

      svg {
        transition: color 0.5s ease;
        color: #547eff;
      }

      &:hover {
        background: ${shade(0.1, '#547eff')};

        svg {
          color: #fff;
        }
      }
    }
  }
`;

export const UserListContent = styled.div`
  width: 100%;
  margin-top: 21px;

  max-height: 700px;
  height: 100%;
  overflow-y: auto;
`;

export const UserListColumnTitles = styled.div`
  width: 100%;
  background: #e5e5e5;
  padding: 10px 41px;
  display: grid;
  grid-template-columns: minmax(150px, 350px) 150px 200px 130px repeat(2, 80px);
  grid-gap: 22px;

  strong {
    color: #222222;
    font-weight: 500;
    font-size: 18px;
  }
`;

export const UserListItemContent = styled.div`
  padding: 20px 41px 20px 41px;
  display: grid;
  grid-template-columns: minmax(150px, 350px) 150px 200px 130px repeat(2, 80px);
  grid-gap: 22px;
  align-items: center;

  & + div {
    border-top: 1px solid #c4c4c4;
  }

  span {
    color: #222;
    font-size: 16px;
    font-weight: 400;
  }

  button {
    border: 0;
    background: transparent;
    margin-top: 8px;

    svg {
      color: #547eff;
      transition: color 0.5s;

      &:hover {
        color: ${shade(0.1, '#547EFF')};
      }
    }
  }
`;
