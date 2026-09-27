import { computeAverage, EnrollmentStatus, type Enrollee } from "./gradeUtil.js";
import getStatus from "./gradeUtil.js";


export interface EligibilityReport {
    name: string;
    average: number;
    status: EnrollmentStatus
    remarks?: string;
}

const enrollees: Enrollee[] = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
]


function getEnrollees(): Promise<Enrollee[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(enrollees);
        }, 1000);
    });
    }


function groupBy<T>(items: T[], keyFn: (item: T) => string): Record<string, T[]> {
    const result: Record<string, T[]> = {};
    for (const item of items) {
        const key = keyFn(item);
        if (!result[key]) {
            result[key] = [];

        } result[key].push(item);

    } 
    return result;
}




async function main() {
  console.log("=== MAIN STARTED ===");
  try {
    const students = await getEnrollees();
    console.log(students);

    let batchId: string | number;
    batchId = Math.random() > 0.5 ? 1024 : "BATCH-1024";

    if (typeof batchId === "string") {
      console.log(batchId.toUpperCase());
    } else {
      console.log(batchId.toFixed(2));
    }

    const reports: EligibilityReport[] = students.map((student) => {
      const average = computeAverage(student.prelim, student.midterm, student.final);
      const status = getStatus(average);

      const report: EligibilityReport = {
        name: student.name,
        average,
        status,
      };

      if (status === EnrollmentStatus.Probation) {
        report.remarks = "Needs consultation";
      }

      return report;
    });

    console.log("=== REPORTS BUILT ===", reports); // moved here, outside .map()
    const grouped = groupBy(reports, (report) => report.status);
    console.log("=== GROUPED BY STATUS ===", grouped);


    const classAverage = reports.reduce((sum, report) => sum + report.average, 0) / reports.length;
    console.log("=== CLASS AVERAGE ===", classAverage);

    console.log("=== IT313 Enrollment Eligibility Report (TypeScript) ===");

    for (const report of reports) {
        const line = report.remarks
  ? `${report.name} - Average: ${report.average.toFixed(2)} - ${report.status} - ${report.remarks}`
  : `${report.name} - Average: ${report.average.toFixed(2)} - ${report.status}`;
console.log(line);
    }

    const passingCount = grouped[EnrollmentStatus.Passing]?.length ?? 0;

    console.log(`Class Average: ${classAverage.toFixed(2)}`);
    console.log(`Passing: ${passingCount} / ${reports.length}`);

    

  } catch (error) {
    console.error("Failed to fetch enrollees:", error);
  }
}

main();




