
*Skiss*
https://www.figma.com/design/TGcIhr3uy7YURWYvzXjydt/Individuell-Uppgift---World-Clocks?node-id=0-1&p=f&t=IhHzuMcmSKpJdHgS-0

*User stories*
https://trello.com/b/SzgCf9bj/individuell-uppgift-world-clocks

*Hur TypeScript transpileras till JavaScript*

Typescript parsas/översätts från sin speciella typning till vanlig Javascript. Typescript gör så att många funktioner har mer 
"städad" kod och mer överskådligt. I Javascript hade samma utförande innehållit mer kod, Typescript dekonsturerar bättre.
I slutändan så måste Typescript transpileras till Javascript för att kunna läsas av t.ex. webbläsare.

**Loggbok**

Började med att styla sidan enligt skissen med rätt bakgrundsfärg och "World Clocks" som titel längst upp.

Lånade Thomas klockkomponenter för analog och digital version.

Ordnade ihop en json-fil med en stadig lista världsstäder som sedan kan hämtas.

Upptäckte att det blir smidigare om jag har städer i en container eller ett CityCard istället för hur jag skissade. 

Sparade ner royalty-free foton på mina städer så att mina CityCards
har en stadsbild.

Nu visas stadsnamn, med klockor och bild på stad, men analoga klockan passar inte in i containern ordentligt, måste justera CSS.

Nu ser delarna bra ut i CityCard, ska fortsätta med detaljvy.

Skapade en CityPage så att man kan gå in på en specifik stad med större bild.

Lagt in localStorage så att sidan kommer ihåg vad den senaste staden
användaren tittade på. Går att klicka på en länk på startsidan.

Ändrade så att det alltid är en 24-timmarsklocka.

Skapat det visuella för att lägga till en egen stad.

Nu kan man lägga till en egen stad med hjälp av IANA-tidszoner.

Lade in en hjälplänk för att få reda på IANA-tidszoner på städer man själv vill lägga in så att det blir korrekt tid.

Egna tillagda städer har ingen bild, så jag har sparat en generisk
stadsbild som blir default.jpg när staden inte finns med som källa.

Testade att skriva in fel IANA-tidszon för att se vad som händer.
Sidan krashade totalt.

Skapade en valideringsfil som kollar så att man inte försöker lägga in en tidszon som inte stämmer med IANA.

Kommenterade kod där Typescript har fördelar över Javascript.




