const mongoose = require('mongoose');
const Job = require('./models/Job');
require('dotenv').config();

async function seedJobs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/c2hr');

    // Clear existing jobs
    await Job.deleteMany({});

    // Sample jobs data
    const sampleJobs = [
      {
        title: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        description: 'We are looking for a Senior Software Engineer to join our dynamic team. You will be responsible for developing high-quality software solutions and working with cutting-edge technologies.',
        requirements: ['5+ years of experience', 'React', 'Node.js', 'MongoDB', 'AWS'],
        salary: '$120,000 - $160,000',
        type: 'full-time',
        employer: new mongoose.Types.ObjectId(), // This will be a dummy ID
        applications: [],
        date: new Date()
      },
      {
        title: 'Frontend Developer',
        company: 'StartupXYZ',
        location: 'New York, NY',
        description: 'Join our fast-growing startup as a Frontend Developer. You will work on exciting projects using modern web technologies and contribute to our innovative products.',
        requirements: ['3+ years of experience', 'JavaScript', 'React', 'CSS', 'HTML'],
        salary: '$80,000 - $110,000',
        type: 'full-time',
        employer: new mongoose.Types.ObjectId(),
        applications: [],
        date: new Date()
      },
      {
        title: 'Full Stack Developer',
        company: 'GlobalTech Solutions',
        location: 'Austin, TX',
        description: 'We are seeking a talented Full Stack Developer to work on our enterprise applications. You will collaborate with cross-functional teams to deliver scalable solutions.',
        requirements: ['4+ years of experience', 'JavaScript', 'Python', 'React', 'Django', 'PostgreSQL'],
        salary: '$90,000 - $130,000',
        type: 'full-time',
        employer: new mongoose.Types.ObjectId(),
        applications: [],
        date: new Date()
      },
      {
        title: 'DevOps Engineer',
        company: 'CloudSys Inc.',
        location: 'Seattle, WA',
        description: 'Looking for an experienced DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. You will work with modern cloud technologies and automation tools.',
        requirements: ['3+ years of experience', 'AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
        salary: '$100,000 - $140,000',
        type: 'full-time',
        employer: new mongoose.Types.ObjectId(),
        applications: [],
        date: new Date()
      },
      {
        title: 'UI/UX Designer',
        company: 'DesignStudio Pro',
        location: 'Los Angeles, CA',
        description: 'Creative UI/UX Designer needed for our design team. You will create beautiful and intuitive user interfaces for web and mobile applications.',
        requirements: ['3+ years of experience', 'Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research'],
        salary: '$70,000 - $100,000',
        type: 'full-time',
        employer: new mongoose.Types.ObjectId(),
        applications: [],
        date: new Date()
      },
      {
        title: 'Data Scientist',
        company: 'DataTech Analytics',
        location: 'Boston, MA',
        description: 'Join our data science team to work on machine learning projects and extract insights from large datasets. You will develop predictive models and data visualizations.',
        requirements: ['PhD or Masters in relevant field', 'Python', 'R', 'Machine Learning', 'SQL', 'Tableau'],
        salary: '$110,000 - $150,000',
        type: 'full-time',
        employer: new mongoose.Types.ObjectId(),
        applications: [],
        date: new Date()
      }
    ];

    // Insert sample jobs
    await Job.insertMany(sampleJobs);

    console.log('Sample jobs seeded successfully!');
    console.log(`Added ${sampleJobs.length} jobs to the database.`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding jobs:', error);
    process.exit(1);
  }
}

seedJobs();