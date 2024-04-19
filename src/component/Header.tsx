"use client";

import styled from "styled-components";

const HeaderWrap = styled.header`
  position: relative;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 3px;
    width: 100%;
    height: 2px;
    background: rgb(50, 50, 40);
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 3px;
    width: 100%;
    height: 2px;
    background: rgb(50, 50, 40);
  }
  & > h1 {
    font-size: 4rem;
    color: #333;
    padding: 0.7rem 0;
    text-align: center;
    font-family: "Times";
  }
`;

const Header = () => {
  return (
    <HeaderWrap>
      <h1>Korea Sky Air Times</h1>
    </HeaderWrap>
  );
};
export default Header;
