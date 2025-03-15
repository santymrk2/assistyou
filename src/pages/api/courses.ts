// src/pages/api/courses.ts
import type { APIRoute } from 'astro';
import { db, eq, Course } from 'astro:db';
import { generateId } from '../../lib/utils';
import { getSession } from 'auth-astro/server';

export const POST: APIRoute = async ({ request }) => {
  try {
    const session = await getSession(request);

    // Verificar autenticación
    if (!session || !session.user?.email) {
      return new Response(
        JSON.stringify({ error: 'No autorizado' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Obtener el ID de usuario basado en el email
    const userId = generateId(session.user.email);

    const data = await request.json();
    const { name, school_id } = data;

    if (!name || !school_id) {
      return new Response(
        JSON.stringify({ error: 'Nombre de curso y ID de escuela son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Crear ID único para el curso
    const prehash = name.toLowerCase().replace(/\s/g, '-') + "-" + userId.slice(0, 6);
    const courseId = generateId(prehash).slice(0, 10);

    await db.insert(Course).values({
      id: courseId,
      name,
      school_id,
      user_id: userId
    });

    return new Response(
      JSON.stringify({ success: true, id: courseId }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al crear curso:', error);
    return new Response(
      JSON.stringify({ error: 'Error al procesar la solicitud' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const GET: APIRoute = async ({ request }) => {
  try {
    const session = await getSession(request);

    // Verificar autenticación
    if (!session || !session.user?.email) {
      return new Response(
        JSON.stringify({ error: 'No autorizado' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Obtener el ID de usuario basado en el email
    const userId = generateId(session.user.email);

    // Obtener todos los cursos asociados al usuario
    const courses = await db.select().from(Course).where(eq(Course.user_id, userId));

    return new Response(
      JSON.stringify({ courses }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    return new Response(
      JSON.stringify({ error: 'Error al procesar la solicitud' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
