import { c as createComponent, a as createAstro, f as renderComponent, e as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../../../../../chunks/astro/server_Dr68GnM3.mjs';
import { $ as $$Layout } from '../../../../../../chunks/Layout_CSinN2tU.mjs';
import { d as db, a as School, C as Course, S as Student, A as Attendance, b as AttendanceStudent, E as ExamStudent, c as Exam } from '../../../../../../chunks/_astro_db_DK6vn_a7.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../../../../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$studentId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$studentId;
  const { id_school, id_course, student_id } = Astro2.params;
  if (!id_school || !id_course || !student_id) {
    return new Response("Par\xE1metros inv\xE1lidos", {
      status: 400,
      statusText: "Bad Request"
    });
  }
  const [school, course, student] = await Promise.all([
    db.select().from(School).where(eq(School.id, id_school)).then((res) => res[0]),
    db.select().from(Course).where(eq(Course.id, id_course)).then((res) => res[0]),
    db.select().from(Student).where(eq(Student.id, student_id)).then((res) => res[0])
  ]);
  if (!school || !course || !student) {
    return new Response("Recurso no encontrado", {
      status: 404,
      statusText: "Not Found"
    });
  }
  if (course.school_id !== school.id || student.course_id !== course.id) {
    return new Response(
      "El estudiante no pertenece al curso o la escuela especificados",
      {
        status: 400,
        statusText: "Bad Request"
      }
    );
  }
  const allAttendances = await db.select().from(Attendance).where(eq(Attendance.course_id, course.id));
  const attendedAttendances = await db.select().from(AttendanceStudent).where(eq(AttendanceStudent.student_id, student.id));
  const totalClasses = allAttendances.length;
  const attendedClasses = attendedAttendances.length;
  const attendancePercentage = totalClasses > 0 ? attendedClasses / totalClasses * 100 : 0;
  const examRecords = await db.select().from(ExamStudent).where(eq(ExamStudent.student_id, student.id));
  const examDetails = await Promise.all(
    examRecords.map(async (record) => {
      const exam = await db.select().from(Exam).where(eq(Exam.id, record.exam_id)).then((res) => res[0]);
      return { exam, nota: record.nota };
    })
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="p-4"> <div class="mb-6"> <a${addAttribute(`/schools/${school.id}/courses/${course.id}`, "href")} class="text-orange-600 hover:underline">
&larr; Volver a ${course.name} </a> </div> <h1 class="text-3xl font-bold mb-2 dark:text-white">
Perfil del Estudiante
</h1> <div class="rounded-lg p-4 dark:text-white"> <h2 class="text-2xl font-semibold mb-4">${student.name}</h2> <p class="mb-2"><strong>Curso:</strong> ${course.name}</p> <p class="mb-2"><strong>Escuela:</strong> ${school.name}</p> <!-- Se puede agregar más información del estudiante aquí --> </div> <div class="dark:text-white p-4"> <h3 class="text-xl font-semibold mb-2">Asistencia</h3> <p class="mb-2"><strong>Total de clases:</strong> ${totalClasses}</p> <p class="mb-2"><strong>Clases asistidas:</strong> ${attendedClasses}</p> <p class="mb-2"> <strong>Porcentaje de asistencia:</strong> ${attendancePercentage.toFixed(2)}%
</p> </div> <div class="dark:text-white p-4"> <h3 class="text-xl font-semibold mb-2">Exámenes</h3> ${examDetails.length === 0 ? renderTemplate`<p class="mb-2">No se encontraron exámenes para este estudiante.</p>` : renderTemplate`<div class="grid grid-cols-2 gap-4"> ${examDetails.map(({ exam, nota }) => renderTemplate`<div class="flex flex-col justify-center items-center gap-2 bg-zinc-700 p-4 rounded-lg text-center"> <p class="text-sm text-zinc-300"> ${new Date(exam.exam_date).toLocaleDateString()} </p> <p class="text-xl">${exam.name}</p> <p class="font-extrabold"> ${nota !== null ? nota : "Sin calificar"} </p> </div>`)} </div>`} </div> </section> ` })}`;
}, "/home/santymrk2/Develops/assistyou/src/pages/schools/[id_school]/courses/[id_course]/students/[student_id].astro", void 0);

const $$file = "/home/santymrk2/Develops/assistyou/src/pages/schools/[id_school]/courses/[id_course]/students/[student_id].astro";
const $$url = "/schools/[id_school]/courses/[id_course]/students/[student_id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$studentId,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
