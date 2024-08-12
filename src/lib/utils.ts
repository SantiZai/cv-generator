import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { jsPDF } from "jspdf";
import { Education, Experience } from "./interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateDoc = (formInfo: {
  firstname: string;
  lastname: string;
  location: string;
  description: string;
  email: string;
  phonenumber: string;
  sociallink: string;
  image: string | ArrayBuffer | null;
  education: Education[];
  experience: Experience[];
}) => {
  const {
    firstname,
    lastname,
    location,
    description,
    email,
    phonenumber,
    sociallink,
    image,
    education,
    experience,
  } = formInfo;

  const PDF = new jsPDF({ format: "a4" });

  /* 
  Personal info
   */

  PDF.setFontSize(32);
  PDF.text(`${firstname.toString()} ${lastname.toString()}`, 105, 10, {
    align: "center",
  });
  PDF.setFontSize(18);
  PDF.text(`${location.toString()} ${sociallink.toString()}`, 105, 20, {
    align: "center",
    maxWidth: 190,
  });
  PDF.text(`${email.toString()} ${phonenumber.toString()}`, 105, 30, {
    align: "center",
    maxWidth: 190,
  });

  PDF.line(10, 35, 200, 35);
  PDF.text(description.toString(), 10, 45, { maxWidth: 190 });

  /* 
  Professional experience
   */

  PDF.setFontSize(20)
  PDF.text("Experiencia laboral", 10, 78)
  PDF.line(10, 80, 200, 80);

  /* 
  Education
  */

  return PDF;
};
