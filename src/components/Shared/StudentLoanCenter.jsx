import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

const StudentLoanCenter = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);

  const loanCenters = [
    {
      id: 1,
      name: "National Student Loan Center",
      terms: "This loan is provided at a low interest rate with a 10-year repayment plan. Early repayment is allowed without penalty."
    },
    {
      id: 2,
      name: "University Loan Support",
      terms: "This loan is available for tuition fees only. Repayment begins one year after graduation with flexible monthly installments."
    },
    {
      id: 3,
      name: "Private Education Loan Center",
      terms: "This loan covers tuition and living expenses. Interest applies from the disbursement date. Repayment starts immediately."
    }
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Student Loan Centers</h2>

      <div className="grid gap-4">
        {loanCenters.map((loan) => (
          <div
            key={loan.id}
            className="cursor-pointer shadow-md hover:shadow-lg transition"
            onClick={() => setSelectedLoan(loan)}
          >
            <div className="p-4">
              <p className="font-semibold">{loan.name}</p>
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
                <button onClick={() => setSelectedLoan(null)}>Close</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentLoanCenter;
