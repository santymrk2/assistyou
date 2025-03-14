import { d as db, S as Student } from '../../chunks/_astro_db_DK6vn_a7.mjs';
export { renderers } from '../../renderers.mjs';

const res = (body, { status, statusText, headers }) => new Response(body, { status, statusText, headers });
const POST = async ({ request, params }) => {
  const body = await request.json();
  if (!body.name || !body.courseId) {
    return res("Datos inválidos", { status: 400 });
  }
  try {
    const result = await db.insert(Student).values({
      name: body.name,
      course_student: body.courseId
    });
    return res(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return res(error.message, { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
