import React, { useState } from "react";
import styled from "styled-components";
//Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

//dummy Img
import img from "./images/Rectangle146.png";
import LinkedInImg from "./images/Linked.png";

const CancelButton = styled.button`
  font-size: 1em;
  border: none;
  text-decoration: underline;
  background-color: #f1f4f4;
  color: grey;
`;

const Title = styled.p`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
`;

const Text = styled.p`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
`;

const OpenToProviding = styled.p`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  background: #e3efed;
  border-radius: 4px;
  margin-right: 8px;
  margin-bottom: 9px;
  white-space: nowrap;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 10px;
  padding-right: 10px;
`;

const SendMsgButton = styled.button`
  background-color: white;
  border-radius: 40px;
  border: 1px solid;
  border-color: #51b6a5;
  boxshadow: none;
  shadows: none;
  font-family: Proxima Nova;
  height: 29px;
  width: 143px;
  text-transform: none;
  margin-left: 10px;
  &:visited {
    background-color: #51b6a5;
  }
`;

const useStyles = makeStyles({
  root: {
    marginTop: 21,
    display: "flex",
  },
  name: {
    fontFamily: "Proxima Nova",
    fontSize: 16,
    fontWeight: "Bold",
    color: "#000000",
  },
  occupation: {
    fontFamily: "Proxima Nova",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
  },
  yearsExperience: {
    fontFamily: "Proxima Nova",
    fontSize: 14,
    color: "#6D6D6D",
  },
  userContainer: {
    marginLeft: 12,
  },
  buttonSpacing: {
    marginTop: 10,
  },
  messageContainer: {
    marginTop: 13,
    backgroundColor: "#F1F4F4",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "0 auto",
    border: "none",
    borderRadius: 6,
    display: "flex",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    margin: 18,
  },
  sendMsgButtonClicked: {
    backgroundColor: "#51B6A5",
    borderRadius: "40",
    border: "1px solid",
    borderColor: "#51B6A5",
    boxShadow: "none",
    shadows: "none",
    fontFamily: "Proxima Nova",
    height: 29,
    width: 143,
    textTransform: "none",
    marginLeft: 10,
  },
  headerTexts: {
    marginTop: 16.84,
    marginLeft: 16,
    marginBottom: 22,
  },
  providingBox: {
    display: "flex",
    flexDirection: "row",
    flexFlow: "wrap",
  },
});

const MatchProfile = ({ selectedProfile, props }) => {
  const classes = useStyles(props);
  const [openMessage, setOpenMessage] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);
  const [mentor,setMentor] = useState(false)

  function handleOpenMessage() {
    if (sentMessage == false && mentor==false) {
      setOpenMessage(!openMessage);
    } else if (mentor==true){
      setSentMessage(true);
    }
  }

  function handleSentMessage() {
    setSentMessage(true);
    setOpenMessage(false);
  }

  return (
    <div>
      <div className={classes.root}>
        <img src={img} alt="placeholder Profile pic" width="117" height="120" />
        <div className={classes.userContainer}>
          <Typography className={classes.name} variant="h6" component="h2">
            {selectedProfile.Name}
          </Typography>
          <Typography
            className={classes.occupation}
            variant="body2"
            component="p"
          >
            {selectedProfile.Job}
          </Typography>
          <Typography
            className={classes.yearsExperience}
            variant="body2"
            component="p"
          >
            {selectedProfile.YearsExperience} years of experience
          </Typography>
        </div>
      </div>
      <div className={classes.buttonSpacing}>
        <img src={LinkedInImg} alt="linkedIn image" width="29" height="29" />
        <SendMsgButton
          className={
            openMessage || sentMessage ? classes.sendMsgButtonClicked : null
          }
          onClick={handleOpenMessage}
        >
          {mentor ? (<div>Accepted</div>) : sentMessage ? <div> Message sent</div> : <div>Send a message</div>}
        </SendMsgButton>
      </div>
      {openMessage ? (
        <div className={classes.messageContainer}>
          <div className={classes.headerTexts}>
            <Typography className={classes.name} variant="h6" component="h2">
              Send a request to {selectedProfile.Name}
            </Typography>
            <Typography
              className={classes.occupation}
              variant="body2"
              component="p"
            >
              Let {selectedProfile.Name} know why want them as your mentor.
            </Typography>
          </div>

          <div>
            <textarea
              className={classes.input}
              rows="6"
              cols="37"
              placeholder="Type your message here"
            ></textarea>
            <div className={classes.buttonContainer}>
              <CancelButton onClick={handleOpenMessage}>Cancel</CancelButton>
              <SendMsgButton style={{ width: 79 }} onClick={handleSentMessage}>
                Send
              </SendMsgButton>
            </div>
          </div>
        </div>
      ) : null}
      <div>
        <Title style={{ marginTop: 26 }}>Biography</Title>
        <Text> {selectedProfile.Biography} </Text>
        <Title style={{ marginTop: 31 }}>Areas of interest</Title>
        <Text> {selectedProfile.areasOfInterest} </Text>
        <Title style={{ marginTop: 27 }}>Top skills</Title>
        <Text> {selectedProfile.topSkills} </Text>
        <Title>Open to providing</Title>
        <div className={classes.providingBox}>
          {selectedProfile.openToProviding.map((item) => (
            <OpenToProviding key={null}>{item}</OpenToProviding>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchProfile;
