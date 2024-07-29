import { jsPDF } from "jspdf";
import { ChangeEvent, FormEvent, useState } from "react";
import { generatePDF } from "../lib/utils";
import Particles from "../components/Particles";

export const Generate = () => {
  const [formInfo, setFormInfo] = useState<{
    firstname: string;
    lastname: string;
  }>({
    firstname: "",
    lastname: "",
  });

  const [image, setImage] = useState<string | ArrayBuffer | null>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
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
            className="flex flex-col"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Nombre"
              name="firstname"
              value={formInfo.firstname}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Apellido"
              name="lastname"
              value={formInfo.lastname}
              onChange={handleChange}
            />
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
