import { column, defineDb, defineTable} from 'astro:db';


const School = defineTable({
  columns: { 
    id: column.text({primaryKey: true}),
    name: column.text()
  }
})

const Course = defineTable({
  columns: {
    id: column.text({primaryKey: true}),
    name: column.text(),
    school_course: column.text({references: () => School.columns.id})
  }
})

const Student = defineTable({
  columns: { 
    id: column.text({primaryKey: true}),
    name: column.text(),
    course_student: column.text({references: () => Course.columns.id})  
  }
})


const Attendance = {
  columns: {
    student_id: column.text({references: () => Student.columns.id}),
    date: column.date(),
    status: column.text()
  }
};



// https://astro.build/db/config
export default defineDb({
  tables: {
    Course,
    School,
    Student,
    Attendance
  }
});
