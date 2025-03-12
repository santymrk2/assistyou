import { db, School, Course, Student } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(School).values([
    { id: '1', name: 'Godspell' },
    { id: '2', name: 'SanPablo' },
    { id: '3', name: 'Complejo' },
  ]);

  await db.insert(Course).values([
    { id: '1', name: '3A', school_course: '2' },
    { id: '2', name: '3B', school_course: '2' },
    { id: '3', name: '6U', school_course: '3' },
  ]);

  await db.insert(Student).values([
    { id: '1', name: 'Alfred', course_student: '2' },
    { id: '2', name: 'Bilbo', course_student: '2' },
    { id: '4', name: 'ALEGRE, Belen Ailin', course_student: '3' },
    { id: '5', name: 'ANTA, Milena Nicole', course_student: '3' },
    { id: '6', name: 'APANG, Valentin', course_student: '3' },
    { id: '7', name: 'AVALOS, Melina Magalì', course_student: '3' },
    { id: '8', name: 'AYALA GODOY, Liz Melina', course_student: '3' },
    { id: '9', name: 'BAGINAY, Mauro Iván', course_student: '3' },
    { id: '10', name: 'BENITEZ, Jimena Geraldine', course_student: '3' },
    { id: '11', name: 'CANTERO ZARATE, Liz Paola', course_student: '3' },
    { id: '12', name: 'CANTERO ZARATE, Stella Maris', course_student: '3' },
    { id: '13', name: 'CARBONE GONZALEZ, Gian Franco', course_student: '3' },
    { id: '14', name: 'CEQUEIRA, Costanza Abigail', course_student: '3' },
    { id: '15', name: 'CHIPANA CISNEROS, Facundo Ariel', course_student: '3' },
    { id: '16', name: 'DOYHENART, Francisco Tobias', course_student: '3' },
    { id: '17', name: 'DURAND, Jeremias Santiago', course_student: '3' },
    { id: '18', name: 'FERNANDEZ, Angeles Morena', course_student: '3' },
    { id: '19', name: 'GAUNA, Lourdes Abril', course_student: '3' },
    { id: '20', name: 'GUEVARA, Santiago Damián', course_student: '3' },
    { id: '21', name: 'HERRERA, Maia Berenice', course_student: '3' },
    { id: '22', name: 'IBARRA HUAYHUA, Marta Jacqueline', course_student: '3' },
    { id: '23', name: 'LENCINA, Thiago Liam', course_student: '3' },
    { id: '24', name: 'LEONOV, Mateo Josue', course_student: '3' },
    { id: '25', name: 'LLAVE QUENA, Victoria Noemi', course_student: '3' },
    { id: '26', name: 'MANRRIQUE, Patricio Valentín', course_student: '3' },
    { id: '27', name: 'MANSILLA SOTO, Tatiana Yazmin', course_student: '3' },
    { id: '28', name: 'PADOANI, Fiamma Roquelina', course_student: '3' },
    { id: '29', name: 'PALAVECINO, Rocio Micaela', course_student: '3' },
    { id: '30', name: 'ROMERO, Malena Elina', course_student: '3' },
    { id: '31', name: 'ROSAS, Jonatan Isaias', course_student: '3' },
    { id: '32', name: 'SCHIMPF, Erica Lucia', course_student: '3' },
    { id: '33', name: 'SCHMIDT, Luciano Tomas', course_student: '3' },
    { id: '34', name: 'SILVA, Samira Belen', course_student: '3' },
    { id: '35', name: 'SPIOUSSAS, Dafne Martina', course_student: '3' },
    { id: '36', name: 'STURLA, Julieta Candela', course_student: '3' },
    { id: '37', name: 'TESTATONDA, Heber Adriel', course_student: '3' },
    { id: '38', name: 'VEGA OLIVERA, Morena Agostina', course_student: '3' },
  ]);
}