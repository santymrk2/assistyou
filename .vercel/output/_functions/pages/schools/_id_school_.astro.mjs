import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_DvO7GraQ.mjs';
import { d as db, S as School, C as Course, $ as $$Layout } from '../../chunks/_astro_db_Bwkc6FLZ.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$idSchool = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$idSchool;
  const { id_school } = Astro2.params;
  if (!id_school || typeof id_school !== "string") {
    return new Response("ID de escuela inv\xE1lido", {
      status: 400,
      statusText: "Bad Request"
    });
  }
  const [school, courses] = await Promise.all([
    db.select().from(School).where(eq(School.id, id_school)).then((res) => res[0]),
    db.select().from(Course).where(eq(Course.school_id, id_school))
  ]);
  if (!school) {
    return new Response("Escuela no encontrada", {
      status: 404,
      statusText: "Not Found"
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="p-4"> <div class="mb-6"> <a href="/" class="text-orange-600 ">
&larr; Volver a página principal
</a> </div> <h1 class="text-3xl font-bold mb-2 dark:text-white">${school.name}</h1> <h2 class="text-2xl font-semibold mb-4 dark:text-white">Cursos</h2> ${courses.length === 0 ? renderTemplate`<p class="text-white">No hay cursos registrados en esta escuela.</p>` : renderTemplate`<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> ${courses.map((course) => renderTemplate`<li class="bg-orange-600 hover:bg-orange-700 rounded-lg shadow transition-colors"> <a${addAttribute(`/schools/${school.id}/courses/${course.id}`, "href")} class="block"> <div id="course" class="flex items-center justify-center font-black text-2xl text-white p-4 rounded-xl text-center"> ${course.name} </div> </a> </li>`)} </ul>`} </section> ` })}`;
}, "/home/santymrk2/Develops/assistyou/src/pages/schools/[id_school].astro", void 0);

const $$file = "/home/santymrk2/Develops/assistyou/src/pages/schools/[id_school].astro";
const $$url = "/schools/[id_school]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$idSchool,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
