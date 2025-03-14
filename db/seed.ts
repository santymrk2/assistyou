import { db,  AppUser, School, Course, Student, SemesterPeriod, Attendance, Exam, AttendanceStudent, ExamStudent} from 'astro:db';

export default async function seed() {
  // Inserta un usuario para las referencias


  await db.insert(School).values([
    { id: 'sanpablo', name: 'San Pablo', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { id: 'godspell', name: 'Godspell', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { id: 'complejo', name: 'Complejo', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
  ]);

  await db.insert(Course).values([
    { id: '6A', name: '6A', school_id: 'sanpablo', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { id: '5A', name: '5A', school_id: 'godspell', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { id: '3B', name: '3B', school_id: 'complejo', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
  ]);

  await db.insert(SemesterPeriod).values([
    { id:1, course_id: '6A', name: 'Primer Cuatrimestre', start_date: new Date(), end_date: new Date(), user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { id:2, course_id: '5A', name: 'Primer Cuatrimestre', start_date: new Date(), end_date: new Date(), user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { id:3, course_id: '3B', name: 'Primer Cuatrimestre', start_date: new Date(), end_date: new Date(), user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
  ]);

  await db.insert(Student).values([
    { id: 'S6A1', name: 'Alumno 6A 1', course_id: '6A', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { id: 'S6A2', name: 'Alumno 6A 2', course_id: '6A', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { id: 'S5A1', name: 'Alumno 5A 1', course_id: '5A', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { id: 'S5A2', name: 'Alumno 5A 2', course_id: '5A', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { id: 'S3B1', name: 'Alumno 3B 1', course_id: '3B', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { id: 'S3B2', name: 'Alumno 3B 2', course_id: '3B', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
  ]);

  await db.insert(Attendance).values([
    { id: 1, course_id: '6A', attendance_date: new Date(), semester_period_id: 1, user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { id: 2, course_id: '5A', attendance_date: new Date(), semester_period_id: 2, user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { id: 3, course_id: '3B', attendance_date: new Date(), semester_period_id: 3, user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
  ]);

  await db.insert(AttendanceStudent).values([
    { attendance_id: 1, student_id: 'S6A1', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { attendance_id: 1, student_id: 'S6A2', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { attendance_id: 2, student_id: 'S5A1', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { attendance_id: 2, student_id: 'S5A2', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { attendance_id: 3, student_id: 'S3B1', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { attendance_id: 3, student_id: 'S3B2', user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
  ]);

  await db.insert(Exam).values([
    { id: 1, name: 'Examen Parcial 1', exam_date: new Date(), course_id: '6A', semester_period_id: 1, user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { id: 2, name: 'Examen Parcial 1', exam_date: new Date(), course_id: '5A', semester_period_id: 2, user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { id: 3, name: 'Examen Parcial 1', exam_date: new Date(), course_id: '3B', semester_period_id: 3, user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
  ]);

  await db.insert(ExamStudent).values([
    { exam_id: 1, student_id: 'S6A1', nota: 8.5, user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { exam_id: 1, student_id: 'S6A2', nota: 7.0, user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { exam_id: 2, student_id: 'S5A1', nota: 9.0, user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { exam_id: 2, student_id: 'S5A2', nota: 6.5, user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { exam_id: 3, student_id: 'S3B1', nota: 8.0, user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
    { exam_id: 3, student_id: 'S3B2', nota: 7.5, user_id: '6f3da1a6ac76187d85b841453df2a695fe121393ee384a21c96a6b4fba5b113a'},
  ]);

}
