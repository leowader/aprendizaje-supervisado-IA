import React from "react";
import { Button, Dialog, DialogPanel } from "@tremor/react";
import Red from "./Red";
import { useConfigStorage } from "../context/store";
const DialogRed = () => {
  const entradas = useConfigStorage((state) => state.numEntradas);
  const salidas = useConfigStorage((state) => state.numSalidas);
  const numCapas = useConfigStorage((state) => state.numeroCapas);
  console.log("NUMERO CAPSA", numCapas);

  const capa1 = useConfigStorage((state) => state.numCapa1);
  const capa2 = useConfigStorage((state) => state.numCapa2);
  const capa3 = useConfigStorage((state) => state.numCapa3);
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="flex justify-center">
      <button
        className="flex items-center justify-center text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br  focus:outline-none    font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={() => setIsOpen(true)}
      >
        Ver Red Neuronal Artificial
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        static={true}
        className="z-[100] "
      >
        <DialogPanel className="">
          <Red
            entradas={entradas}
            numcapas={+numCapas}
            salidas={salidas}
            numcapa2={capa2}
            numCapas3={capa3}
            nuevoConjuntoEntradas={capa1}
          ></Red>
          <Button
            variant="light"
            className="mx-auto flex items-center"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default DialogRed;
