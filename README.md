# Slutprojekt Dynamisk Webbutveckling

This is an updated version of the famous NFT Heaven website. Now with added backend!

To get started, open two terminals, write the following in the first terminal: 
```
cd server
```
and then: 
```
npm i 
```
followed by:
``` 
npm start
```
And in the second terminal: 
```
cd client 
```
and then: 
```
npm i 
```
followed by:
``` 
npm start
```
The project should now be running.

---

There are two types of accounts available for you, the test subject.

 A regular account -   
 Use this to check out the flow of the website and ordering as a regular customer.

```
E-mail: test@test.se  
Password: 123123
```

and an admin account -   
Use this to check out the admin-only features, such as editing products, browsing all previous orders etc.
```
E-mail: admin@admin.se  
Password: 123123
```  
Enjoy your stay!

---




### G-KRAV

[X] Alla sidor skall vara responsiva.  
[X] Arbetet ska implementeras med en React frontend och en Express backend.  
[X] Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet.  
[X] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet.  
[X] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm).  
[X] Man ska kunna logga in som administratör i systemet.  
[X] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält.  
[X] Inga Lösenord får sparas i klartext i databasen.  
[X] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen.  
[X] Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan.  
[X] Administratörer ska kunna se en lista på alla gjorda beställningar.  
[X] Tillgängliga fraktalternativ ska vara hämtade från databasen.  
[X] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera.  
[X] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori.  
[X] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten.  
[X] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas.  
[X] Besökare ska kunna välja ett av flera fraktalternativ.

---

### VG-KRAV

[X] När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte.  
[X] Administratörer ska kunna markera beställningar som skickade.  
[X] Administratörer ska kunna redigera vilka kategorier en produkt tillhör.  
[X] Administratörer ska kunna lägga till och ta bort produkter.  
[ ] Backendapplikationen måste ha en fungerande global felhantering.  
[X] Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen.  
[X] En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången.

---

### Created by Rosanna Pistone, Linnea Albertsson and Christian Meiner, FED21G.