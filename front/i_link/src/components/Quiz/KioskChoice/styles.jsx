import styled from "styled-components";

const Square = styled.div`
  display: inline-block;
  position: relative;
  width: 90%;

  ::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
export default Square;
