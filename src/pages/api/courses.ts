// src/pages/api/courses.ts
import type { APIRoute } from 'astro';
import { db, eq, and, Course, School } from 'astro:db';
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
    const { name, school_id } = data;
    
    if (!name) {
      return new Response(JSON.stringify({ error: 'Nombre de curso requerido' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!school_id) {
      return new Response(JSON.stringify({ error: 'ID de escuela requerido' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Verificar que la escuela existe y pertenece al usuario
    const school = await db.select().from(School).where(and(eq(School.id, school_id), eq(School.user_id, userId)));
    if (school.length === 0) {
      return new Response(JSON.stringify({ error: 'Escuela no encontrada o no tienes permiso para añadir cursos a esta escuela' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Crear ID único para el curso
    const prehash = name.toLowerCase().replace(/\s/g, '-') + "-" + school_id.slice(0, 6);
    const courseId = generateId(prehash).slice(0, 10);
    
    // Insertar el nuevo curso en la base de datos
    await db.insert(Course).values({
      id: courseId,
      name: name,
      school_id: school_id,
      user_id: userId
    });
    
    return new Response(JSON.stringify({ success: true, id: courseId }), { 
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error al crear curso:', error);
    return new Response(JSON.stringify({ error: 'Error al procesar la solicitud' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}