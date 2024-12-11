import { Router } from 'express';
import { StudentRoutes } from '../Modules/Student/student.route';
import { UserRoutes } from '../Modules/User/user.route';
import { AcademicRoutes } from '../Modules/AcademicSemester/academicSemester.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
