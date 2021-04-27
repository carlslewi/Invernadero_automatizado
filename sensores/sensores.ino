#include "DHT.h" //Incluimos la biblioteca de nuestro sensor de humedad
#define DHTPIN 2 //Definimos el pin al cual vamos a conectar el sensor de temperatura y humedad
#define LDRPIN A2 //Definimos el pin al cual vamos a conectar la fotocelula (LDR)
#define DHTTYPE DHT11 // Definimos nuestro sensor de temperatura y humedad
DHT dht(DHTPIN, DHTTYPE); // Creamos la variable la cual usara arduino para comunicarse con el sensor DHT11;
void setup() {
  Serial.begin(9600);//Iniciamos la comunicacion serial
  dht.begin(); //Inicializamos el sensor
}

void loop() {
  int luz = map(analogRead(LDRPIN),0,1023,0,100); //Leemos el valor de la fotocelula y lo pasamos a un valor de porcentaje
  float h = dht.readHumidity(); //Leemos la humedad
  float t = dht.readTemperature();//Leemos la temperatura
  if(isnan(h)||isnan(t)){
    Serial.println("Error en lectura de datos de temperatura o humedad");
    return;
  }
  //Serial.println("Temperatura: ");
  //delay(2000);
  Serial.print(t);
  Serial.print(',');
  Serial.print(h);
  Serial.print(',');
  Serial.println();
  /*
  
  Serial.println();
  Serial.println("Luminosidad: ");
  Serial.print(luz);
  Serial.println(" %");
  Serial.println();*/
  delay(30000);//Esperamos 30 segundos para volver a enviar datos al broker y servidor
  //Serial.flush();
} 
