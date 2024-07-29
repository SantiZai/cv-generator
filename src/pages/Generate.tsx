import { jsPDF } from "jspdf";
import { ChangeEvent, FormEvent, useState } from "react";
import { generatePDF } from "../lib/utils";
import Particles from "../components/Particles";
import { Input } from "../components/Input";

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
    areacode: "+549",
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    generatePDF(formInfo);
  };

  return (
    //TODO: agregar un check por si el cv es para uso internacional
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
              <input
                type="checkbox"
                name="international"
                onChange={() => setInternational(!international)}
              />
              {/* international ? (
                  <>
                  <Input />
                  <Input />
                  </>
                ) : () */}
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
