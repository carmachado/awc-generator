import styled from "styled-components";

export const Outer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 100%;
`;

export const Title = styled.h1`
  font-size: 48px;
  max-width: 500px;
  line-height: 56px;

  margin-top: 0;
  text-align: center;
  color: var(--color-primary);
`;

export const Footer = styled.footer`
  margin: 0 auto;
  padding-top: 8px;

  a {
    color: var(--color-primary);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
`;

export const Childrens = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  * {
    margin-top: 8px;
  }
`;

export const Navigation = styled.nav`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: var(--color-background-nav);

  /* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens (display the links vertically instead of horizontally) */
  .div-nav {
    background-color: var(--color-background-nav);
    overflow: hidden;
    align-content: center;
    display: flex;
    a {
      float: left;
      color: var(--color-white);
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 18px;

      &.active {
        border-bottom: solid 2px var(--color-white);
      }

      &:hover {
        background-color: var(--color-background-nav-hover);
      }
    }

    button {
      background-color: transparent;
      border: none;
      padding: 14px 16px;
      height: 100%;
      color: var(--color-white);
      display: none;

      &:hover {
        background-color: var(--color-background-nav-hover);
      }
    }

    @media screen and (max-width: 600px) {
      & a:not(:first-child) {
        display: none;
      }
      & button {
        float: right;
        display: block;
      }
    }
    @media screen and (max-width: 600px) {
      &.responsive {
        position: relative;
        flex-direction: column;
      }
      &.responsive button {
        width: 50px;
      }
      &.responsive a {
        float: none;
        display: block;
        text-align: left;
      }
    }
  }
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    svg {
      margin: 0 8px;
      color: var(--color-white);
    }
  }
`;
