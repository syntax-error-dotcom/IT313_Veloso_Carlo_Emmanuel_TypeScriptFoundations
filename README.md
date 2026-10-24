IT313 Enrollment Eligibility Checker (TypeScript)
Laboratory 3 – IT 313 Mobile Programming: TypeScript Foundations for React Native

In laboratory 2, we created a JavaScript registrar utility that computes enrolle's average (by adding prelim, midterm and finals) and 
decides if they are passing or probation, similarly to our last lab. the difference is, is that every value, function and data shape 
is now explicitly typed, and a status is an enum instead of raw string.

gradeUtil.js - Module with the Enrollee interface, EnrollmentStatus enum, named export computeAverage, and default export getStatus\
index.ts - this is the main script where it has the  EligibilityReport interface, async fetch, union type, generic groupBy, and the printed report

note: before I ran perfectly I changed some configuration because somehow node wasnt working for me
tsconfig.json	TypeScript config with "strict": true


How to Run
npm install
npx tsc --noEmit
npx tsx index.ts



