type studyData = {
  id: number;
  course: string;
  studyfield: string;
  department: string;
  study_points: string;
  duration: string;
};

type StudyDataArray = studyData[];

export const dummyData: StudyDataArray = Array.from({ length: 100 }, (_, i) => {
  const studyfield = [
    'Computer Science',
    'Economics',
    'Chemistry',
    'Mathematics',
    'Psychology',
    'Sociology',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Environmental Science',
    'Political Science',
    'Biology',
    'Philosophy',
    'History',
    'Linguistics',
    'Business Administration',
  ];

  const departments = [
    'Department of Computing and Information Technology',
    'Department of Business and Economics',
    'Department of Physical and Life Sciences',
    'Department of Humanities',
    'Department of Engineering and Design',
    'Department of Social Sciences',
    'Department of Environmental Studies',
    'Department of Mathematics and Statistics',
  ];

  const coursePrefixes = [
    'Introduction to',
    'Advanced',
    'Fundamentals of',
    'Applied',
    'Principles of',
    'Foundations of',
    'Modern',
    'Essentials of',
    'Comprehensive',
    'Theoretical',
  ];

  const courseSubjects = [
    'Artificial Intelligence',
    'Microeconomics',
    'Organic Chemistry',
    'Machine Learning',
    'Cognitive Psychology',
    'Data Structures',
    'Environmental Policy',
    'Quantum Mechanics',
    'Thermodynamics',
    'Game Theory',
    'Software Engineering',
    'Statistics',
    'Renewable Energy Systems',
    'Ethics',
    'Project Management',
    'Robotics',
    'Sociolinguistics',
    'Neuroscience',
    'Political Theory',
    'Global Finance',
  ];

  const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const randomPoints = ['3', '4', '5', '6', '7', '8'];
  const randomDurations = ['6 weeks', '8 weeks', '10 weeks', '12 weeks', '14 weeks', '1 semester'];

  return {
    id: i + 1,
    course: `${randomItem(coursePrefixes)} ${randomItem(courseSubjects)}`,
    studyfield: randomItem(studyfield),
    department: randomItem(departments),
    study_points: randomItem(randomPoints),
    duration: randomItem(randomDurations),
  };
});
