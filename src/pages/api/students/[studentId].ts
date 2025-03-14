import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { object, string, safeParse} from 'valibot';
import { db,eq, and, Student } from "astro:db";
import { generateId } from "../../../lib/utils";

const StudentSchema = object({
    name: string(),
    course_id: string(),
})

const res = (
    body: string, 
    {status, statusText, headers} : {status?: number, statusText?: string, headers?: Headers}
) => new Response(body, { status, statusText, headers});

export const POST: APIRoute = async ({ params, request}) => {
    const session = await getSession(request)
    if (!session || session?.user ==null){
        return res("Unauthorized", {status: 401})
    }

    const userId = session.user.id

    const { studentId } = params
    if(!studentId){
        return res("Bad Request", {status: 400})
    }

    const studentData = await db.select().from(Student).where(and(eq(Student.id, studentId), eq(Student.user_id, userId)))
    if(!studentData){
        return res("Not Found", {status: 404})
    }

    const body = await request.json()

    if(!body || !body.name){
        return res("Bad Request", {status: 400})
    }

    const name = body.name
    await db.update(Student).set({name}).where(eq(Student.id, studentId))




    console.log(studentData)
    return res("OK", {status: 200})
}