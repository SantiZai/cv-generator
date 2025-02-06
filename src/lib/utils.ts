import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { jsPDF } from 'jspdf';
import timesRoman from "/times-new-normal.ttf"

import { Education, Experience } from './interfaces';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateDoc = (formInfo: {
  firstname: string;
  lastname: string;
  location: string;
  email: string;
  phonenumber: string;
  sociallink: string;
  education: Education[];
  experience: Experience[];
}) => {
  const {
    firstname,
    lastname,
    location,
    email,
    phonenumber,
    sociallink,
    education,
    experience,
  } = formInfo;

  const PDF = new jsPDF({ format: 'a4' });

  PDF.addFont(timesRoman, "Times", "normal")
  PDF.setFont("Times")

  /* 
  Personal info
  */

  // TODO: center the name
  // TODO: increase the font size

  PDF.setFontSize(24);
  // centrar el nombre y apellido en el medio de la hoja
  PDF.text(`${firstname} ${lastname}`, 105, 10, {
    align: 'center',
    maxWidth: 190,
  });
  PDF.setFontSize(18);
  PDF.text(`${location.toString()} ${sociallink.toString()}`, 105, 20, {
    align: 'center',
    maxWidth: 190,
  });
  PDF.text(`${email.toString()} ${phonenumber.toString()}`, 105, 30, {
    align: 'center',
    maxWidth: 190,
  });

  PDF.line(10, 35, 200, 35);

  let currentY = 45; // posición inicial Y

  /* 
  Professional experience
  */
  if (experience.length > 0) {
    PDF.setFontSize(20);
    // centrar el texto según el tamaño de la letra
    PDF.text('EXPERIENCIA PROFESIONAL', 105, currentY, {
      align: 'center',
      maxWidth: 190,
    });

    currentY += 10; // agregar espacio después del título

    experience.forEach((exp: Experience) => {
      PDF.setFontSize(18);
      PDF.text(exp.entity, 10, currentY);
      PDF.text(`${exp.startyear} - ${exp.finishyear}`, 200, currentY, {
        align: 'right',
        maxWidth: 190,
      });

      PDF.setFontSize(14);
      PDF.text(exp.role, 10, currentY + 10);

      const taskY = currentY + 20;

      PDF.setFontSize(12);
      exp.tasks.forEach((task: string, j: number) => {
        const taskLineY = taskY + j * 5;
        PDF.circle(12, taskLineY - 1, 1, 'F'); // Ajusta la posición Y del círculo
        PDF.text(task, 20, taskLineY);
      });

      // Calcular la altura total de la sección actual
      const tasksHeight = exp.tasks.length * 10;
      const sectionHeight = 30 + tasksHeight;

      // Actualizar la posición Y para la siguiente sección
      currentY += sectionHeight - 15; // agregar un margen entre secciones
    });
  }

  /* 
  Education
  */
  if (education.length > 0) {
    currentY += 10;
    PDF.setFontSize(20);
    // centrar el texto según el tamaño de la letra
    PDF.text('EDUCACIÓN', 105, currentY, { align: 'center', maxWidth: 190 });

    currentY += 10; // posición inicial Y para educación

    education.forEach((edu: Education) => {
      PDF.setFontSize(18);
      PDF.text(edu.entity, 10, currentY);
      PDF.text(`${edu.startyear} - ${edu.finishyear}`, 200, currentY, {
        align: 'right',
        maxWidth: 190,
      });

      PDF.setFontSize(14);
      PDF.text(edu.degree, 10, currentY + 10);

      const learningY = currentY + 20;

      PDF.setFontSize(12);
      edu.learnings.forEach((learning: string, j: number) => {
        const learningLineY = learningY + j * 5;
        PDF.circle(12, learningLineY - 1, 1, 'F'); // Ajusta la posición Y del círculo
        PDF.text(learning, 20, learningLineY);
      });

      // Calcular la altura total de la sección actual
      const learningsHeight = edu.learnings.length * 10;
      const eduSectionHeight = 30 + learningsHeight;

      // Actualizar la posición Y para la siguiente sección
      currentY += eduSectionHeight - 15; // agregar un margen entre secciones
    });
  }

  return PDF;
};
