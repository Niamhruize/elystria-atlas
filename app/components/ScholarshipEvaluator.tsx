"use client";

import { useState } from "react";
import Link from "next/link";

const display = "font-[family-name:var(--font-serif)]";
const label =
  "font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] sm:text-[11px] sm:tracking-[0.22em]";

type Answers = {
  qualification: string;
  score: string;
  english: string;
  destination: string;
  funding: string;
  strengths: string[];
};

type Question = {
  key: keyof Answers;
  title: string;
  hint?: string;
  multiple?: boolean;
  options: string[];
};

const questions: Question[] = [
  {
    key: "qualification",
    title: "What is your current qualification?",
    options: ["Intermediate (Class 12)", "Graduate (Bachelor’s)"],
  },
  {
    key: "score",
    title: "What is your overall academic score?",
    hint: "Use your most recent marks or percentage.",
    options: ["85% or above", "70% to 84%", "55% to 69%", "Below 55%"],
  },
  {
    key: "english",
    title: "Have you taken an English test?",
    hint: "IELTS, TOEFL or PTE. Scores shown are IELTS or equivalent.",
    options: [
      "Not taken yet",
      "IELTS 6.0 or below",
      "IELTS 6.5 to 7.0",
      "IELTS 7.5 or above",
    ],
  },
  {
    key: "destination",
    title: "Where would you like to study?",
    options: [
      "Japan",
      "China",
      "South Korea",
      "Singapore",
      "Vietnam",
      "Taiwan",
      "Lithuania",
      "Germany",
      "France",
      "United Kingdom",
      "Ireland",
      "Canada",
      "Not sure yet",
    ],
  },
  {
    key: "funding",
    title: "How much of the cost can you fund yourself?",
    hint: "Tuition and living costs together.",
    options: [
      "I can fund most of it",
      "I can fund about half",
      "I can fund very little",
    ],
  },
  {
    key: "strengths",
    title: "Which of these apply to you?",
    hint: "Pick any that fit, or none.",
    multiple: true,
    options: [
      "Leadership or clubs",
      "Projects or research",
      "Work or internship experience",
      "Sports or arts achievements",
      "Volunteering",
    ],
  },
];

const emptyAnswers: Answers = {
  qualification: "",
  score: "",
  english: "",
  destination: "",
  funding: "",
  strengths: [],
};

type Level = "Strong match" | "Good match" | "Worth exploring";
type Result = { title: string; level: Level; why: string };

const levelOrder: Record<Level, number> = {
  "Strong match": 0,
  "Good match": 1,
  "Worth exploring": 2,
};

const levelStyle: Record<Level, string> = {
  "Strong match": "bg-[#0593C6] text-[#FCFFFF]",
  "Good match": "bg-[#E6F4FA] text-[#036F96]",
  "Worth exploring": "border border-[#0593C6]/30 text-[#036F96]",
};

function evaluate(a: Answers): Result[] {
  const results: Result[] = [];

  const top = a.score === "85% or above";
  const good = a.score === "70% to 84%";
  const mid = a.score === "55% to 69%";
  const englishHigh = a.english === "IELTS 7.5 or above";
  const englishMid = a.english === "IELTS 6.5 to 7.0";
  const isGrad = a.qualification.startsWith("Graduate");
  const needFunding = a.funding === "I can fund very little";
  const extras = a.strengths.length;

  if (top) {
    results.push({
      title: "Merit-based university scholarships",
      level: "Strong match",
      why: "Your academic score is in the range universities usually reward with merit awards or tuition reductions.",
    });
  } else if (good) {
    results.push({
      title: "Merit-based university scholarships",
      level: "Good match",
      why: "A score in this range can qualify for partial merit awards at many universities.",
    });
  } else if (mid) {
    results.push({
      title: "Merit-based university scholarships",
      level: "Worth exploring",
      why: "Some universities offer smaller awards at this level. Improving your score or profile can help.",
    });
  }

  if (top || good) {
    results.push({
      title: "Government scholarships",
      level: top ? "Good match" : "Worth exploring",
      why: "Many governments fund international students. These are competitive and usually need strong academics and a complete application.",
    });
  }

  if (englishHigh) {
    results.push({
      title: "Language-score based awards",
      level: "Good match",
      why: "A high English score can improve your chances for merit awards and can open more programmes.",
    });
  } else if (englishMid) {
    results.push({
      title: "Language-score based awards",
      level: "Worth exploring",
      why: "A slightly higher English score could unlock more scholarship options.",
    });
  }

  if (needFunding) {
    results.push({
      title: "Need-based financial aid",
      level: "Worth exploring",
      why: "Some universities offer aid or fee reductions based on financial need. Availability for international students is limited, so apply early.",
    });
  }

  if (isGrad && (top || good) && a.strengths.includes("Projects or research")) {
    results.push({
      title: "Research and assistantship funding",
      level: "Good match",
      why: "Graduate students with research or project experience can often apply for funded research or assistant roles.",
    });
  }

  if (extras >= 2) {
    results.push({
      title: "Leadership and achievement awards",
      level: "Good match",
      why: "Several strengths on your profile can support awards that look beyond marks.",
    });
  } else if (extras === 1) {
    results.push({
      title: "Leadership and achievement awards",
      level: "Worth exploring",
      why: "Your activities can support some awards. Adding more strong activities will help.",
    });
  }

  results.push({
    title: "Early-application and tuition-reduction offers",
    level: "Worth exploring",
    why: "Many universities reduce fees for early or timely applicants. Your counsellor can tell you the deadlines.",
  });

  return results.sort((x, y) => levelOrder[x.level] - levelOrder[y.level]);
}

