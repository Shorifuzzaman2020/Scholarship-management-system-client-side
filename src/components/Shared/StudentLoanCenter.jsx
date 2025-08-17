import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StudentLoanCenter = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);

  const loanCenters = [
    {
      id: 1,
      name: "National Student Loan Center",
      terms:
        "This loan is provided at a low interest rate with a 10-year repayment plan. Early repayment is allowed without penalty."
    },
    {
      id: 2,
      name: "University Loan Support",
      terms:
        "This loan is available for tuition fees only. Repayment begins one year after graduation with flexible monthly installments."
    },
    {
      id: 3,
      name: "Private Education Loan Center",
      terms:
        "This loan covers tuition and living expenses. Interest applies from the disbursement date. Repayment starts immediately."
    },
    {
      id: 4,
      name: "Government Education Assistance",
      terms:
        "This loan is subsidized by the government. Interest is waived during study years, and repayment begins two years after graduation."
    },
    {
      id: 5,
      name: "International Student Loan Program",
      terms:
        "Designed for students studying abroad. Covers tuition and accommodation expenses with a flexible repayment scheme."
    },
    {
      id: 6,
      name: "Community Bank Student Loan",
      terms:
        "Local bank loan with reduced interest rates for community residents. Parents may act as guarantors."
    },
    {
      id: 7,
      name: "Tech Scholars Loan",
      terms:
        "Special loan for students in STEM fields. Includes scholarship opportunities and internship support."
    },
    {
      id: 8,
      name: "Education Support Foundation",
      terms:
        "Non-profit foundation offering interest-free loans for underprivileged students. Repayment begins after securing employment."
    }
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Student Loan Centers
      </h2>

      <div className="grid gap-4">
        {loanCenters.map((loan) => (
          <div
            key={loan.id}
            className="cursor-pointer shadow-md hover:shadow-lg transition rounded-lg bg-white"
            onClick={() => setSelectedLoan(loan)}
          >
            <div className="p-4">
              <p className="font-semibold text-gray-800">{loan.name}</p>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedLoan && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full">
              <h3 className="text-xl font-bold mb-3">{selectedLoan.name}</h3>
              <p className="text-gray-700 mb-6">{selectedLoan.terms}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedLoan(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentLoanCenter;
