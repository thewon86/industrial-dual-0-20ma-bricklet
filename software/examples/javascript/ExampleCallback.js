var Tinkerforge = require('tinkerforge');

var HOST = 'localhost';
var PORT = 4223;
var UID = 'ftn'; // Change to your UID

var ipcon = new Tinkerforge.IPConnection(); // Create IP connection
var dual020 = new Tinkerforge.BrickletIndustrialDual020mA(UID, ipcon); // Create device object

ipcon.connect(HOST, PORT,
    function(error) {
        console.log('Error: '+error);
    }
); // Connect to brickd
// Don't use device before ipcon is connected

ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED,
    function(connectReason) {
        // Set Period (sensor 1) for current callback to 1s (1000ms)
        // Note: The callback is only called every second if the
        // current has changed since the last call!
        dual020.setCurrentCallbackPeriod(1, 1000);
    }
);
// Register current callback
dual020.on(Tinkerforge.BrickletIndustrialDual020mA.CALLBACK_CURRENT,
    // Callback function for current callback (parameter has unit nA)
    function(sensor, current) {
        console.log('Current (sensor '+sensor+'): '+current/(1000*1000)+' mA');
    }
);

console.log("Press any key to exit ...");
process.stdin.on('data',
    function(data) {
        ipcon.disconnect();
        process.exit(0);
    }
);