export default function ScholarshipEvaluator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [done, setDone] = useState(false);

  const question = questions[step];
  const current = answers[question.key];
  const answered = question.multiple ? true : current !== "";

  function choose(option: string) {
    if (question.multiple) {
      setAnswers((prev) => ({
        ...prev,
        strengths: prev.strengths.includes(option)
          ? prev.strengths.filter((item) => item !== option)
          : [...prev.strengths, option],
      }));
    } else {
      setAnswers((prev) => ({ ...prev, [question.key]: option }) as Answers);
    }
  }

  function isSelected(option: string) {
    return question.multiple
      ? answers.strengths.includes(option)
      : current === option;
  }

  function next() {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function restart() {
    setAnswers(emptyAnswers);
    setStep(0);
    setDone(false);
  }

  if (done) {
    const results = evaluate(answers);
    const country =
      answers.destination && answers.destination !== "Not sure yet"
        ? answers.destination
        : "";
        const qualificationValue = answers.qualification.startsWith("Graduate")
      ? "Graduates"
      : "Intermediate";

    const summary = [
      "Scholarship check",
      `Qualification: ${answers.qualification}`,
      `Score: ${answers.score}`,
      `English: ${answers.english}`,
      `Funding: ${answers.funding}`,
      `Strengths: ${
        answers.strengths.length ? answers.strengths.join(", ") : "none selected"
      }`,
      `Top matches: ${results
        .slice(0, 3)
        .map((item) => item.title)
        .join(", ")}`,
    ].join(" | ");

    const params = new URLSearchParams({
      interest: summary,
      qualification: qualificationValue,
    });
    if (country) params.set("country", country);

    const enquiryHref = `/?${params.toString()}#enquire`;

    return (
      <div className="rounded-[1.5rem] border border-[#0593C6]/15 bg-[#FCFFFF] p-4 sm:rounded-[2rem] sm:p-10">
        <p className={`${label} text-[#036F96]`}>Your results</p>

        <h2
          className={`${display} mt-3 text-3xl font-medium leading-[1.08] text-[#0593C6] sm:text-5xl`}
        >
          Scholarships you could{" "}
          <span className="italic text-[#590907]">explore.</span>
        </h2>

        <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
          {results.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-[#F3F9FC] p-4 sm:p-6"
            >
              <span
                className={`${label} inline-block rounded-full px-3 py-1.5 ${levelStyle[item.level]}`}
              >
                {item.level}
              </span>

              <h3
                className={`${display} mt-3 text-xl font-medium leading-tight text-[#0B3B4F] sm:text-3xl`}
              >
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#0B3B4F]/80 sm:leading-7">
                {item.why}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs leading-6 text-[#0B3B4F]/60">
          This is an indicative guide, not a guarantee. Final eligibility
          depends on each university and scholarship provider, and the details
          change from year to year.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Link
            href={enquiryHref}
            className={`${label} inline-flex items-center justify-center gap-3 rounded-full bg-[#590907] px-6 py-4 text-[#FCFFFF] transition hover:bg-[#740D0A] sm:px-8`}
          >
            Talk to a counsellor <span aria-hidden>↗</span>
          </Link>

          <button
            type="button"
            onClick={restart}
            className="text-sm text-[#036F96] underline underline-offset-4"
          >
            Start again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1.5rem] border border-[#0593C6]/15 bg-[#FCFFFF] p-4 sm:rounded-[2rem] sm:p-10">
      <div className="flex items-center justify-between">
        <p className={`${label} text-[#036F96]`}>
          Question {step + 1} of {questions.length}
        </p>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#E6F4FA]">
        <div
          className="h-full rounded-full bg-[#0593C6] transition-all duration-300"
          style={{ width: `${((step + 1) / questions.length) * 100}%` }}
        />
      </div>

      <h2
        className={`${display} mt-6 text-2xl font-medium leading-tight text-[#0593C6] sm:mt-8 sm:text-4xl`}
      >
        {question.title}
      </h2>

      {question.hint && (
        <p className="mt-2 text-sm text-[#0B3B4F]/70">{question.hint}</p>
      )}

      <div
        className={`mt-5 grid gap-2 sm:mt-6 sm:gap-3 ${
          question.options.length > 6 ? "grid-cols-2" : ""
        }`}
      >
        {question.options.map((option) => {
          const selected = isSelected(option);

          return (
            <button
              type="button"
              key={option}
              onClick={() => choose(option)}
              aria-pressed={selected}
              className={`min-h-[48px] rounded-2xl border px-4 py-3 text-left text-sm transition ${
                selected
                  ? "border-[#0593C6] bg-[#E6F4FA] text-[#0B3B4F]"
                  : "border-[#0593C6]/20 bg-[#FCFFFF] text-[#0B3B4F] hover:border-[#0593C6] hover:bg-[#F3F9FC]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 sm:mt-8">
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
          className="text-sm text-[#036F96] underline underline-offset-4 disabled:invisible"
        >
          Back
        </button>

        <button
          type="button"
          onClick={next}
          disabled={!answered}
          className={`${label} inline-flex items-center gap-3 rounded-full bg-[#0593C6] px-6 py-4 text-[#FCFFFF] transition hover:bg-[#036F96] disabled:cursor-not-allowed disabled:opacity-40 sm:px-8`}
        >
          {step === questions.length - 1 ? "See my results" : "Next"}
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}