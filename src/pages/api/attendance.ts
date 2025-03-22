// src/pages/api/attendances.ts
import type { APIRoute } from 'astro';
import { db, Attendance, SemesterPeriod } from 'astro:db';
import { generateId } from '../../lib/utils';
import { getSession } from 'auth-astro/server';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Verificar autenticación
    const session = await getSession(request);
    if (!session || !session.user?.email) {
      return new Response(
        JSON.stringify({ error: 'No autorizado' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Obtener el ID del usuario basado en su email
    const userId = generateId(session.user.email);

    const data = await request.json();
    const { course_id, attendance_date } = data;

    // Verificar campos requeridos
    if (!course_id || !attendance_date || !semester_period_id) {
      return new Response(
        JSON.stringify({ error: 'course_id, attendance_date y semester_period_id son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }


    const semesters
    
    const semester_period_id = //here we have to find what period it has by the date.

    // Generar ID único para la asistencia
    // Se utiliza una combinación de course_id, fecha de asistencia y parte del userId.
    const prehash = course_id.toLowerCase() + "-" + attendance_date + "-" + userId.slice(0, 6);
    const hashStr = generateId(prehash);
    // Convertir los primeros 10 caracteres en un número (base 16) para el ID
    const attendanceId = parseInt(hashStr.slice(0, 10), 16);

    await db.insert(Attendance).values({
      id: attendanceId,
      course_id,
      // Convertir el string recibido a tipo Date
      attendance_date: new Date(attendance_date),
      semester_period_id,
      user_id: userId
    });

    return new Response(
      JSON.stringify({ success: true, id: attendanceId }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al crear asistencia:', error);
    return new Response(
      JSON.stringify({ error: 'Error al procesar la solicitud' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
