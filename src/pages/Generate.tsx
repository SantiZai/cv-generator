import { jsPDF } from "jspdf";
import { ChangeEvent, FormEvent, useState } from "react";
import { generatePDF } from "../lib/utils";
import Particles from "../components/Particles";
import { Input } from "../components/Input";
import IntlTelInput, { CountryData } from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

interface Education {
  entity: string;
  title: string;
  description: string;
  startYear: number;
  finishYear: number;
}

interface Experience {
  entity: string;
  title: string;
  description: string;
  startYear: number;
  finishYear: number;
  role: string;
  tasks: [];
}

export const Generate = () => {
  const [formInfo, setFormInfo] = useState<{
    firstname: string;
    lastname: string;
    email: string;
    areacode: string;
    phonenumber: string;
    sociallink: string;
    image: string | ArrayBuffer | null;
    education: Education[];
    experience: Experience[];
  }>({
    firstname: "",
    lastname: "",
    email: "",
    areacode: "+54",
    phonenumber: "",
    sociallink: "",
    image: "",
    education: [],
    experience: [],
  });

  const [international, setInternational] = useState<boolean>(false);

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

  const handlePhoneNumberChange = (
    isValid: boolean,
    rawValue: string,
    countryData: CountryData,
    formattedValue: string,
    extension: string
  ) => {
    setFormInfo({
      ...formInfo,
      areacode: `+${countryData.dialCode}`,
      phonenumber: rawValue
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
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <fieldset className="w-full flex gap-2">
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
            <fieldset>
              <Input
                value={formInfo.email}
                placeholder="Email"
                name="email"
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
              {international ? (
                <fieldset className="w-auto flex gap-2">
                  <IntlTelInput
                    value={formInfo.phonenumber}
                    preferredCountries={["ar"]}
                    onPhoneNumberChange={handlePhoneNumberChange}
                  />
                </fieldset>
              ) : (
                <>
                  <IntlTelInput
                    value={formInfo.phonenumber}
                    preferredCountries={["ar"]}
                    allowDropdown={false}
                    onPhoneNumberChange={handlePhoneNumberChange}
                  />
                </>
              )}
            </fieldset>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </form>
        </div>
      </section>
    </main>
  );
};
