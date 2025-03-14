import type { APIRoute } from 'astro';
import { db, Attendance } from 'astro:db';
/*
export const POST: APIRoute= async ({ request }) => {
  try {
    const data = await request.json();
    
    // Insertar o actualizar asistencia
    await db.insert(Attendance)
      .values({
        student_id: data.studentId,
        date: new Date(data.date),
        status: data.status,
      })
      .onConflictDoUpdate({
        target: [Attendance.student_id, Attendance.date],
        set: { status: data.status }
      });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}*/