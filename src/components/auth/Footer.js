import { useCallback } from "react";
import LinkButton from "./LinkButton";
import styled from "styled-components";

// TODO 이용약관, 개인정보 취급 방침 올바른 url 연결
const Footer = () => {
  const toPolicy = useCallback((e) => {
    const { name } = e.target;
    window.open(`/${name}`, "_blank");
  }, []);

  return (
    <Root>
      <LinkButton text="이용약관" onClick={toPolicy} />
      <LinkButton text="개인정보 취급 방침" onClick={toPolicy} />
    </Root>
  );
};

const Root = styled.div`
  box-sizing: border-box;
  width: 33.2rem;
  padding: 1rem 8rem;
`;

export default Footer;
