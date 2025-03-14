import { d as db, A as Attendance } from '../../chunks/_astro_db_DK6vn_a7.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.json();
    await db.insert(Attendance).values({
      student_id: data.studentId,
      date: new Date(data.date),
      status: data.status
    }).onConflictDoUpdate({
      target: [Attendance.student_id, Attendance.date],
      set: { status: data.status }
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
