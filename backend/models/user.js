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
      default: 'mentee',
    },
    careerStatus: { type: 'String' },
    role: {
      type: String,
      enum: ['mentee', 'mentor', 'admin'],
      required: true,
      default: 'mentee',
    },
    linkedInId: { type: String, unique: true, index: true },
    googleId: { type: String, unique: true, index: true },
    linkedInProfileUrl: { type: String },
    profileImageUrls: { type: Object, default: { default: '' } },
    areasOfInterest: { type: Object, default: {} },
    experiences: { type: [Experience], default: [] },
    education: { type: [Education], defaukt: [] },
    skills: { type: [String], default: [] },
    interests: { type: [String], default: [] },
    goals: { type: Object, default: {} },
    communicationFrequency: { type: String },
    communicationPreferences: { type: [String], default: [] },
    socialLinks: { type: Object, default: {} },
    active: { type: Boolean, default: false, required: true },
    registrationStatus: {
      type: String,
      enum: [
        'incomplete',
        'pendingConfirmation',
        'pendingApproval',
        'complete',
        'denied',
        'disabled',
      ],
      default: 'incomplete',
      required: true,
    },
    approvedDate: { type: Date },
  },
  {
    timestamps: true,
  },
);

User.index({ '$**': 'text' });

module.exports = mongoose.model('user', User);
