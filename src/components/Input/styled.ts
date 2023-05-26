  /* eslint-disable */

import styled from "styled-components";

// Aqui estão as configurações do componente input:
export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 25px;
  font-size: 3vw;
  font-weight: 600;
  color: #d3d3d3;
  font-family: "MeteoconsRegular", sans-serif;
  text-align: center;
  border: none;

  &::focus {
    outline: none;
  }
`;

export const Img = styled.img`
  width: 4%;
  height: 50%;
  margin: 40px;
  align-self: center;
  position: absolute;
`;
