program ExampleSimple;

{$ifdef MSWINDOWS}{$apptype CONSOLE}{$endif}
{$ifdef FPC}{$mode OBJFPC}{$H+}{$endif}

uses
  SysUtils, IPConnection, BrickletIndustrialDual020mA;

type
  TExample = class
  private
    ipcon: TIPConnection;
    dual020: TBrickletIndustrialDual020mA;
  public
    procedure Execute;
  end;

const
  HOST = 'localhost';
  PORT = 4223;
  UID = 'XYZ'; { Change to your UID }

var
  e: TExample;

procedure TExample.Execute;
var current: longint;
begin
  { Create IP connection }
  ipcon := TIPConnection.Create;

  { Create device object }
  dual020 := TBrickletIndustrialDual020mA.Create(UID, ipcon);

  { Connect to brickd }
  ipcon.Connect(HOST, PORT);
  { Don't use device before ipcon is connected }

  { Get current current from sensor 1 (unit is nA) }
  current := dual020.GetCurrent(1);
  WriteLn(Format('Current: %f mA', [current/(1000.0*1000.0)]));

  WriteLn('Press key to exit');
  ReadLn;
  ipcon.Destroy;
end;

begin
  e := TExample.Create;
  e.Execute;
  e.Destroy;
end.
