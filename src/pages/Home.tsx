import { ArrowRightIcon } from "lucide-react";
import AnimatedShinyText from "../components/AnimatedShinyText";
import Particles from "../components/Particles";
import WordFadeIn from "../components/WordFadeIn";
import ShimmerButton from "../components/ShimmerButton";
import SparklesText from "../components/SparklesText";
import { Link } from "react-router-dom";

export const Home = () => {
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
          <WordFadeIn words="Generá tu CV de manera rápida y fácil!" />
          <h2 className="text-center text-sm py-4">
            Destacá con un currículum respaldado por la
            <strong> Universidad de Harvard</strong>
            <a href="https://www.cnbc.com/2019/07/10/an-example-of-the-perfect-resume-according-to-harvard-career-experts.html">
              <AnimatedShinyText className="group inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:cursor-pointer ml-4 rounded-full border border-black/5">
                <span>Leer nota aquí</span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </a>
          </h2>
          <div className="relative w-1/2 mx-auto text-center text-balance my-4 py-4">
            <SparklesText
              text="Generá tu currículum vitae con un modelo recomendado por la
              Universidad de Harvard en cuestión de minutos."
              sparklesCount={4}
              colors={{ first: "#525252", second: "#000" }}
              className="text-xl font-light"
            />
          </div>
          <ul className="my-4 text-sm">
            <li className="w-1/2 mx-auto border-x border-x-black flex flex-col items-center my-4">
              <span className="text-lg font-semibold">
                Investigación de Harvard
              </span>
              <span>Diseño avalado por expertos</span>
            </li>
            <li className="w-1/2 mx-auto border-x border-x-black flex flex-col items-center my-4">
              <span className="text-lg font-semibold">Fácil y rápido</span>
              <span>Completa tus datos y obtén tu CV al instante</span>
            </li>
            <li className="w-1/2 mx-auto border-x border-x-black flex flex-col items-center my-4">
              <span className="text-lg font-semibold">
                Aumenta tus oportunidades
              </span>
              <span>Presenta un CV profesional y efectivo</span>
            </li>
          </ul>
          <Link to="/generate">
            <ShimmerButton className="shadow-2xl w-1/3 mx-auto">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                Generar ahora
              </span>
            </ShimmerButton>
          </Link>
        </div>
      </section>
    </main>
  );
};
