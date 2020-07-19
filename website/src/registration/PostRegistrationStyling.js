import styled from "styled-components";
import Rectangle15 from "./images/Rectangle15.png";
import Rectangle16 from "./images/Rectangle16.png";
import Rectangle17 from "./images/Rectangle17.png";
import Rectangle21 from "./images/Rectangle21.png";
import Rectangle22 from "./images/Rectangle22.png";
import image22 from "./images/image22.png";
import image23 from "./images/image23.png";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PictureTextWrapper = styled.section`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const ContentWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 600px;
`;

const ButtonWrapper = styled.section`
  margin-top: 66px;
  display: flex;
  flex-direction: column;
`;
const BackArrowTop = styled.div`
  position: absolute;
  width: 15.54px;
  height: 0px;
  left: 26.65px;
  top: 49px;
  border: 2px solid #000000;
  transform: matrix(-0.71, 0.75, -0.67, -0.71, 0, 0);
`;

const BackArrowBottom = styled.div`
  position: absolute;
  width: 15.54px;
  height: 0px;
  left: 28.34px;
  top: 60.31px;
  border: 2px solid #000000;
  transform: matrix(-0.71, -0.75, 0.67, -0.71, 0, 0);
`;

const TitleText = styled.p`
  width: 261px;
  height: 53px;
  margin: 0 auto;
  margin-top: 32px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #000000;
`;

const BodyText = styled.p`
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 30px;
  width: 341px;
  height: 83px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 21px;
  text-align: center;
  color: #000000;
`;

const PictureText = styled.p`
  width: 255px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  padding-left: 30px;
  margin-bottom: 0;
`;

const Picture = styled.div`
  width: 65px;
  height: 65px;
`;

const MailPicture = styled(Picture)`
  background-image: url(${Rectangle15});
`;

const HumansPicture = styled(Picture)`
  background: url(${Rectangle16});
`;
const PenPaperPicture = styled(Picture)`
  background: url(${Rectangle17});
`;
const MagnifyPicture = styled(Picture)`
  background: url(${Rectangle21});
`;
const HandShakePicture = styled(Picture)`
  background: url(${Rectangle22});
`;

const AirplanePicture = styled.div`
  margin-top: 185px;
  margin-bottom: 58px;
  width: 94px;
  height: 94px;
  background: url(${image22});
`;

const ThumbsUpPicture = styled.div`
  margin-top: 185px;
  margin-bottom: 57px;
  width: 94px;
  height: 94px;
  background: url(${image23});
`;

const ConfirmationTitle = styled.p`
  width: 203px;
  height: 22px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #000000;
`;

const ConfirmationText = styled.p`
margin-top:46px;
  width: 343px;
  height: 41px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #000000;
`;

const WaitTitle = styled.p`
width: 273px;
height: 48px;
font-family: Proxima Nova;
font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 24px;
text-align: center;
color: #000000;
`;

const WaitText = styled.p`
margin-top:20px;
width: 343px;
height: 41px;
font-family: Proxima Nova;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 19px;
text-align: center;
color: #000000;
`;

const ButtonText = styled.p`
  height: 11px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  ${(props) =>
    props.wait
      ? `
      height: 11px;
      font-family: Proxima Nova;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      color: #51b6a5;
    `
      : ""};
`;

const Button = styled.button`
  margin: 12px;
  width: 343px;
  height: 57px;
  background: #51b6a5;
  border-radius: 40px;
  border-width: 0px;
  ${(props) =>
    props.wait
      ? `
      width: 343px;
      height: 57px;
      background: none;
      border: 2px solid #51b6a5;
      box-sizing: border-box;
      border-radius: 40px;
    `
      : ""};
`;

export {
  Button,
  BackArrowTop,
  BackArrowBottom,
  Wrapper,
  TitleText,
  BodyText,
  MailPicture,
  HumansPicture,
  PenPaperPicture,
  MagnifyPicture,
  PictureText,
  HandShakePicture,
  AirplanePicture,
  ThumbsUpPicture,
  ConfirmationText,
  ConfirmationTitle,
  ButtonText,
  PictureTextWrapper,
  ContentWrapper,
  ButtonWrapper,
  WaitTitle,
  WaitText
};
