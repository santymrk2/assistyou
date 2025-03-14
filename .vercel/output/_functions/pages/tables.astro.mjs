import { c as createComponent, a as createAstro, r as renderHead, e as renderTemplate } from '../chunks/astro/server_Dr68GnM3.mjs';
import { g as getSession } from '../chunks/server_DBcLqzP5.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Tables = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Tables;
  const user = await getSession(Astro2.request);
  if (!user) {
    throw new Error("Usuario no autenticado");
  } else {
    console.log("Usuario autenticado:", user);
  }
  return renderTemplate`<html> <head><title>Datos filtrados por usuario</title>${renderHead()}</head> <body> <!--         <h1>Bienvenido {user}</h1>

        <section>
            <h2>Escuelas</h2>
            <pre>{JSON.stringify(schools, null, 2)}</pre>
        </section>

        <section>
            <h2>Cursos</h2>
            <pre>{JSON.stringify(courses, null, 2)}</pre>
        </section>

        <section>
            <h2>Estudiantes</h2>
            <pre>{JSON.stringify(students, null, 2)}</pre>
        </section>

        <section>
            <h2>Cuatrimestres</h2>
            <pre>{JSON.stringify(semesterPeriods, null, 2)}</pre>
        </section>

        <section>
            <h2>Asistencias</h2>
            <pre>{JSON.stringify(attendances, null, 2)}</pre>
        </section>

        <section>
            <h2>Exámenes</h2>
            <pre>{JSON.stringify(exams, null, 2)}</pre>
        </section>
 --> </body></html>`;
}, "/home/santymrk2/Develops/assistyou/src/pages/tables.astro", void 0);

const $$file = "/home/santymrk2/Develops/assistyou/src/pages/tables.astro";
const $$url = "/tables";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Tables,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
