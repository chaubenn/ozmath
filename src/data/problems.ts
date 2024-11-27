import { Problem } from '../types/problem';

export const methodsProblems: readonly Problem[] = [
  {
    id: 2023101,
    title: "\\text{\\sf 2023 TF Q1}",
    tags: ["TF", "2023", "MC"],
    type: "multiple-choice",
    equation: "\\displaystyle \\text{\\sf e}^{\\ln(x)}\\ \\text{\\sf is equivalent to}",
    choices: [
      { id: 'A', text: '0' },
      { id: 'B', text: '1' },
      { id: 'C', text: 'x' },
      { id: 'D', text: '\\displaystyle \\frac{1}{x}' }
    ],
    solution: "C",
    explanation: "Let's solve this step by step:\n1. First, recall that ln(x) and e^x are inverse functions\n2. This means that e^{ln(x)} = x\n3. Therefore, the answer is (C) x",
    videoUrl: "https://stream.mux.com/nyVCKCspUbcTv00h68c4C0001MS5xEzl2pmdKM200VWNGts.m3u8",
    solved: false
  },
  {
    id: 2023102,
    title: "\\text{\\sf 2023 TF Q2}",
    tags: ["TF", "2023", "MC"],
    type: "multiple-choice",
    equation: "\\text{\\sf If } f(x) = e^{6-2x}\\text{\\sf , determine the value of } f' (2)",
    choices: [
      { id: 'A', text: 'e^2' },
      { id: 'B', text: '2e^2' },
      { id: 'C', text: '-e^2' },
      { id: 'D', text: '-2e^2' }
    ],
    solution: "D",
    explanation: "Let's solve this step by step:\n1. First, recall the chain rule: if f(x) = e^{g(x)}, then f'(x) = e^{g(x)} · g'(x)\n2. In this case, g(x) = 6-2x, so g'(x) = -2\n3. Therefore, f'(x) = e^{6-2x} · (-2)\n4. To find f'(2), substitute x = 2:\n   f'(2) = e^{6-2(2)} · (-2)\n   = e^{6-4} · (-2)\n   = e^2 · (-2)\n   = -2e^2",
    videoUrl: "",
    solved: false
  },
  {
    id: 2023103,
    title: "\\text{\\sf 2023 TF Q3}",
    tags: ["TF", "2023", "MC"],
    type: "multiple-choice",
    equation: "\\text{\\sf A bag contains 10 buttons of the same shape and size in different colours: 5 blue, 3 green and 2 red. If 3 buttons are} \\\\ \\text{\\sf randomly drawn from the bag, which probability can be calculated using the binomial distribution?}",
    choices: [
      { id: 'A', text: 'P(3 \\text{ green}) \\text{ with replacement}' },
      { id: 'B', text: 'P(3 \\text{ blue}) \\text{ without replacement}' },
      { id: 'C', text: 'P(2 \\text{ green and 1 red}) \\text{ with replacement}' },
      { id: 'D', text: 'P(2 \\text{ red and 1 blue}) \\text{ without replacement}' }
    ],
    solution: "A",
    explanation: "",
    videoUrl: "",
    solved: false
  },
  {
    id: 2023104,
    title: "\\text{\\sf 2023 TF Q4}",
    tags: ["TF", "2023", "MC"],
    type: "multiple-choice",
    equation: "\\text{\\sf If the gradient of the function } f(x) \\text{\\;\\sf is given by } \\displaystyle \\frac{20}{x^3}\\text{\\sf , then } f(x) \\text{\\;\\sf is equal to}",
    choices: [
      { id: 'A', text: '\\displaystyle -\\frac{60}{x^4}+c' },
      { id: 'B', text: '\\displaystyle -\\frac{5}{x^4}+c' },
      { id: 'C', text: '\\displaystyle -\\frac{10}{x^2}+c' },
      { id: 'D', text: '\\displaystyle -\\frac{40}{x^2}+c' }
    ],
    solution: "C",
    explanation: "",
    videoUrl: "",
    solved: false
  },
  {
    id: 2023105,
    title: "\\text{\\sf 2023 TF Q5}",
    tags: ["TF", "2023", "MC"],
    type: "multiple-choice",
    equation: "\\text{\\sf Determine } \\displaystyle\\int_1^3 \\frac{1}{2x} \\, dx",
    choices: [
      { id: 'A', text: '\\displaystyle \\frac{1}{2} \\ln 6' },
      { id: 'B', text: '\\displaystyle \\frac{1}{2} \\ln 5' },
      { id: 'C', text: '\\displaystyle \\frac{1}{2} \\ln 4' },
      { id: 'D', text: '\\displaystyle \\frac{1}{2} \\ln 3' }
    ],
    solution: "D",
    explanation: "",
    videoUrl: "",
    solved: false
  },
  {
    id: 2023106,
    title: "\\text{\\sf 2023 TF Q6}",
    tags: ["TF", "2023", "MC"],
    type: "multiple-choice",
    equation: "\\text{\\sf Substitutions for } h \\text{\\;\\sf are used to estimate the limit of } \\displaystyle \\, \\frac{h^4-1}{h} \\text{\\, as } h \\to 0\\text{\\sf . Which sequence is the most appropriate?}",
    choices: [
      { id: 'A', text: '-4, -2, -1, -0.5, -0.25, -0.125 \\ldots' },
      { id: 'B', text: '-0.05, -0.1, -0.2, -0.4, -0.8 \\ldots' },
      { id: 'C', text: '2, 1, 0, -1, -2, -3 \\ldots' },
      { id: 'D', text: '1, 2, 3, 4, 5, 6 \\ldots' }
    ],
    solution: "A",
    explanation: "",
    videoUrl: "",
    solved: false
  },
  {
    id: 2023107,
    title: "\\text{\\sf 2023 TF Q7}",
    tags: ["TF", "2023", "MC"],
    type: "multiple-choice",
    equation: "\\text{\\sf Determine the mean of the continuous random variable } X \\text{\\;\\sf with the probability density function:} \\\\ \\ \\\\ \\qquad \\qquad \\qquad \\qquad \\qquad \\qquad  f(x) = \\begin{cases} \\frac{1}{8}x, & 0 \\leq x \\leq 4 \\\\ 0, & \\text{otherwise} \\end{cases}",
    choices: [
      { id: 'A', text: '\\displaystyle \\frac{1}{8}' },
      { id: 'B', text: '\\displaystyle \\frac{3}{8}' },
      { id: 'C', text: '\\displaystyle \\frac{1}{2}' },
      { id: 'D', text: '\\displaystyle \\frac{8}{3}' }
    ],
    solution: "D",
    explanation: "Let's solve this step by step:\n1. For a continuous random variable, the mean is calculated using: μ = ∫xf(x)dx\n2. In this case, we need to calculate: μ = ∫₀⁴ x·(1/8)x dx\n3. This gives us: μ = (1/8)∫₀⁴ x² dx\n4. Integrating: μ = (1/8)[x³/3]₀⁴\n5. Evaluating: μ = (1/8)(64/3 - 0)\n6. Simplifying: μ = 8/3",
    videoUrl: "",
    solved: false
  },
  {
    id: 2023108,
    title: "\\text{\\sf 2023 TF Q8}",
    tags: ["TF", "2023", "MC"],
    type: "multiple-choice",
    equation: "\\text{\\sf A sample of size } n \\text{\\;\\sf was used to estimate a population proportion. An approximate margin of error of 3\\% was} \\\\ \\text{\\sf calculated using } z = 1.96\\text{\\sf . Given the sample proportion was 0.6, determine } n\\text{\\sf .}",
    choices: [
      { id: 'A', text: '\\displaystyle n = \\frac{\\left(\\frac{0.03}{1.96}\\right)^2}{0.24}' },
      { id: 'B', text: '\\displaystyle n = \\frac{0.24}{\\left(\\frac{0.03}{1.96}\\right)^2}' },
      { id: 'C', text: '\\displaystyle n = \\frac{\\left(\\frac{0.03}{1.96}\\right)^2}{2.4}' },
      { id: 'D', text: '\\displaystyle n = \\frac{2.4}{\\left(\\frac{0.03}{1.96}\\right)^2}' }
    ],
    solution: "B",
    explanation: "Let's solve this step by step:\n1. The margin of error formula is: E = z√(p(1-p)/n)\n2. Given: E = 0.03, z = 1.96, p = 0.6\n3. Substitute into formula: 0.03 = 1.96√(0.6(0.4)/n)\n4. Square both sides: (0.03)² = (1.96)²(0.24/n)\n5. Solve for n: n = 0.24/((0.03/1.96)²)\n6. Therefore, option B is correct",
    videoUrl: "",
    solved: false
  },
  {
    id: 2023109,
    title: "\\text{\\sf 2023 TF Q9}",
    tags: ["TF", "2023", "MC"],
    type: "multiple-choice",
    equation: "\\text{\\sf Determine } \\displaystyle \\int_0^3 \\pi \\sin\\left(\\frac{\\pi}{3}x\\right)dx",
    choices: [
      { id: 'A', text: '3' },
      { id: 'B', text: '6' },
      { id: 'C', text: '-3' },
      { id: 'D', text: '-6' }
    ],
    solution: "B",
    explanation: "",
    videoUrl: "",
    solved: false
  },
  {
    id: 2023110,
    title: "\\text{\\sf 2023 TF Q10}",
    tags: ["TF", "2023", "MC"],
    type: "multiple-choice",
    equation: "\\text{\\sf The continuous random variable } Y \\text{\\,\\sf has the probability density function} \\\\ \\ \\\\ \\qquad \\qquad \\qquad \\qquad \\qquad \\qquad f(y) = \\begin{cases} 1+y, & 0 \\leq y \\leq \\sqrt{5}-1 \\\\ 0, & \\text{otherwise} \\end{cases} \\\\ \\ \\\\ \\text{\\sf Determine } P(0 \\leq y \\leq \\frac{1}{2})",
    choices: [
      { id: 'A', text: '\\displaystyle \\frac{1}{5}' },
      { id: 'B', text: '\\displaystyle \\frac{3}{8}' },
      { id: 'C', text: '\\displaystyle \\frac{5}{8}' },
      { id: 'D', text: '\\displaystyle \\frac{3}{4}' }
    ],
    solution: "C",
    explanation: "",
    videoUrl: "",
    solved: false
  },
    {
  id: 2023111,
  title: "\\text{\\sf 2023 TF Q11}",
  tags: ["TF", "2023", "Written"],
  type: "written",
  marks: 4,
  equation: "\\text{\\sf Two random samples (A and B) were obtained using two different Bernoulli experiments. Each Bernoulli} \\\\ \\text{\\sf trial in the random samples was recorded as 1 (for success) or 0 (for failure). The results are shown.} \\\\ \\ \\\\ \\qquad \\qquad \\qquad \\qquad \\qquad \\qquad \\begin{array}{|c|c|c|c|c|c|c|c|c|c|c|} \\hline A & 1 & 1 & 1 & 1 & 0 & 1 & 1 & 0 & 1 & 1 \\\\ \\hline B & 0 & 0 & 1 & 1 & 1 & 0 & 1 & 1 & 0 & 0 \\\\ \\hline \\end{array} \\\\ \\ \\\\ \\text{\\sf In sample A, for each trial the mean is 0.8 and the variance is 0.16.}",
  parts: [
    {
      id: 'a',
      question: "\\text{\\sf Use the sample B results to determine the mean and variance for each trial in sample B.}",
      marks: 2,
      solution: "1 mark for correct Mean = 0.5, 1 mark for correct Variance = 0.25. accept fractions such as 1/2 and 1/4 etc.",
      explanation: "- 1 mark for determining correct mean (0.5) \n - 1 mark for determining correct variance (0.25)"
    },
    {
      id: 'b',
      question: "\\text{\\sf Compare the variability about the means of samples A and B.}",
      marks: 2,
      solution: "Sample B has greater variability as its variance (0.25) is larger than sample A's variance (0.16).",
      explanation: "- 1 mark for identifying that sample B has larger variance \n - 1 mark for explaining that larger variance indicates larger variability"
    }
  ],
  videoUrl: "",
  solved: false
},
  {
  id: 2023112,
  title: "\\text{\\sf 2023 TF Q12}",
  tags: ["TF", "2023", "Written"],
  type: "written",
  marks: 4,
  equation: "\\text{\\sf The region bounded by the x-axis and the curve of } f(x) = x(4-x) \\text{\\,\\sf represents the plan of a garden bed.} \\\\ \\text{\\sf All measurements are in metres.}",
  pdfUrl: "/images/garden-plot.jpg", 
  parts: [
    {
      id: 'a',
      question: "\\text{\\sf Estimate the area of the garden bed using sums of the form } \\displaystyle \\sum_i f(x_i)\\delta x_i \\text{\\sf , where } x_1 = 1, \\, x_2 = 2, \\, x_3 = 3 \\text{\\sf and } \\, x_4 = 4.",
      marks: 1,
      solution: "1 mark for correct estimation (10)",
      explanation: "- 1 mark for correct estimation (10)"
    }, 
    {
      id: 'b',
      question: "\\text{\\sf Use a definite integral to determine the area of the garden bed.}",
      marks: 3,
      solution: "3 marks for correct answer, 10.6666, accept any equivalents like 10 and 2/3 etc.",
      explanation: "- 1 mark for correctly stating definite integral required \n - 1 mark for determining the integration of the function \n - 1 mark for calculating the area under the curve by integration"
    }
  ],
  videoUrl: "",
  solved: false
},
{
  id: 2023113,
  title: "\\text{\\sf 2023 TF Q13}",
  tags: ["TF", "2023", "Written"],
  type: "written",
  marks: 5,
  equation: "\\text{\\sf At a certain airport, the departure of one in five international flights is delayed every day. The status of } \\\\ \\text{\\sf any flight is independent of other flights.} \\\\ \\ \\\\ \\text{\\sf One international flight is selected at random each day for three days. Each selection is recorded as} \\\\ \\text{\\sf either 'delayed' or 'not delayed'.}",
  parts: [
    {
      id: 'a',
      question: "\\text{\\sf State two conditions that make this context suitable for modelling using a binomial random variable.}",
      marks: 2,
      solution: "1 mark for one correct condition for binomial probability, 1 mark for correctly stating a second condition for binomial probability. Both conditions must be relevant to the problem, i.e. there are only two outcomes, and each outcomes do not change in probabiity throughout trials.",
      explanation: "- 1 mark for one correct binomial condition \n - 1 mark for another correct condition"
    }, 
    {
      id: 'b',
      question: "\\text{\\sf Calculate the probability that at least two of the selected flights were delayed.}",
      marks: 3,
      solution: "1 mark for the correct number of trials AND probability that a flight is delayed (n = 3, p = 1/5), 1 mark for determining the correct method (x = 2 or x = 3). OR: total 3 marks for getting the stating the correct probability: 13/125",
      explanation: "- 1 mark for correctly determining the number of trials and the probability of a flight being delayed (n = 3, p = 1/5) \n - 1 mark for determining a suitable method to solve the problem e.g. finding P(X = 2 or X = 3) \n - 1 mark for calculating the correct probability (13/125)"
    }
  ],
  videoUrl: "",
  solved: false
}, {
  id: 2023114,
  title: "\\text{\\sf 2023 TF Q14}",
  tags: ["TF", "2023", "Written"],
  type: "written",
  marks: 6,
  equation: "\\text{\\sf The rate of change in the number of bacteria in a science experiment is represented by } \\displaystyle \\frac{dP}{dt} = e^{2t}, \\, t \\geq 0, \\\\ \\text{\\sf where } t \\text{\\;\\sf represents time (hours) since the experiment started and } P \\text{\\,\\sf represents the number of bacteria} \\\\ \\text{\\sf present (thousands). Initially there are 60,000 bacteria present, i.e. } P(0) = 60.",
  parts: [
    {
      id: 'a',
      question: "\\text{\\sf Determine the equation for } P(t).",
      marks: 2,
      solution: "1 mark for correct integral 1/2 * e^2t + c, 1 mark for the value of c = 59.5. OR 2 marks for correct equation 1/2 * e^2t + 59.5",
      explanation: "- 1 mark for correctly setting up and integrating the differential equation \n - 1 mark for solving for C using the initial condition P(0) = 60."
    },
    {
      id: 'b',
      question: "\\text{\\sf Determine the change in the number of bacteria during the third hour. Express your answer in terms of } e.",
      marks: 2,
      solution: "Change in bacteria: \\displaystyle P(3) - P(2). Substituting, \\displaystyle P(3) = \\frac{1}{2}e^{6} + 59.5, \\displaystyle P(2) = \\frac{1}{2}e^{4} + 59.5. Final change: \\displaystyle \\frac{1}{2}(e^{6} - e^{4}).",
      explanation: "- 1 mark for correct substitution for \\displaystyle P(3) and \\displaystyle P(2) \n - 1 mark for calculating the change in terms of \\displaystyle e."
    },
    {
      id: 'c',
      question: "\\text{\\sf Determine how long it will take for the number of bacteria to double after starting the experiment.}",
      marks: 2,
      solution: "Solve \\displaystyle P(t) = 120. \\displaystyle \\frac{1}{2}e^{2t} + 59.5 = 120 \\Rightarrow e^{2t} = 121. Solve: \\displaystyle t = \\frac{1}{2}\\ln(121).",
      explanation: "- 1 mark for correctly setting up the equation \\displaystyle P(t) = 120 \n - 1 mark for solving \\displaystyle t = \\frac{1}{2}\\ln(121)."
    }
  ],
  videoUrl: "",
  solved: false
},

{
  id: 2023115,
  title: "\\text{\\sf 2023 TF Q15}",
  tags: ["TF", "2023", "Written"],
  type: "written",
  marks: 4,
  equation: "\\text{\\sf In a game, there is a one in four chance of hitting a target with a water balloon.}",
  parts: [
    {
      id: 'a',
      question: "\\text{\\sf State the probabilities of all possible outcomes for one throw at the target.}",
      marks: 2,
      solution: "Hit: \\displaystyle P(H) = \\frac{1}{4}. Miss: \\displaystyle P(M) = \\frac{3}{4}.",
      explanation: "- 1 mark for correctly stating \\displaystyle P(H) \n - 1 mark for \\displaystyle P(M)."
    },
    {
      id: 'b',
      question: "\\text{\\sf Let } H \\text{\\;\\sf be the discrete random variable for hitting the target. Determine the mean and variance of } H \\text{\\;\\sf when 20 players throw a balloon.}",
      marks: 2,
      solution: "Mean: \\displaystyle \\mu = np = 20\\times\\frac{1}{4} = 5. Variance: \\displaystyle \\sigma^2 = np(1-p) = 20\\times\\frac{1}{4}\\times\\frac{3}{4} = \\displaystyle \\frac{15}{4}.",
      explanation: "- 1 mark for correctly calculating \\displaystyle \\mu \n - 1 mark for \\displaystyle \\sigma^2."
    }
  ],
  videoUrl: "",
  solved: false
},
{
  id: 2023116,
  title: "\\text{\\sf 2023 TF Q16}",
  tags: ["TF", "2023", "Written"],
  type: "written",
  marks: 5,
  equation: "\\text{\\sf Solve for } x \\text{\\;\\sf in the equation: } \\displaystyle e^{2x} - 5e^x + 6 = 0.",
  solution: "Let \\displaystyle y = e^x. Then \\displaystyle y^2 - 5y + 6 = 0. Solve: \\displaystyle y = 2 \\text{ or } 3. Thus, \\displaystyle x = \\ln(2) \\text{ or } \\ln(3).",
  explanation: "- 2 marks for correct substitution \\displaystyle y = e^x \n - 2 marks for solving quadratic \\displaystyle y^2 - 5y + 6 = 0 \n - 1 mark for finding \\displaystyle x = \\ln(2), \\ln(3).",
  videoUrl: "",
  solved: false
},
{
  id: 2023117,
  title: "\\text{\\sf 2023 TF Q17}",
  tags: ["TF", "2023", "Written"],
  type: "written",
  marks: 6,
  equation: "\\text{\\sf A chemical added to pool water absorbs over time according to } A(t) = 20t e^{-t}.",
  parts: [
    {
      id: 'a',
      question: "\\text{\\sf Determine the time of day when the rate of absorption is at its maximum. Use calculus to verify.}",
      marks: 6,
      solution: "Find \\displaystyle \\frac{dA}{dt} = 20(1-t)e^{-t}. Set \\displaystyle \\frac{dA}{dt} = 0: \\displaystyle t = 1. Verify \\displaystyle \\frac{d^2A}{dt^2} < 0 \\text{ at } t = 1.",
      explanation: "- 2 marks for finding \\displaystyle \\frac{dA}{dt} \n - 2 marks for solving \\displaystyle t = 1 \n - 2 marks for verifying maximum using \\displaystyle \\frac{d^2A}{dt^2}."
    }
  ],
  videoUrl: "",
  solved: false
}, {
  id: 2023118,
  title: "\\text{\\sf 2023 TF Q18}",
  tags: ["TF", "2023", "Written"],
  type: "written",
  marks: 4,
  equation: "\\text{\\sf A person enters the lowest carriage of a miniature Ferris wheel with a six-metre diameter. The bottom} \\\\ \\text{\\sf carriage is one metre off the ground. When top speed is reached, it takes three seconds for a carriage to} \\\\ \\text{\\sf travel from the lowest to the highest point of the ride. It is claimed that:} \\\\ \\ \\\\ \\text{\\sf ``The vertical motion of the Ferris wheel produces a maximum vertical acceleration on each rider} \\\\ \\text{\\sf that is more than half the acceleration of free fall.''} \\\\ \\ \\\\ \\text{\\sf Free fall occurs when gravity is the only force acting, resulting in an acceleration of 9.8 ms}^{-2}",
  parts: [
    {
      id: 'a',
      question: "\\text{\\sf Evaluate the reasonableness of the claim.}",
      marks: 4,
      solution: "1 mark for calculating the angular velocity \\( \\omega = \\frac{2\\pi}{3} \\). 1 mark for determining maximum vertical acceleration \\( a_{\\text{max}} = r\\omega^2 = 2 \\cdot \\left(\\frac{2\\pi}{3}\\right)^2 = \\frac{8\\pi^2}{9} \\approx 8.77 \\text{ m/s}^2 \\). 1 mark for comparing \\( a_{\\text{max}} \\) to \\( 4.9 \\text{ m/s}^2 \\) (half of \\( 9.8 \\text{ m/s}^2 \\)). 1 mark for concluding the claim is reasonable.",
      explanation: "- 1 mark for finding angular velocity \\( \\omega \\) \n - 1 mark for calculating maximum vertical acceleration \\( a_{\\text{max}} \\) \n - 1 mark for comparing \\( a_{\\text{max}} \\) to half of \\( 9.8 \\text{ m/s}^2 \\) \n - 1 mark for concluding the claim is reasonable."
    }
  ],
  videoUrl: "",
  solved: false
}
, {
  id: 2023119,
  title: "\\text{\\sf 2023 TF Q19}",
  tags: ["TF", "2023", "Written"],
  type: "written",
  marks: 7,
equation: "\\text{\\sf Jaxon and Shari each own a shop and have recorded the number of customers entering their shop on} \\\\ \\text{\\sf two consecutive days.} \\\\ \\ \\\\ \\qquad \\qquad \\qquad \\qquad \\qquad \\qquad \\begin{array}{|l|c|c|} \\hline & \\text{\\sf Day 1} & \\text{\\sf Day 2} \\\\ \\hline \\text{\\sf Jaxon's customers} & 40 & 30 \\\\ \\hline \\text{\\sf Shari's customers} & 10 & 20 \\\\ \\hline \\text{\\sf Total} & 50 & 50 \\\\ \\hline \\end{array} \\\\ \\ \\\\ \\text{\\sf The number of daily customers for each shop can be modelled by the equation } y = A \\ln(Bx)\\text{\\sf , where } x \\text{\\;\\sf is} \\\\ \\text{\\sf the day and } y \\text{\\;\\sf is the number of customers. The constants } A \\text{\\;\\sf and } B \\text{\\;\\sf are different for each shop.}",
  parts: [
    {
      id: 'a',
      question: "\\text{\\sf Determine algebraically whether the total number of customers for Jaxon and Shari’s shops will be the same every day in the future.}",
      marks: 7,
      solution: "Let Jaxon’s customers \\( y_J = A_J \\ln(B_Jx) \\) and Shari’s customers \\( y_S = A_S \\ln(B_Sx) \\). Total customers \\( y_T = y_J + y_S = A_J \\ln(B_Jx) + A_S \\ln(B_Sx) \\). Using logarithmic properties, \\( y_T = A_J \\ln(B_J) + A_S \\ln(B_S) + (A_J + A_S) \\ln(x) \\). Since \\( A_J \\neq A_S \\) or \\( B_J \\neq B_S \\), the total changes differently for each shop, so the total will not remain the same.",
      explanation: "- 2 marks for setting up equations \\( y_J \\) and \\( y_S \\) \n - 2 marks for combining terms into \\( y_T \\) \n - 2 marks for identifying dependencies on \\( x \\) and concluding totals vary \n - 1 mark for a clear justification of the conclusion."
    }
  ],
  videoUrl: "",
  solved: false
},
  {
  id: 2023201,
  title: "\\text{\\sf 2023 TA Q1}",
  tags: ["TA", "2023", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf If } \\displaystyle f(x) = \\sin(3x)\\text{\\sf , determine the value of } \\displaystyle f'\\left(\\frac{\\pi}{8}\\right)",
  choices: [
    { id: 'A', text: '2.772' },
    { id: 'B', text: '1.148' },
    { id: 'C', text: '0.929' },
    { id: 'D', text: '0.383' }
  ],
  solution: "B",
  explanation: "Let's solve this step by step:\n1. If f(x) = sin(3x), then f'(x) = 3cos(3x)\n2. We need to evaluate f'(π/8)\n3. f'(π/8) = 3cos(3π/8)\n4. 3π/8 ≈ 1.178 radians\n5. cos(1.178) ≈ 0.924\n6. 3 × 0.924 ≈ 2.772",
  videoUrl: "",
  solved: false
},
{
  id: 2023202,
  title: "\\text{\\sf 2023 TA Q2}",
  tags: ["TA", "2023", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf The probability of hitting a bullseye on a standard dartboard is 1 in 1250. What is the probability of hitting a} \\\\ \\text{\\sf bullseye exactly once in 10 attempts?}",
  choices: [
    { id: 'A', text: '\\displaystyle \\binom{9}{1}\\left(\\frac{1}{1250}\\right)^1\\times\\left(\\frac{1249}{1250}\\right)^9' },
    { id: 'B', text: '\\displaystyle \\binom{9}{1}\\left(\\frac{1}{1250}\\right)^9\\times\\left(\\frac{1249}{1250}\\right)^1' },
    { id: 'C', text: '\\displaystyle \\binom{10}{1}\\left(\\frac{1}{1250}\\right)^1\\times\\left(\\frac{1249}{1250}\\right)^9' },
    { id: 'D', text: '\\displaystyle \\binom{10}{1}\\left(\\frac{1}{1250}\\right)^9\\times\\left(\\frac{1249}{1250}\\right)^1' }
  ],
  solution: "C",
  explanation: "Let's solve this step by step:\n1. This is a binomial probability problem\n2. We want P(X = 1) where X is the number of successes in 10 trials\n3. Use the formula: P(X = k) = C(n,k) × p^k × (1-p)^(n-k)\n4. Here: n = 10, k = 1, p = 1/1250\n5. Therefore: P(X = 1) = C(10,1) × (1/1250)^1 × (1249/1250)^9",
  videoUrl: "",
  solved: false
}, 
  {
  id: 2023203,
  title: "\\text{\\sf 2023 TA Q3}",
  tags: ["TA", "2023", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf In a certain normal distribution curve, 95\\% of the area lies between the values 50.32 and 113.68.} \\\\ \\text{\\sf The mean of this distribution is 82. Determine the standard deviation.}",
  choices: [
    { id: 'A', text: '16.16' },
    { id: 'B', text: '21.12' },
    { id: 'C', text: '31.68' },
    { id: 'D', text: '63.36' }
  ],
  solution: "A",
  explanation: "",
  videoUrl: "",
  solved: false
},
{
  id: 2023204,
  title: "\\text{\\sf 2023 TA Q4}",
  tags: ["TA", "2023", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf The displacement (m) of a moving particle is given by } d = e^{0.5t} - 1\\text{\\sf , where } t \\text{\\, is time (s).} \\\\ \\text{\\sf The acceleration (ms}^{-2}\\text{\\sf ) of the particle when } t = 4 \\text{\\,  is}",
  choices: [
    { id: 'A', text: '\\displaystyle 7.3891' },
    { id: 'B', text: '\\displaystyle 6.3891' },
    { id: 'C', text: '\\displaystyle 3.6945' },
    { id: 'D', text: '\\displaystyle 1.8473' }
  ],
  solution: "D",
  explanation: "",
  videoUrl: "",
  solved: false
}
] as const;