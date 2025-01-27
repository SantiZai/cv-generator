import { ChangeEvent, useState } from "react";
import { Education } from "../lib/interfaces";
import { Input } from "./Input";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ShimmerButton from "./ShimmerButton";

export const EducationModal = ({
  allEducation,
  setAllEducation,
  className,
}: {
  allEducation: Education[];
  setAllEducation: (education: Education[]) => void;
  className?: string;
}) => {
  const [openedModal, setOpenedModal] = useState<boolean>(false);
  const [newEducation, setNewEducation] = useState<Education>({
    entity: "",
    degree: "",
    startyear: 2024,
    finishyear: 2024,
    learnings: [] as string[],
  });
  const [learningInput, setLearningInput] = useState<string>("");

  const onOpenModal = () => setOpenedModal(true);
  const onCloseModal = () => setOpenedModal(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEducation(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLearningInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLearningInput(e.target.value);
  };

  const addLearning = () => {
    setNewEducation(prevState => ({
      ...prevState,
      learnings: [...prevState.learnings, learningInput]
    }));
    setLearningInput('');
  };

  const removeLearning = (index: number) => {
    setNewEducation(prevState => ({
      ...prevState,
      learnings: prevState.learnings.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setAllEducation([...allEducation, newEducation]);
    setNewEducation({
      entity: "",
      degree: "",
      startyear: 2024,
      finishyear: 2024,
      learnings: [],
    });
    setOpenedModal(false);
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={onOpenModal}
        className="w-full"
      >
        Agregar educación
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
            value={newEducation.entity}
            placeholder="Institución"
            handleChange={handleChange}
          />
          <fieldset className="flex gap-4 items-start">
            <Input
              type="number"
              name="startyear"
              value={newEducation.startyear}
              placeholder="Inicio"
              maxLength={4}
              handleChange={handleChange}
              className="w-1/2"
            />
            <Input
              type="number"
              name="finishyear"
              value={newEducation.finishyear}
              placeholder="Finalización"
              maxLength={4}
              handleChange={handleChange}
              className="w-1/2"
            />
          </fieldset>
        </fieldset>
        <fieldset className="w-full flex gap-2 p-4">
          <Input
            name="degree"
            value={newEducation.degree}
            placeholder="Título"
            handleChange={handleChange}
          />
        </fieldset>
        <fieldset className="w-full flex flex-col gap-2 p-4">
          <fieldset className="w-full flex gap-2 items-start">
            <Input
              type="text"
              name="learning"
              value={learningInput}
              placeholder="Aprendizaje"
              handleChange={handleLearningInputChange}
              className="w-1/2"
            />
            <ShimmerButton
              className="w-1/2 shadow-2xl"
              onClick={addLearning}
            >
              Agregar aprendizaje
            </ShimmerButton>
          </fieldset>
          {newEducation.learnings.map((learning, i) => (
            <fieldset className="w-full flex gap-2 items-start" key={i}>
              <Input
                type="text"
                name="learning"
                value={learning}
                placeholder="Aprendizaje"
                handleChange={handleChange}
                className="w-1/2"
                disabled={true}
              />
              <ShimmerButton
                className="w-1/2 shadow-2xl"
                onClick={() => removeLearning(i)}
              >
                <span className="whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white">
                  Eliminar aprendizaje
                </span>
              </ShimmerButton>
            </fieldset>
          ))}
        </fieldset>
        <fieldset className="w-full px-4 pt-4">
          <ShimmerButton
            className="shadow-2xl w-full sm:w-auto"
            onClick={addEducation}
          >
            <span className="whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white">
              Agregar educación
            </span>
          </ShimmerButton>
        </fieldset>
      </Modal>
    </div>
  );
};