import '../../../../chunks/page-ssr_DU8zOrak.mjs';
import { c as createComponent, a as createAstro, f as renderComponent, g as renderScript, e as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../../../chunks/astro/server_pvVtcL_V.mjs';
import { $ as $$Layout } from '../../../../chunks/Layout_DS82tt2j.mjs';
import { d as db, a as School, C as Course, S as Student, c as Exam, A as Attendance } from '../../../../chunks/_astro_db_DK6vn_a7.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$idCourse = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$idCourse;
  const { id_school, id_course } = Astro2.params;
  if (!id_school || !id_course) {
    return new Response("Par\xE1metros inv\xE1lidos", {
      status: 400,
      statusText: "Bad Request"
    });
  }
  const [school, course, students, exams, attendance] = await Promise.all([
    db.select().from(School).where(eq(School.id, id_school)).then((res) => res[0]),
    db.select().from(Course).where(eq(Course.id, id_course)).then((res) => res[0]),
    db.select().from(Student).where(eq(Student.course_id, id_course)),
    db.select().from(Exam).where(eq(Exam.course_id, id_course)),
    db.select().from(Attendance).where(eq(Attendance.course_id, id_course))
  ]);
  if (!school || !course) {
    return new Response("Recurso no encontrado", {
      status: 404,
      statusText: "Not Found"
    });
  }
  if (course.school_id !== school.id) {
    return new Response("El curso no pertenece a esta escuela", {
      status: 400,
      statusText: "Bad Request"
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="p-4"> <div class="mb-6"> <a${addAttribute(`/schools/${school.id}`, "href")} class="text-orange-600 hover:underline">
&larr; Volver a ${school.name} </a> </div> <div class="bg-orange-600 rounded-lg shadow p-2 flex items-center justify-center mb-4"> <h1 id="course" class="text-2xl font-black dark:text-white align-middle"> ${course.name} </h1> </div> <div class="grid grid-cols-3 gap-4 mb-4"> <div id="alumnosNav" class="cursor-pointer bg-gray-100 rounded-lg shadow p-2 flex items-center justify-center"> <svg id="alumnosSvg" class="size-10 fill-zinc-800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg"><path d="M166.667 316.667c0-82.843 67.157-150 150-150s150 67.157 150 150-67.157 150-150 150-150-67.157-150-150Z"></path><path d="M478.917 402.107c-1.517 2.873-.874 6.456 1.736 8.39 19.387 14.35 43.377 22.836 69.347 22.836 64.433 0 116.667-52.233 116.667-116.666C666.667 252.233 614.433 200 550 200c-25.97 0-49.96 8.487-69.347 22.838-2.61 1.933-3.253 5.515-1.736 8.388C492.38 256.74 500 285.813 500 316.667c0 30.853-7.62 59.926-21.083 85.44Z"></path><path d="M154.705 523.31c41.079-17.83 94.977-23.31 161.96-23.31 67.042 0 120.978 5.49 162.072 23.36 44.763 19.463 71.97 52.617 86.23 99.427 6.683 21.94-9.797 43.88-32.507 43.88H100.934c-22.7377 0-39.2523-21.974-32.5483-43.954 14.279-46.816 41.5273-79.96 86.3193-99.403Z"></path><path d="M493.95 467.88c-13.8.857-14.61 19.397-1.93 24.91 34.747 15.11 60.91 37.353 79.673 65.743C587.09 581.83 611 600 638.923 600h59.354c23.573 0 40.773-23.423 32.48-46.307-.477-1.316-.974-2.623-1.487-3.92-11.413-28.82-30.977-50.036-59.943-63.56-27.197-12.696-61.244-17.936-101.354-19.52l-.66-.026h-.656c-23.627 0-48.304-.304-72.707 1.213Z"></path></svg> </div> <div id="asistenciaNav" class="cursor-pointer bg-gray-100 rounded-lg shadow p-2 flex items-center justify-center"> <svg id="asistenciaSvg" class="size-10 fill-zinc-800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg"><path d="M66.7206 333.333c-.0366 3.424-.054 6.89-.054 10.4v179.2c0 37.214 1.9507 69.394 7.9554 96.414 6.089 27.4 16.781 51.49 35.661 70.37 18.88 18.88 42.972 29.573 70.37 35.66 27.02 6.006 59.199 7.956 96.414 7.956h245.866c37.214 0 69.394-1.95 96.414-7.956 27.4-6.087 51.49-16.78 70.37-35.66 18.88-18.88 29.573-42.97 35.66-70.37 6.006-27.02 7.956-59.2 7.956-96.414v-179.2c0-3.51-.016-6.976-.053-10.4H66.7206ZM166.664 144.903V100c0-18.4093 14.923-33.3333 33.333-33.3333 18.409 0 33.333 14.924 33.333 33.3333v34.492c13.705-.823 28.285-1.159 43.734-1.159H522.93c15.45 0 30.03.336 43.733 1.159V100c0-18.4093 14.924-33.3333 33.334-33.3333 18.41 0 33.333 14.924 33.333 33.3333v44.903c21.637 6.442 40.787 16.45 56.383 32.046 18.88 18.88 29.574 42.972 35.66 70.371 1.374 6.179 2.537 12.629 3.51 19.347H71.11c.9743-6.718 2.1356-13.168 3.509-19.347 6.089-27.399 16.781-51.491 35.661-70.371 15.596-15.596 34.749-25.604 56.384-32.046Z"></path></svg> </div> <div id="examenesNav" class="cursor-pointer bg-gray-100 rounded-lg shadow p-2 flex items-center justify-center"> <svg id="examenesSvg" class="size-10 fill-zinc-800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M500 333.333c18.41 0 33.333 14.924 33.333 33.334v200C533.333 585.077 518.41 600 500 600c-18.41 0-33.333-14.923-33.333-33.333v-200c0-18.41 14.923-33.334 33.333-33.334Zm-100 33.334c18.41 0 33.333 14.923 33.333 33.333v166.667C433.333 585.077 418.41 600 400 600c-18.41 0-33.333-14.923-33.333-33.333V400c0-18.41 14.923-33.333 33.333-33.333Zm-66.667 100c0-18.41-14.923-33.334-33.333-33.334-18.409 0-33.333 14.924-33.333 33.334v100c0 18.41 14.924 33.333 33.333 33.333s33.333-14.923 33.333-33.333v-100Zm82.734-400.004c22.626-.0347 42.706-.0653 61.253 7.617 18.547 7.6823 32.727 21.9037 48.7 37.928 31.653 31.75 63.357 63.453 95.107 95.106 16.023 15.975 30.246 30.153 37.926 48.7 7.684 18.547 7.654 38.628 7.617 61.255-.127 83.864-.003 167.728-.003 251.594.003 29.55.003 55.01-2.737 75.397-2.94 21.85-9.563 42.797-26.553 59.787-16.987 16.986-37.934 23.613-59.784 26.55-20.39 2.74-45.85 2.74-75.4 2.736H297.807c-29.55.004-55.011.004-75.4-2.736-21.85-2.937-42.795-9.564-59.784-26.55-16.989-16.99-23.614-37.937-26.551-59.787-2.742-20.387-2.74-45.847-2.739-75.397l.001-335.528c0-.734-.001-1.466-.001-2.195-.001-29.549-.003-55.01 2.739-75.399 2.937-21.85 9.562-42.795 26.551-59.7837 16.989-16.989 37.934-23.6136 59.784-26.5513 20.389-2.7413 45.849-2.74 75.399-2.7383 39.421.0023 78.841.056 118.261-.0047Z"></path></svg> </div> </div> <!-- Sección de alumnos --> <div id="alumnosSection"> <h2 class="text-2xl font-semibold mb-4 dark:text-white">Alumnos</h2> ${students.length === 0 ? renderTemplate`<p class="text-gray-400">
No hay estudiantes registrados en este curso.
</p>` : renderTemplate`<div class="overflow-x-auto"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-gray-100 dark:bg-zinc-900"> <tr> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>  </tr> </thead> <tbody class="bg-white dark:bg-zinc-900 divide-y divide-gray-200"> ${students.map((student) => renderTemplate`<tr class="hover:bg-gray-100 dark:hover:bg-zinc-800"> <td class="px-6 py-4 whitespace-nowrap dark:text-white "> <a${addAttribute(`/schools/${school.id}/courses/${course.id}/students/${student.id}`, "href")}> ${student.name} </a> </td>  </tr>`)} </tbody> </table> </div>`} </div> <div id="asistenciaSection" style="display: none;"> <h2 class="text-2xl font-semibold mb-4 dark:text-white">Asistencias</h2> ${attendance.length === 0 ? renderTemplate`<p class="text-gray-400">
No hay asistencias registradas para este curso.
</p>` : renderTemplate`<ul class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3"> ${attendance.map((att) => renderTemplate`<li class="flex justify-center  items-center dark:text-white rounded-md bg-zinc-700 p-2 text-cetner"> ${new Date(att.attendance_date).toLocaleDateString()} </li>`)} </ul>`} <button class="bg-orange-600 hover:bg-orange-700 text-zinc-900 font-semibold px-4 py-2 rounded-lg mt-4">
Agregar asistencia
</button> </div> <div id="examenesSection" style="display: none;"> <h2 class="text-2xl font-semibold mb-4 dark:text-white">Examenes</h2> ${exams.length === 0 ? renderTemplate`<p class="text-gray-400">
No hay exámenes registrados para este curso.
</p>` : renderTemplate`<div class="grid grid-cols-2 md:flex flex-col justify-center items-center gap-3 justify-items-center"> ${exams.map(({ name, exam_date, semester_period_id }) => renderTemplate`<div class="flex flex-col justify-center size-30 md:size-40 items-center gap-2 bg-zinc-700 p-4 rounded-lg text-center"> <p class="text-sm text-zinc-300"> ${new Date(exam_date).toLocaleDateString()} </p> <p class="text-xl font-bold dark:text-white">${name}</p> </div>`)} </div>`} <button class="bg-zinc-700 group hover:bg-white text-zinc-900 font-semibold px-4 py-2 rounded-lg mt-4 size-30 md:size-40 flex justify-center items-center gap-2"> <svg class="stroke-2 stroke-white size-15 group-hover:stroke-zinc-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 12h5m0 0h5m-5 0V7m0 5v5" stroke-linecap="round" stroke-linejoin="round"></path></svg> </button> </div> </section> ` })} ${renderScript($$result, "/home/santymrk2/Develops/assistyou/src/pages/schools/[id_school]/courses/[id_course].astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/santymrk2/Develops/assistyou/src/pages/schools/[id_school]/courses/[id_course].astro", void 0);

const $$file = "/home/santymrk2/Develops/assistyou/src/pages/schools/[id_school]/courses/[id_course].astro";
const $$url = "/schools/[id_school]/courses/[id_course]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$idCourse,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
