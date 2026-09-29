/**
 * This file contains mock data related to Select and Multiselect Components
 */

import { FudisSelectOption } from '../../../../types/forms';

export interface MockSelectOptionGroupData {
  subjectArea: string;
  options: FudisSelectOption<string>[];
}

type CourseObject = { courseCode: string; studyField: string };

export type TestCourseValue = string | CourseObject;
export type TestCourseAvailability = FudisSelectOption<TestCourseValue> & { availability: string };

export const defaultOptions: TestCourseAvailability[] = [
  {
    value: { courseCode: 'CS-101', studyField: 'Computer Science' },
    label: 'Introduction to Programming',
    availability: 'Available',
  },
  { value: 'academic-writing', label: 'Academic Writing', availability: 'Available' },
  { value: 'data-analysis', label: 'Data Analysis', availability: 'Available' },
  {
    value: 'advanced-research-methods',
    label: 'Advanced Research Methods',
    disabled: true,
    availability: 'Unavailable',
  },
  {
    value: { courseCode: 'SUS-221', studyField: 'Sustainability Studies' },
    label: 'Sustainable Development',
    availability: 'Available',
  },
  {
    value: 'project-management',
    label: 'Project Management',
    availability: 'Available',
  },
  {
    value: { courseCode: 'SUS-220', studyField: 'Sustainability Studies' },
    label: 'Sustainable Development',
    availability: 'Available',
  },
  {
    value: 'digital-learning-environments',
    label: 'Digital Learning Environments',
    availability: 'Available',
  },
];

export const defaultOptionsSecondaryLang: TestCourseAvailability[] = [
  {
    value: { courseCode: 'CS-101', studyField: 'Computer Science' },
    label: 'Ohjelmoinnin perusteet',
    availability: 'Saatavilla',
  },
  { value: 'academic-writing', label: 'Akateeminen kirjoittaminen', availability: 'Saatavilla' },
  { value: 'data-analysis', label: 'Data-analyysi', availability: 'Saatavilla' },
  {
    value: 'advanced-research-methods',
    label: 'Edistyneet tutkimusmenetelmat',
    disabled: true,
    availability: 'Ei saatavilla',
  },
  {
    value: 'project-management',
    label: 'Projektinhallinta',
    availability: 'Saatavilla',
  },
  {
    value: 'digital-learning-environments',
    label: 'Digitaaliset oppimisymparistot',
    availability: 'Saatavilla',
  },
];

export const multiselectChipListMockData: FudisSelectOption<string>[] = [
  { value: 'hereford', label: 'Hereford' },
  { value: 'texas-longhorn', label: 'Texas Longhorn' },
  { value: 'ayrshire', label: 'Ayrshire' },
  { value: 'wagyu', label: 'Wagyu' },
];

const courseTopics = [
  'Data Analysis',
  'Programming Fundamentals',
  'Academic Writing',
  'Research Methods',
  'Project Management',
  'Sustainable Development',
  'Digital Learning Environments',
  'Information Systems',
  'Statistical Methods',
  'Professional Communication',
];

const subjectAreas = [
  'Computer Science',
  'Business Studies',
  'Humanities',
  'Natural Sciences',
  'Social Sciences',
  'Education',
  'Health Sciences',
  'Arts and Design',
  'Engineering',
  'Law',
];

const courseFormats = [
  'Lecture Series',
  'Seminar',
  'Workshop',
  'Laboratory',
  'Studio Course',
  'Field Study',
  'Independent Study',
  'Project Course',
  'Intensive Course',
  'Capstone',
];

export const selectCourseCatalogueMockData: FudisSelectOption<string>[] = Array.from(
  { length: 1000 },
  (_, index) => {
    const topicIndex = index % courseTopics.length;
    const subjectAreaIndex = Math.floor(index / courseTopics.length) % subjectAreas.length;
    const formatIndex = Math.floor(index / (courseTopics.length * subjectAreas.length));

    return {
      value: `course-${String(index + 1).padStart(4, '0')}`,
      label: `${courseTopics[topicIndex]}: ${subjectAreas[subjectAreaIndex]} ${courseFormats[formatIndex]}`,
      subLabel: `${subjectAreas[subjectAreaIndex]} | ${courseFormats[formatIndex]} | Course ${index + 1}`,
    };
  },
);

export const groupedTestData: MockSelectOptionGroupData[] = subjectAreas.map(
  (subjectArea, subjectAreaIndex) => ({
    subjectArea,
    options: selectCourseCatalogueMockData
      .filter(
        (_, index) =>
          Math.floor(index / courseTopics.length) % subjectAreas.length === subjectAreaIndex,
      )
      .slice(0, 5),
  }),
);

export const groupedMockData = groupedTestData;
