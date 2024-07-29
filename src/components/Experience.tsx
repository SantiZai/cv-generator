import { ChangeEvent, useState } from "react";
import { Experience } from "../lib/interfaces";
import { Input } from "./Input";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ShimmerButton from "./ShimmerButton";

export const ExperienceModal = () => {
  const [openedModal, setOpenedModal] = useState<boolean>(false);
  const [professionalExperience, setProfessionalExperience] = useState<
    Experience[]
  >([]);
  const [experience, setExperience] = useState<Experience>({
    entity: "",
    description: "",
    startyear: 2024,
    finishyear: 2024,
    role: "",
    tasks: [],
  });

  const onOpenModal = () => setOpenedModal(true);
  const onCloseModal = () => setOpenedModal(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExperience({
      ...experience,
      [name]: value,
    });
  };

  const addExperience = (experience: Experience) => {
    setProfessionalExperience([...professionalExperience, experience]);
  };

  return (
    <div>
      <button
        type="button"
        onClick={onOpenModal}
      >
        Open modal
      </button>
      <Modal
        open={openedModal}
        onClose={onCloseModal}
        classNames={{
          modal: "w-3/4 sm:w-2/3 md:w-1/2 rounded-lg",
        }}
        center
      >
        <fieldset className="w-full flex gap-4 p-4">
          <Input
            name="entity"
            value={experience.entity}
            placeholder="Empresa"
            handleChange={handleChange}
          />
          <Input
            name="role"
            value={experience.role}
            placeholder="Rol ejercido"
            handleChange={handleChange}
          />
        </fieldset>
        <fieldset className="w-full p-4">
          <Input
            name="description"
            value={experience.description}
            placeholder="Descripción"
            handleChange={handleChange}
          />
        </fieldset>
        <fieldset className="w-full px-4 pt-4 flex justify-between gap-4">
          <fieldset className="flex gap-4 items-start">
            <Input
              type="number"
              name="startyear"
              value={experience.startyear}
              placeholder="Año de inicio"
              maxLength={4}
              handleChange={handleChange}
              className="w-1/2"
            />
            <Input
              type="number"
              name="finishyear"
              value={experience.finishyear}
              placeholder="Año de finalización"
              maxLength={4}
              handleChange={handleChange}
              className="w-1/2"
            />
          </fieldset>
          <ShimmerButton className="shadow-2xl w-1/3">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
              Agregar experiencia
            </span>
          </ShimmerButton>
        </fieldset>
      </Modal>
    </div>
  );
};
