// src/pages/api/students.ts
import type { APIRoute } from 'astro';
import { db, Student } from 'astro:db';
import { generateId } from "../../lib/utils";
import { getSession } from "auth-astro/server";

export const POST: APIRoute = async ({ request }) => {
  try {
    const session = await getSession(request);

    // Verificar autenticación
    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Obtener el ID de usuario basado en el email
    const userId = generateId(session.user.email);

    const data = await request.json();
    const { name, course_id } = data;

    if (!name || !course_id) {
      return new Response(JSON.stringify({ error: 'Nombre y course_id requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Crear ID único para el estudiante
    const prehash = name.toLowerCase().replace(/\s/g, '-') + "-" + userId.slice(0, 6);
    const studentId = generateId(prehash).slice(0, 10);

    // Insertar el nuevo estudiante en la base de datos, incluyendo el user_id
    await db.insert(Student).values({
      id: studentId,
      name: name,
      course_id: course_id,
      user_id: userId
    });

    return new Response(JSON.stringify({ success: true, id: studentId }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error al crear estudiante:', error);
    return new Response(JSON.stringify({ error: 'Error al procesar la solicitud' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
