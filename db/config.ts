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

/*
const Student = defineTable({
  columns: { 
    id: column.text({primaryKey: true}),
    name: column.text(),
    course_student: column.text()  
  }
})

const Assistance = defineTable({
  columns: { 
    course_assist: column.text(),
    student_assist: column.text(),
    status: column.text(),
    date: column.date()
  
  }
})
*/


// https://astro.build/db/config
export default defineDb({
  tables: {
    Course,
    School
  }
});
