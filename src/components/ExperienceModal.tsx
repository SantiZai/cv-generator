import { ChangeEvent, useState } from "react";
import { Experience } from "../lib/interfaces";
import { Input } from "./Input";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ShimmerButton from "./ShimmerButton";
import { TrashIcon } from "lucide-react";

export const ExperienceModal = ({
  allExperience,
  setAllExperience,
  className,
}: {
  allExperience: Experience[];
  setAllExperience: (experience: Experience[]) => void;
  className?: string;
}) => {
  const [openedModal, setOpenedModal] = useState<boolean>(false);
  const [newExperience, setNewExperience] = useState<Experience>({
    entity: "",
    ubication: "",
    startyear: 2024,
    finishyear: 2024,
    role: "",
    tasks: [] as string[],
  });
  const [taskInput, setTaskInput] = useState<string>("");

  const onOpenModal = () => setOpenedModal(true);
  const onCloseModal = () => setOpenedModal(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExperience(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTaskInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  const addTask = () => {
    setNewExperience(prevState => ({
      ...prevState,
      tasks: [...prevState.tasks, taskInput]
    }));
    setTaskInput('');
  };

  const removeTask = (index: number) => {
    setNewExperience(prevState => ({
      ...prevState,
      tasks: prevState.tasks.filter((_, i) => i !== index)
    }));
  };

  const addExperience = () => {
    setAllExperience([...allExperience, newExperience]);
    setNewExperience({
      entity: "",
      ubication: "",
      startyear: 2024,
      finishyear: 2024,
      role: "",
      tasks: [],
    });
    setOpenedModal(false);
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={onOpenModal}
        className="w-full border border-black rounded-md py-2 hover:border-gray-700"
      >
        Agregar experiencia
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
        <fieldset className="w-full flex p-4">
          <Input
            name="role"
            value={newExperience.role}
            placeholder="Puesto"
            handleChange={handleChange}
          />
        </fieldset>
        <fieldset className="w-full flex flex-col gap-2 p-4">
          <fieldset className="w-full flex flex-col sm:flex-row gap-2 items-start">
            <Input
              type="text"
              name="task"
              value={taskInput}
              placeholder="Tarea"
              handleChange={handleTaskInputChange}
              className="w-1/2"
            />
            <ShimmerButton
              className="w-full sm:w-1/2 shadow-2xl"
              onClick={addTask}
            >
              Agregar tarea
            </ShimmerButton>
          </fieldset>
          {newExperience.tasks.map((task, i) => (
            <fieldset className="w-full flex gap-2 items-start mt-4 sm:mt-0" key={i}>
              <Input
                type="text"
                name="task"
                value={task}
                placeholder="Tarea"
                handleChange={handleChange}
                className="w-1/2"
                disabled={true}
              />
              <button onClick={() => removeTask(i)}>
                <TrashIcon className="w-5 h-5 text-gray-500 hover:text-red-500" />
              </button>
            </fieldset>
          ))}
        </fieldset>
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
