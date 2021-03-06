#!/usr/bin/env python
# -*- coding: utf-8 -*-  

HOST = "localhost"
PORT = 4223
UID = "XYZ" # Change to your UID

from tinkerforge.ip_connection import IPConnection
from tinkerforge.bricklet_industrial_dual_0_20ma import IndustrialDual020mA

if __name__ == "__main__":
    ipcon = IPConnection() # Create IP connection
    dual020 = IndustrialDual020mA(UID, ipcon) # Create device object

    ipcon.connect(HOST, PORT) # Connect to brickd
    # Don't use device before ipcon is connected

    # Get current current for sensor 1 (unit is nA)
    current = dual020.get_current(1)
    print('Current: ' + str(current/(1000.0*1000.0)) + ' mA')

    raw_input('Press key to exit\n') # Use input() in Python 3
    ipcon.disconnect()
