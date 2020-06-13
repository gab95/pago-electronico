//*******************************libraries********************************
//RFID-----------------------------
#include <SPI.h>
#include <MFRC522.h>
//NodeMCU--------------------------
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
//************************************************************************
#define SS_PIN  D4
#define RST_PIN D2
//************************************************************************
MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance.
//************************************************************************

// wifi settings
const char *ssid = "F.A.R";
const char *password = "/o-.b0a*g/";

//readers name
String letter = "e";
String colour = "rojo";

//additional info
String URL = "http://192.168.1.4:5000/api/payment"; //computer IP or the server domain
String getData, Link;

void setup() {
  delay(1000);
  Serial.begin(115200);
  SPI.begin();  // Init SPI bus
  mfrc522.PCD_Init(); // Init MFRC522 card
  //---------------------------------------------
  connectToWiFi();
}

void loop() {
  //check if there's a connection to Wi-Fi or not
  if (!WiFi.isConnected()) {
    connectToWiFi();    //Retry to connect to Wi-Fi
  }
  String CardID = "";
  //read the idcard
  if ( mfrc522.PICC_IsNewCardPresent())
  {
    //select a card
    if ( mfrc522.PICC_ReadCardSerial())
    {
      // construct the idcard
      for (byte i = 0; i < mfrc522.uid.size; i++) {
        CardID += mfrc522.uid.uidByte[i];
      }
      mfrc522.PICC_HaltA();
      SendCardID(CardID);
    }
  }
  delay(1);

}


//************send the Card UID to the server*************
void SendCardID( String Card_uid ) {
  Serial.println("Sending the Card ID");
  if (WiFi.isConnected()) {
    HTTPClient http;    //Declare object of class HTTPClient
    //GET request
    // Add the Card ID to the GET array in order to send it
    getData = "?idcard=" + String(Card_uid) + "&reader[letter]=" + String(letter) + "&reader[colour]=" + String(colour);

    //GET method
    Link = URL + getData;
    http.begin(Link); //initiate HTTP request

    int httpCode = http.GET();   //Send the request
    String payload = http.getString();    //Get the response payload

    Serial.println("Link: " + Link); //Print HTTP return code
    Serial.println("httpCode: " + httpCode); //Print HTTP return code
    Serial.println("Card_uid: " + Card_uid);   //Print Card ID
    Serial.println("payload: " + payload);  //Print request response payload

    delay(500);
    http.end();

  }
}

//********************connect to the WiFi******************
void connectToWiFi() {
  WiFi.mode(WIFI_OFF);        //Prevents reconnection issue (taking too long to connect)
  delay(1000);
  WiFi.mode(WIFI_STA);
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Connected");

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //IP address assigned to your ESP

  delay(1000);
}
//=======================================================================
