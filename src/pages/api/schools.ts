// src/pages/api/schools.ts
import type { APIRoute } from 'astro';
import { db, eq, and, School } from 'astro:db';
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
    const { name } = data;

    if (!name) {
      return new Response(JSON.stringify({ error: 'Nombre de escuela requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Crear ID único para la escuela
    const prehash = name.toLowerCase().replace(/\s/g, '-') + "-" + userId.slice(0, 6);
    const schoolId = generateId(prehash).slice(0, 10);


    // Insertar la nueva escuela en la base de datos, incluyendo el user_id
    await db.insert(School).values({
      id: schoolId,
      name: name,
      user_id: userId
    });

    return new Response(JSON.stringify({ success: true, id: schoolId }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error al crear escuela:', error);
    return new Response(JSON.stringify({ error: 'Error al procesar la solicitud' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export const GET: APIRoute = async ({ request }) => {
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

    // Obtener todas las escuelas del usuario
    const schools = await db.select().from(School).where(eq(School.user_id, userId));

    return new Response(JSON.stringify({ schools }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error al obtener escuelas:', error);
    return new Response(JSON.stringify({ error: 'Error al procesar la solicitud' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export const DELETE: APIRoute = async ({ request }) => {
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

    // Obtener el ID de la escuela a eliminar
    const data = await request.json();
    const { id } = data;

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID de escuela requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verificar que la escuela exista y pertenezca al usuario
    const schoolToDelete = await db.select().from(School)
      .where(and(eq(School.id, id), eq(School.user_id, userId)))

    if (!schoolToDelete || schoolToDelete.length === 0) {
      return new Response(JSON.stringify({ error: 'Escuela no encontrada o no autorizada' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Eliminar la escuela de la base de datos
    await db.delete(School)
      .where(and(eq(School.id, id),eq(School.user_id, userId)))

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error al eliminar escuela:', error);
    return new Response(JSON.stringify({ error: 'Error al procesar la solicitud' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
