// src/lib/courseUtils.ts
import { generateId } from "./utils";
import { db, eq, and, School, Course } from "astro:db";
import { getSession } from "auth-astro/server";

export async function getCourseData(request, schoolId, courseId) {
  // Obtener la sesión actual
  const session = await getSession(request);
  if (!session) {
    return {
      error: "No hay sesión activa",
      status: 401,
      statusText: "Unauthorized"
    };
  }
  
  const userId = session.user.email ? generateId(session.user.email) : "";
  
  // Obtener escuela y curso
  const [school, course] = await Promise.all([
    db
      .select()
      .from(School)
      .where(and(eq(School.id, schoolId), eq(School.user_id, userId)))
      .then((res) => res[0]),
    db
      .select()
      .from(Course)
      .where(and(eq(Course.id, courseId), eq(Course.user_id, userId)))
      .then((res) => res[0]),
  ]);
  
  // Validar existencia
  if (!school || !course) {
    return {
      error: "Recurso no encontrado",
      status: 404,
      statusText: "Not Found"
    };
  }
  
  // Verificar que el curso pertenece a la escuela
  if (course.school_id !== school.id) {
    return {
      error: "El curso no pertenece a esta escuela",
      status: 400,
      statusText: "Bad Request"
    };
  }
  
  return { school, course, userId };
}