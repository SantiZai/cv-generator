import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { jsPDF } from "jspdf";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePDF = (info: { firstname: string; lastname: string }) => {
  const doc = new jsPDF();

  doc.setFontSize(24)
  doc.text(info.firstname, 10, 10)
  doc.text(info.lastname, 10, 20)

  doc.save("test.pdf")
};
