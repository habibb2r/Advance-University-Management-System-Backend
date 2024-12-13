import { Router } from 'express';
import { StudentRoutes } from '../Modules/Student/student.route';
import { UserRoutes } from '../Modules/User/user.route';
import { AcademicRoutes } from '../Modules/AcademicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../Modules/AcademicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../Modules/AcademicDepartment/academicDepartment.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
