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

  const PDF = new jsPDF({format: "a4"});

  PDF.setFontSize(32);
  PDF.text(`${firstname.toString()} ${lastname.toString()}`, 105, 10, {
    align: "center",
  });
  PDF.setFontSize(18);
  PDF.text(
    `${location.toString()} ° ${sociallink.toString()} ° ${phonenumber.toString()} ° ${email.toString()}`,
    105,
    20,
    { align: "center" }
  );

  PDF.line(10, 25, 200, 25)

  PDF.text(description.toString(), 10, 35, {maxWidth: 190})

  PDF.line(10, 50, 200, 50)

  return PDF;
};
