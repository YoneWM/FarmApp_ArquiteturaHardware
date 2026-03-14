import { useState } from "react";
import {
  Droplets,
  Sun,
  Thermometer,
  DoorOpen,
  DoorClosed,
  Lightbulb,
  Warehouse,
  Droplet,
  Apple,
  Edit,  
} from "lucide-react";

export default function App() {
  const [irrigation, setIrrigation] = useState(false);
  const [doorIsClosed, setDoorIsClosed] = useState(true);

  return (
    <div className="h-screen  flex flex-col font-sans">
      {/*Top Bar */}
      <header className="h-16 bg-(--secondary-color) shadow flex items-center justify-between px-6">
        <div className="flex items-center gap-6 text-gray-700">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-yellow-500" />
            <span>24 Feb 2026</span>
          </div>

          {/* <div className="flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-red-500" />
            <span>28°C</span>
          </div> */}
        </div>

        <div className="text-green-600 font-semibold">
          ● Arduino Conectado
        </div>
      </header>

      {/* Main Layout border-red-600 border-3*/}
      <div className="flex flex-1 p-6 gap-8 justify-center bg-linear-to-tr from-[#486F38] to-[#6a985b]">
        {/* Left Panel border-blue-600 border-3*/}
        <div className="mt-20 w-[50%] h-[60%] bg-(--secondary-color) rounded-2xl shadow-lg p-6 flex flex-col">
          {/*Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Droplets className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-700">
                Irrigação
              </h2>
            </div>

            <button
              onClick={() => setIrrigation(!irrigation)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                irrigation
                  ? "bg-[#2E5894] text-white"
                  : "bg-gray-400 text-gray-300"
              }`}
            >
              {irrigation ? "ON" : "OFF"}
            </button>
          </div>

          {/*TABLE - Irrigation*/}          
          <div className="flex-1 overflow-auto">
            <table className="w-full text-center border-collapse">
              {/*Example DATAo */}
              <thead>
                <tr className="text-gray-500 text-sm border-b">
                  <th className="py-3 w-40">Data</th>
                  <th className=" w-40">Hora</th>
                  <th className=" w-40">Duração</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b hover:bg-amber-200">
                  <td className="py-3">24/02/2026</td>
                  <td>08:00</td>
                  <td>15 min</td>
                </tr>
                <tr className="border-b hover:bg-amber-200">
                  <td className="py-3">23/02/2026</td>
                  <td>18:30</td>
                  <td>10 min</td>
                </tr>
                <tr className="hover:bg-amber-200">
                  <td className="py-3">23/02/2026</td>
                  <td>06:45</td>
                  <td>12 min</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/*Right Panel border-yellow-600 border-3*/}
        <div className="mt-20 w-[35%] flex flex-col gap-4  items-center">
          {/* Status Reservatorio 
          
          <div className="min-[1300px]:relative w-[70%] bg-(--secondary-color) shadow-md rounded-2xl p-4 justify-center flex max-[1300px]:flex-col items-center min-[1300px]:gap-8 hover:shadow-lg border-gray-400">
            <div className="min-[1300px]:absolute min-[1300px]:left-4 flex flex-col items-center text-green-600 text-sm">{<Droplet className="w-5 h-5" />} Reservatório</div>
            <span className="text-gray-700 text-md font-medium min-[1300px]:mx-auto ">Acima do Nível</span>
          </div>

          */}
          

          {/*Status da Porta e Luzes*/}
          <div className="min-[1300px]:relative w-[70%] bg-(--secondary-color) shadow-md rounded-2xl p-4 justify-center flex max-[1300px]:flex-col items-center min-[1300px]:gap-8 hover:shadow-lg border-gray-400">
            <div className="min-[1300px]:absolute min-[1300px]:left-4 flex flex-col items-center text-green-600 text-sm">{<Warehouse className="w-5 h-5" />} Porta/Luz</div>
            <span className="text-gray-700 text-md font-medium min-[1300px]:ml-auto">{}Fechada</span>
            <span className="text-gray-700 text-md font-medium min-[1300px]:mr-auto">{}Ligada</span>
          </div>

          {/* Botoes Abrir/Fechar Porta border-3*/}
          <div className="w-full flex justify-center gap-10">
            <button className={
              `bg-(--secondary-color) shadow-md rounded-2xl p-4 flex items-center justify-start w-30 gap-2 hover:shadow-lg transition duration-250 ease-in-out ${!doorIsClosed?"bg-gray-400 text-gray-300":" hover:cursor-pointer "}`} 
              onClick={() => setDoorIsClosed(!doorIsClosed)} disabled={doorIsClosed?false:true}>

              {<DoorOpen className={`w-5 h-5  ${!doorIsClosed?"text-gray-300":"text-green-600"}`} />} Abrir

            </button>
            <button className={
              `bg-(--secondary-color) shadow-md rounded-2xl p-4 flex items-center justify-start w-30 gap-2 hover:shadow-lg transition duration-250 ease-in-out ${doorIsClosed?"bg-gray-400 text-gray-300":" hover:cursor-pointer "}`} 
              onClick={() => setDoorIsClosed(!doorIsClosed)} disabled={doorIsClosed?true:false}>

              {<DoorClosed className={`w-5 h-5  ${doorIsClosed?"text-gray-300":"text-green-600"}`} />} Fechar

            </button>
          </div>

          {/*timer para alimentacao, botao para configurar tempo e incluir botao para forçar alimentaçao */}
          <div className="min-[1130px]:w-full max-[1130px]:w-[80%] bg-(--secondary-color) shadow-md rounded-2xl p-4 flex max-[1130px]:flex-col items-center justify-between">
            
            <div className="flex flex-col items-center text-green-600 text-sm"><Apple className="w-5 h-5 text-green-600" />Alimentacão</div>         
            
            <span className="text-gray-700 font-medium ">00:00</span>
            <span className="text-gray-700 font-medium">intervalo</span>   
            
            <button className="flex gap-0.25 items-center text-green-800 p-1 rounded-md hover:cursor-pointer border hover:shadow-lg hover:bg-[#549778] hover:text-gray-100 transition duration-250 ease-in-out">
              {<Edit className="w-5 h-5"/>}
              Editar Intervalo
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}