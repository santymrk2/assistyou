import { c as createComponent, m as maybeRenderHead, d as addAttribute, b as renderTemplate, a as createAstro, r as renderComponent, e as renderScript } from '../chunks/astro/server_DvO7GraQ.mjs';
import { d as db, S as School, $ as $$Layout } from '../chunks/_astro_db_Bwkc6FLZ.mjs';
import { g as getSession } from '../chunks/server_DBcLqzP5.mjs';
export { renderers } from '../renderers.mjs';

const $$Schools = createComponent(async ($$result, $$props, $$slots) => {
  const schools = await db.select().from(School).all();
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col items-center"> <h1 class="text-center text-2xl font-black m-6 text-white">Schools</h1> <div class="flex flex-col sm:flex-row gap-4"> ${schools.map(({ id, name }) => renderTemplate`<div class="bg-orange-600 hover:bg-orange-700 rounded-xl flex flex-col items-center"> <a${addAttribute(`/schools/${id}`, "href")} class="text-zinc-900 text-lg font-extrabold text-center px-6 py-4">${name}</a> </div>`)} </div> </div>`;
}, "/home/santymrk2/Develops/assistyou/src/components/Schools.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const session = await getSession(Astro2.request);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex flex-col jusfity-center items-center"> ${session && renderTemplate`<button id="logout" class="p-4 font-bold text-black dark:text-white text-center rounded-xl hover:bg-zinc-200 transition-all">
Cerrar sesion
</button>`} <header class="flex flex-col gap-4 m-16"> <h1 class="text-4xl font-bold text-center dark:text-white flex justify-center">
Assist<p class="text-orange-600 font-black">YOU</p> </h1> <p class="text-center dark:text-white">
Bienvenido a la plataforma de asistencia para profesores
</p> </header> ${session ? renderTemplate`${renderComponent($$result2, "Schools", $$Schools, {})}` : renderTemplate`<div class="flex gap-4"> <button id="login" class="font-bold bg-black  text-white rounded-lg p-2 hover:bg-zinc-700  transition-all dark:bg-white dark:text-black dark-hover:bg-zinc-200">
Iniciar sesion
</button> </div>`} </main> ` })} ${renderScript($$result, "/home/santymrk2/Develops/assistyou/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/santymrk2/Develops/assistyou/src/pages/index.astro", void 0);

const $$file = "/home/santymrk2/Develops/assistyou/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
