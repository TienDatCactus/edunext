const mockCourses = [
  {
    courseName: "Kỹ thuật lập trình",
    description:
      "Học về các kỹ thuật lập trình cơ bản, cấu trúc dữ liệu và giải thuật",
    courseCode: "PRF192",
    assignments: [],
    instructor: "GV001",
    semester: "SP24",
    lessons: [],
    forMajor: "SE",
    status: "active",
  },
  {
    courseName: "Lập trình Web với Java",
    description:
      "Phát triển ứng dụng web với Java, Spring Framework và các công nghệ liên quan",
    courseCode: "PRJ301",
    assignments: [],
    instructor: "GV002",
    semester: "SP24",
    lessons: [],
    forMajor: "SE",
    status: "active",
  },
  {
    courseName: "Cơ sở dữ liệu",
    description: "Học về thiết kế, quản lý và tối ưu hóa cơ sở dữ liệu",
    courseCode: "DBI202",
    assignments: [],
    instructor: "GV003",
    semester: "SP24",
    lessons: [],
    forMajor: "SE",
    status: "active",
  },
  {
    courseName: "Trí tuệ nhân tạo",
    description: "Giới thiệu về AI, machine learning và deep learning",
    courseCode: "AIL302",
    assignments: [],
    instructor: "GV004",
    semester: "SP24",
    lessons: [],
    forMajor: "AI",
    status: "active",
  },
  {
    courseName: "Xử lý ngôn ngữ tự nhiên",
    description: "Học về các kỹ thuật xử lý ngôn ngữ tự nhiên và ứng dụng",
    courseCode: "NLP301",
    assignments: [],
    instructor: "GV005",
    semester: "SP24",
    lessons: [],
    forMajor: "AI",
    status: "active",
  },
  {
    courseName: "Thiết kế đồ họa",
    description:
      "Học về nguyên tắc thiết kế và sử dụng công cụ thiết kế đồ họa",
    courseCode: "GDD201",
    assignments: [],
    instructor: "GV006",
    semester: "SP24",
    lessons: [],
    forMajor: "GD",
    status: "active",
  },
  {
    courseName: "Marketing Quốc tế",
    description:
      "Học về chiến lược marketing trong môi trường kinh doanh quốc tế",
    courseCode: "MKT201",
    assignments: [],
    instructor: "GV007",
    semester: "SP24",
    lessons: [],
    forMajor: "IB",
    status: "active",
  },
];

const mockSemesters = [
  {
    semesterName: "Spring 2024",
    year: "2024",
    courses: [],
  },
  {
    semesterName: "Summer 2024",
    year: "2024",
    courses: [],
  },
  {
    semesterName: "Fall 2024",
    year: "2024",
    courses: [],
  },
];

const mockInstructors = [
  {
    name: "Nguyễn Văn A",
    email: "anv@fe.edu.vn",
    FEID: "GV001",
    role: "TEACHER",
    campus: "FU-HL",
  },
  {
    name: "Trần Thị B",
    email: "btt@fe.edu.vn",
    FEID: "GV002",
    role: "TEACHER",
    campus: "FU-HL",
  },
  {
    name: "Lê Văn C",
    email: "clv@fe.edu.vn",
    FEID: "GV003",
    role: "TEACHER",
    campus: "FU-HL",
  },
  {
    name: "Phạm Thị D",
    email: "dpt@fe.edu.vn",
    FEID: "GV004",
    role: "TEACHER",
    campus: "FU-HL",
  },
  {
    name: "Hoàng Văn E",
    email: "ehv@fe.edu.vn",
    FEID: "GV005",
    role: "TEACHER",
    campus: "FU-HL",
  },
  {
    name: "Đỗ Thị F",
    email: "fdt@fe.edu.vn",
    FEID: "GV006",
    role: "TEACHER",
    campus: "FU-HL",
  },
  {
    name: "Vũ Văn G",
    email: "gvv@fe.edu.vn",
    FEID: "GV007",
    role: "TEACHER",
    campus: "FU-HL",
  },
];

const mockLessons = [
  {
    title: "Giới thiệu về lập trình",
    content: "Tổng quan về lập trình, các khái niệm cơ bản",
    deadline: new Date("2024-03-30"),
    course: "PRF192",
    tag: "Lecture",
  },
  {
    title: "Biến và kiểu dữ liệu",
    content: "Học về các kiểu dữ liệu và cách sử dụng biến",
    deadline: new Date("2024-04-06"),
    course: "PRF192",
    tag: "Lecture",
  },
  {
    title: "Spring MVC",
    content: "Giới thiệu về Spring MVC và RESTful API",
    deadline: new Date("2024-03-30"),
    course: "PRJ301",
    tag: "Lecture",
  },
  {
    title: "Hibernate ORM",
    content: "Sử dụng Hibernate để tương tác với cơ sở dữ liệu",
    deadline: new Date("2024-04-06"),
    course: "PRJ301",
    tag: "Lecture",
  },
];

const mockAssignments = [
  {
    title: "Bài tập về nhà 1: Cấu trúc điều khiển",
    description: "Làm các bài tập về if-else và vòng lặp",
    startDate: new Date("2024-03-23"),
    dueDate: new Date("2024-03-30"),
    courseId: "PRF192",
  },
  {
    title: "Bài tập về nhà 2: Mảng và con trỏ",
    description: "Làm các bài tập về mảng một chiều và con trỏ",
    startDate: new Date("2024-03-30"),
    dueDate: new Date("2024-04-06"),
    courseId: "PRF192",
  },
  {
    title: "Assignment 1: CRUD với Spring MVC",
    description: "Xây dựng ứng dụng quản lý sinh viên với Spring MVC",
    startDate: new Date("2024-03-23"),
    dueDate: new Date("2024-04-06"),
    courseId: "PRJ301",
  },
];

module.exports = {
  mockCourses,
  mockSemesters,
  mockInstructors,
  mockLessons,
  mockAssignments,
};
