import { ChangeEvent, useState } from "react";
import { Experience } from "../lib/interfaces";
import { Input } from "./Input";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ShimmerButton from "./ShimmerButton";

export const ExperienceModal = ({
  allExperience,
  setAllExperience,
}: {
  allExperience: Experience[]
  setAllExperience: (experience: Experience[]) => void;
}) => {
  const [openedModal, setOpenedModal] = useState<boolean>(false);
  const [newExperience, setNewExperience] = useState<Experience>({
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
    setNewExperience({
      ...newExperience,
      [name]: value,
    });
  };

  const addExperience = () => {
    setAllExperience([...allExperience, newExperience]);
    setNewExperience({
      entity: "",
      description: "",
      startyear: 2024,
      finishyear: 2024,
      role: "",
      tasks: [],
    });
    setOpenedModal(false);
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
        <fieldset className="w-full flex flex-col sm:flex-row gap-4 p-4">
          <Input
            name="entity"
            value={newExperience.entity}
            placeholder="Empresa"
            handleChange={handleChange}
          />
          <fieldset className="flex gap-4 items-start">
            <Input
              type="number"
              name="startyear"
              value={newExperience.startyear}
              placeholder="Inicio"
              maxLength={4}
              handleChange={handleChange}
              className="w-1/2"
            />
            <Input
              type="number"
              name="finishyear"
              value={newExperience.finishyear}
              placeholder="Finalización"
              maxLength={4}
              handleChange={handleChange}
              className="w-1/2"
            />
          </fieldset>
        </fieldset>
        <fieldset className="w-full flex gap-2 p-4">
          <Input
            name="description"
            value={newExperience.description}
            placeholder="Descripción"
            handleChange={handleChange}
          />
        </fieldset>
        <fieldset className="w-full p-4">
          <Input
            name="role"
            value={newExperience.role}
            placeholder="Puesto"
            handleChange={handleChange}
          />
        </fieldset>
        {/* TODO: agregar un input para agregar tarear realizadas o funciones cumplidas en ese trabajo */}
        <fieldset className="w-full px-4 pt-4">
          <ShimmerButton
            className="shadow-2xl w-full sm:w-auto"
            onClick={addExperience}
          >
            <span className="whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white">
              Agregar experiencia
            </span>
          </ShimmerButton>
        </fieldset>
      </Modal>
    </div>
  );
};
