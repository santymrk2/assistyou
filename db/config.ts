import { column, defineDb, defineTable } from 'astro:db';

// Tabla de Usuarios
const AppUser = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    username: column.text(),
    email: column.text()
  }
});

// Tabla de Escuelas
const School = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    user_id: column.text({ references: () => AppUser.columns.id })
  }
});

// Tabla de Cursos
const Course = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    school_id: column.text({ references: () => School.columns.id }),
    user_id: column.text({ references: () => AppUser.columns.id })
  }
});

// Tabla de Cuatrimestres (SemesterPeriod)
const SemesterPeriod = defineTable({
  columns: {
    id: column.number({ primaryKey: true}),
    course_id: column.text({ references: () => Course.columns.id }),
    name: column.text(),              // Ejemplo: 'Primer Cuatrimestre'
    start_date: column.date(),        // O column.text(), según convenga
    end_date: column.date(),
    user_id: column.text({ references: () => AppUser.columns.id })
  }
});

// Tabla de Estudiantes
const Student = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    course_id: column.text({ references: () => Course.columns.id }),
    user_id: column.text({ references: () => AppUser.columns.id })
  }
});

// Tabla de Asistencia
const Attendance = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    course_id: column.text({ references: () => Course.columns.id }),
    attendance_date: column.date(), // Representa la fecha de asistencia
    semester_period_id: column.number({
      references: () => SemesterPeriod.columns.id,
    }),
    user_id: column.text({ references: () => AppUser.columns.id })
  }
});

// Tabla de Exámenes
const Exam = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),      // Nombre del examen
    exam_date: column.date(),
    course_id: column.text({ references: () => Course.columns.id }),
    semester_period_id: column.number({
      references: () => SemesterPeriod.columns.id,    }),
    user_id: column.text({ references: () => AppUser.columns.id })
  }
});

// Tabla para relacionar Asistencia con Estudiante (AttendanceStudent)
const AttendanceStudent = defineTable({
  columns: {
    attendance_id: column.number({ references: () => Attendance.columns.id }),
    student_id: column.text({ references: () => Student.columns.id }),
    user_id: column.text({ references: () => AppUser.columns.id })
  },
  indexes: [{on:['attendance_id', 'student_id'], unique: true}
]
});

// Tabla para relacionar Exámenes con Estudiante (ExamStudent)
const ExamStudent = defineTable({
  columns: {
    exam_id: column.number({ references: () => Exam.columns.id }),
    student_id: column.text({ references: () => Student.columns.id }),
    nota: column.number(), // Nota, puede ser nula
    user_id: column.text({ references: () => AppUser.columns.id })
  },
  indexes: [
    { on: ["exam_id", "student_id"], unique: true}
  ]
});

export default defineDb({
  tables: {
    AppUser,
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
