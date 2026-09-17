import { useState } from 'react';
import { GraduationCap, Award, Play, BookOpen, CheckCircle, ArrowRight, X, Sparkles } from 'lucide-react';
import type { Course } from '../types';

export default function Courses({ 
  courses, 
  onCourseComplete 
}: { 
  courses: Course[]; 
  onCourseComplete: (id: string, title: string) => void; 
}) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<boolean | null>(null);

  const handleStartCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveModuleIndex(0);
    setSelectedAnswerIndex(null);
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const handleSelectAnswer = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswerIndex(idx);
  };

  const handleSubmitQuiz = (correctIndex: number) => {
    if (selectedAnswerIndex === null) return;
    setQuizSubmitted(true);
    const correct = selectedAnswerIndex === correctIndex;
    setQuizScore(correct);
  };

  const handleNextModule = () => {
    if (!selectedCourse) return;
    
    if (activeModuleIndex < selectedCourse.modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
      setSelectedAnswerIndex(null);
      setQuizSubmitted(false);
      setQuizScore(null);
    } else {
      // Course fully completed!
      onCourseComplete(selectedCourse.id, selectedCourse.title);
      alert(`CONGRATULATIONS! You passed the comprehensive examination for "${selectedCourse.title}". An official badge has been added to your profile!`);
      setSelectedCourse(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {!selectedCourse ? (
        <>
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-bold">
                <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                <span>Theory & Exam Portal</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">Structured Studies & Circuit Theory Examinations</h1>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                Bridge the gap between repair and engineering. Learn Ohm's Law, standby power rail sequence, oscilloscope trigger configurations, and earn certified technician badges.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs space-y-1">
              <span className="font-bold text-stone-800 dark:text-stone-200 block">Tech Certifications</span>
              <p className="text-stone-500 text-[11px]">
                Unlock advanced moderator tools on the community forum by completing certified theory masterclasses.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 uppercase tracking-wider">{course.category}</span>
                    <span className="text-xs text-stone-500 font-medium">{course.lessonsCount} lessons • {course.durationHours} hrs</span>
                  </div>
                  <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 leading-snug">{course.title}</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">{course.description}</p>
                  
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">Skills You Will Acquire:</span>
                    <div className="flex flex-wrap gap-1">
                      {course.skillsAcquired.map((skill, idx) => (
                        <span key={idx} className="text-[10px] px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">✓ {skill}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block">Instructor</span>
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-300">{course.instructor}</span>
                  </div>
                  <button 
                    onClick={() => handleStartCourse(course)}
                    className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Masterclass</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs h-fit space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <button onClick={() => setSelectedCourse(null)} className="text-xs text-stone-500 hover:text-stone-850 dark:hover:text-stone-200 font-bold flex items-center gap-1">
                <X className="w-4 h-4" />
                <span>Exit Class</span>
              </button>
              <span className="text-[10px] font-black font-mono text-amber-600 dark:text-amber-400">LESSON {activeModuleIndex + 1} OF {selectedCourse.modules.length}</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xs font-black text-stone-400 uppercase tracking-wider">{selectedCourse.category}</h3>
              <h2 className="text-base font-black text-stone-900 dark:text-stone-100 leading-snug">{selectedCourse.title}</h2>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Course Outline:</span>
              <div className="space-y-2">
                {selectedCourse.modules.map((mod, idx) => (
                  <button 
                    key={mod.id}
                    onClick={() => {
                      setActiveModuleIndex(idx);
                      setSelectedAnswerIndex(null);
                      setQuizSubmitted(false);
                      setQuizScore(null);
                    }}
                    className={`w-full p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${idx === activeModuleIndex ? "bg-amber-400/10 border-amber-400 text-stone-900 dark:text-amber-300 font-bold" : "bg-stone-50 dark:bg-stone-800/40 border-stone-100 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-amber-400"}`}
                  >
                    <BookOpen className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                    <div className="text-xs">
                      <span>{idx + 1}. {mod.title}</span>
                      <span className="block text-[10px] text-stone-400 font-normal mt-0.5">{mod.duration}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Lesson {activeModuleIndex + 1}:</span>
                <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 leading-tight">{selectedCourse.modules[activeModuleIndex].title}</h1>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {selectedCourse.modules[activeModuleIndex].summary}
              </p>
            </div>

            {selectedCourse.modules[activeModuleIndex].quizQuestion && (
              <div className="p-5 sm:p-6 rounded-2xl bg-stone-50 dark:bg-stone-850/80 border border-stone-200 dark:border-stone-800 space-y-4">
                <div className="flex items-center gap-1.5 font-bold text-stone-900 dark:text-stone-100 text-xs uppercase tracking-wider">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Interactive Electrical Assessment</span>
                </div>
                
                <p className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 leading-relaxed">
                  {selectedCourse.modules[activeModuleIndex].quizQuestion.question}
                </p>

                <div className="space-y-2">
                  {selectedCourse.modules[activeModuleIndex].quizQuestion.options.map((opt, oIdx) => (
                    <button 
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelectAnswer(oIdx)}
                      className={`w-full p-3.5 rounded-xl border text-xs text-left font-medium transition-all ${selectedAnswerIndex === oIdx ? "bg-amber-400 border-amber-500 text-stone-950 font-bold shadow-xs" : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {!quizSubmitted ? (
                  <button 
                    disabled={selectedAnswerIndex === null}
                    onClick={() => handleSubmitQuiz(selectedCourse.modules[activeModuleIndex].quizQuestion!.correctIndex)}
                    className="w-full py-3 rounded-xl bg-stone-900 hover:opacity-90 text-white dark:bg-amber-400 dark:text-stone-950 font-black text-xs transition-all disabled:opacity-50"
                  >
                    Submit Answer for Certification Review
                  </button>
                ) : (
                  <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800">
                    <div className="flex items-start gap-2.5 text-xs">
                      {quizScore ? (
                        <div className="p-1 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="p-1 rounded-full bg-red-100 text-red-800 shrink-0">
                          <X className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <span className={`font-bold ${quizScore ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
                          {quizScore ? "Correct Answer!" : "Incorrect Answer, try reviewing Ohm's Law principles."}
                        </span>
                        <p className="text-stone-500 mt-1 leading-relaxed">{selectedCourse.modules[activeModuleIndex].quizQuestion.explanation}</p>
                      </div>
                    </div>

                    <button 
                      onClick={handleNextModule}
                      className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <span>{activeModuleIndex < selectedCourse.modules.length - 1 ? "Proceed to Next Lesson" : "Complete Exam & Claim Badge"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
