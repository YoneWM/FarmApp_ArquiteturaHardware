

export async function checkConnection() {
  return await window.arduino.checkConnection();
}

export async function sendCommand(command) {
  const isConnected = await checkConnection();

  if (!isConnected) {
    console.error("Arduino não conectado!");
    return false;
  }

  // logica de inviar comando
  return true;
}