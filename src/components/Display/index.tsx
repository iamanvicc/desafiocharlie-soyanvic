  /* eslint-disable */
import React from "react";
import {
  DisplayContainer,
  LeftArea,
  ImgArea,
  Description,
  Row,
  Distance,
  SmallRow,
} from "./styled";

interface DisplayProps {
  icon?: string;
  title: string;
  temperature: string;
  description?: string;
  converterTemp: () => void;
  infoAdd?: InfoAddProps;
  background: string;
  heigth: string;
  opacity: string;
}

interface InfoAddProps {
  vento: string;
  umidade: string;
  pressao: string;
}

const Display: React.FC<DisplayProps> = ({
  icon,
  title,
  temperature,
  description,
  converterTemp,
  infoAdd,
  background,
  heigth,
  opacity,
}) => {
  return (
    <DisplayContainer background={background} heigth={heigth} opacity={opacity}>
      <LeftArea>
        {icon && <ImgArea src={icon} alt={`temperature- ${temperature}`} />}
      </LeftArea>
      <Description>
        <Row>{title}</Row>
        <Row onClick={converterTemp}>{temperature}</Row>

        {infoAdd && (
          <>
            <Distance>
              <Row>{description}</Row>
            </Distance>
            <SmallRow>VENTO : {infoAdd.vento}</SmallRow>
            <SmallRow>UMIDADE: {infoAdd.umidade}</SmallRow>
            <SmallRow>PRESSÃO: {infoAdd.pressao}</SmallRow>
          </>
        )}
      </Description>
    </DisplayContainer>
  );
};

Display.defaultProps = {
  infoAdd: undefined,
};

export default Display;
