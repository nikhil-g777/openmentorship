import React, { useContext, useState, useEffect } from "react";
import './Profile.css';
import { Container, Title, Menu } from "../../components";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { LinkedIn } from "react-linkedin-login-oauth2";
import { NavBar } from '../../components';
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Grid from '@material-ui/core/Grid';
import img from "../Profile/profilepic.jpg";
import { getUserInfo, updateUser } from '../../api';


const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "1em",
    flexGrow: 1,
    "& > *": {
      margin: "1em 0",
    },
  },
}));

const lookingFor = [
  { id: 1, value: "Career advice", isChecked: false },
  { id: 2, value: "Resume review", isChecked: false },
  { id: 3, value: "Mock interview", isChecked: false },
  { id: 4, value: "Project review", isChecked: false },
  { id: 5, value: "Collaboration on an idea", isChecked: false },
  { id: 6, value: "Inspiration", isChecked: false },
  { id: 7, value: "Business advice", isChecked: false },
  { id: 8, value: "Career change advice", isChecked: false },
  { id: 9, value: "Skill dovelopment", isChecked: false }
]
const socialMedia = [
  { id: 1, value: "Twitter", data: "" },
  { id: 2, value: "Medium",data: ""},
  { id: 3, value: "Behance", data: "" },
  { id: 4, value: "Github", data: "" },
  { id: 5, value: "Portfolio", data: "" },
  { id: 6, value: "Other", data: "" }
]

const Info = styled.p`
  padding: 1em 3em 1em 3em;
`;

const LindkedInButton = styled.img`
  width: 200px;
`;

const Wrapper = styled.div`
  margin: 3em auto;
`;

const Profile = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [isEdit, setEdit] = useState(true);
  const [user, setUser] = useContext(UserContext);
  const [looking, setLooking] = useState(lookingFor);
  const [socialMediaData,setSocialMedia] =useState(socialMedia);
  const [contact, setContact] = useState(
    {
      about: "",
      interests: "",
      skills: "",
      goals: "",
      socialLinks: "",
      user: {}
    });

  const edit = () => {
    setEdit(false);
  }

  const save = () => {
    const payload = contact.user;
    if (typeof contact.interest === 'string') {
      let converInterest = [];
      converInterest = contact.interest.split(",");
      payload.interests = converInterest;
    }
    
    if (typeof contact.skills === 'string') {
      let converSkills = [];
      converSkills = contact.skills.split(",");
      payload.skills = converSkills;
    }
    let converGoals = [];
      looking.forEach(item => {
        if(item.isChecked){
          converGoals.push(item.value);
        }
      });
    payload.goals = converGoals;
    const reqObj = {};
    reqObj['user'] = payload;
    console.log(reqObj);
    updateUser(reqObj)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const onInputAboutChange = (event) => {
    setContact({
      ...contact,
      about: event.currentTarget.value
    })
  };
  const onInputInterestChange = (event) => {
    setContact({
      ...contact, interest: event.currentTarget.value
    })
  };
  const onInputSkillsChange = (event) => {
    setContact({
      ...contact, skills: event.currentTarget.value
    })
  }

  useEffect(() => {
    if (user && user._id) {
      getUserInfo(user)
        .then((response) => {
          console.log(response);
          loadLokingdata(response.data.user.goals);
          setContact({
            interest: response.data.user.interests,
            skills: response.data.user.skills,
            goals: response.data.user.goals,
            socialMedia: response.data.user.socialLinks,
            about: 'I am',
            user: response.data.user
          });
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, []);

  const loadLokingdata = (goals) => {
    console.log(goals);
    if(goals.length > 0){
    looking.forEach(item=>{
      goals.forEach(goal => {
        if(item.value.toUpperCase() === goal.toUpperCase()) {
          item.isChecked = true;
        }
      })
    })
    setLooking(looking);
  }
  }

  const handleChangeChk = (item,event) => {
    looking.forEach(look=>{
      if(item.id===look.id){
        look.isChecked = !look.isChecked;
      }
    })
    setLooking(looking);
    console.log(looking);
  }

  return (
    <>
      <Menu
        handleBack={() => history.push("/")}
        registrationMenu={true}
        showBackButton={false}
      />
      {isEdit &&
        <div class="container-fluid">
          <div class="container">
            <div class="row">
              <div class="col-3 left-img">
                <img src={img} class="rounded img-thumbnail" width="200" alt="profile" />
              </div>
              <div class="col-9">
                <h4 class="header sz-20">Emily Lee <Button variant="outlined" color="primary" className="edit-right" onClick={edit}><i class="fas fa-edit"></i>&nbsp; Edit</Button></h4>
                <p className="para1">Marketing Intern at Propeller Health Cognitive Science at UCLA 2022</p>
                <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                <h3 class="header">About</h3>
                <p className="para">I am a second-year UCLA Regents Scholar Interested in Digital Health,healthcare management,population health Studies, and social innovation.
                   I am experienced in email Marketing techniques SEO and brand analytics.</p>
                <h3 class="header">Areas of interest</h3>
                <p className="para">Public health,Social innovation,digital health,healthcare management</p>
                <h3 class="header">Top skills</h3>
                <p className="para">Marketing techniques,SEO,brand analytics,email marketing</p>
                <h3 class="header">Looking for</h3>
                <span className="profile">Mock interview</span>
                <span className="profile">Project review</span>
                <span className="profile">Collaboration on an idea</span>
                <span className="profile">Inspiration</span>
                <span className="profile">Career advice</span>
                <span className="profile">Skill dovelopment</span>
                <h3 class="header mt-15">Social Media</h3>
              </div>
            </div>
          </div>
        </div>
      }
      {!isEdit &&
        <div class="container-fluid">
          <div class="container">
            <div class="row">
              <div class="col-3 left-img">
                <img src={img} class="rounded img-thumbnail" width="200" alt="profile" />
              </div>
              <div class="col-9">
                <h4 class="header sz-20">Emily Lee <Button variant="outlined" color="primary" className="edit-right" onClick={save}><i class="far fa-save"></i> &nbsp;Save</Button></h4>
                <p className="para1">Marketing Intern at Propeller Health Cognitive Science at UCLA 2022</p>
                <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                <h3 class="header">About</h3>
                <textarea className="form-control mg-15" id="inputComments" onChange={onInputAboutChange} value={contact.about} rows={3} cols={10} />
                <h3 class="header">Areas of interest</h3>
                <textarea className="form-control mg-15" id="inputComments" onChange={onInputInterestChange} value={contact.interest} rows={3} cols={10} />
                <h3 class="header">Top skills</h3>
                <textarea className="form-control mg-15" id="inputComments" onChange={onInputSkillsChange} value={contact.skills} rows={3} cols={10} />
                <h3 class="header">Looking for</h3>
                {looking.map((item, index) => {
                  return (<div key={index} className="form-check">
                    <input className="form-check-input" type="checkbox" defaultChecked={item.isChecked} value={item.isChecked} onChange={(event) => handleChangeChk(item, event)} id="gridCheck" />
                    <label className="form-check-label" >
                      {item.value}
                    </label>
                  </div>)
                })
                }
                <h3 class="header social-header">Social Media</h3>
                {socialMedia.map((item, index) => {
                  return (<div key={index} className="social-icons">
                     <label className="form-social-label" >
                      {item.value}
                    </label>
                    <input type="text" value={item.data} id="gridCheck" className="social-input" />
                   
                  </div>)
                })
              }
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Profile;
