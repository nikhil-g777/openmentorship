const mongoose = require('mongoose');

const { Schema } = mongoose;

const Experience = new Schema({
  title: { type: String },
  organization: { type: String },
});

const Education = new Schema({
  school: { type: String },
  degree: { type: String },
});

const User = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String },
    headline: { type: String },
    bio: { type: String },
    userType: {
      type: String,
      enum: ['mentee', 'mentor', 'admin'],
      defaukt: 'mentee',
    },
    careerStatus: { type: 'String' },
    role: {
      type: String,
      enum: ['mentee', 'mentor', 'admin'],
      required: true,
      default: 'mentee',
    },
    linkedInId: { type: String, required: true, unique: true },
    areasOfInterest: { type: Object, default: {} },
    experiences: { type: [Experience], default: [] },
    education: { type: [Education], defaukt: [] },
    skills: { type: [String], default: [] },
    interests: { type: [String], default: [] },
    goals: { type: Object, default: [] },
    communicationFrequency: { type: String },
    socialLinks: { type: Object, default: {} },
    active: { type: Boolean, default: false, required: true },
    registrationStatus: {
      type: String,
      enum: ['incomplete', 'pendingApproval', 'complete'],
      default: 'incomplete',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('user', User);
