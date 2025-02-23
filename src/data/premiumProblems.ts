import { Problem } from '../types/problem';

export const premiumProblems: readonly Problem[] = [
  {
    id: 2023301,
    title: "\\text{\\sf 2023 CU Q1}",
    tags: ["CU", "2023", "Written"],
    type: "written",
    marks: 6,
    equation: "\\text{\\sf A particle moves in a straight line with acceleration } a(t) = 6t - 2\\text{\\sf , where } t \\text{\\sf is time in seconds} \\\\ \\text{\\sf and } a(t) \\text{\\sf is acceleration in ms}^{-2}\\text{\\sf . At } t = 0\\text{\\sf , the velocity is 4 ms}^{-1}\\text{\\sf .}",
    parts: [
      {
        id: 'a',
        question: "\\text{\\sf Find the velocity function } v(t)\\text{\\sf .}",
        marks: 2,
        solution: "\\displaystyle v(t) = 3t^2 - 2t + 4",
        explanation: "- 1 mark for integrating acceleration correctly \n - 1 mark for using initial condition to find C"
      },
      {
        id: 'b',
        question: "\\text{\\sf Find the displacement function } s(t)\\text{\\sf , given that } s(0) = 0\\text{\\sf .}",
        marks: 2,
        solution: "\\displaystyle s(t) = t^3 - t^2 + 4t",
        explanation: "- 1 mark for integrating velocity correctly \n - 1 mark for using initial condition to find C"
      },
      {
        id: 'c',
        question: "\\text{\\sf Find the time when the particle is instantaneously at rest.}",
        marks: 2,
        solution: "\\text{\\sf Set } v(t) = 0: 3t^2 - 2t + 4 = 0. \\text{\\sf No real solutions, particle never stops.}",
        explanation: "- 1 mark for setting up equation \n - 1 mark for concluding no real solutions"
      }
    ],
    videoUrl: "",
    solved: false
  },
  {
    id: 2023302,
    title: "\\text{\\sf 2023 CU Q2}",
    tags: ["CU", "2023", "Written"],
    type: "written",
    marks: 5,
    equation: "\\text{\\sf A particle moves in a straight line with velocity } v(t) = \\sin(2t)\\text{\\sf , where } t \\text{\\sf is time in seconds} \\\\ \\text{\\sf and } v(t) \\text{\\sf is velocity in ms}^{-1}\\text{\\sf .}",
    parts: [
      {
        id: 'a',
        question: "\\text{\\sf Find the acceleration function } a(t)\\text{\\sf .}",
        marks: 2,
        solution: "\\displaystyle a(t) = 2\\cos(2t)",
        explanation: "- 2 marks for correctly differentiating velocity"
      },
      {
        id: 'b',
        question: "\\text{\\sf Find the displacement function } s(t)\\text{\\sf , given that } s(0) = 0\\text{\\sf .}",
        marks: 3,
        solution: "\\displaystyle s(t) = -\\frac{1}{2}\\cos(2t) + \\frac{1}{2}",
        explanation: "- 2 marks for integrating velocity correctly \n - 1 mark for using initial condition"
      }
    ],
    videoUrl: "",
    solved: false
  }
] as const;
