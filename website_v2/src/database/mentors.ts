type Mentors = {
  id: number;
  name: string;
  linkedin: string;
  designation: string;
  experience: string;
  description: string;
  interest: string;
  skills: string;
  provides: string[];
  email: string;
}[];

const mentors: Mentors = [
  {
    id: 1,
    name: "John Smith",
    linkedin: "https://linkedin.com/in/johnsmith",
    designation: "Senior Software Engineer at Google",
    experience: "10 years of experience in software engineering",
    description:
      "I have worked at Google, Microsoft, and Amazon, specializing in cloud computing, distributed systems, and backend development. I'm passionate about mentoring others and helping them grow in their careers.",
    interest:
      "Cloud computing, distributed systems, backend development, software architecture",
    skills: "Java, C++, Python, Go, Kubernetes, Docker",
    provides: [
      "Code review",
      "System design review",
      "Career advice",
      "Resume review",
      "Interview preparation",
      "Technical guidance",
    ],
    email: "johnsmith@gmail.com",
  },
  {
    id: 2,
    name: "Jane Doe",
    linkedin: "https://linkedin.com/in/janedoe",
    designation: "Marketing Manager at Facebook",
    experience: "8 years of experience in marketing",
    description:
      "I have worked at Facebook and Airbnb, specializing in growth marketing, user acquisition, and branding. I'm passionate about helping others succeed in marketing and sharing my experiences with them.",
    interest:
      "Growth marketing, user acquisition, branding, social media marketing",
    skills:
      "Marketing strategy, content marketing, email marketing, social media advertising",
    provides: [
      "Marketing strategy review",
      "Campaign review",
      "Branding review",
      "Resume review",
      "Interview preparation",
      "Career advice",
    ],
    email: "janedoe@gmail.com",
  },
  {
    id: 3,
    name: "David Lee",
    linkedin: "https://linkedin.com/in/davidlee",
    designation: "HR Manager at Amazon",
    experience: "7 years of experience in human resources",
    description:
      "I have worked at Amazon and Google, specializing in talent acquisition, performance management, and employee engagement. I'm passionate about helping others succeed in their careers and navigate the complexities of the modern workplace.",
    interest:
      "Talent acquisition, performance management, employee engagement, diversity and inclusion",
    skills:
      "Recruiting, talent management, performance appraisal, employee relations",
    provides: [
      "Resume review",
      "Interview preparation",
      "Career advice",
      "Performance review",
      "Employee engagement review",
      "Workplace culture review",
    ],
    email: "davidlee@gmail.com",
  },
  {
    id: 4,
    name: "Sophie Williams",
    linkedin: "https://www.linkedin.com/in/sophie-williams/",
    designation: "Human Resources Manager at Google",
    experience: "Ten years of experience in HR",
    description:
      "I have experience in managing employee relations, performance management, compensation and benefits, and talent acquisition. I have worked with both startups and large corporations, and am passionate about creating a positive and inclusive work culture.",
    interest:
      "Diversity and inclusion, employee engagement, performance management",
    skills:
      "Recruiting, HR policies and procedures, compensation and benefits, employee relations",
    provides: [
      "Career advice",
      "Resume review",
      "Interview preparation",
      "Job search strategies",
      "Performance review feedback",
      "Compensation negotiation",
    ],
    email: "sophie.williams@gmail.com",
  },
  {
    id: 5,
    name: "David Kim",
    linkedin: "https://www.linkedin.com/in/davidkim123/",
    designation: "Software Engineer at Facebook",
    experience: "Seven years of experience in software development",
    description:
      "I have worked on both backend and frontend development, and have experience with languages such as Java, Python, and JavaScript. I am passionate about creating efficient and scalable software solutions, and enjoy mentoring others in software development.",
    interest:
      "Backend development, software architecture, performance optimization",
    skills:
      "Java, Python, JavaScript, SQL, software architecture, performance optimization",
    provides: [
      "Code review",
      "Mentorship in software development",
      "Debugging assistance",
      "Algorithm design and optimization",
      "Interview preparation",
      "Career advice",
    ],
    email: "davidkim123@gmail.com",
  },
  {
    id: 6,
    name: "Jessica Lee",
    linkedin: "https://www.linkedin.com/in/jessicalee345/",
    designation: "UX Designer at Airbnb",
    experience: "Six years of experience in UX design",
    description:
      "I have experience in user research, prototyping, user testing, and design systems. I am passionate about creating intuitive and delightful user experiences, and enjoy mentoring others in UX design.",
    interest: "UX design, user research, prototyping, design systems",
    skills:
      "Figma, Sketch, InVision, Adobe Creative Suite, user research, prototyping",
    provides: [
      "UX design feedback",
      "Design review",
      "Prototyping assistance",
      "User research assistance",
      "Interview preparation",
      "Career advice",
    ],
    email: "jessicalee345@gmail.com",
  },
  {
    id: 7,
    name: "Michael Chen",
    linkedin: "https://www.linkedin.com/in/michaelchen456/",
    designation: "Product Manager at Amazon",
    experience: "Eight years of experience in product management",
    description:
      "I have experience in product strategy, roadmap planning, and product launches. I am passionate about creating products that solve real-world problems and improve the lives of users. I have worked with both B2B and B2C products, and am familiar with agile methodologies.",
    interest: "Product management, user research, product strategy",
    skills:
      "Agile methodologies, product roadmap planning, product launches, user research",
    provides: [
      "Product feedback",
      "Product strategy advice",
      "User research guidance",
      "Roadmap planning assistance",
      "Interview preparation",
      "Career advice",
    ],
    email: "michaelchen456@gmail.com",
  },
  {
    id: 8,
    name: "Emily Wu",
    linkedin: "https://www.linkedin.com/in/emilywu789/",
    designation: "Data Analyst at Uber",
    experience: "Five years of experience in data analysis",
    description:
      "I have experience in data cleaning, data visualization, and statistical analysis. I have worked with both small and large datasets, and am comfortable with languages such as Python and R. I am passionate about using data to drive business decisions and improve user experiences.",
    interest: "Data analysis, data visualization, statistical analysis",
    skills:
      "Python, R, SQL, data cleaning, data visualization, statistical analysis",
    provides: [
      "Data analysis feedback",
      "Data visualization advice",
      "Statistical analysis assistance",
      "Interview preparation",
      "Career advice",
    ],
    email: "emilywu789@gmail.com",
  },
  {
    id: 9,
    name: "Oliver Lee",
    linkedin: "https://www.linkedin.com/in/oliverlee012/",
    designation: "UI Designer at Apple",
    experience: "Seven years of experience in UI design",
    description:
      "I have experience in designing for both web and mobile platforms, and have worked on projects ranging from e-commerce websites to mobile apps. I am passionate about creating visually stunning designs that are also user-friendly and accessible.",
    interest: "UI design, visual design, accessibility",
    skills: "Sketch, Adobe Creative Suite, Figma, HTML, CSS",
    provides: [
      "UI design feedback",
      "Design critique",
      "Accessibility guidance",
      "Interview preparation",
      "Career advice",
    ],
    email: "oliverlee012@gmail.com",
  },
  {
    id: 10,
    name: "Karen Singh",
    linkedin: "https://www.linkedin.com/in/karensingh/",
    designation: "Senior Data Analyst at Amazon",
    experience: "Eight years of experience in data analysis",
    description:
      "I am skilled in data analysis, visualization, and modeling. I have experience working with large data sets and am familiar with programming languages such as Python and SQL. I am passionate about finding insights from data and using it to inform business decisions.",
    interest:
      "Data analysis, data visualization, machine learning, business intelligence",
    skills: "Python, SQL, Tableau, Excel, statistical analysis",
    provides: [
      "Data analysis support",
      "Data visualization feedback",
      "Interview preparation",
      "Career advice",
    ],
    email: "karensingh@gmail.com",
  },
  {
    id: 11,
    name: "Samantha Lee",
    linkedin: "https://www.linkedin.com/in/samanthalee/",
    designation: "UX Designer at Apple",
    experience: "Seven years of experience in UX design",
    description:
      "I am passionate about creating user-centered designs that are both functional and visually appealing. I have experience in wireframing, prototyping, and user testing. I am familiar with design tools such as Sketch, Figma, and Adobe Creative Suite.",
    interest: "UX design, user research, interaction design, visual design",
    skills: "Sketch, Figma, Adobe Creative Suite, wireframing, prototyping",
    provides: [
      "Portfolio review",
      "Design feedback",
      "Interview preparation",
      "Career advice",
    ],
    email: "samanthalee@gmail.com",
  },
  {
    id: 12,
    name: "Michael Chen",
    linkedin: "https://www.linkedin.com/in/michaelchen/",
    designation: "Software Engineer at Microsoft",
    experience: "Six years of experience in software development",
    description:
      "I am skilled in full-stack web development and have experience working with both front-end and back-end technologies. I am familiar with languages such as JavaScript, Python, and Java, and am comfortable working with databases such as MySQL and MongoDB.",
    interest:
      "Full-stack web development, software architecture, DevOps, machine learning",
    skills: "JavaScript, Python, Java, MySQL, MongoDB",
    provides: ["Code review", "Interview preparation", "Career advice"],
    email: "michaelchen@gmail.com",
  },
  {
    id: 13,
    name: "Hannah Smith",
    linkedin: "https://linkedin.com/in/hannahsmith",
    designation: "Senior UX Designer at Google",
    experience: "10 years of experience in UX Design",
    description:
      "I'm an experienced UX designer who has worked with startups and big companies alike. I specialize in creating intuitive and user-friendly interfaces that make it easy for users to achieve their goals. I'm passionate about the intersection of design and technology and love to work on projects that have a positive impact on people's lives.",
    interest:
      "UX Design, UI Design, Design Thinking, Human-Computer Interaction, User Research",
    skills:
      "Adobe Creative Suite, Sketch, Figma, InVision, User Testing, Wireframing, Prototyping",
    provides: [
      "UX Design Review",
      "Portfolio Review",
      "Mockups and Wireframes",
      "User Testing and Research",
      "Design Thinking Workshops",
    ],
    email: "hannahsmith@gmail.com",
  },
  {
    id: 14,
    name: "James Lee",
    linkedin: "https://linkedin.com/in/jameslee",
    designation: "Senior Data Scientist at IBM",
    experience: "8 years of experience in Data Science",
    description:
      "I'm a data scientist with a passion for solving complex problems using data. I specialize in machine learning and statistical modeling, and have worked on a variety of projects ranging from predictive modeling to natural language processing. I'm always looking for new challenges and opportunities to learn and grow in my field.",
    interest:
      "Machine Learning, Statistical Modeling, Natural Language Processing, Data Visualization, Big Data",
    skills: "Python, R, SQL, TensorFlow, Keras, Pandas, Scikit-Learn",
    provides: [
      "Data Science Project Review",
      "Machine Learning Model Review",
      "Career Advice",
      "Technical Interview Prep",
      "Big Data Analysis",
    ],
    email: "jameslee@gmail.com",
  },
  {
    id: 15,
    name: "Maria Rodriguez",
    linkedin: "https://linkedin.com/in/mariarodriguez",
    designation: "HR Manager at Amazon",
    experience: "7 years of experience in Human Resources",
    description:
      "I'm an experienced HR professional who has worked with startups and big companies alike. I specialize in talent acquisition and management, and have a deep understanding of the hiring process from start to finish. I'm passionate about creating diverse and inclusive workplaces where everyone can thrive.",
    interest:
      "Talent Acquisition, Employee Engagement, Diversity and Inclusion, HR Analytics, Performance Management",
    skills:
      "Recruiting, Talent Management, HRIS, Performance Reviews, Employee Relations, HR Compliance",
    provides: [
      "Resume and Cover Letter Review",
      "Interview Coaching",
      "Career Advice",
      "Salary Negotiation",
      "Leadership Development",
    ],
    email: "mariarodriguez@gmail.com",
  },
  {
    id: 16,
    name: "Nadia Johnson",
    linkedin: "https://linkedin.com/in/nadia-johnson-123456789",
    designation: "UX Designer at Apple",
    experience: "Six years of experience in UX design",
    description:
      "I specialize in creating intuitive and user-friendly interfaces that deliver a great user experience. I have worked on a variety of projects ranging from mobile apps to enterprise software.",
    interest: "UX design, UI design, design thinking",
    skills:
      "Sketch, Figma, Adobe Creative Suite, InVision, user research, wireframing, prototyping",
    provides: [
      "Portfolio review",
      "Design feedback",
      "Career advice",
      "Mock design projects",
      "Design thinking workshops",
    ],
    email: "nadia.johnson@gmail.com",
  },
  {
    id: 17,
    name: "John Nguyen",
    linkedin: "https://linkedin.com/in/john-nguyen-123456789",
    designation: "Product Manager at Microsoft",
    experience: "Eight years of experience in product management",
    description:
      "I have a passion for creating products that users love. I have experience working with cross-functional teams to develop and launch successful products in both startup and corporate environments.",
    interest:
      "Product management, agile development, UX design, customer research",
    skills:
      "Product strategy, roadmap planning, user research, A/B testing, project management",
    provides: [
      "Product feedback",
      "Product management mentorship",
      "Career advice",
      "Resume review",
      "Mock product challenges",
    ],
    email: "john.nguyen@gmail.com",
  },
  {
    id: 18,
    name: "Rachel Lee",
    linkedin: "https://linkedin.com/in/rachel-lee-123456789",
    designation: "HR Manager at Amazon",
    experience: "Ten years of experience in HR",
    description:
      "I specialize in creating inclusive and engaging work environments. I have experience in all aspects of HR including recruitment, employee relations, compensation, and benefits.",
    interest:
      "HR strategy, diversity and inclusion, employee engagement, talent management",
    skills:
      "Recruiting, onboarding, performance management, HR policies and procedures, compensation and benefits",
    provides: [
      "Career advice",
      "Resume review",
      "Interview preparation",
      "Diversity and inclusion workshops",
      "Employee engagement strategies",
    ],
    email: "rachel.lee@gmail.com",
  },
  {
    id: 19,
    name: "Emily Lee",
    linkedin: "https://www.linkedin.com/in/emilylee/",
    designation: "UX Designer at Dropbox",
    experience: "8+ years of experience in user experience design",
    description:
      "I have worked with Dropbox, Airbnb, and Google. I specialize in designing user-centered interfaces for web and mobile applications.",
    interest:
      "User experience design, design thinking, usability testing, wireframing",
    skills: "Sketch, Figma, Adobe Creative Suite, InVision, Principle",
    provides: [
      "Portfolio review",
      "Design critique",
      "Usability testing feedback",
      "Mentoring on design principles",
    ],
    email: "emilylee@gmail.com",
  },
  {
    id: 20,
    name: "Marcus Chen",
    linkedin: "https://www.linkedin.com/in/marcuschen/",
    designation: "Data Scientist at Facebook",
    experience: "7+ years of experience in data science",
    description:
      "I have worked with Facebook, Airbnb, and Netflix. I specialize in building predictive models and applying machine learning techniques to solve complex business problems.",
    interest:
      "Machine learning, predictive modeling, data visualization, big data",
    skills: "Python, R, SQL, Spark, Hadoop, Tableau, TensorFlow",
    provides: [
      "Code review",
      "Data modeling feedback",
      "Mentoring on machine learning",
      "Mentoring on data analysis",
    ],
    email: "marcuschen@gmail.com",
  },
  {
    id: 21,
    name: "Megan Wong",
    linkedin: "https://www.linkedin.com/in/meganwong/",
    designation: "Product Manager at Google",
    experience: "9+ years of experience in product management",
    description:
      "I have worked with Google, Microsoft, and Amazon. I'm passionate about building products that solve real customer problems and driving growth for businesses.",
    interest:
      "Product management, product strategy, customer research, growth marketing",
    skills:
      "Product strategy, agile development, customer research, growth marketing, A/B testing",
    provides: [
      "Product feedback",
      "Mentoring on product strategy",
      "Mentoring on growth marketing",
      "Mentoring on customer research",
    ],
    email: "meganwong@gmail.com",
  },
  {
    id: 22,
    name: "John Doe",
    linkedin: "https://www.linkedin.com/in/johndoe/",
    designation: "Senior Software Engineer at Google",
    experience: "10+ years of experience in software development",
    description:
      "I specialize in developing scalable and high-performance web applications using modern web technologies. My areas of expertise include backend development, cloud architecture, and software testing.",
    interest: "Backend development, cloud computing, software testing",
    skills: "Java, Python, Go, AWS, Kubernetes, Docker, Jenkins",
    provides: [
      "Code review",
      "Architecture review",
      "Career guidance",
      "Technical consultation",
      "Interview preparation",
    ],
    email: "johndoe@gmail.com",
  },
  {
    id: 23,
    name: "Maria Garcia",
    linkedin: "https://www.linkedin.com/in/mariagarcia/",
    designation: "Marketing Manager at Facebook",
    experience: "8 years of experience in digital marketing",
    description:
      "I have experience in creating and implementing successful marketing campaigns that have increased brand awareness and generated leads. I am passionate about social media marketing and content creation.",
    interest:
      "Digital marketing, social media marketing, content creation, branding",
    skills:
      "Social media advertising, email marketing, content creation, SEO, SEM",
    provides: [
      "Campaign review",
      "Brand strategy consultation",
      "Content creation review",
      "Interview preparation",
      "Career advice",
    ],
    email: "mariagarcia@gmail.com",
  },
  {
    id: 24,
    name: "Jack Smith",
    linkedin: "https://www.linkedin.com/in/jacksmith/",
    designation: "Human Resources Manager at Apple",
    experience: "7 years of experience in HR",
    description:
      "I specialize in talent management and employee engagement. I have experience in creating and implementing HR policies and procedures that align with organizational goals and values.",
    interest: "Talent management, employee engagement, diversity and inclusion",
    skills:
      "Performance management, talent acquisition, employee relations, compensation and benefits, HR analytics",
    provides: [
      "Resume review",
      "Interview preparation",
      "Career guidance",
      "Policy review",
      "Employee engagement consultation",
    ],
    email: "jacksmith@gmail.com",
  },
  {
    id: 25,
    name: "Arun Patel",
    linkedin: "https://www.linkedin.com/in/arunpatel/",
    designation: "Senior Data Scientist at Microsoft",
    experience: "8 years of experience in Data Science",
    description:
      "I specialize in machine learning, deep learning, and NLP. I have worked on various projects related to fraud detection, recommendation systems, and sentiment analysis. I am passionate about solving complex problems using data-driven techniques.",
    interest: "Machine Learning, Deep Learning, NLP",
    skills: "Python, TensorFlow, PyTorch, Scikit-Learn",
    provides: [
      "Mentorship in Data Science",
      "Project Review",
      "Algorithm design",
      "Interview Preparation",
      "Career Advice",
      "Resume Review",
    ],
    email: "arunpatel@gmail.com",
  },
  {
    id: 26,
    name: "Karen Johnson",
    linkedin: "https://www.linkedin.com/in/karenjohnson/",
    designation: "Senior HR Manager at IBM",
    experience: "10 years of experience in HR",
    description:
      "I have worked in various roles in HR, including recruitment, training and development, and employee relations. I am passionate about creating a positive work culture and promoting diversity and inclusion in the workplace.",
    interest: "Employee Relations, Recruitment, Training and Development",
    skills: "Leadership, Communication, Training and Development",
    provides: [
      "Career Advice",
      "Interview Preparation",
      "Resume Review",
      "Mentorship in HR",
      "Employee Relations",
      "Diversity and Inclusion in the Workplace",
    ],
    email: "karenjohnson@gmail.com",
  },
  {
    id: 27,
    name: "Michael Kim",
    linkedin: "https://www.linkedin.com/in/michaelkim/",
    designation: "Senior Frontend Developer at Amazon",
    experience: "7 years of experience in Web Development",
    description:
      "I specialize in building scalable and efficient web applications. I have worked on various projects, including e-commerce platforms, social networking sites, and content management systems. I am passionate about creating user-friendly interfaces and optimizing website performance.",
    interest: "Web Development, Frontend Development, UI/UX Design",
    skills: "React, Vue.js, Angular, HTML, CSS",
    provides: [
      "Mentorship in Web Development",
      "Code Reviews",
      "Interview Preparation",
      "Website Optimization",
      "UI/UX Design",
      "Career Advice",
    ],
    email: "michaelkim@gmail.com",
  },
  {
    id: 28,
    name: "Samantha Lee",
    linkedin: "https://www.linkedin.com/in/samanthalee/",
    designation: "UX Designer at Google",
    experience: "7 years of experience in UX Design",
    description:
      "I specialize in designing user interfaces and user experiences for digital products. My experience ranges from working with startups to Fortune 500 companies. I'm passionate about creating intuitive, accessible and engaging interfaces that solve real-world problems.",
    interest:
      "Design thinking, user research, prototyping, user testing, user experience design",
    skills: "Sketch, Figma, InVision, Adobe Creative Suite, HTML/CSS/JS",
    provides: [
      "UX review",
      "UI design",
      "Design critique",
      "Wireframing",
      "Interactive prototyping",
    ],
    email: "samanthalee@gmail.com",
  },
  {
    id: 29,
    name: "John Doe",
    linkedin: "https://www.linkedin.com/in/johndoe/",
    designation: "Software Engineer at Facebook",
    experience: "10 years of experience in Software Engineering",
    description:
      "I have worked on various projects at Facebook ranging from developing new features to improving the performance and scalability of existing systems. My areas of expertise include distributed systems, web development, and databases.",
    interest: "Distributed systems, web development, databases",
    skills: "Java, C++, Python, Node.js, MySQL, MongoDB",
    provides: [
      "Code review",
      "Mentorship for new software engineers",
      "Technical advice",
      "Help with algorithms and data structures",
      "Debugging",
    ],
    email: "johndoe@gmail.com",
  },
  {
    id: 30,
    name: "Jane Smith",
    linkedin: "https://www.linkedin.com/in/janesmith/",
    designation: "HR Manager at Microsoft",
    experience: "8 years of experience in Human Resources",
    description:
      "I have worked in various roles within HR at Microsoft, including talent acquisition, employee relations, and performance management. I am passionate about creating an inclusive and diverse workplace and helping employees grow and develop their careers.",
    interest:
      "Talent acquisition, employee relations, performance management, diversity and inclusion",
    skills:
      "Recruiting, onboarding, coaching, performance management, employee relations",
    provides: [
      "Resume review",
      "Interview preparation",
      "Career advice",
      "Performance management advice",
      "Employee relations advice",
    ],
    email: "janesmith@gmail.com",
  },
];

export default mentors;
