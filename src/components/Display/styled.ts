  /* eslint-disable */
import styled from "styled-components";
import { Colors } from "../../helpers/colors";

export const DisplayContainer = styled.div<{
  background: string;
  heigth: string;
  opacity: string;
}>`
  heigth: ${({ heigth }) => heigth};
  background: ${({ background }) => background};
  opacity: ${({ opacity }) => opacity};

  width: 100%;
  display: flex;
  flex-direction: row;
  align-itens: center;
  justify-content: space-between;
`;

export const LeftArea = styled.div`
  display: flex;
  align-itens: center;
  jstify-content: center;
  width: 50%;
`;

export const ImgArea = styled.img`
  width: 50%;
  heigth: 50%;
  align-itens: center;
`;

export const Description = styled.div`
  width: 50%;
  display: flex;
  align-itens: flex-start;
  justify-content: center;
  flex-direction: column;
`;

export const Row = styled.p<{ MouseHover?: boolean }>`
  color: ${Colors.White};
  font-size: 2.5vw;
  font-weight: 600;
  margin: 16px;

  &::hover {
    cursor: ${({ MouseHover }) => (MouseHover ? "pointer" : "")};
  }
`;

export const Distance = styled.div`
  height: 16px;
`;

export const SmallRow = styled.p`
  font-size: 1.5vw;
  line-height: 14px;
  font-weight: 600;
  margin: 14px;
  color: ${Colors.White};
`;
