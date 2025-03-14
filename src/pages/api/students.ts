import type { APIRoute } from 'astro';
import { db, Student } from 'astro:db';
/*
const res = (
  body: string,
  {status, statusText, headers}: {status?: number, statusText?: string, headers?: Headers}
) => new Response(body, { status, statusText, headers });


export const POST: APIRoute = async ({ request, params }) => {
  const body = await request.json();

  if (!body.name || !body.courseId) {
    return res('Datos inválidos', { status: 400 });
  }

  try {
    const result = await db.insert(Student).values({
      name: body.name,
      course_student: body.courseId,
    });

    return res(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    return res(error.message, { status: 500 });
  }
};*/
