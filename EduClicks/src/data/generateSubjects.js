import { syllabusBySubject } from "./syllabus";

export function generateSubjects() {
  return Object.values(syllabusBySubject).map((syllabus) => ({
    id: syllabus.id,
    name: syllabus.name,
    icon: "📘",
    terms: syllabus.terms.map((t) => ({
      term: t.term,
      quizzes: [],
    })),
  }));
}
