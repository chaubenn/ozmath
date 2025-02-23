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
      solution: "- 1 mark for identifying that sample B has larger variance \n - 1 mark for explaining that larger variance indicates larger variability",
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
      question: "\\text{\\sf Estimate the area of the garden bed using sums of the form } \\displaystyle \\sum_i f(x_i)\\delta x_i \\text{\\sf , where } x_1 = 1, \\, x_2 = 2, \\, x_3 = 3 \\text{\\, \\sf and } \\, x_4 = 4.",
      marks: 1,
      solution: "1 mark for correct estimation (10)",
      explanation: "- 1 mark for correct estimation (10)"
    }, 
    {
      id: 'b',
      question: "\\text{\\sf Use a definite integral to determine the area of the garden bed.}",
      marks: 3,
      solution: "the final answer is 10 and two thirds. - 1 mark for correctly stating definite integral required \int _0^4x\left(4-x\right)\ dx\ \n - 1 mark for determining the integration of the function \frac{1}{3}x^3+2x^2\ within bounds 4 and 0 \n",
      explanation: "- 1 mark for correctly stating definite integral required \n - 1 mark for determining the integration of the function \n- 1 mark for calculating the area under the curve by integration"
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
  equation: "\\text{\\sf In a certain game, players throw one water balloon at a target. There is a one in four chance of hitting the target.}",
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
  equation: "\\text{\\sf Solve for } x \\text{\\;\\sf in the equation: } \\displaystyle 4 + 7e^{-2x} = 3e^{2x}",
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
  equation: "\\text{\\sf A chemical is added to the water in a swimming pool at 10:00 am to prevent algae. The amount of chemical} \\\\ \\text {\\sf absorbed into the water over time } t \\text{\\;\\sf (hours) is represented by } \\\\ \\ \\\\ \\qquad \\qquad \\qquad \\qquad \\qquad \\qquad \\displaystyle A(t) = 20t e^{-t}, \\quad 0 \\le t \\le 1\\frac{2}{3} \\\\ \\ \\\\ \\text{\\sf Determine  the time of day when the rate of absorption of the chemical is at its maximum. Use calculus} \\\\ \\text{\\sf techniques to verify that your time corresponds to a maximum rate.}",
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
  equation: "\\text{\\sf The displacement (m) of a moving particle is given by } d = e^{0.5t} - 1\\text{\\sf , where } t \\text{\\;\\sf is time (s).} \\\\ \\text{\\sf The acceleration (ms}^{-2}\\text{\\sf ) of the particle when } t = 4 \\text{\\,  is}",
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
}, {
  id: 2023205,
  title: "\\text{\\sf 2023 TA Q5}",
  tags: ["TA", "2023", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf Solve} \\; \\displaystyle \\ln(x) + \\ln(3.70) = \\ln(9.25) \\text{\\;\\sf for } x",
  choices: [
    { id: 'A', text: '0.92' },
    { id: 'B', text: '1.71' },
    { id: 'C', text: '2.50' },
    { id: 'D', text: '5.55' }
  ],
  solution: "C",
  explanation: "Let's solve this step by step:\n1. Using the properties of logarithms, ln(x) + ln(3.70) = ln(9.25)\n2. ln(x × 3.70) = ln(9.25)\n3. x × 3.70 = 9.25\n4. x = 9.25 ÷ 3.70\n5. x = 2.50",
  videoUrl: "",
  solved: false
},
{
  id: 2023206,
  title: "\\text{\\sf 2023 TA Q6}",
  tags: ["TA", "2023", "MC"],
  type: "multiple-choice",
  equation: "\\displaystyle\\int_a^{5a} \\frac{1}{x+a}\\,dx\\text{\\sf , where } a \\neq 0 \\text{\\;\\sf is}",
  choices: [
    { id: 'A', text: '1.7918' },
    { id: 'B', text: '1.6094' },
    { id: 'C', text: '1.3863' },
    { id: 'D', text: '1.0986' }
  ],
  solution: "D",
  explanation: "Let's solve this step by step:\n1. The integral of 1/(x+a) is ln|x+a|\n2. Evaluate from a to 5a:\n   ln|5a+a| - ln|a+a|\n3. = ln|6a| - ln|2a|\n4. = ln(6) - ln(2)\n5. = ln(3) ≈ 1.0986",
  videoUrl: "",
  solved: false
},
{
  id: 2023207,
  title: "\\text{\\sf 2023 TA Q7}",
  tags: ["TA", "2023", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf The distribution of a certain sample proportion has a mean of 0.70 and a standard deviation of 0.02.} \\\\ \\text{\\sf Determine the sample size.}",
  choices: [
    { id: 'A', text: '525' },
    { id: 'B', text: '750' },
    { id: 'C', text: '1750' },
    { id: 'D', text: '2500' }
  ],
  solution: "A",
  explanation: "Let's solve this step by step:\n1. For a sample proportion, σₚ = √(p(1-p)/n)\n2. Given: p = 0.70, σₚ = 0.02\n3. 0.02 = √(0.70(0.30)/n)\n4. 0.0004 = 0.21/n\n5. n = 525",
  videoUrl: "",
  solved: false
}, {
  id: 2023208,
  title: "\\text{\\sf 2023 TA Q8}",
  tags: ["TA", "2023", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf The number of koalas in a conservation park is modelled by } N = 15\\ln(7t + 1), \\; t \\geq 1\\text{\\sf , where } t \\text{\\;\\sf represents the} \\\\ \\text{\\sf time (years) since the park opened. There were 20 koalas in the park when it opened.} \\\\ \\ \\\\ \\text{\\sf Determine the approximate rate of change in the number of koalas when } t = 3\\text{\\sf .}",
  choices: [
    { id: 'A', text: '46' },
    { id: 'B', text: '26' },
    { id: 'C', text: '25' },
    { id: 'D', text: '5' }
  ],
  solution: "D",
  explanation: "Let's solve this step by step:\n1. To find rate of change, differentiate N with respect to t\n2. dN/dt = 15 × (1/(7t + 1)) × 7\n3. = 105/(7t + 1)\n4. When t = 3:\n   = 105/(7×3 + 1)\n   = 105/22\n   ≈ 25",
  videoUrl: "",
  solved: false
},
{
  id: 2023209,
  title: "\\text{\\sf 2023 TA Q9}",
  tags: ["TA", "2023", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf If } f(x) = e^{3x}(x+1)^2 \\text{\\;\\sf and } f'(x) = ae^{3x}(x+1)\\text{\\sf , determine the expression for } a\\text{\\sf .}",
  choices: [
    { id: 'A', text: '3x + 5' },
    { id: 'B', text: '3x + 3' },
    { id: 'C', text: '5x + 5' },
    { id: 'D', text: '5x + 3' }
  ],
  solution: "A",
  explanation: "Let's solve this step by step:\n1. Use product rule to find f'(x)\n2. f'(x) = e^{3x} × 3(x+1)^2 + e^{3x} × 2(x+1)\n3. = e^{3x}(x+1)(3x + 3 + 2)\n4. = e^{3x}(x+1)(3x + 5)\n5. Therefore a = 3x + 5",
  videoUrl: "",
  solved: false
},
{
  id: 2023210,
  title: "\\text{\\sf 2023 TA Q10}",
  tags: ["TA", "2023", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf A student is trying to determine which subject they performed best in compared to other students. Results} \\\\ \\text{\\sf from recent tests in four subjects (A to D) are shown. Assume student results in each subject are normally} \\\\ \\text{\\sf distributed.} \\\\ \\text{\\sf In which subject did the student perform best compared to other students?} \\\\ \\ \\\\ \\qquad \\qquad \\qquad \\qquad \\qquad \\qquad \\begin{array}{|c|c|c|c|} \\hline & \\text{\\sf Class mean} & \\text{\\sf Class standard} & \\text{\\sf Student's} \\\\ & & \\text{\\sf deviation} & \\text{\\sf result} \\\\ \\hline \\text{\\sf (A)} & 62 & 22 & 77 \\\\ \\hline \\text{\\sf (B)} & 55 & 25 & 74 \\\\ \\hline \\text{\\sf (C)} & 61 & 15 & 70 \\\\ \\hline \\text{\\sf (D)} & 73 & 20 & 82 \\\\ \\hline \\end{array}",
  choices: [
    { id: 'A', text: '\\text{A}' },
    { id: 'B', text: '\\text{B}' },
    { id: 'C', text: '\\text{C}' },
    { id: 'D', text: '\\text{D}' }
  ],
  solution: "B",
  explanation: "Let's solve this step by step:\n1. Calculate z-scores for each subject using (x - μ)/σ\n2. Subject A: (77 - 62)/22 = 0.68\n3. Subject B: (74 - 55)/25 = 0.76\n4. Subject C: (70 - 61)/15 = 0.60\n5. Subject D: (82 - 73)/20 = 0.45\n6. Highest z-score indicates best relative performance\n7. Subject A has highest z-score of 0.68",
  videoUrl: "",
  solved: false
}, {
  id: 2023211,
  title: "\\text{\\sf 2023 TA Q11}",
  tags: ["TA", "2023", "Written"],
  type: "written",
  marks: 4,
  equation: "\\text{\\sf A researcher found that 17 out of 50 randomly selected people had used public transport in the past week.}",
  parts: [
    {
      id: 'a',
      question: "\\text{\\sf Determine the sample proportion of people who had used public transport in the past week.}",
      marks: 1,
      solution: "\\text{\\sf Sample proportion } = \\frac{17}{50} = 0.34 \\text{\\sf or } 34\\%",
      explanation: "- 1 mark for correctly calculating sample proportion"
    },
    {
      id: 'b',
      question: "\\text{\\sf Determine an approximate 95\\% confidence interval for the proportion of people who had used public transport in the past week.}",
      marks: 2,
      solution: "\\text{\\sf CI } = 0.34 \\pm 1.96\\sqrt{\\frac{0.34(1-0.34)}{50}} = 0.34 \\pm 0.13 = (0.21, 0.47)",
      explanation: "- 1 mark for correct formula and substitution \n - 1 mark for calculating interval correctly"
    },
    {
      id: 'c',
      question: "\\text{\\sf Someone claims that: }\\textit{50\\% of people use public transport each week}\\text{\\sf .} \\\\ \\text{\\sf Use your answer from Question 11b) to explain whether the data can or cannot support this claim.}",
      marks: 1,
      solution: "\\text{\\sf Since 50\\% (0.50) lies outside the 95\\% CI of (0.21, 0.47), the data does not support this claim.}",
      explanation: "- 1 mark for correct conclusion based on CI"
    }
  ],
  videoUrl: "",
  solved: false
}, {
  id: 2023212,
  title: "\\text{\\sf 2023 TA Q12}",
  tags: ["TA", "2023", "Written"],
  type: "written",
  marks: 4,
  equation: "\\text{\\sf The graph shows the water level under a bridge over a 12-hour period.}",
  pdfUrl: "/images/q12.png",
  parts: [
    {
      id: 'a',
      question: "\\text{\\sf Determine the equation of the cosine function that models the water level as a function of time after 12:00 am.}",
      marks: 1,
      solution: "\\text{\\sf Water level } = 7.4 + 1.1\\cos\\left(\\frac{\\pi}{6}t\\right) \\text{\\sf , where } t \\text{\\sf is time in hours}",
      explanation: "- 1 mark for correct cosine equation with amplitude, period and vertical shift"
    },
    {
      id: 'b',
      question: "\\text{\\sf How long in the 12-hour period shown is the rate of change of water level more than 0.55 metres per hour?}",
      marks: 3,
      solution: "\\text{\\sf Rate of change } = -\\frac{1.1\\pi}{6}\\sin\\left(\\frac{\\pi}{6}t\\right). \\text{\\sf Solve } \\left|-\\frac{1.1\\pi}{6}\\sin\\left(\\frac{\\pi}{6}t\\right)\\right| > 0.55 \\text{\\sf for } t \\text{\\sf in } [0,12].",
      explanation: "- 1 mark for finding derivative \n - 1 mark for setting up inequality \n - 1 mark for solving for time intervals"
    }
  ],
  videoUrl: "",
  solved: false
}, {
  id: 2023213,
  title: "\\text{\\sf 2023 TA Q13}",
  tags: ["TA", "2023", "Written"],
  type: "written",
  marks: 4,
  equation: "\\text{\\sf The curved lines represent graphs of the equations } y = x^2 - 4x + 8 \\text{\\;\\sf and } y = 10\\cos(x + 10)",
  pdfUrl: "/images/q13.png",
  parts: [
    {
      id: 'a',
      question: "\\text{\\sf Determine the coordinates of the points of intersection A and B.}",
      marks: 1,
      solution: "\\text{\\sf Solve } x^2 - 4x + 8 = 10\\cos(x + 10) \\text{\\sf numerically to find x-coordinates.} \\\\ \\text{\\sf Points are approximately } (1.2, 5.4) \\text{\\sf and } (3.8, 5.4)",
      explanation: "- 1 mark for correctly determining both intersection points"
    },
    {
      id: 'b',
      question: "\\text{\\sf State an integral expression representing the area enclosed by the two graphs.}",
      marks: 2,
      solution: "\\displaystyle \\int_{1.2}^{3.8} \\left|x^2 - 4x + 8 - 10\\cos(x + 10)\\right| \\, dx",
      explanation: "- 1 mark for correct integral setup \n - 1 mark for correct bounds"
    },
    {
      id: 'c',
      question: "\\text{\\sf Determine the area enclosed by the two graphs.}",
      marks: 1,
      solution: "\\text{\\sf Area } \\approx 4.2 \\text{\\sf square units}",
      explanation: "- 1 mark for correct numerical evaluation"
    }
  ],
  videoUrl: "",
  solved: false
}, {
  id: 2023214,
  title: "\\text{\\sf 2023 TA Q14}",
  tags: ["TA", "2023", "Written"],
  type: "written",
  marks: 7,
  equation: "\\text{\\sf A fence divides a paddock into two triangular sections as shown.}",
  pdfUrl: "/images/q14.png",
  parts: [
    {
      id: 'a',
      question: "\\text{\\sf Determine the length of the fence.}",
      marks: 1,
      solution: "\\text{\\sf Use cosine rule in triangle with sides 900m, 540m and fence:} \\\\ \\text{\\sf fence}^2 = 900^2 + 540^2 - 2(900)(540)\\cos(110°) \\\\ \\text{\\sf fence} \\approx 1080 \\text{\\sf metres}",
      explanation: "- 1 mark for identifying cosine rule \n - 1 mark for correct substitution \n - 1 mark for correct answer"
    },
    {
      id: 'b',
      question: "\\text{\\sf Calculate the area of triangular section A.}",
      marks: 1,
      solution: "\\text{\\sf Area} = \\frac{1}{2}(900)(540)\\sin(110°) \\approx 230,000 \\text{\\sf square metres}",
      explanation: "- 1 mark for correct area calculation using sine formula"
    },
    {
      id: 'c',
      question: "\\text{\\sf Determine the total area of the paddock.}",
      marks: 5,
      solution: "\\text{\\sf Area of second triangle} = \\frac{1}{2}(500)(540)\\sin(65°) \\\\ \\text{\\sf Total area} = 230,000 + 122,000 = 352,000 \\text{\\sf square metres}",
      explanation: "- 1 mark for calculating second triangle area \n - 1 mark for adding areas correctly \n - 1 mark for final answer with appropriate units"
    }
  ],
  videoUrl: "",
  solved: false
}, {
  id: 2023215,
  title: "\\text{\\sf 2023 TA Q15}",
  tags: ["TA", "2023", "Written"],
  type: "written",
  marks: 4,
  equation: "\\text{\\sf Determine the derivative of } f(x) = \\ln x^2 + \\ln(x-5)^3\\text{\\sf . Express the derivative as a single fraction in its} \\\\ \\text{\\sf simplest and factorised form.}",
  solution: "\\text{\\sf Using logarithm properties and chain rule:} \\\\ \\displaystyle f'(x) = \\frac{2}{x} + \\frac{3}{x-5} = \\frac{2(x-5) + 3x}{x(x-5)} = \\frac{5x-10}{x(x-5)}",
  explanation: "- 1 mark for correctly using logarithm properties to simplify \n - 1 mark for finding derivative of ln(x^2) \n - 1 mark for finding derivative of ln(x-5)^3 \n - 1 mark for combining into single fraction in factored form",
  videoUrl: "",
  solved: false
}, {
  id: 2023216,
  title: "\\text{\\sf 2023 TA Q16}",
  tags: ["TA", "2023", "Written"],
  type: "written",
  marks: 6,
  equation: "\\text{\\sf A particle is moving in a straight line. The velocity (ms}^{-1}\\text{\\sf ) of the particle is given by} \\\\ \\ \\\\ \\qquad \\qquad \\qquad \\qquad \\qquad \\qquad \\displaystyle v(t) = \\frac{20\\sin(2t)}{6-5\\cos(2t)}, \\; t \\geq 0, \\\\ \\ \\\\ \\text{\\sf where } t \\text{\\;\\sf is time (s) after moving from its initial position.} \\\\ \\text{\\sf The initial position of the particle is +6.0 m from the origin.}",
  parts: [
    {
      id: 'a',
      question: "\\text{\\sf Use calculus methods to determine an equation for the position of the particle from the origin at any time } t\\text{\\sf .}",
      marks: 3,
      solution: "\\text{\\sf Position } = 6 + \\int_0^t \\frac{20\\sin(2u)}{6-5\\cos(2u)}\\,du",
      explanation: "- 1 mark for recognizing need to integrate velocity \n - 1 mark for setting up definite integral correctly \n - 1 mark for including initial position"
    },
    {
      id: 'b',
      question: "\\text{\\sf Determine the position of the particle relative to the origin when it first reaches maximum velocity.}",
      marks: 3,
      solution: "\\text{\\sf Find } t \\text{\\sf where } \\frac{d}{dt}\\left(\\frac{20\\sin(2t)}{6-5\\cos(2t)}\\right) = 0 \\text{\\sf , then substitute into position equation.}",
      explanation: "- 1 mark for finding derivative of velocity \n - 1 mark for finding time of maximum velocity \n - 1 mark for calculating position at that time"
    }
  ],
  videoUrl: "",
  solved: false
}, {
  id: 2023217,
  title: "\\text{\\sf 2023 TA Q17}",
  tags: ["TA", "2023", "Written"],
  type: "written",
  marks: 5,
  equation: "\\text{\\sf Model bridges were constructed for a competition. The models that could support the heaviest loads} \\\\ \\text{\\sf before collapsing were given awards.} \\\\ \\ \\\\ \\text{\\sf The load results of the competition were normally distributed, with a mean of 1.36 kg and a standard} \\\\ \\text{\\sf deviation of 0.12 kg.} \\\\ \\ \\\\ \\text{\\sf Three award categories were used: honours for the top 15\\% of load results; distinction for the next 15\\%;} \\\\ \\text{\\sf and commendation for the next 15\\%.} \\\\ \\ \\\\ \\text{\\sf The model bridge constructed by Finley only just missed out on a commendation. Kirby's model bridge} \\\\ \\text{\\sf only just qualified for honours. Determine the difference, to the nearest gram, between the loads supported} \\\\ \\text{\\sf by Finley and Kirby's models.}",
  solution: "\\text{\\sf 1. Find z-scores for 15\\%, 30\\%, 45\\% (z = 1.04, 0.52, 0.13)} \\\\ \\text{\\sf 2. Convert to loads: x = μ + zσ} \\\\ \\text{\\sf 3. Finley's load = 1.36 + 0.13(0.12) = 1.3756 kg} \\\\ \\text{\\sf 4. Kirby's load = 1.36 + 1.04(0.12) = 1.4848 kg} \\\\ \\text{\\sf 5. Difference = 109 grams}",
  explanation: "- 1 mark for finding correct z-scores \n - 2 marks for finding Finley's load \n - 1 mark for finding Kirby's load \n - 1 mark for finding difference in grams",
  videoUrl: "",
  solved: false
}, {
  id: 2023218,
  title: "\\text{\\sf 2023 TA Q18}",
  tags: ["TA", "2023", "Written"],
  type: "written",
  marks: 5,
  equation: "\\text{\\sf A company makes windows using glass that has a mass of 5.6 kg per square metre. A customer orders an} \\\\ \\text{\\sf unusual window in a partial parabolic shape, as shown.}",
    parts: [
    {
      id: 'a',
      question: "\\text{\\sf Determine the mass of the window.}",
      marks: 3,
      solution: "\\text{\\sf 1. Area = } \\int_0^8 (12 - \\frac{12}{64}x^2)\\,dx = 8 \\times 12 - \\frac{12}{64} \\times \\frac{8^3}{3} = 64 \\text{\\sf m}^2 \\\\ \\text{\\sf 2. Mass = 64 × 5.6 = 358.4 kg}",
  explanation: "- 2 marks for setting up correct integral to find area \n - 2 marks for evaluating integral correctly \n - 1 mark for multiplying area by mass per square metre to find total mass",
    }
  ],
  pdfUrl: "/images/q18.png",
  videoUrl: "",
  solved: false
}, {
  id: 2023219,
  title: "\\text{\\sf 2023 TA Q19}",
  tags: ["TA", "2023", "Written"],
  type: "written",
  marks: 6,
  equation: "\\text{\\sf Over a suitable domain, a hill has a cross-sectional area given by } \\displaystyle \\int h(x)\\,dx = \\frac{a}{b}e^{bx} + c\\text{\\sf , where:} \\\\ \\bullet \\; a\\text{\\sf , } b \\text{\\;\\sf and } c \\text{\\;\\sf are constants, } b \\neq 0 \\\\ \\bullet \\; h(x) \\text{\\;\\sf represents vertical distance (m), } x \\text{\\;\\sf represents horizontal distance (m).} \\\\ \\ \\\\ \\text{\\sf It is known that } h(0) = 1.22 \\text{\\;\\sf and } h(40) = 25. \\\\ \\ \\\\ \\text{\\sf Where the gradient of the hill is 0.86 there is a tree stump. A second tree stump is located further up} \\\\ \\text{\\sf the hill. The difference in hill gradient between the two tree stumps is 0.44.} \\\\ \\ \\\\ \\text{\\sf A surveyor predicts that the vertical distance separating the two tree stumps is between 7.5 m and 8.5 m.} \\\\ \\text{\\sf Evaluate the reasonableness of this prediction.}",
  solution: "\\text{\\sf 1. Since } \\int h(x)\\,dx = \\frac{a}{b}e^{bx} + c\\text{\\sf , then } h(x) = ae^{bx} \\\\ \\text{\\sf 2. Given } h(0) = 1.22 \\text{\\sf and } h(40) = 25\\text{\\sf : } \\\\ \\qquad a = 1.22 \\text{\\sf and } 25 = 1.22e^{40b} \\\\ \\qquad \\therefore b = \\frac{\\ln(20.49)}{40} = 0.0755 \\\\ \\text{\\sf 3. Gradient } h'(x) = 0.0755 \\cdot 1.22e^{0.0755x} \\\\ \\text{\\sf 4. At first stump: } 0.86 = 0.0755 \\cdot 1.22e^{0.0755x_1} \\\\ \\qquad x_1 = 25.8 \\text{\\sf m} \\\\ \\text{\\sf 5. At second stump: } 1.30 = 0.0755 \\cdot 1.22e^{0.0755x_2} \\\\ \\qquad x_2 = 31.6 \\text{\\sf m} \\\\ \\text{\\sf 6. Vertical distance } = h(31.6) - h(25.8) = 8.1 \\text{\\sf m} \\\\ \\text{\\sf Therefore prediction is reasonable}",
  explanation: "- 1 mark for finding h(x) by differentiating area function \n - 1 mark for using initial conditions to find a and b \n - 2 marks for finding x-coordinates of stumps \n - 1 mark for calculating vertical distance \n - 1 mark for evaluating reasonableness",
  videoUrl: "",
  solved: false
}, {
  id: 2022101,
  title: "\\text{\\sf 2022 TF Q1}",
  tags: ["TF", "2022", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf Consider the graph of } f'(x) \\text{\\;\\sf for } a \\leq x \\leq b\\text{\\sf .} \\\\ \\text{\\sf Which statement describes all the local maxima and minima of the graph of } f(x) \\text{\\;\\sf over } a \\leq x \\leq b\\text{\\sf ?}",
  pdfUrl: "/images/q1.png",
  choices: [
    { id: 'A', text: '\\text{one local minimum and one local maximum}' },
    { id: 'B', text: '\\text{one local minimum and two local maxima}' },
    { id: 'C', text: '\\text{one local minimum only}' },
    { id: 'D', text: '\\text{one local maximum only}' }
  ],
  solution: "A",
  explanation: "Let's solve this step by step:\n1. The graph shows f'(x), the derivative of f(x)\n2. Where f'(x) crosses from negative to positive, f(x) has a local minimum\n3. Where f'(x) crosses from positive to negative, f(x) has a local maximum\n4. Looking at the graph:\n   - f'(x) crosses from negative to positive once (at x = 0)\n   - f'(x) never crosses from positive to negative\n5. Therefore, f(x) has one local minimum and no local maxima",
  videoUrl: "",
  solved: false
}, {
  id: 2022102,
  title: "\\text{\\sf 2022 TF Q2}",
  tags: ["TF", "2022", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf A binomial random variable arises from the number of successes in } n \\text{\\;\\sf independent Bernoulli trials.} \\\\ \\text{\\sf A context } \\sf\\textbf{not} \\text{\\;\\sf suitable for modelling using a binomial random variable is recording the number of}",
  choices: [
    { id: 'A', text: '\\text{heads when a coin is tossed 12 times.}' },
    { id: 'B', text: '\\text{left-handed people in a sample of 100 people.}' },
    { id: 'C', text: '\\text{times a player hits a target from 20 shots where each shot is independent of all other shots.}' },
    { id: 'D', text: '\\text{red marbles selected when three marbles are drawn without replacement from a bag containing four} \\\\ \\text{blue and five red marbles.}' }
  ],
  solution: "D",
  explanation: "Let's solve this step by step:\n1. A binomial random variable requires:\n   - Fixed number of trials\n   - Each trial is independent\n   - Only two possible outcomes\n   - Probability remains constant\n2. Option D violates independence because drawing without replacement changes the probability for subsequent draws\n3. All other options satisfy the requirements for a binomial distribution",
  videoUrl: "",
  solved: false
},
{
  id: 2022103,
  title: "\\text{\\sf 2022 TF Q3}",
  tags: ["TF", "2022", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf The area between the curve } y = 9-x^2 \\text{\\;\\sf and the } x\\text{-axis is}",
  choices: [
    { id: 'A', text: '12 \\text{ units}^2' },
    { id: 'B', text: '18 \\text{ units}^2' },
    { id: 'C', text: '36 \\text{ units}^2' },
    { id: 'D', text: '54 \\text{ units}^2' }
  ],
  solution: "C",
  explanation: "Let's solve this step by step:\n1. Find where curve intersects x-axis: 9-x^2 = 0\n   x = ±3\n2. Area = ∫_{-3}^3 (9-x^2) dx\n3. = [9x - x^3/3]_{-3}^3\n4. = (27 - 9) - (-27 - (-9))\n5. = 18 units²",
  videoUrl: "",
  solved: false
},
{
  id: 2022104,
  title: "\\text{\\sf 2022 TF Q4}",
  tags: ["TF", "2022", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf The weekly amount of money a company spends on repairs is normally distributed, with a mean of \\$1200 and} \\\\ \\text{\\sf a standard deviation of \\$100.} \\\\ \\ \\\\ \\text{\\sf Given that } P(Z \\leq -2.5) = 0.0062 \\text{\\;\\sf and } P(Z > 1) = 0.1587\\text{\\sf , where } Z \\text{\\;\\sf is a standard normal random variable,} \\\\ \\text{\\sf determine the probability that the weekly repair costs will be between \\$950 and \\$1300.}",
  choices: [
    { id: 'A', text: '0.6525' },
    { id: 'B', text: '0.6587' },
    { id: 'C', text: '0.8351' },
    { id: 'D', text: '0.8413' }
  ],
  solution: "C",
  explanation: "Let's solve this step by step:\n1. Standardize the values:\n   For $950: z = (950-1200)/100 = -2.5\n   For $1300: z = (1300-1200)/100 = 1\n2. Want P(950 < X < 1300) = P(-2.5 < Z < 1)\n3. = P(Z < 1) - P(Z < -2.5)\n4. = (1 - 0.1587) - 0.0062\n5. = 0.8413 - 0.0062\n6. = 0.8413",
  videoUrl: "",
  solved: false
}, {
  id: 2022105,
  title: "\\text{\\sf 2022 TF Q5}",
  tags: ["TF", "2022", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf Which normal distribution curve best repressents a normal distribution with a mean of 1 and a standard deviation of 0.5?}",
  pdfUrl: "/images/q5.png",
  choices: [
    { id: 'A', text: '\\text{A}' },
    { id: 'B', text: '\\text{B}' },
    { id: 'C', text: '\\text{C}' },
    { id: 'D', text: '\\text{D}' }
  ],
  solution: "D",
  explanation: "",
  videoUrl: "",
  solved: false
}, {
  id: 2022106,
  title: "\\text{\\sf 2022 TF Q6}",
  tags: ["TF", "2022", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf Which graph represents the function } f(x) = -3-\\ln(x+3)\\text{\\sf ?}",
  pdfUrl: "/images/q6.png",
  choices: [
    { id: 'A', text: '\\text{A}' },
    { id: 'B', text: '\\text{B}' },
    { id: 'C', text: '\\text{C}' },
    { id: 'D', text: '\\text{D}' }
  ],
  solution: "B",
  explanation: "Let's analyze the function f(x) = -3-ln(x+3):\n1. Domain: x > -3 (since ln(x+3) must be defined)\n2. The function has:\n   - A vertical asymptote at x = -3\n   - No horizontal asymptote\n   - Is always decreasing (derivative is -1/(x+3))\n3. Looking at the graphs, only B matches these characteristics",
  videoUrl: "",
  solved: false
}, {
  id: 2022107,
  title: "\\text{\\sf 2022 TF Q7}",
  tags: ["TF", "2022", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf A circle with radius } r \\text{\\;\\sf and internal angle } \\theta \\text{\\;\\sf has a shaded segment as shown.} \\\\ \\text{\\sf If } \\theta \\text{\\;\\sf is in radians, the area of the shaded segment is}",
  pdfUrl: "/images/q7.png",
  choices: [
    { id: 'A', text: '\\displaystyle \\frac{r^2}{2}\\left(\\frac{\\theta\\pi}{180}-\\sin(\\theta)\\right)' },
    { id: 'B', text: '\\displaystyle \\frac{r^2}{2}\\left(\\theta-\\sin(\\theta)\\right)' },
    { id: 'C', text: '\\displaystyle \\frac{r^2}{4}\\left(\\frac{\\theta\\pi}{90}-1\\right)' },
    { id: 'D', text: '\\displaystyle \\frac{r^2}{2}\\left(\\theta-1\\right)' }
  ],
  solution: "B",
  explanation: "The area of a circular segment is given by:\n1. Area = r²(θ - sin(θ))/2 where θ is in radians\n2. This formula represents:\n   - Area of sector (r²θ/2)\n   - Minus area of triangle (r²sin(θ)/2)\n3. Option B matches this formula exactly",
  videoUrl: "",
  solved: false
}, {
  id: 2022108,
  title: "\\text{\\sf 2022 TF Q8}",
  tags: ["TF", "2022", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf In a survey, 80 respondents exercised daily, while 120 did not. When calculating the approximate 95\\%} \\\\ \\text{\\sf confidence interval for the proportion of people who exercise daily, the margin of error is}",
  choices: [
    { id: 'A', text: '\\displaystyle 1.96\\sqrt{\\frac{0.4(1-0.4)}{200}}' },
    { id: 'B', text: '\\displaystyle 0.95\\sqrt{\\frac{0.4(1-0.4)}{200}}' },
    { id: 'C', text: '\\displaystyle 1.96\\sqrt{\\frac{0.67(1-0.67)}{120}}' },
    { id: 'D', text: '\\displaystyle 0.95\\sqrt{\\frac{0.67(1-0.67)}{120}}' }
  ],
  solution: "A",
  explanation: "Let's solve this step by step:\n1. Sample size n = 80 + 120 = 200\n2. Sample proportion p = 80/200 = 0.4\n3. For 95% confidence interval, z = 1.96\n4. Margin of error formula: z√(p(1-p)/n)\n5. Substituting: 1.96√(0.4(0.6)/200)\n6. Therefore option A is correct",
  videoUrl: "",
  solved: false
}, {
  id: 2022109,
  title: "\\text{\\sf 2022 TF Q9}",
  tags: ["TF", "2022", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf The approximate area under the curve } f(x) = \\sqrt{2x+1} \\text{\\;\\sf between } x = 0 \\text{\\;\\sf and } x = 4 \\text{\\;\\sf using the trapezoidal rule with} \\\\ \\text{\\sf four strips is}",
  choices: [
    { id: 'A', text: '\\displaystyle 2+\\sqrt{3}+\\sqrt{5}+\\sqrt{7}' },
    { id: 'B', text: '\\displaystyle 2+2(\\sqrt{3}+\\sqrt{5}+\\sqrt{7})' },
    { id: 'C', text: '\\displaystyle 4+2(\\sqrt{3}+\\sqrt{5}+\\sqrt{7})' },
    { id: 'D', text: '\\displaystyle 4+\\sqrt{3}+\\sqrt{5}+\\sqrt{7}' }
  ],
  solution: "A",
  explanation: "",
  videoUrl: "",
  solved: false
}, {
  id: 2022110,
  title: "\\text{\\sf 2022 TF Q10}",
  tags: ["TF", "2022", "MC"],
  type: "multiple-choice",
  equation: "\\text{\\sf A survey plans to draw conclusions based on a random sample of 1\\% of Queensland's adult population.} \\\\ \\text{\\sf To be regarded as a random sample, every}",
  choices: [
    { id: 'A', text: '\\text{adult in the population will be placed in an alphabetical list and every 100th person will be selected for} \\\\ \\text{the sample.}' },
    { id: 'B', text: '\\text{adult in the population can choose to participate until the sample size has been reached.}' },
    { id: 'C', text: '\\text{subgroup within the population will be represented in a similar proportion in the sample.}' },
    { id: 'D', text: '\\text{adult in the population will have an equal chance of being selected for the sample.}' }
  ],
  solution: "D",
  explanation: "",
  videoUrl: "",
  solved: false
}, {
  id: 2022111,
  title: "\\text{\\sf 2022 TF Q11}",
  tags: ["TF", "2022", "Written"],
  type: "written",
  marks: 5,
  equation: "\\text{\\sf Solve for } x \\text{\\;\\sf in the following.}",
  parts: [
    {
      id: 'a',
      question: "\\ln(2x) = 5",
      marks: 2,
      solution: "\\text{\\sf Let } \\ln(2x) = 5 \\text{\\sf . Then } 2x = e^5 \\text{\\sf . Therefore } x = \\frac{e^5}{2}",
      explanation: "- 1 mark for correctly using exponential to solve \n - 1 mark for final answer"
    },
    {
      id: 'b',
      question: "\\log_4(4x+16) - \\log_4(x^2-2) = 1",
      marks: 3,
      solution: "\\text{\\sf Using log properties: } \\log_4\\left(\\frac{4x+16}{x^2-2}\\right) = 1 \\text{\\sf . Then } \\frac{4x+16}{x^2-2} = 4 \\text{\\sf . Solve quadratic: } x = 2",
      explanation: "- 1 mark for using log properties correctly \n - 1 mark for converting to exponential form \n - 1 mark for solving resulting equation"
    }
  ],
  videoUrl: "",
  solved: false
}, {
  id: 2022112,
  title: "\\text{\\sf 2022 TF Q12}",
  tags: ["TF", "2022", "Written"],
  type: "written",
  marks: 3,
  equation: "\\text{\\sf The probability that a debating team wins a debate can be modelled as a Bernoulli distribution. Given that} \\\\ \\text{\\sf the probability of winning a debate is } \\frac{4}{5}\\text{\\sf .}",
  parts: [
    {
      id: 'a',
      question: "\\text{\\sf Determine the mean of this distribution.}",
      marks: 1,
      solution: "\\text{\\sf Mean } = p = \\frac{4}{5}",
      explanation: "- 1 mark for correct mean"
    },
    {
      id: 'b',
      question: "\\text{\\sf Determine the variance of this distribution.}",
      marks: 1,
      solution: "\\text{\\sf Variance } = p(1-p) = \\frac{4}{5}\\left(1-\\frac{4}{5}\\right) = \\frac{4}{25}",
      explanation: "- 1 mark for correct variance"
    },
    {
      id: 'c',
      question: "\\text{\\sf Determine the standard deviation of this distribution.}",
      marks: 1,
      solution: "\\text{\\sf Standard deviation } = \\sqrt{\\frac{4}{25}} = \\frac{2}{5}",
      explanation: "- 1 mark for correct standard deviation"
    }
  ],
  videoUrl: "",
  solved: false
}, {
  id: 2022113,
  title: "\\text{\\sf 2022 TF Q13}",
  tags: ["TF", "2022", "Written"],
  type: "written",
  marks: 9,
  equation: "\\text{\\sf Determine the derivatives of the following functions:}",
  parts: [
    {
      id: 'a',
      question: "\\text{\\sf Determine the derivative of } f(x) = 3e^{2x+1}",
      marks: 1,
      solution: "f'(x) = 6e^{2x+1}",
      explanation: "- 1 mark for correct derivative using chain rule"
    },
    {
      id: 'b',
      question: "\\text{\\sf Given that } g(x) = \\frac{\\ln(x)}{x}\\text{\\sf , determine the simplest value of } g'(e)\\text{\\sf .}",
      marks: 3,
      solution: "g'(e) = -\\frac{1}{e^2}",
      explanation: "- 1 mark for using quotient rule correctly\n- 1 mark for finding derivative\n- 1 mark for substituting x = e"
    },
    {
      id: 'c',
      question: "\\text{\\sf Determine the second derivative of } h(x) = x\\sin(x)\\text{\\sf . (Give your answer in simplest form.)}",
      marks: 5,
      solution: "h''(x) = 2\\cos(x) - x\\sin(x)",
      explanation: "- 2 marks for finding first derivative using product rule\n- 2 marks for finding second derivative\n- 1 mark for simplifying to correct form"
    }
  ],
  videoUrl: "",
  solved: false
}, {
  id: 2022114,
  title: "\\text{\\sf 2022 TF Q14}",
  tags: ["TF", "2022", "Written"],
  type: "written",
  marks: 6,
  equation: "\\text{\\sf The rate that water fills an empty vessel is given by } \\frac{dV}{dt} = 0.25e^{0.25t} \\text{\\;\\sf (in litres per hour), } 0 \\leq t \\leq 8\\ln(6)\\text{\\sf ,} \\\\ \\text{\\sf where } t \\text{\\;\\sf is time (in hours).}",
  parts: [
    {
      id: 'a',
      question: "\\text{\\sf Determine the function that represents the volume of water in the vessel (in litres).}",
      marks: 2,
      solution: "V(t) = e^{0.25t} - 1",
      explanation: "- 1 mark for integrating correctly\n- 1 mark for using initial condition V(0) = 0"
    },
    {
      id: 'b',
      question: "\\text{\\sf The vessel is full when } t = 8\\ln(6)\\text{\\sf . Determine the volume of water, to the nearest litre, the vessel can hold when full.}",
      marks: 2,
      solution: "V(8\\ln(6)) = e^{2\\ln(6)} - 1 = 36 - 1 = 35 \\text{ litres}",
      explanation: "- 1 mark for substituting t = 8ln(6)\n- 1 mark for evaluating correctly"
    },
    {
      id: 'c',
      question: "\\text{\\sf The table shows the approximate rate the water flows into the vessel at certain times.} \\\\ \\ \\\\ \\qquad \\qquad \\qquad \\qquad \\qquad \\begin{array}{|c|c|} \\hline \\rule{0pt}{2.5ex} \\sf \\large t & \\sf \\large \\frac{dV}{dt} \\rule[-1.2ex]{0pt}{0pt} \\\\ \\hline \\rule{0pt}{2.5ex} \\sf \\large 0 & \\sf \\large 0.25 \\rule[-1.2ex]{0pt}{0pt} \\\\ \\hline \\rule{0pt}{2.5ex} \\sf \\large 1 & \\sf \\large 0.32 \\rule[-1.2ex]{0pt}{0pt} \\\\ \\hline \\rule{0pt}{2.5ex} \\sf \\large 2 & \\sf \\large 0.41 \\rule[-1.2ex]{0pt}{0pt} \\\\ \\hline \\rule{0pt}{2.5ex} \\sf \\large 3 & \\sf \\large 0.53 \\rule[-1.2ex]{0pt}{0pt} \\\\ \\hline \\end{array} \\\\ \\ \\\\\\text{\\sf Use information from the table and the trapezoidal rule to determine the approximate volume of water in the vessel after three hours.}",
      marks: 2,
      solution: "\\text{Using trapezoidal rule: } V(3) = \\frac{1}{2}\\times 1 \\times (0.25 + 2(0.32 + 0.41) + 0.53) = 1.12 \\text{ litres}",
      explanation: "- 1 mark for correct trapezoidal rule setup with h = 1\n- 1 mark for correct calculation"
    }
  ],
  videoUrl: "",
  solved: false
}








] as const;
