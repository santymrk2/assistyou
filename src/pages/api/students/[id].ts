import type { APIRoute } from 'astro';
import { db, eq, Student } from 'astro:db';

export const PUT: APIRoute = async ({ request, params }) => {
  const { id } = params;
  const body = await request.json();

  if (!body.name) {
    return new Response(JSON.stringify({ error: 'Datos inválidos' }), { status: 400 });
  }

  try {
    const result = await db.update(Student, { name: body.name }, (query) =>
      query.where(eq(Student.id, id))
    );

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;

  try {
    const result = await db.delete(Student, (query) =>
      query.where(eq(Student.id, id))
    );

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
