const mongoose = require('mongoose');

const { Schema } = mongoose;

const WorkExperience = new Schema({
  title: { type: String },
  company: { type: String },
  location: { type: Object },
  industry: { type: String },
  startDate: { type: Date },
  currentlyWorking: { type: Boolean, default: false },
  endDate: { type: Date },
});

const User = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String },
    headline: { type: String },
    bio: { type: String },
    userType: { type: String, enum: ['mentee', 'mentor'] },
    userRole: { type: String, enum: ['user', 'admin'] },
    linkedInId: { type: String, required: true },
    WorkExperiences: { type: [WorkExperience], default: [] },
    skills: { type: [String], default: [] },
    interests: { type: [String], default: [] },
    goals: { type: Object, default: [] },
    communicationFrequency: { type: String },
    socialLinks: { type: Object, default: {} },
    active: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('user', User);
