import { useState, useEffect, use} from "react";
import {
  Droplets,
  Sun,
  Wheat,
  DoorOpen,
  DoorClosed,
  Lightbulb,
  LightbulbOff,
  Warehouse,
  Droplet,
  Apple,
  Edit,  
} from "lucide-react";
import {getDate,getTime,intervalCheck,handleAlimtStatus} from "./utils/util"

export default function App() {
  const [irrigation, setIrrigation] = useState(false); //irrigacao ON/OFF
  const [irrigarAgora,setIrrigarAgora] = useState(false); //ativacao manual irrigacao
  const [intervaloAlimentar,setIntervaloAlimentar] = useState("00:00"); //intervalo alimentacao
  const [isEditInterv,setIsEditInterv] = useState(false); //ui control - intervalo input 
  const [doorIsClosed, setDoorIsClosed] = useState(true); //porta celeiro
  const [lightOFF, setLightOFF] = useState(true); //luz celeiro
  const [lightCrrOFF, setLightCrrOFF] = useState(true); //luz corredor
  const [lightPltOFF, setLightPltOFF] = useState(true); //luz plantacao

  const [isConnected, setIsConnected] = useState(false); //status conexao arduino

  useEffect(() => {
    async function check() {
        const connected = await window.arduino.checkConnection()
        setIsConnected(connected)
    }
    check()

    window.arduino.onStatusChange((isConnected) => {
        setIsConnected(isConnected)
    })

    window.arduino.onData((data) => {
        if (data.event === "irrigacao") {
            // atualiza estados conforme o JSON recebido
            console.log(data) //Ex: { event: "irrigacao", type: "Auto", umidade1: 450, umidade2: 320 }
        }
    })

    return () => {
      window.arduino.offStatusChange()
      window.arduino.offData()
    }
}, [])


  return (
    <div className="h-screen  flex flex-col font-sans">
      {/*Top Bar */}
      <header className="h-16 bg-(--secondary-color) shadow flex items-center justify-between px-6">
        <div className="flex items-center gap-6 text-gray-700">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-yellow-500" />
            <span>{getDate()}</span>
          </div>

          {/* <div className="flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-red-500" />
            <span>28°C</span>
          </div> */}
        </div>

        <div className={`${isConnected?"text-green-600":"text-red-700"} font-semibold`}>
          {isConnected?"● Arduino Conectado":"● Arduino Desconectado"}
        </div>
      </header>

      {/* Main Layout border-red-600 border-3*/}
      <div className="flex flex-1 gap-8 justify-center items-center bg-linear-to-tr from-[#486F38] to-[#6a985b]">
        {/* Left Panel border-blue-600 border-3*/}
        <div className=" w-[50%] h-[60%] bg-(--secondary-color) rounded-2xl shadow-lg p-6 flex flex-col ">
          {/*Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Droplets className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-700">
                Irrigação
              </h2>
            </div>

            <div className="flex gap-5">
              <button
              onClick={() => setIrrigarAgora(!irrigarAgora)}
              className={`px-6 py-2 rounded-full font-medium transition bg-gray-400 text-gray-300 active:bg-[#1d7033] active:text-white`}
              >
                Irrigar
              </button>

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
            
          </div>

          {/*TABLE - Irrigation*/}          
          <div className="flex-1 overflow-auto">
            <table className="w-full text-center border-collapse">
              {/*Example DATAo */}
              <thead>
                <tr className="text-gray-500 text-sm border-b">
                  <th className="py-3 w-40">Data</th>
                  <th className=" w-40">Hora</th>
                  <th className=" w-40">Modo</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b hover:bg-amber-200">
                  <td className="py-3">{getDate(1)}</td> {/*teste da funcao getDate*/}
                  <td>{getTime()}</td> {/*teste da funcao getTime*/}
                  <td>Auto</td>
                </tr>
                <tr className="border-b hover:bg-amber-200">
                  <td className="py-3">23/02/2026</td>
                  <td>18:30</td>
                  <td>Manual</td>
                </tr>
                <tr className="hover:bg-amber-200">
                  <td className="py-3">23/02/2026</td>
                  <td>06:45</td>
                  <td>Auto</td>
                </tr>
              </tbody>
            </table>
          </div>    
        </div>

        {/*Right Panel border-yellow-600 border-3*/}
        <div className="w-[35%] flex flex-col gap-3  items-center">
          {/* Status Reservatorio 
          
          <div className="min-[1300px]:relative w-[70%] bg-(--secondary-color) shadow-md rounded-2xl p-4 justify-center flex max-[1300px]:flex-col items-center min-[1300px]:gap-8 hover:shadow-lg border-gray-400">
            <div className="min-[1300px]:absolute min-[1300px]:left-4 flex flex-col items-center text-green-600 text-sm">{<Droplet className="w-5 h-5" />} Reservatório</div>
            <span className="text-gray-700 text-md font-medium min-[1300px]:mx-auto ">Acima do Nível</span>
          </div>

          */}


          {/*Status da Porta e Luzes*/}
          <div className="min-[1300px]:relative w-[70%] bg-(--secondary-color) shadow-md rounded-2xl p-4 justify-center flex max-[1300px]:flex-col items-center min-[1300px]:gap-8 hover:shadow-lg border-gray-400">
            <div className="min-[1300px]:absolute min-[1300px]:left-4 flex flex-col items-center text-green-600 text-sm">{<Warehouse className="w-5 h-5" />} Porta/Luz</div>
            <span className="text-gray-700 text-md font-medium min-[1300px]:ml-20">{doorIsClosed?"Fechada":"Aberta"}</span>
            <span className="text-gray-700 text-md font-medium min-[1300px]:mr-auto">{lightOFF?"Desligada":"Ligada"}</span>
          </div>

          {/* Botoes Abrir/Fechar Porta border-3*/}
          <div className="w-full flex justify-center gap-10">
            <button className={
              `bg-(--secondary-color) shadow-md border-[#525252] border-2 rounded-2xl p-4 flex items-center justify-start w-30 h-12 gap-2 hover:shadow-lg transition duration-150 ease-in-out hover:cursor-pointer ${!doorIsClosed?"bg-red-800 text-white":""}`} 
              onClick={() => setDoorIsClosed(!doorIsClosed)} >

              {doorIsClosed?
                <DoorOpen className={`w-[1.3em] h-[1.3em]  ${!doorIsClosed?"text-white":"text-green-600"}`} />:
                <DoorClosed className={`w-[1.3em] h-[1.3em]  ${!doorIsClosed?"text-white":"text-green-600"}`} />
              } {doorIsClosed?"Abrir":"Fechar"}
            </button>

            <button className={
              `bg-(--secondary-color) shadow-md border-[#525252] border-2 rounded-2xl p-4 flex items-center justify-start w-30 h-12 gap-2 hover:shadow-lg transition duration-150 ease-in-out hover:cursor-pointer ${!lightOFF?"bg-red-800 text-white":""}`} 
              onClick={() => setLightOFF(!lightOFF)} >

              {lightOFF?
                <Lightbulb className={`w-5 h-5  ${!lightOFF?"text-white":"text-green-600"}`} />:
                <LightbulbOff className={`w-5 h-5  ${!lightOFF?"text-white":"text-green-600"}`} />
              } {lightOFF?"Ligar":"Desligar"}
            </button>
          </div>

          {/*timer para alimentacao, botao para configurar tempo e incluir botao para forçar alimentaçao */}
          <div className="min-[1130px]:w-full max-[1130px]:w-[80%] bg-(--secondary-color) shadow-md rounded-2xl p-4 flex max-[1130px]:flex-col items-center justify-between">
            
            <div className="flex flex-col items-center text-green-600 text-sm"><Apple className="w-5 h-5 text-green-600" />Alimentacão</div>         
            
            {!isEditInterv?
              <span className="text-gray-700 font-medium w-11 text-center">{intervaloAlimentar}</span>:
              <input className="text-gray-700 font-medium w-11 text-center bg-gray-50 border border-gray-500 rounded-sm"
              autoFocus={true}
              placeholder="00:00"
              value={intervaloAlimentar}
              onFocus={(e)=>e.target.select()}
              onBlur={(e)=>{
                let text = e.target.value;
                let correctText = intervalCheck(text,"enter");
                setIntervaloAlimentar(correctText);
                setIsEditInterv(false);
              }}  
              onChange={(e)=>{                              
                let text = e.target.value;
                let correctText = intervalCheck(text);                
                setIntervaloAlimentar(correctText);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                  setIsEditInterv(false);
                }
              }}
              />
            }
            
            <span className="text-gray-700 font-medium">{handleAlimtStatus(intervaloAlimentar)}</span> 
            
            <button className="flex gap-0.25 items-center text-green-800 p-1 rounded-md hover:cursor-pointer border hover:shadow-lg hover:bg-[#549778] hover:text-gray-100 transition duration-150 ease-in-out"
              onClick={()=>setIsEditInterv(!isEditInterv)}
            >
              {<Edit className="w-5 h-5"/>}
              Editar Intervalo
            </button>
          </div>

          <button className={
              `group bg-(--secondary-color) shadow-md border-[#525252] border-2 rounded-2xl p-4 flex items-center justify-center w-40 h-12 gap-2 hover:shadow-lg transition duration-50 ease-in-out cursor-pointer active:bg-[#2E5894] active:text-white `} 
              >

              {<Wheat className={`w-5 h-5 group-active:text-white text-green-600`} />} Alimentar
          </button>
          

          {/* Botões LUZ Corredor e Plantação */}
          <div className="w-full flex justify-center gap-10">
            <button className={
              `bg-(--secondary-color) shadow-md border-[#525252] border-2 rounded-2xl p-4 flex items-center justify-start w-40 h-20 gap-1 hover:shadow-lg transition duration-150 ease-in-out hover:cursor-pointer ${!lightCrrOFF?"bg-red-800 text-white":""}`} 
              onClick={() => setLightCrrOFF(!lightCrrOFF)} >

              {lightCrrOFF?
                <Lightbulb className={`w-6 h-6  ${!lightCrrOFF?"text-white":"text-green-600"}`} />:
                <LightbulbOff className={`w-6 h-6  ${!lightCrrOFF?"text-white":"text-green-600"}`} />
              } {lightCrrOFF?"Ligar Luz\nCorredor":"Desligar Luz\nCorredor"}
            </button>

            <button className={
              `bg-(--secondary-color) shadow-md border-[#525252] border-2 rounded-2xl p-4 flex items-center justify-start w-40 h-20 gap-1 hover:shadow-lg transition duration-150 ease-in-out hover:cursor-pointer ${!lightPltOFF?"bg-red-800 text-white":""}`} 
              onClick={() => setLightPltOFF(!lightPltOFF)} >

              {lightPltOFF?
                <Lightbulb className={`w-6 h-6  ${!lightPltOFF?"text-white":"text-green-600"}`} />:
                <LightbulbOff className={`w-6 h-6  ${!lightPltOFF?"text-white":"text-green-600"}`} />
              } {lightPltOFF?"Ligar Luz\nPlantação":"Desligar Luz\nPlantação"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}