import { column, defineDb, defineTable } from 'astro:db';

// Tabla de Usuarios
const Teacher = defineTable({
  columns: {
    email: column.text({ primaryKey: true }),
    username: column.text()
  }
});

// Tabla de Escuelas
const School = defineTable({
  columns: {
    id: column.text({ primaryKey: true, autoIncrement: true }),
    name: column.text(),
    teacher_id: column.text({ references: () => Teacher.columns.email })
  }
});

// Tabla de Cursos
const Course = defineTable({
  columns: {
    id: column.text({ primaryKey: true, autoIncrement: true }),
    name: column.text(),
    school_id: column.text({ references: () => School.columns.id }),
  }
});

// Tabla de Cuatrimestres (SemesterPeriod)
const SemesterPeriod = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true}),
    course_id: column.text({ references: () => Course.columns.id }),
    name: column.text(),
    start_date: column.date(),
    end_date: column.date(),
  }
});

// Tabla de Estudiantes
const Student = defineTable({
  columns: {
    id: column.text({ primaryKey: true, autoIncrement: true }),
    first_name: column.text(),
    last_name: column.text(),
    birthdate: column.date(),
    course_id: column.text({ references: () => Course.columns.id }),
  }
});

// Tabla de Asistencia
const Attendance = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    course_id: column.text({ references: () => Course.columns.id }),
    attendance_date: column.date(),
    semester_period_id: column.number({
      references: () => SemesterPeriod.columns.id,
    }),
  }
});

// Tabla de Exámenes
const Exam = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    name: column.text(),      // Nombre del examen
    exam_date: column.date(),
    course_id: column.text({ references: () => Course.columns.id }),
    semester_period_id: column.number({
      references: () => SemesterPeriod.columns.id,    }),
  }
});

// Tabla para relacionar Asistencia con Estudiante (AttendanceStudent)
const AttendanceStudent = defineTable({
  columns: {
    attendance_id: column.number({ references: () => Attendance.columns.id }),
    student_id: column.text({ references: () => Student.columns.id }),
    status: column.text()
  }
});

// Tabla para relacionar Exámenes con Estudiante (ExamStudent)
const ExamStudent = defineTable({
  columns: {
    exam_id: column.number({ references: () => Exam.columns.id }),
    student_id: column.text({ references: () => Student.columns.id }),
    nota: column.number(), // Nota, puede ser nula
  }
});

export default defineDb({
  tables: {
    Teacher,
    School,
    Course,
    SemesterPeriod,
    Student,
    Attendance,
    Exam,
    AttendanceStudent,
    ExamStudent
  }
});
