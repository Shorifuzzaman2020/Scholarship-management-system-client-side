import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How do I apply for a scholarship?",
    answer:
      "You can apply directly through our website by filling out the application form under the 'Scholarships' section. Make sure you meet all the eligibility criteria.",
  },
  {
    question: "Is there any application fee?",
    answer:
      "Some scholarships require a small application fee. Please check the details on the scholarship page before applying.",
  },
  {
    question: "Can I apply for more than one scholarship?",
    answer:
      "Yes, you can apply for multiple scholarships as long as you meet the eligibility requirements for each.",
  },
  {
    question: "Do I need IELTS or TOEFL?",
    answer:
      "Some universities require IELTS/TOEFL, but many also accept Medium of Instruction (MOI) letters. Check specific scholarship requirements.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-8">📌 Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-green-300 rounded-lg shadow-sm bg-white">
            <button
              onClick={() => toggle(index)}
              className="flex justify-between items-center w-full px-6 py-4 text-left text-green-700 font-medium focus:outline-none"
            >
              <span>{faq.question}</span>
              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600 animate-fadeIn">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
