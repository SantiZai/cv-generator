import { jsPDF } from "jspdf";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { generateDoc } from "../lib/utils";
import Particles from "../components/Particles";
import { Input } from "../components/Input";

import PhoneInput, { getCountries, Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Education, Experience } from "../lib/interfaces";
import { ExperienceModal } from "../components/Experience";
import ShimmerButton from "../components/ShimmerButton";

interface FormInfo {
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
}

export const Generate = () => {
  const [formInfo, setFormInfo] = useState<FormInfo>({
    firstname: "",
    lastname: "",
    location: "",
    description: "",
    email: "",
    phonenumber: "",
    sociallink: "",
    image: "",
    education: [],
    experience: [],
  });

  const [international, setInternational] = useState<boolean>(false);

  const [experience, setExperience] = useState<Experience[]>([]);

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const [submitError, setSubmitError] = useState<string>("");

  const [embedSrc, setEmbedSrc] = useState<Blob | null>(null);

  const [doc, setDoc] = useState<jsPDF>(new jsPDF());

  useEffect(() => {
    setFormInfo({
      ...formInfo,
      experience,
    });
  }, [experience]);

  useEffect(() => {
    const { firstname, lastname, email, phonenumber, sociallink } = formInfo;
    if (firstname && lastname && email && phonenumber && sociallink) {
      setButtonDisabled(false);
      setSubmitError("");
    } else {
      setButtonDisabled(true);
    }
  }, [formInfo]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormInfo({
        ...formInfo,
        image: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
  };

  const handlePhoneNumberChange = (value: Value) => {
    console.log(value);
    setFormInfo({
      ...formInfo,
      phonenumber: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (buttonDisabled) {
      setSubmitError("Todos los campos son requeridos");
    } else {
      setSubmitError("");
      const PDFGenerated = generateDoc(formInfo);
      setDoc(PDFGenerated);
      setEmbedSrc(PDFGenerated.output("blob"));
    }
  };

  return (
    <main className="min-h-screen w-full text-lg">
      <section className="relative w-1/2 min-h-screen mx-auto grid place-content-center">
        <Particles
          quantity={100}
          ease={80}
          color="black"
          className="absolute inset-0"
        />
        <div className="absolute w-full h-full grid place-content-center">
          <form
            className="w-3/4 sm:w-full mx-auto flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <fieldset className="sm:w-full flex flex-col sm:flex-row gap-2">
              <Input
                value={formInfo.lastname}
                placeholder="Apellido/s"
                name="lastname"
                handleChange={handleChange}
              />
              <Input
                value={formInfo.firstname}
                placeholder="Nombre/s"
                name="firstname"
                handleChange={handleChange}
              />
            </fieldset>
            <fieldset className="w-full">
              <Input
                value={formInfo.description}
                placeholder="Descripción"
                name="description"
                handleChange={handleChange}
                maxLength={274}
              />
            </fieldset>
            <fieldset className="w-full flex gap-2">
              <Input
                type="email"
                value={formInfo.email}
                placeholder="Email"
                name="email"
                handleChange={handleChange}
              />
              <Input
                value={formInfo.sociallink}
                placeholder="LinkedIn"
                name="sociallink"
                handleChange={handleChange}
              />
            </fieldset>
            <fieldset className="w-full flex gap-2">
              <span>Internacional?</span>
              <label className="relative inline-block h-8 w-14">
                <input
                  type="checkbox"
                  name="international"
                  className="opacity-0 h-full w-full peer"
                  onChange={() => setInternational(!international)}
                />
                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-slate-300 transition-all duration-300 rounded-2xl before:absolute before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-white before:transition-all before:duration-300 before:rounded-full peer-checked:bg-slate-600 peer-checked:before:translate-x-6"></span>
              </label>
              <PhoneInput
                key={international ? "International" : "Local"}
                value={formInfo.phonenumber}
                onChange={handlePhoneNumberChange}
                defaultCountry="AR"
                countries={international ? getCountries() : ["AR"]}
                className="border-b border-gray-300 focus-within:border-gray-500 outline-none transition-all"
              />
            </fieldset>
            <fieldset className="w-full flex gap-2">
              <div className="w-1/2">
                <Input
                  value={formInfo.location}
                  placeholder="País y ciudad"
                  name="location"
                  handleChange={handleChange}
                />
              </div>
              <ExperienceModal
                allExperience={experience}
                setAllExperience={setExperience}
                className="w-1/2"
              />
            </fieldset>
            {/* <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleImageChange}
            /> */}
            <fieldset className="w-full flex flex-col gap-2">
              {submitError && (
                <span className="text-red-500 text-sm">{submitError}</span>
              )}
              <ShimmerButton
                className="shadow-2xl w-full sm:w-auto"
                type="submit"
              >
                <span className="whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white">
                  Generar CV
                </span>
              </ShimmerButton>
            </fieldset>
          </form>
          <embed
            className="w-full h-auto"
            type="application/pdf"
            src={embedSrc ? URL.createObjectURL(embedSrc) : ""}
          />
        </div>
      </section>
    </main>
  );
};
