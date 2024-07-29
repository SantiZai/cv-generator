import { jsPDF } from "jspdf";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { generatePDF } from "../lib/utils";
import Particles from "../components/Particles";
import { Input } from "../components/Input";

import PhoneInput, { getCountries, Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Education, Experience } from "../lib/interfaces";
import { ExperienceModal } from "../components/Experience";

export const Generate = () => {
  const [formInfo, setFormInfo] = useState<{
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    sociallink: string;
    image: string | ArrayBuffer | null;
    education: Education[];
    experience: Experience[];
  }>({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    sociallink: "",
    image: "",
    education: [],
    experience: [],
  });

  const [international, setInternational] = useState<boolean>(false);

  const [experience, setExperience] = useState<Experience[]>([]);

  useEffect(() => {
    setFormInfo({
      ...formInfo,
      experience,
    });
  }, [experience]);

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

  const doc = new jsPDF();

  doc.text("Hello world", 105, 10);

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
    generatePDF(formInfo);
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
              <span>Agregar experiencia</span>
              <ExperienceModal allExperience={experience} setAllExperience={setExperience} />
            </fieldset>
            {/* <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleImageChange}
            /> */}
          </form>
        </div>
      </section>
    </main>
  );
};
