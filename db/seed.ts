import { db, School, Course} from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(School).values([
		{id:'1', name:'Godspell'},
		{id:'2', name:'SanPablo'},
		{id:'3', name:'Complejo'}
	]),
	await db.insert(Course).values([
		{id:'1', name:'3A', school_course:'2'},
		{id:'2', name:'3B', school_course:'2'},
		{id:'3', name:'6U', school_course:'3'}
	])

}
