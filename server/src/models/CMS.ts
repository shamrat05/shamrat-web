import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
  image: String
});

const AboutSchema = new mongoose.Schema({
  description: [String],
  stats: [{
    label: String,
    value: String
  }]
});

const ContactSchema = new mongoose.Schema({
  email: String,
  phone: String,
  linkedin: String,
  location: String
});

const ProjectSchema = new mongoose.Schema({
  id: Number,
  slug: { type: String, unique: true, required: true },
  title: String,
  category: String,
  image: String,
  description: String,
  tags: [String],
  link: String,
  technologies: [String],
  challenge: String,
  solution: String,
  results: [String],
  externalLink: String,
  githubLink: String
});

const PostSchema = new mongoose.Schema({
  id: Number,
  slug: { type: String, unique: true, required: true },
  title: String,
  date: String,
  readTime: String,
  category: String,
  image: String,
  description: String,
  content: String,
  tags: [String],
  link: String
});

const ExperienceSchema = new mongoose.Schema({
  id: Number,
  title: String,
  company: String,
  date: String,
  description: String,
  tags: [String]
});

const SkillSchema = new mongoose.Schema({
  name: String,
  level: String,
  icon: String
});

const CertificationSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  icon: String
});

const CMSSchema = new mongoose.Schema({
  hero: HeroSchema,
  about: AboutSchema,
  contact: ContactSchema,
  projects: [ProjectSchema],
  posts: [PostSchema],
  experience: [ExperienceSchema],
  skills: {
    technical: [SkillSchema],
    professional: [SkillSchema]
  },
  certifications: [CertificationSchema]
});

export const CMSModel = mongoose.model('CMS', CMSSchema);
