let bluetoothDevice;
let characteristic;

document.getElementById('connect').addEventListener('click', async () => {
  try {
    bluetoothDevice = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['00001101-0000-1000-8000-00805f9b34fb'] // UUID for Serial Port Service
    });

    const server = await bluetoothDevice.gatt.connect();
    const service = await server.getPrimaryService('00001101-0000-1000-8000-00805f9b34fb');
    characteristic = await service.getCharacteristic('00001101-0000-1000-8000-00805f9b34fb');

    log('Connected to Bluetooth Device');
  } catch (error) {
    log('Error: ' + error);
  }
});

document.getElementById('send').addEventListener('click', async () => {
  const message = document.getElementById('message').value;
  if (characteristic) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    await characteristic.writeValue(data);
    log('Sent: ' + message);
  } else {
    log('No Bluetooth device connected');
  }
});

function log(data) {
  const logElement = document.getElementById('log');
  logElement.textContent += data + '\n';
}