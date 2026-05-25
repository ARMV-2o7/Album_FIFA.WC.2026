import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://uyhjskxlbmpzjeqrdglg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5aGpza3hsYm1wemplcXJkZ2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NjA2NzUsImV4cCI6MjA5NTIzNjY3NX0.ilYXmea7VprjA1N86T9EPkMoeZKrs838XGNoUkYnf6o";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const DB_KEY = "copa26_v1";

const loadState = async () => {
  try {
    const { data } = await supabase.from("album_state").select("value").eq("key", DB_KEY).single();
    return data ? JSON.parse(data.value) : { glued: {}, repeats: {} };
  } catch { return { glued: {}, repeats: {} }; }
};
const saveState = async (state) => {
  try { await supabase.from("album_state").upsert({ key: DB_KEY, value: JSON.stringify(state) }, { onConflict: "key" }); } catch {}
};

// ─── STICKER DATA ─────────────────────────────────────────────────────────────
// TEAMS = conta no % total | LEGENDS = NÃO conta no % total
const TEAMS = [
  { id:"FWC", name:"FIFA WC 2026", color:"#C9A84C", stickers:[
    {id:"FWC00",name:"Pôster Oficial do Torneio",foil:true},
    {id:"FWC1",name:"Emblema Oficial 1",foil:true},{id:"FWC2",name:"Emblema Oficial 2",foil:true},
    {id:"FWC3",name:"Mascotes Oficiais",foil:true},{id:"FWC4",name:"Slogan Oficial",foil:true},{id:"FWC5",name:"Bola Oficial",foil:true},
    {id:"FWC6",name:"Emblema do País Sede - CAN",foil:true},{id:"FWC7",name:"Emblema do País Sede - MEX",foil:true},{id:"FWC8",name:"Emblema do País Sede - USA",foil:true},
    {id:"FWC9",name:"Itália 1934"},{id:"FWC10",name:"Uruguai 1950"},{id:"FWC11",name:"Alemanha 1954"},
    {id:"FWC12",name:"Brasil 1962"},{id:"FWC13",name:"Alemanha 1974"},{id:"FWC14",name:"Argentina 1986"},
    {id:"FWC15",name:"Brasil 1994"},{id:"FWC16",name:"Brasil 2002"},{id:"FWC17",name:"Itália 2006"},
    {id:"FWC18",name:"Alemanha 2014"},{id:"FWC19",name:"Argentina 2022"},
  ]},
  { id:"MEX", name:"México", color:"#006847", stickers:[
    {id:"MEX1",name:"Escudo México",foil:true},{id:"MEX2",name:"Luis Malagón"},{id:"MEX3",name:"Johan Vásquez"},
    {id:"MEX4",name:"Jorge Sánchez"},{id:"MEX5",name:"César Montes"},{id:"MEX6",name:"Jesús Gallardo"},
    {id:"MEX7",name:"Israel Reyes"},{id:"MEX8",name:"Diego Lainez"},{id:"MEX9",name:"Carlos Rodríguez"},
    {id:"MEX10",name:"Edson Álvarez"},{id:"MEX11",name:"Orbelín Pineda"},{id:"MEX12",name:"Marcel Ruiz"},
    {id:"MEX13",name:"Foto Oficial México"},{id:"MEX14",name:"Erick Sánchez"},{id:"MEX15",name:"Hirving Lozano"},
    {id:"MEX16",name:"Santiago Giménez"},{id:"MEX17",name:"Raúl Jiménez"},{id:"MEX18",name:"Alexis Vega"},
    {id:"MEX19",name:"Roberto Alvarado"},{id:"MEX20",name:"César Huerta"},
  ]},
  { id:"RSA", name:"África do Sul", color:"#007A4D", stickers:[
    {id:"RSA1",name:"Escudo África do Sul",foil:true},{id:"RSA2",name:"Ronwen Williams"},{id:"RSA3",name:"Sipho Chaine"},
    {id:"RSA4",name:"Aubrey Modiba"},{id:"RSA5",name:"Samukele Kabini"},{id:"RSA6",name:"Mbekezeli Mbokazi"},
    {id:"RSA7",name:"Khulumani Ndamane"},{id:"RSA8",name:"Siyabonga Ngezana"},{id:"RSA9",name:"Khuliso Mudau"},
    {id:"RSA10",name:"Nkosinathi Sibisi"},{id:"RSA11",name:"Tebogo Mokoena"},{id:"RSA12",name:"Thalente Mbatha"},
    {id:"RSA13",name:"Foto Oficial África do Sul"},{id:"RSA14",name:"Bathusi Aubaas"},{id:"RSA15",name:"Vava Sithole"},
    {id:"RSA16",name:"Sipho Mbule"},{id:"RSA17",name:"Lyle Foster"},{id:"RSA18",name:"Iqram Rayners"},
    {id:"RSA19",name:"Mohau Nkota"},{id:"RSA20",name:"Oswin Appollis"},
  ]},
  { id:"KOR", name:"Coreia do Sul", color:"#CD2E3A", stickers:[
    {id:"KOR1",name:"Escudo Coreia do Sul",foil:true},{id:"KOR2",name:"Hyeonwoo Jo"},{id:"KOR3",name:"Seunggyu Kim"},
    {id:"KOR4",name:"Minjae Kim"},{id:"KOR5",name:"Yumin Cho"},{id:"KOR6",name:"Youngwoo Seol"},
    {id:"KOR7",name:"Hanbeom Lee"},{id:"KOR8",name:"Taeseok Lee"},{id:"KOR9",name:"Myungjae Lee"},
    {id:"KOR10",name:"Jaesung Lee"},{id:"KOR11",name:"Inbeom Hwang"},{id:"KOR12",name:"Kangin Lee"},
    {id:"KOR13",name:"Foto Oficial Coreia do Sul"},{id:"KOR14",name:"Seungho Paik"},{id:"KOR15",name:"Jens Castrop"},
    {id:"KOR16",name:"Donggyeong Lee"},{id:"KOR17",name:"Guesung Cho"},{id:"KOR18",name:"Heungmin Son"},
    {id:"KOR19",name:"Heechan Hwang"},{id:"KOR20",name:"Hyeongyu Oh"},
  ]},
  { id:"CZE", name:"República Tcheca", color:"#D7141A", stickers:[
    {id:"CZE1",name:"Escudo República Tcheca",foil:true},{id:"CZE2",name:"Matěj Kovář"},{id:"CZE3",name:"Jindřich Staněk"},
    {id:"CZE4",name:"Ladislav Krejčí"},{id:"CZE5",name:"Vladimír Coufal"},{id:"CZE6",name:"Jaroslav Zelený"},
    {id:"CZE7",name:"Tomáš Holeš"},{id:"CZE8",name:"David Zima"},{id:"CZE9",name:"Michal Sadílek"},
    {id:"CZE10",name:"Lukáš Provod"},{id:"CZE11",name:"Lukáš Červ"},{id:"CZE12",name:"Tomáš Souček"},
    {id:"CZE13",name:"Foto Oficial República Tcheca"},{id:"CZE14",name:"Pavel Šulc"},{id:"CZE15",name:"Matěj Vydra"},
    {id:"CZE16",name:"Vasil Kušej"},{id:"CZE17",name:"Tomáš Chorý"},{id:"CZE18",name:"Václav Černý"},
    {id:"CZE19",name:"Adam Hložek"},{id:"CZE20",name:"Patrik Schick"},
  ]},
  { id:"CAN", name:"Canadá", color:"#FF0000", stickers:[
    {id:"CAN1",name:"Escudo Canadá",foil:true},{id:"CAN2",name:"Dayne St. Clair"},{id:"CAN3",name:"Alphonso Davies"},
    {id:"CAN4",name:"Alistair Johnston"},{id:"CAN5",name:"Samuel Adekugbe"},{id:"CAN6",name:"Richie Laryea"},
    {id:"CAN7",name:"Derek Cornelius"},{id:"CAN8",name:"Moïse Bombito"},{id:"CAN9",name:"Kamal Miller"},
    {id:"CAN10",name:"Stephen Eustaquio"},{id:"CAN11",name:"Ismaël Koné"},{id:"CAN12",name:"Jonathan Osorio"},
    {id:"CAN13",name:"Foto Oficial Canadá"},{id:"CAN14",name:"Jacob Shaffelburg"},{id:"CAN15",name:"Mathieu Choinière"},
    {id:"CAN16",name:"Niko Sigur"},{id:"CAN17",name:"Tajon Buchanan"},{id:"CAN18",name:"Liam Millar"},
    {id:"CAN19",name:"Cyle Larin"},{id:"CAN20",name:"Jonathan David"},
  ]},
  { id:"BIH", name:"Bósnia e Herzegovina", color:"#002395", stickers:[
    {id:"BIH1",name:"Escudo Bósnia e Herzegovina",foil:true},{id:"BIH2",name:"Nikola Vasilj"},{id:"BIH3",name:"Amar Dedić"},
    {id:"BIH4",name:"Sead Kolašinac"},{id:"BIH5",name:"Tarik Muharemović"},{id:"BIH6",name:"Nihad Mujakić"},
    {id:"BIH7",name:"Nikola Katić"},{id:"BIH8",name:"Amir Hadžiahmetović"},{id:"BIH9",name:"Benjamin Tahirović"},
    {id:"BIH10",name:"Armin Gigović"},{id:"BIH11",name:"Ivan Šunjić"},{id:"BIH12",name:"Ivan Bašić"},
    {id:"BIH13",name:"Foto Oficial Bósnia e Herzegovina"},{id:"BIH14",name:"Dženis Burnić"},{id:"BIH15",name:"Esmir Bajraktarević"},
    {id:"BIH16",name:"Amar Memić"},{id:"BIH17",name:"Ermedin Demirović"},{id:"BIH18",name:"Edin Džeko"},
    {id:"BIH19",name:"Samed Baždar"},{id:"BIH20",name:"Haris Tabaković"},
  ]},
  { id:"QAT", name:"Catar", color:"#8D153A", stickers:[
    {id:"QAT1",name:"Escudo Catar",foil:true},{id:"QAT2",name:"Meshaal Barsham"},{id:"QAT3",name:"Sultan Al Brake"},
    {id:"QAT4",name:"Lucas Mendes"},{id:"QAT5",name:"Homam Ahmed"},{id:"QAT6",name:"Boualem Khoukhi"},
    {id:"QAT7",name:"Pedro Miguel"},{id:"QAT8",name:"Tarek Salman"},{id:"QAT9",name:"Mohammed Mannaï"},
    {id:"QAT10",name:"Karim Boudiaf"},{id:"QAT11",name:"Assim Madibo"},{id:"QAT12",name:"Hamed Fathi"},
    {id:"QAT13",name:"Foto Oficial Catar"},{id:"QAT14",name:"Mohammed Waad"},{id:"QAT15",name:"Abdulaziz Hatem"},
    {id:"QAT16",name:"Hassan Al-Haydos"},{id:"QAT17",name:"Edmilson Junior"},{id:"QAT18",name:"Akram Hassan Afif"},
    {id:"QAT19",name:"Ahmed Al-Ganehi"},{id:"QAT20",name:"Almoez Ali"},
  ]},
  { id:"SUI", name:"Suíça", color:"#FF0000", stickers:[
    {id:"SUI1",name:"Escudo Suíça",foil:true},{id:"SUI2",name:"Gregor Kobel"},{id:"SUI3",name:"Yvon Mvogo"},
    {id:"SUI4",name:"Manuel Akanji"},{id:"SUI5",name:"Ricardo Rodríguez"},{id:"SUI6",name:"Nico Elvedi"},
    {id:"SUI7",name:"Aurèle Amenda"},{id:"SUI8",name:"Silvan Widmer"},{id:"SUI9",name:"Granit Xhaka"},
    {id:"SUI10",name:"Denis Zakaria"},{id:"SUI11",name:"Remo Freuler"},{id:"SUI12",name:"Fabian Rieder"},
    {id:"SUI13",name:"Foto Oficial Suíça"},{id:"SUI14",name:"Ardon Jashari"},{id:"SUI15",name:"Johan Manzambi"},
    {id:"SUI16",name:"Michel Aebischer"},{id:"SUI17",name:"Breel Embolo"},{id:"SUI18",name:"Ruben Vargas"},
    {id:"SUI19",name:"Dan Ndoye"},{id:"SUI20",name:"Zeki Amdouni"},
  ]},
  { id:"BRA", name:"Brasil", color:"#009C3B", stickers:[
    {id:"BRA1",name:"Escudo Brasil",foil:true},{id:"BRA2",name:"Alisson"},{id:"BRA3",name:"Bento"},
    {id:"BRA4",name:"Marquinhos"},{id:"BRA5",name:"Éder Militão"},{id:"BRA6",name:"Gabriel Magalhães"},
    {id:"BRA7",name:"Danilo"},{id:"BRA8",name:"Wesley"},{id:"BRA9",name:"Lucas Paquetá"},
    {id:"BRA10",name:"Casemiro"},{id:"BRA11",name:"Bruno Guimarães"},{id:"BRA12",name:"Luiz Henrique"},
    {id:"BRA13",name:"Foto Oficial Brasil"},{id:"BRA14",name:"Vinícius Júnior"},{id:"BRA15",name:"Rodrygo"},
    {id:"BRA16",name:"João Pedro"},{id:"BRA17",name:"Matheus Cunha"},{id:"BRA18",name:"Gabriel Martinelli"},
    {id:"BRA19",name:"Raphinha"},{id:"BRA20",name:"Estevão"},
  ]},
  { id:"MAR", name:"Marrocos", color:"#C1272D", stickers:[
    {id:"MAR1",name:"Escudo Marrocos",foil:true},{id:"MAR2",name:"Yassine Bounou"},{id:"MAR3",name:"Munir El Kajoui"},
    {id:"MAR4",name:"Achraf Hakimi"},{id:"MAR5",name:"Noussair Mazraoui"},{id:"MAR6",name:"Nayef Aguerd"},
    {id:"MAR7",name:"Romain Saïss"},{id:"MAR8",name:"Jawad El Yamiq"},{id:"MAR9",name:"Adam Masina"},
    {id:"MAR10",name:"Sofyan Amrabat"},{id:"MAR11",name:"Azzedine Ounahi"},{id:"MAR12",name:"Eliesse Ben Seghir"},
    {id:"MAR13",name:"Foto Oficial Marrocos"},{id:"MAR14",name:"Bilal El Khannouss"},{id:"MAR15",name:"Ismael Saibari"},
    {id:"MAR16",name:"Youssef En-Nesyri"},{id:"MAR17",name:"Abde Ezzalzouli"},{id:"MAR18",name:"Soufiane Rahimi"},
    {id:"MAR19",name:"Brahim Díaz"},{id:"MAR20",name:"Ayoub El Kaabi"},
  ]},
  { id:"HAI", name:"Haiti", color:"#00209F", stickers:[
    {id:"HAI1",name:"Escudo Haiti",foil:true},{id:"HAI2",name:"Johny Placide"},{id:"HAI3",name:"Carlens Arcus"},
    {id:"HAI4",name:"Martin Expérience"},{id:"HAI5",name:"Jean-Kévin Duverne"},{id:"HAI6",name:"Ricardo Ade"},
    {id:"HAI7",name:"Duke Lacroix"},{id:"HAI8",name:"Garven Metusala"},{id:"HAI9",name:"Hannes Delcroix"},
    {id:"HAI10",name:"Leverton Pierre"},{id:"HAI11",name:"Danley Jean Jacques"},{id:"HAI12",name:"Jean-Ricner Bellegarde"},
    {id:"HAI13",name:"Foto Oficial Haiti"},{id:"HAI14",name:"Christopher Attys"},{id:"HAI15",name:"Derrick Étienne Jr."},
    {id:"HAI16",name:"Josué Casimir"},{id:"HAI17",name:"Ruben Providence"},{id:"HAI18",name:"Duckens Nazon"},
    {id:"HAI19",name:"Louicius Deedson"},{id:"HAI20",name:"Frantzdy Pierrot"},
  ]},
  { id:"SCO", name:"Escócia", color:"#003087", stickers:[
    {id:"SCO1",name:"Escudo Escócia",foil:true},{id:"SCO2",name:"Angus Gunn"},{id:"SCO3",name:"Jack Hendry"},
    {id:"SCO4",name:"Kieran Tierney"},{id:"SCO5",name:"Aaron Hickey"},{id:"SCO6",name:"Andrew Robertson"},
    {id:"SCO7",name:"Scott McKenna"},{id:"SCO8",name:"John Souttar"},{id:"SCO9",name:"Anthony Ralston"},
    {id:"SCO10",name:"Grant Hanley"},{id:"SCO11",name:"Scott McTominay"},{id:"SCO12",name:"Billy Gilmour"},
    {id:"SCO13",name:"Foto Oficial Escócia"},{id:"SCO14",name:"Lewis Ferguson"},{id:"SCO15",name:"Ryan Christie"},
    {id:"SCO16",name:"Kenny McLean"},{id:"SCO17",name:"John McGinn"},{id:"SCO18",name:"Lyndon Dykes"},
    {id:"SCO19",name:"Che Adams"},{id:"SCO20",name:"Ben Gannon-Doak"},
  ]},
  { id:"USA", name:"Estados Unidos", color:"#B22234", stickers:[
    {id:"USA1",name:"Escudo Estados Unidos",foil:true},{id:"USA2",name:"Matt Freese"},{id:"USA3",name:"Chris Richards"},
    {id:"USA4",name:"Tim Ream"},{id:"USA5",name:"Mark McKenzie"},{id:"USA6",name:"Alex Freeman"},
    {id:"USA7",name:"Antonee Robinson"},{id:"USA8",name:"Tyler Adams"},{id:"USA9",name:"Tanner Tessmann"},
    {id:"USA10",name:"Weston McKennie"},{id:"USA11",name:"Cristian Roldan"},{id:"USA12",name:"Timothy Weah"},
    {id:"USA13",name:"Foto Oficial Estados Unidos"},{id:"USA14",name:"Diego Luna"},{id:"USA15",name:"Malik Tillman"},
    {id:"USA16",name:"Christian Pulisic"},{id:"USA17",name:"Brenden Aaronson"},{id:"USA18",name:"Ricardo Pepi"},
    {id:"USA19",name:"Haji Wright"},{id:"USA20",name:"Folarin Balogun"},
  ]},
  { id:"PAR", name:"Paraguai", color:"#D52B1E", stickers:[
    {id:"PAR1",name:"Escudo Paraguai",foil:true},{id:"PAR2",name:"Roberto Fernandez"},{id:"PAR3",name:"Orlando Gill"},
    {id:"PAR4",name:"Gustavo Gomez"},{id:"PAR5",name:"Fabián Balbuena"},{id:"PAR6",name:"Juan Jose Caceres"},
    {id:"PAR7",name:"Omar Alderete"},{id:"PAR8",name:"Junior Alonso"},{id:"PAR9",name:"Mathias Villasanti"},
    {id:"PAR10",name:"Diego Gómez"},{id:"PAR11",name:"Damián Bobadilla"},{id:"PAR12",name:"Andres Cubas"},
    {id:"PAR13",name:"Foto Oficial Paraguai"},{id:"PAR14",name:"Matías Galarza Fonda"},{id:"PAR15",name:"Julio Enciso"},
    {id:"PAR16",name:"Alejandro Romero Gamarra"},{id:"PAR17",name:"Miguel Almiron"},{id:"PAR18",name:"Ramon Sosa"},
    {id:"PAR19",name:"Ángel Romero"},{id:"PAR20",name:"Antonio Sanabria"},
  ]},
  { id:"AUS", name:"Austrália", color:"#00843D", stickers:[
    {id:"AUS1",name:"Escudo Austrália",foil:true},{id:"AUS2",name:"Mathew Ryan"},{id:"AUS3",name:"Joe Gauci"},
    {id:"AUS4",name:"Harry Souttar"},{id:"AUS5",name:"Alessandro Circati"},{id:"AUS6",name:"Jordy Bos"},
    {id:"AUS7",name:"Aziz Behich"},{id:"AUS8",name:"Cameron Burgess"},{id:"AUS9",name:"Lewis Miller"},
    {id:"AUS10",name:"Milos Degenek"},{id:"AUS11",name:"Jackson Irvine"},{id:"AUS12",name:"Riley McGree"},
    {id:"AUS13",name:"Foto Oficial Austrália"},{id:"AUS14",name:"Aiden O'Neill"},{id:"AUS15",name:"Connor Metcalfe"},
    {id:"AUS16",name:"Patrick Yazbek"},{id:"AUS17",name:"Craig Goodwin"},{id:"AUS18",name:"Kusini Yengi"},
    {id:"AUS19",name:"Nestory Irankunda"},{id:"AUS20",name:"Mohamed Touré"},
  ]},
  { id:"TUR", name:"Turquia", color:"#E30A17", stickers:[
    {id:"TUR1",name:"Escudo Turquia",foil:true},{id:"TUR2",name:"Uğurcan Çakır"},{id:"TUR3",name:"Mert Müldür"},
    {id:"TUR4",name:"Zeki Çelik"},{id:"TUR5",name:"Abdülkerim Bardakcı"},{id:"TUR6",name:"Caglar Soyuncu"},
    {id:"TUR7",name:"Merih Demiral"},{id:"TUR8",name:"Ferdi Kadıoğlu"},{id:"TUR9",name:"Kaan Ayhan"},
    {id:"TUR10",name:"İsmail Yüksek"},{id:"TUR11",name:"Hakan Calhanoglu"},{id:"TUR12",name:"Orkun Kökçü"},
    {id:"TUR13",name:"Foto Oficial Turquia"},{id:"TUR14",name:"Arda Güler"},{id:"TUR15",name:"İrfan Can Kahveci"},
    {id:"TUR16",name:"Yunus Akgün"},{id:"TUR17",name:"Can Uzun"},{id:"TUR18",name:"Barış Alper Yılmaz"},
    {id:"TUR19",name:"Kerem Akturkoglu"},{id:"TUR20",name:"Kenan Yıldız"},
  ]},
  { id:"ARG", name:"Argentina", color:"#74ACDF", stickers:[
    {id:"ARG1",name:"Escudo Argentina",foil:true},{id:"ARG2",name:"Emiliano Martínez"},{id:"ARG3",name:"Nahuel Molina"},
    {id:"ARG4",name:"Cristian Romero"},{id:"ARG5",name:"Nicolás Otamendi"},{id:"ARG6",name:"Nicolás Tagliafico"},
    {id:"ARG7",name:"Leonardo Balerdi"},{id:"ARG8",name:"Enzo Fernández"},{id:"ARG9",name:"Alexis Mac Allister"},
    {id:"ARG10",name:"Rodrigo De Paul"},{id:"ARG11",name:"Exequiel Palacios"},{id:"ARG12",name:"Leandro Paredes"},
    {id:"ARG13",name:"Foto Oficial Argentina"},{id:"ARG14",name:"Nico Paz"},{id:"ARG15",name:"Franco Mastantuono"},
    {id:"ARG16",name:"Nico González"},{id:"ARG17",name:"Lionel Messi"},{id:"ARG18",name:"Lautaro Martínez"},
    {id:"ARG19",name:"Julián Álvarez"},{id:"ARG20",name:"Giuliano Simeone"},
  ]},
  { id:"ESP", name:"Espanha", color:"#AA151B", stickers:[
    {id:"ESP1",name:"Escudo Espanha",foil:true},{id:"ESP2",name:"Unai Simón"},{id:"ESP3",name:"Robin Le Normand"},
    {id:"ESP4",name:"Aymeric Laporte"},{id:"ESP5",name:"Dean Huijsen"},{id:"ESP6",name:"Pedro Porro"},
    {id:"ESP7",name:"Dani Carvajal"},{id:"ESP8",name:"Marc Cucurella"},{id:"ESP9",name:"Martin Zubimendi"},
    {id:"ESP10",name:"Rodri"},{id:"ESP11",name:"Pedri"},{id:"ESP12",name:"Fabián Ruiz"},
    {id:"ESP13",name:"Foto Oficial Espanha"},{id:"ESP14",name:"Mikel Merino"},{id:"ESP15",name:"Lamine Yamal"},
    {id:"ESP16",name:"Dani Olmo"},{id:"ESP17",name:"Nico Williams"},{id:"ESP18",name:"Ferran Torres"},
    {id:"ESP19",name:"Álvaro Morata"},{id:"ESP20",name:"Mikel Oyarzabal"},
  ]},
  { id:"FRA", name:"França", color:"#002395", stickers:[
    {id:"FRA1",name:"Escudo França",foil:true},{id:"FRA2",name:"Mike Maignan"},{id:"FRA3",name:"Theo Hernández"},
    {id:"FRA4",name:"William Saliba"},{id:"FRA5",name:"Jules Koundé"},{id:"FRA6",name:"Ibrahima Konaté"},
    {id:"FRA7",name:"Dayot Upamecano"},{id:"FRA8",name:"Lucas Digne"},{id:"FRA9",name:"Aurélien Tchouaméni"},
    {id:"FRA10",name:"Eduardo Camavinga"},{id:"FRA11",name:"Manu Koné"},{id:"FRA12",name:"Adrien Rabiot"},
    {id:"FRA13",name:"Foto Oficial França"},{id:"FRA14",name:"Michael Olise"},{id:"FRA15",name:"Ousmane Dembélé"},
    {id:"FRA16",name:"Bradley Barcola"},{id:"FRA17",name:"Desire Doue"},{id:"FRA18",name:"Kingsley Coman"},
    {id:"FRA19",name:"Hugo Ekitiké"},{id:"FRA20",name:"Kylian Mbappé"},
  ]},
  { id:"GER", name:"Alemanha", color:"#000000", stickers:[
    {id:"GER1",name:"Escudo Alemanha",foil:true},{id:"GER2",name:"Marc-André ter Stegen"},{id:"GER3",name:"Jonathan Tah"},
    {id:"GER4",name:"David Raum"},{id:"GER5",name:"Nico Schlotterbeck"},{id:"GER6",name:"Antonio Rüdiger"},
    {id:"GER7",name:"Waldemar Anton"},{id:"GER8",name:"Ridle Baku"},{id:"GER9",name:"Maximilian Mittelstädt"},
    {id:"GER10",name:"Joshua Kimmich"},{id:"GER11",name:"Florian Wirtz"},{id:"GER12",name:"Felix Nmecha"},
    {id:"GER13",name:"Foto Oficial Alemanha"},{id:"GER14",name:"Leon Goretzka"},{id:"GER15",name:"Jamal Musiala"},
    {id:"GER16",name:"Serge Gnabry"},{id:"GER17",name:"Kai Havertz"},{id:"GER18",name:"Leroy Sané"},
    {id:"GER19",name:"Karim Adeyemi"},{id:"GER20",name:"Nick Woltemade"},
  ]},
  { id:"POR", name:"Portugal", color:"#006600", stickers:[
    {id:"POR1",name:"Escudo Portugal",foil:true},{id:"POR2",name:"Diogo Costa"},{id:"POR3",name:"José Sá"},
    {id:"POR4",name:"Rúben Dias"},{id:"POR5",name:"João Cancelo"},{id:"POR6",name:"Diogo Dalot"},
    {id:"POR7",name:"Nuno Mendes"},{id:"POR8",name:"Gonçalo Inácio"},{id:"POR9",name:"Bernardo Silva"},
    {id:"POR10",name:"Bruno Fernandes"},{id:"POR11",name:"Rúben Neves"},{id:"POR12",name:"Vitinha"},
    {id:"POR13",name:"Foto Oficial Portugal"},{id:"POR14",name:"Joao Neves"},{id:"POR15",name:"Cristiano Ronaldo"},
    {id:"POR16",name:"Francisco Trincão"},{id:"POR17",name:"João Félix"},{id:"POR18",name:"Gonçalo Ramos"},
    {id:"POR19",name:"Pedro Neto"},{id:"POR20",name:"Rafael Leão"},
  ]},
  { id:"ENG", name:"Inglaterra", color:"#CF081F", stickers:[
    {id:"ENG1",name:"Escudo Inglaterra",foil:true},{id:"ENG2",name:"Jordan Pickford"},{id:"ENG3",name:"John Stones"},
    {id:"ENG4",name:"Marc Guehi"},{id:"ENG5",name:"Ezri Konsa"},{id:"ENG6",name:"Trent Alexander-Arnold"},
    {id:"ENG7",name:"Reece James"},{id:"ENG8",name:"Dan Burn"},{id:"ENG9",name:"Jordan Henderson"},
    {id:"ENG10",name:"Declan Rice"},{id:"ENG11",name:"Jude Bellingham"},{id:"ENG12",name:"Cole Palmer"},
    {id:"ENG13",name:"Foto Oficial Inglaterra"},{id:"ENG14",name:"Morgan Rogers"},{id:"ENG15",name:"Anthony Gordon"},
    {id:"ENG16",name:"Phil Foden"},{id:"ENG17",name:"Bukayo Saka"},{id:"ENG18",name:"Harry Kane"},
    {id:"ENG19",name:"Marcus Rashford"},{id:"ENG20",name:"Ollie Watkins"},
  ]},
  { id:"NED", name:"Holanda", color:"#FF4F00", stickers:[
    {id:"NED1",name:"Escudo Holanda",foil:true},{id:"NED2",name:"Bart Verbruggen"},{id:"NED3",name:"Virgil van Dijk"},
    {id:"NED4",name:"Micky van de Ven"},{id:"NED5",name:"Jurriën Timber"},{id:"NED6",name:"Denzel Dumfries"},
    {id:"NED7",name:"Nathan Aké"},{id:"NED8",name:"Jeremie Frimpong"},{id:"NED9",name:"Jan Paul van Hecke"},
    {id:"NED10",name:"Tijjani Reijnders"},{id:"NED11",name:"Ryan Gravenberch"},{id:"NED12",name:"Teun Koopmeiners"},
    {id:"NED13",name:"Foto Oficial Holanda"},{id:"NED14",name:"Frenkie de Jong"},{id:"NED15",name:"Xavi Simons"},
    {id:"NED16",name:"Justin Kluivert"},{id:"NED17",name:"Memphis Depay"},{id:"NED18",name:"Donyell Malen"},
    {id:"NED19",name:"Wout Weghorst"},{id:"NED20",name:"Cody Gakpo"},
  ]},
  { id:"BEL", name:"Bélgica", color:"#EF3340", stickers:[
    {id:"BEL1",name:"Escudo Bélgica",foil:true},{id:"BEL2",name:"Thibaut Courtois"},{id:"BEL3",name:"Arthur Theate"},
    {id:"BEL4",name:"Timothy Castagne"},{id:"BEL5",name:"Zeno Debast"},{id:"BEL6",name:"Brandon Mechele"},
    {id:"BEL7",name:"Maxime De Cuyper"},{id:"BEL8",name:"Thomas Meunier"},{id:"BEL9",name:"Youri Tielemans"},
    {id:"BEL10",name:"Amadou Onana"},{id:"BEL11",name:"Nicolas Raskin"},{id:"BEL12",name:"Alexis Saelemaekers"},
    {id:"BEL13",name:"Foto Oficial Bélgica"},{id:"BEL14",name:"Hans Vanaken"},{id:"BEL15",name:"Kevin De Bruyne"},
    {id:"BEL16",name:"Jérémy Doku"},{id:"BEL17",name:"Charles De Ketelaere"},{id:"BEL18",name:"Leandro Trossard"},
    {id:"BEL19",name:"Loïs Openda"},{id:"BEL20",name:"Romelu Lukaku"},
  ]},

  { id:"COL", name:"Colômbia", color:"#FCD116", stickers:[
    {id:"COL1",name:"Escudo Colômbia",foil:true},{id:"COL2",name:"Camilo Vargas"},{id:"COL3",name:"David Ospina"},
    {id:"COL4",name:"Davinson Sanchez"},{id:"COL5",name:"Yerry Mina"},{id:"COL6",name:"Daniel Muñoz"},
    {id:"COL7",name:"Johan Mojica"},{id:"COL8",name:"Jhon Lucumí"},{id:"COL9",name:"Santiago Arias"},
    {id:"COL10",name:"Jefferson Lerma"},{id:"COL11",name:"Kevin Castaño"},{id:"COL12",name:"Richard Ríos"},
    {id:"COL13",name:"Foto Oficial Colômbia"},{id:"COL14",name:"James Rodríguez"},{id:"COL15",name:"Juan Fernando Quintero"},
    {id:"COL16",name:"Jorge Carrascal"},{id:"COL17",name:"Jhon Arias"},{id:"COL18",name:"Jhon Córdoba"},
    {id:"COL19",name:"Luis Suárez"},{id:"COL20",name:"Luis Díaz"},
  ]},
  { id:"URU", name:"Uruguai", color:"#5EB6E4", stickers:[
    {id:"URU1",name:"Escudo Uruguai",foil:true},{id:"URU2",name:"Sergio Rochet"},{id:"URU3",name:"Santiago Mele"},
    {id:"URU4",name:"Ronald Araújo"},{id:"URU5",name:"José María Giménez"},{id:"URU6",name:"Sebastian Caceres"},
    {id:"URU7",name:"Mathías Olivera"},{id:"URU8",name:"Guillermo Varela"},{id:"URU9",name:"Nahitan Nandez"},
    {id:"URU10",name:"Federico Valverde"},{id:"URU11",name:"Giorgian de Arrascaeta"},{id:"URU12",name:"Rodrigo Bentancur"},
    {id:"URU13",name:"Foto Oficial Uruguai"},{id:"URU14",name:"Manuel Ugarte"},{id:"URU15",name:"Nicolás De La Cruz"},
    {id:"URU16",name:"Maxi Araújo"},{id:"URU17",name:"Darwin Núñez"},{id:"URU18",name:"Federico Viñas"},
    {id:"URU19",name:"Rodrigo Aguirre"},{id:"URU20",name:"Facundo Pellistri"},
  ]},
  { id:"CRO", name:"Croácia", color:"#FF0000", stickers:[
    {id:"CRO1",name:"Escudo Croácia",foil:true},{id:"CRO2",name:"Dominik Livaković"},{id:"CRO3",name:"Duje Ćaleta-Car"},
    {id:"CRO4",name:"Joško Gvardiol"},{id:"CRO5",name:"Josip Stanisic"},{id:"CRO6",name:"Luka Vušković"},
    {id:"CRO7",name:"Josip Šutalo"},{id:"CRO8",name:"Kristijan Jakić"},{id:"CRO9",name:"Luka Modrić"},
    {id:"CRO10",name:"Mateo Kovačić"},{id:"CRO11",name:"Martin Baturina"},{id:"CRO12",name:"Lovro Majer"},
    {id:"CRO13",name:"Foto Oficial Croácia"},{id:"CRO14",name:"Mario Pašalić"},{id:"CRO15",name:"Petar Sucic"},
    {id:"CRO16",name:"Ivan Perišić"},{id:"CRO17",name:"Marco Pašalić"},{id:"CRO18",name:"Ante Budimir"},
    {id:"CRO19",name:"Andrej Kramarić"},{id:"CRO20",name:"Franjo Ivanović"},
  ]},
  { id:"SEN", name:"Senegal", color:"#00853F", stickers:[
    {id:"SEN1",name:"Escudo Senegal",foil:true},{id:"SEN2",name:"Édouard Mendy"},{id:"SEN3",name:"Yehvann Diouf"},
    {id:"SEN4",name:"Moussa Niakhate"},{id:"SEN5",name:"Abdoulaye Seck"},{id:"SEN6",name:"Ismail Jakobs"},
    {id:"SEN7",name:"El Hadji Malick Diouf"},{id:"SEN8",name:"Kalidou Koulibaly"},{id:"SEN9",name:"Idrissa Gana Gueye"},
    {id:"SEN10",name:"Pape Matar Sarr"},{id:"SEN11",name:"Pape Gueye"},{id:"SEN12",name:"Habib Diarra"},
    {id:"SEN13",name:"Foto Oficial Senegal"},{id:"SEN14",name:"Lamine Camara"},{id:"SEN15",name:"Sadio Mané"},
    {id:"SEN16",name:"Ismaïla Sarr"},{id:"SEN17",name:"Boulaye Dia"},{id:"SEN18",name:"Iliman Ndiaye"},
    {id:"SEN19",name:"Nicolas Jackson"},{id:"SEN20",name:"Krépin Diatta"},
  ]},
  { id:"JPN", name:"Japão", color:"#003087", stickers:[
    {id:"JPN1",name:"Escudo Japão",foil:true},{id:"JPN2",name:"Zion Suzuki"},{id:"JPN3",name:"Henry Heroki Mochizuki"},
    {id:"JPN4",name:"Ayumu Seku"},{id:"JPN5",name:"Junnosuke Suzuki"},{id:"JPN6",name:"Shogo Taniguchi"},
    {id:"JPN7",name:"Tsuyoshi Watanabe"},{id:"JPN8",name:"Kaishu Sano"},{id:"JPN9",name:"Yuki Soma"},
    {id:"JPN10",name:"Ao Tanaka"},{id:"JPN11",name:"Daichi Kamada"},{id:"JPN12",name:"Takefusa Kubo"},
    {id:"JPN13",name:"Foto Oficial Japão"},{id:"JPN14",name:"Ritsu Doan"},{id:"JPN15",name:"Keito Nakamura"},
    {id:"JPN16",name:"Takumi Minamino"},{id:"JPN17",name:"Shuto Machino"},{id:"JPN18",name:"Junya Ito"},
    {id:"JPN19",name:"Koki Ogawa"},{id:"JPN20",name:"Ayase Ueda"},
  ]},
  { id:"ECU", name:"Equador", color:"#FFD100", stickers:[
    {id:"ECU1",name:"Escudo Equador",foil:true},{id:"ECU2",name:"Hernán Galíndez"},{id:"ECU3",name:"Gonzalo Valle"},
    {id:"ECU4",name:"Piero Hincapié"},{id:"ECU5",name:"Pervis Estupiñán"},{id:"ECU6",name:"Willian Pacho"},
    {id:"ECU7",name:"Ángelo Preciado"},{id:"ECU8",name:"Joel Ordonez"},{id:"ECU9",name:"Moisés Caicedo"},
    {id:"ECU10",name:"Alan Franco"},{id:"ECU11",name:"Kendry Paez"},{id:"ECU12",name:"Pedro Vite"},
    {id:"ECU13",name:"Foto Oficial Equador"},{id:"ECU14",name:"Jhon Yeboah"},{id:"ECU15",name:"Leonardo Campana"},
    {id:"ECU16",name:"Gonzalo Plata"},{id:"ECU17",name:"Nilson Angulo"},{id:"ECU18",name:"Alan Minda"},
    {id:"ECU19",name:"Kevin Rodriguez"},{id:"ECU20",name:"Enner Valencia"},
  ]},
  { id:"ALG", name:"Argélia", color:"#006233", stickers:[
    {id:"ALG1",name:"Escudo Argélia",foil:true},{id:"ALG2",name:"Alexis Guendouz"},{id:"ALG3",name:"Ramy Bensebaini"},
    {id:"ALG4",name:"Youcef Atal"},{id:"ALG5",name:"Rayan Ait-Nouri"},{id:"ALG6",name:"Mohamed Amine Tougaï"},
    {id:"ALG7",name:"Aissa Mandi"},{id:"ALG8",name:"Ismaël Bennacer"},{id:"ALG9",name:"Houssem Aouar"},
    {id:"ALG10",name:"Hicham Boudaoui"},{id:"ALG11",name:"Ramiz Zerrouki"},{id:"ALG12",name:"Nabil Bentaleb"},
    {id:"ALG13",name:"Foto Oficial Argélia"},{id:"ALG14",name:"Farès Chaïbi"},{id:"ALG15",name:"Riyad Mahrez"},
    {id:"ALG16",name:"Said Benrahma"},{id:"ALG17",name:"Anis Hadj Moussa"},{id:"ALG18",name:"Amine Gouiri"},
    {id:"ALG19",name:"Baghdad Bounedjah"},{id:"ALG20",name:"Mohammed Amoura"},
  ]},
  { id:"EGY", name:"Egito", color:"#CE1126", stickers:[
    {id:"EGY1",name:"Escudo Egito",foil:true},{id:"EGY2",name:"Mohamed Elshenawy"},{id:"EGY3",name:"Mohamed Hany"},
    {id:"EGY4",name:"Mohamed Hamdy"},{id:"EGY5",name:"Yasser Ibrahim"},{id:"EGY6",name:"Khaled Sobhi"},
    {id:"EGY7",name:"Rami Rabia"},{id:"EGY8",name:"Hossam Abdelmaguid"},{id:"EGY9",name:"Ahmed Fattouh"},
    {id:"EGY10",name:"Marwan Attia"},{id:"EGY11",name:"Zizo"},{id:"EGY12",name:"Hamdy Fathy"},
    {id:"EGY13",name:"Foto Oficial Egito"},{id:"EGY14",name:"Mohanad Lasheen"},{id:"EGY15",name:"Emam Ashour"},
    {id:"EGY16",name:"Osama Faisal"},{id:"EGY17",name:"Mohamed Salah"},{id:"EGY18",name:"Mostafa Mohamed"},
    {id:"EGY19",name:"Trezeguet"},{id:"EGY20",name:"Omar Marmoush"},
  ]},
  { id:"GHA", name:"Gana", color:"#006B3F", stickers:[
    {id:"GHA1",name:"Escudo Gana",foil:true},{id:"GHA2",name:"Lawrence Ati-Zigi"},{id:"GHA3",name:"Tariq Lamptey"},
    {id:"GHA4",name:"Mohammed Salisu"},{id:"GHA5",name:"Alidu Seidu"},{id:"GHA6",name:"Alexander Djiku"},
    {id:"GHA7",name:"Gideon Mensah"},{id:"GHA8",name:"Caleb Yirenkyi"},{id:"GHA9",name:"Abdul Issahaku Fatawu"},
    {id:"GHA10",name:"Thomas Partey"},{id:"GHA11",name:"Salis Abdul Samed"},{id:"GHA12",name:"Kamaldeen Sulemana"},
    {id:"GHA13",name:"Foto Oficial Gana"},{id:"GHA14",name:"Mohammed Kudus"},{id:"GHA15",name:"Inaki Williams"},
    {id:"GHA16",name:"Jordan Ayew"},{id:"GHA17",name:"André Ayew"},{id:"GHA18",name:"Joseph Paintsil"},
    {id:"GHA19",name:"Osman Bukari"},{id:"GHA20",name:"Antoine Semenyo"},
  ]},
  { id:"CPV", name:"Cabo Verde", color:"#003893", stickers:[
    {id:"CPV1",name:"Escudo Cabo Verde",foil:true},{id:"CPV2",name:"Vozinha"},{id:"CPV3",name:"Logan Costa"},
    {id:"CPV4",name:"Pico"},{id:"CPV5",name:"Diney"},{id:"CPV6",name:"Steven Moreira"},
    {id:"CPV7",name:"Wágner Pina"},{id:"CPV8",name:"Joao Paulo"},{id:"CPV9",name:"Yannick Semedo"},
    {id:"CPV10",name:"Kevin Pina"},{id:"CPV11",name:"Patrick Andrade"},{id:"CPV12",name:"Jamiro Monteiro"},
    {id:"CPV13",name:"Foto Oficial Cabo Verde"},{id:"CPV14",name:"Deroy Duarte"},{id:"CPV15",name:"Garry Rodrigues"},
    {id:"CPV16",name:"Jovane Cabral"},{id:"CPV17",name:"Ryan Mendes"},{id:"CPV18",name:"Dailon Livramento"},
    {id:"CPV19",name:"Willy Semedo"},{id:"CPV20",name:"Bebé"},
  ]},
  { id:"COD", name:"Congo DR", color:"#007FFF", stickers:[
    {id:"COD1",name:"Escudo Congo DR",foil:true},{id:"COD2",name:"Lionel Mpasi"},{id:"COD3",name:"Aaron Wan-Bissaka"},
    {id:"COD4",name:"Axel Tuanzebe"},{id:"COD5",name:"Arthur Masuaku"},{id:"COD6",name:"Chancel Mbemba"},
    {id:"COD7",name:"Joris Kayembe"},{id:"COD8",name:"Charles Pickel"},{id:"COD9",name:"Ngal'ayel Mukau"},
    {id:"COD10",name:"Edo Kayembe"},{id:"COD11",name:"Samuel Moutoussamy"},{id:"COD12",name:"Noah Sadiki"},
    {id:"COD13",name:"Foto Oficial Congo DR"},{id:"COD14",name:"Théo Bongonda"},{id:"COD15",name:"Meschack Elia"},
    {id:"COD16",name:"Yoane Wissa"},{id:"COD17",name:"Brian Cipenga"},{id:"COD18",name:"Fiston Mayele"},
    {id:"COD19",name:"Cédric Bakambu"},{id:"COD20",name:"Nathanaël Mbuku"},
  ]},
  { id:"CUW", name:"Curaçao", color:"#002B7F", stickers:[
    {id:"CUW1",name:"Escudo Curaçao",foil:true},{id:"CUW2",name:"Eloy Room"},{id:"CUW3",name:"Armando Obispo"},
    {id:"CUW4",name:"Sherel Floranus"},{id:"CUW5",name:"Jurriën Gaari"},{id:"CUW6",name:"Joshua Brenet"},
    {id:"CUW7",name:"Roshon van Eijma"},{id:"CUW8",name:"Shurandy Sambo"},{id:"CUW9",name:"Livano Comenencia"},
    {id:"CUW10",name:"Godfried Roemeratoe"},{id:"CUW11",name:"Juninho Bacuna"},{id:"CUW12",name:"Leandro Bacuna"},
    {id:"CUW13",name:"Foto Oficial Curaçao"},{id:"CUW14",name:"Tahith Chong"},{id:"CUW15",name:"Kenji Gorre"},
    {id:"CUW16",name:"Jearl Margaritha"},{id:"CUW17",name:"Jürgen Locadia"},{id:"CUW18",name:"Jeremy Antonisse"},
    {id:"CUW19",name:"Gervane Kastaneer"},{id:"CUW20",name:"Sonnyje Hansen"},
  ]},
  { id:"CIV", name:"Costa do Marfim", color:"#F77F00", stickers:[
    {id:"CIV1",name:"Escudo Costa do Marfim",foil:true},{id:"CIV2",name:"Yahia Fofana"},{id:"CIV3",name:"Ghislain Konan"},
    {id:"CIV4",name:"Wilfried Singo"},{id:"CIV5",name:"Odilon Kossounou"},{id:"CIV6",name:"Evan Ndicka"},
    {id:"CIV7",name:"Willy Boly"},{id:"CIV8",name:"Emmanuel Agbadou"},{id:"CIV9",name:"Ousmane Diomande"},
    {id:"CIV10",name:"Franck Kessie"},{id:"CIV11",name:"Seko Fofana"},{id:"CIV12",name:"Ibrahim Sangare"},
    {id:"CIV13",name:"Foto Oficial Costa do Marfim"},{id:"CIV14",name:"Jean-Philippe Gbamin"},{id:"CIV15",name:"Amad Diallo"},
    {id:"CIV16",name:"Sebastien Haller"},{id:"CIV17",name:"Simon Adingra"},{id:"CIV18",name:"Van Ousmane Diomande"},
    {id:"CIV19",name:"Evann Guessand"},{id:"CIV20",name:"Oumar Diakite"},
  ]},
  { id:"AUT", name:"Áustria", color:"#ED2939", stickers:[
    {id:"AUT1",name:"Escudo Áustria",foil:true},{id:"AUT2",name:"Alexander Schlager"},{id:"AUT3",name:"Patrick Pentz"},
    {id:"AUT4",name:"David Alaba"},{id:"AUT5",name:"Kevin Danso"},{id:"AUT6",name:"Philipp Lienhart"},
    {id:"AUT7",name:"Stefan Posch"},{id:"AUT8",name:"Phillipp Mwene"},{id:"AUT9",name:"Alexander Prass"},
    {id:"AUT10",name:"Xaver Schlager"},{id:"AUT11",name:"Marcel Sabitzer"},{id:"AUT12",name:"Konrad Laimer"},
    {id:"AUT13",name:"Foto Oficial Áustria"},{id:"AUT14",name:"Florian Grillitsch"},{id:"AUT15",name:"Nicolas Seiwald"},
    {id:"AUT16",name:"Romano Schmid"},{id:"AUT17",name:"Patrick Wimmer"},{id:"AUT18",name:"Christoph Baumgartner"},
    {id:"AUT19",name:"Michael Gregoritsch"},{id:"AUT20",name:"Marko Arnautovic"},
  ]},
  { id:"SWE", name:"Suécia", color:"#006AA7", stickers:[
    {id:"SWE1",name:"Escudo Suécia",foil:true},{id:"SWE2",name:"Viktor Johansson"},{id:"SWE3",name:"Isak Hien"},
    {id:"SWE4",name:"Gabriel Gudmundsson"},{id:"SWE5",name:"Emil Holm"},{id:"SWE6",name:"Victor Nilsson Lindelof"},
    {id:"SWE7",name:"Gustaf Lagerbielke"},{id:"SWE8",name:"Lucas Bergvall"},{id:"SWE9",name:"Hugo Larsson"},
    {id:"SWE10",name:"Jesper Karlstrom"},{id:"SWE11",name:"Mattias Svanberg"},{id:"SWE12",name:"Robin Olsen"},
    {id:"SWE13",name:"Foto Oficial Suécia"},{id:"SWE14",name:"Daniel Svensson"},{id:"SWE15",name:"Ken Sema"},
    {id:"SWE16",name:"Roony Bardghji"},{id:"SWE17",name:"Dejan Kulusevski"},{id:"SWE18",name:"Anthony Elanga"},
    {id:"SWE19",name:"Alexander Isak"},{id:"SWE20",name:"Viktor Gyokeres"},
  ]},
  { id:"TUN", name:"Tunísia", color:"#E70013", stickers:[
    {id:"TUN1",name:"Escudo Tunísia",foil:true},{id:"TUN2",name:"Bechir Ben Saïd"},{id:"TUN3",name:"Aymen Dahmen"},
    {id:"TUN4",name:"Yan Valery"},{id:"TUN5",name:"Montassar Talbi"},{id:"TUN6",name:"Yassine Meriah"},
    {id:"TUN7",name:"Ali Abdi"},{id:"TUN8",name:"Dylan Bronn"},{id:"TUN9",name:"Ellyes Skhiri"},
    {id:"TUN10",name:"Aïssa Laïdouni"},{id:"TUN11",name:"Ferjani Sassi"},{id:"TUN12",name:"Mohamed Ali Ben Romdhane"},
    {id:"TUN13",name:"Foto Oficial Tunísia"},{id:"TUN14",name:"Hannibal Mejbri"},{id:"TUN15",name:"Elias Achouri"},
    {id:"TUN16",name:"Elias Saad"},{id:"TUN17",name:"Hazem Mastouri"},{id:"TUN18",name:"Ismaël Gharbi"},
    {id:"TUN19",name:"Sayfallah Ltaief"},{id:"TUN20",name:"Naïm Sliti"},
  ]},
  { id:"IRN", name:"Irã", color:"#239F40", stickers:[
    {id:"IRN1",name:"Escudo Irã",foil:true},{id:"IRN2",name:"Alireza Beiranvand"},{id:"IRN3",name:"Morteza Pouraliganji"},
    {id:"IRN4",name:"Ehsan Hajsafi"},{id:"IRN5",name:"Milad Mohammadi"},{id:"IRN6",name:"Shouja Khalilzadeh"},
    {id:"IRN7",name:"Ramin Rezaeian"},{id:"IRN8",name:"Hossein Kanaani"},{id:"IRN9",name:"Sadegh Moharrami"},
    {id:"IRN10",name:"Saleh Hardani"},{id:"IRN11",name:"Saeed Ezatolahi"},{id:"IRN12",name:"Saman Ghoddos"},
    {id:"IRN13",name:"Foto Oficial Irã"},{id:"IRN14",name:"Omid Noorafkan"},{id:"IRN15",name:"Roozbeh Cheshmi"},
    {id:"IRN16",name:"Mohammad Mohebi"},{id:"IRN17",name:"Sardar Azmoun"},{id:"IRN18",name:"Mehdi Taremi"},
    {id:"IRN19",name:"Alireza Jahanbakhsh"},{id:"IRN20",name:"Ali Gholizadeh"},
  ]},
  { id:"NZL", name:"Nova Zelândia", color:"#00247D", stickers:[
    {id:"NZL1",name:"Escudo Nova Zelândia",foil:true},{id:"NZL2",name:"Max Crocombe"},{id:"NZL3",name:"Alex Paulsen"},
    {id:"NZL4",name:"Michael Boxall"},{id:"NZL5",name:"Liberato Cacace"},{id:"NZL6",name:"Tim Payne"},
    {id:"NZL7",name:"Tyler Bindon"},{id:"NZL8",name:"Francis de Vries"},{id:"NZL9",name:"Finn Surman"},
    {id:"NZL10",name:"Joe Bell"},{id:"NZL11",name:"Sarpreet Singh"},{id:"NZL12",name:"Ryan Thomas"},
    {id:"NZL13",name:"Foto Oficial Nova Zelândia"},{id:"NZL14",name:"Matthew Garbett"},{id:"NZL15",name:"Marko Stamenic"},
    {id:"NZL16",name:"Ben Old"},{id:"NZL17",name:"Chris Wood"},{id:"NZL18",name:"Elijah Just"},
    {id:"NZL19",name:"Callum McCowatt"},{id:"NZL20",name:"Kosta Barbarouses"},
  ]},
  { id:"KSA", name:"Arábia Saudita", color:"#006C35", stickers:[
    {id:"KSA1",name:"Escudo Arábia Saudita",foil:true},{id:"KSA2",name:"Nawaf Alaqidi"},{id:"KSA3",name:"Abdulrahman Alsanbi"},
    {id:"KSA4",name:"Saud Abdulhamid"},{id:"KSA5",name:"Nawaf Buwashl"},{id:"KSA6",name:"Jihad Thakri"},
    {id:"KSA7",name:"Moteb Alharbi"},{id:"KSA8",name:"Hassan Altambakti"},{id:"KSA9",name:"Musab Aljuwayr"},
    {id:"KSA10",name:"Ziyad Aljohani"},{id:"KSA11",name:"Abdullah Alkhaibari"},{id:"KSA12",name:"Nasser Aldawsari"},
    {id:"KSA13",name:"Foto Oficial Arábia Saudita"},{id:"KSA14",name:"Saleh Abualshamat"},{id:"KSA15",name:"Marwan Alsahafi"},
    {id:"KSA16",name:"Salem Aldawsari"},{id:"KSA17",name:"Abdulrahman Alobud"},{id:"KSA18",name:"Feras Alburaikan"},
    {id:"KSA19",name:"Saleh Alshehri"},{id:"KSA20",name:"Abdullah Alhamddan"},
  ]},
  { id:"UZB", name:"Uzbequistão", color:"#1EB53A", stickers:[
    {id:"UZB1",name:"Escudo Uzbequistão",foil:true},{id:"UZB2",name:"Utkir Yusupov"},{id:"UZB3",name:"Farrukh Sayfiev"},
    {id:"UZB4",name:"Sherzod Nasrullaev"},{id:"UZB5",name:"Umar Eshmurodov"},{id:"UZB6",name:"Husniddin Aliqulov"},
    {id:"UZB7",name:"Rustam Ashurmatov"},{id:"UZB8",name:"Khojiakbar Alijonov"},{id:"UZB9",name:"Abdukodir Khusanov"},
    {id:"UZB10",name:"Odiljon Hamrobekov"},{id:"UZB11",name:"Otabek Shukurov"},{id:"UZB12",name:"Jamshid Iskanderov"},
    {id:"UZB13",name:"Foto Oficial Uzbequistão"},{id:"UZB14",name:"Azbek Turgunboev"},{id:"UZB15",name:"Khojimat Erkinov"},
    {id:"UZB16",name:"Eldor Shomurodov"},{id:"UZB17",name:"Oston Urunov"},{id:"UZB18",name:"Jaloliddin Masharipov"},
    {id:"UZB19",name:"Igor Sergeev"},{id:"UZB20",name:"Abbosbek Fayzullaev"},
  ]},
  { id:"JOR", name:"Jordânia", color:"#007A3D", stickers:[
    {id:"JOR1",name:"Escudo Jordânia",foil:true},{id:"JOR2",name:"Yazeed Abulaila"},{id:"JOR3",name:"Ehsan Haddad"},
    {id:"JOR4",name:"Mohammad Abu Hashish"},{id:"JOR5",name:"Yazan Al-Arab"},{id:"JOR6",name:"Abdallah Nasib"},
    {id:"JOR7",name:"Saleem Obaid"},{id:"JOR8",name:"Mohammad Abualnadi"},{id:"JOR9",name:"Ibrahim Saadeh"},
    {id:"JOR10",name:"Nizar Al-Rashdan"},{id:"JOR11",name:"Noor Al-Rawabdeh"},{id:"JOR12",name:"Mohannad Abu Taha"},
    {id:"JOR13",name:"Foto Oficial Jordânia"},{id:"JOR14",name:"Amer Jamous"},{id:"JOR15",name:"Mousa Al-Taamari"},
    {id:"JOR16",name:"Yazan Al-Naimat"},{id:"JOR17",name:"Mahmoud Al-Mardi"},{id:"JOR18",name:"Ali Olwan"},
    {id:"JOR19",name:"Mohammad Abu Zrayq"},{id:"JOR20",name:"Ibrahim Sabra"},
  ]},
  { id:"IRQ", name:"Iraque", color:"#CE1126", stickers:[
    {id:"IRQ1",name:"Escudo Iraque",foil:true},{id:"IRQ2",name:"Jalal Hassan"},{id:"IRQ3",name:"Rebin Sulaka"},
    {id:"IRQ4",name:"Hussein Ali"},{id:"IRQ5",name:"Akam Hashem"},{id:"IRQ6",name:"Merchas Doski"},
    {id:"IRQ7",name:"Zaid Tahseen"},{id:"IRQ8",name:"Manaf Younis"},{id:"IRQ9",name:"Zidane Iqbal"},
    {id:"IRQ10",name:"Amir Al-Ammari"},{id:"IRQ11",name:"Ibrahim Bayesh"},{id:"IRQ12",name:"Ali Jasim"},
    {id:"IRQ13",name:"Foto Oficial Iraque"},{id:"IRQ14",name:"Youssef Amyn"},{id:"IRQ15",name:"Aymar Sher"},
    {id:"IRQ16",name:"Marju Farji"},{id:"IRQ17",name:"Osama Rashid"},{id:"IRQ18",name:"Ali Al-Hamadi"},
    {id:"IRQ19",name:"Aymen Hussein"},{id:"IRQ20",name:"Mohanad Ali"},
  ]},
  { id:"NOR", name:"Noruega", color:"#EF2B2D", stickers:[
    {id:"NOR1",name:"Escudo Noruega",foil:true},{id:"NOR2",name:"Orjan Nyland"},{id:"NOR3",name:"Julian Ryerson"},
    {id:"NOR4",name:"Leo Østigård"},{id:"NOR5",name:"Kristoffer Vassbakk Ajer"},{id:"NOR6",name:"Marcus Holmgren Pedersen"},
    {id:"NOR7",name:"David Moller Wolfe"},{id:"NOR8",name:"Torbjørn Heggem"},{id:"NOR9",name:"Morten Thorsby"},
    {id:"NOR10",name:"Martin Ødegaard"},{id:"NOR11",name:"Sander Berge"},{id:"NOR12",name:"Andreas Schjelderup"},
    {id:"NOR13",name:"Foto Oficial Noruega"},{id:"NOR14",name:"Patrick Berg"},{id:"NOR15",name:"Erling Haaland"},
    {id:"NOR16",name:"Alexander Sorloth"},{id:"NOR17",name:"Aron Dønnum"},{id:"NOR18",name:"Jørgen Strand Larsen"},
    {id:"NOR19",name:"Antonio Nusa"},{id:"NOR20",name:"Oscar Bobb"},
  ]},
  { id:"PAN", name:"Panamá", color:"#005293", stickers:[
    {id:"PAN1",name:"Escudo Panamá",foil:true},{id:"PAN2",name:"Orlando Mosquera"},{id:"PAN3",name:"Luis Mejía"},
    {id:"PAN4",name:"Fidel Escobar"},{id:"PAN5",name:"Andres Andrade"},{id:"PAN6",name:"Michael Amir Murillo"},
    {id:"PAN7",name:"Eric Davis"},{id:"PAN8",name:"José Córdoba"},{id:"PAN9",name:"César Blackman"},
    {id:"PAN10",name:"Cristian Martinez"},{id:"PAN11",name:"Anibal Godoy"},{id:"PAN12",name:"Adalberto Carrasquilla"},
    {id:"PAN13",name:"Foto Oficial Panamá"},{id:"PAN14",name:"Edgar Barcenas"},{id:"PAN15",name:"Carlos Harvey"},
    {id:"PAN16",name:"Ismael Diaz"},{id:"PAN17",name:"Jose Fajardo"},{id:"PAN18",name:"Cecilio Waterman"},
    {id:"PAN19",name:"Jose Luis Rodriguez"},{id:"PAN20",name:"Alberto Quintero"},
  ]},
  { id:"CC", name:"Coca-Cola", color:"#F40009", stickers:[
    {id:"CC1",name:"Lamine Yamal"},{id:"CC2",name:"Joshua Kimmich"},
    {id:"CC3",name:"Harry Kane"},{id:"CC4",name:"Santiago Giménez"},
    {id:"CC5",name:"Joško Gvardiol"},{id:"CC6",name:"Federico Valverde"},
    {id:"CC7",name:"Jefferson Lerma"},{id:"CC8",name:"Enner Valencia"},
    {id:"CC9",name:"Gabriel Magalhães"},{id:"CC10",name:"Virgil van Dijk"},
    {id:"CC11",name:"Alphonso Davies"},{id:"CC12",name:"Emiliano Martínez"},
    {id:"CC13",name:"Raúl Jiménez"},{id:"CC14",name:"Lautaro Martínez"},
  ]},
];

// LENDAS — NÃO contam no % do álbum
const LEGENDS = [
  { id:"LEG", name:"Lendas", color:"#8B5CF6", stickers:[
    {id:"EXT11-BRD",name:"Lionel Messi (BRD)"},{id:"EXT11-BRZ",name:"Lionel Messi (BRZ)"},{id:"EXT11-PRT",name:"Lionel Messi (PRT)"},{id:"EXT11-OUR",name:"Lionel Messi (OUR)"},
    {id:"EXT12-BRD",name:"Kylian Mbappé (BRD)"},{id:"EXT12-BRZ",name:"Kylian Mbappé (BRZ)"},{id:"EXT12-PRT",name:"Kylian Mbappé (PRT)"},{id:"EXT12-OUR",name:"Kylian Mbappé (OUR)"},
    {id:"EXT13-BRD",name:"Vinícius Júnior (BRD)"},{id:"EXT13-BRZ",name:"Vinícius Júnior (BRZ)"},{id:"EXT13-PRT",name:"Vinícius Júnior (PRT)"},{id:"EXT13-OUR",name:"Vinícius Júnior (OUR)"},
    {id:"EXT14-BRD",name:"Jude Bellingham (BRD)"},{id:"EXT14-BRZ",name:"Jude Bellingham (BRZ)"},{id:"EXT14-PRT",name:"Jude Bellingham (PRT)"},{id:"EXT14-OUR",name:"Jude Bellingham (OUR)"},
    {id:"EXT15-BRD",name:"Moisés Caicedo (BRD)"},{id:"EXT15-BRZ",name:"Moisés Caicedo (BRZ)"},{id:"EXT15-PRT",name:"Moisés Caicedo (PRT)"},{id:"EXT15-OUR",name:"Moisés Caicedo (OUR)"},
    {id:"EXT16-BRD",name:"Cristiano Ronaldo (BRD)"},{id:"EXT16-BRZ",name:"Cristiano Ronaldo (BRZ)"},{id:"EXT16-PRT",name:"Cristiano Ronaldo (PRT)"},{id:"EXT16-OUR",name:"Cristiano Ronaldo (OUR)"},
    {id:"EXT17-BRD",name:"Erling Haaland (BRD)"},{id:"EXT17-BRZ",name:"Erling Haaland (BRZ)"},{id:"EXT17-PRT",name:"Erling Haaland (PRT)"},{id:"EXT17-OUR",name:"Erling Haaland (OUR)"},
    {id:"EXT18-BRD",name:"Mohamed Salah (BRD)"},{id:"EXT18-BRZ",name:"Mohamed Salah (BRZ)"},{id:"EXT18-PRT",name:"Mohamed Salah (PRT)"},{id:"EXT18-OUR",name:"Mohamed Salah (OUR)"},
    {id:"EXT19-BRD",name:"Achraf Hakimi (BRD)"},{id:"EXT19-BRZ",name:"Achraf Hakimi (BRZ)"},{id:"EXT19-PRT",name:"Achraf Hakimi (PRT)"},{id:"EXT19-OUR",name:"Achraf Hakimi (OUR)"},
    {id:"EXT20-BRD",name:"Christian Pulisic (BRD)"},{id:"EXT20-BRZ",name:"Christian Pulisic (BRZ)"},{id:"EXT20-PRT",name:"Christian Pulisic (PRT)"},{id:"EXT20-OUR",name:"Christian Pulisic (OUR)"},
    {id:"EXT01-BRD",name:"Lamine Yamal (BRD)"},{id:"EXT01-BRZ",name:"Lamine Yamal (BRZ)"},{id:"EXT01-PRT",name:"Lamine Yamal (PRT)"},{id:"EXT01-OUR",name:"Lamine Yamal (OUR)"},
    {id:"EXT02-BRD",name:"Jérémy Doku (BRD)"},{id:"EXT02-BRZ",name:"Jérémy Doku (BRZ)"},{id:"EXT02-PRT",name:"Jérémy Doku (PRT)"},{id:"EXT02-OUR",name:"Jérémy Doku (OUR)"},
    {id:"EXT03-BRD",name:"Cody Gakpo (BRD)"},{id:"EXT03-BRZ",name:"Cody Gakpo (BRZ)"},{id:"EXT03-PRT",name:"Cody Gakpo (PRT)"},{id:"EXT03-OUR",name:"Cody Gakpo (OUR)"},
    {id:"EXT04-BRD",name:"Luka Modrić (BRD)"},{id:"EXT04-BRZ",name:"Luka Modrić (BRZ)"},{id:"EXT04-PRT",name:"Luka Modrić (PRT)"},{id:"EXT04-OUR",name:"Luka Modrić (OUR)"},
    {id:"EXT05-BRD",name:"Son Heung-min (BRD)"},{id:"EXT05-BRZ",name:"Son Heung-min (BRZ)"},{id:"EXT05-PRT",name:"Son Heung-min (PRT)"},{id:"EXT05-OUR",name:"Son Heung-min (OUR)"},
    {id:"EXT06-BRD",name:"Raúl Jiménez (BRD)"},{id:"EXT06-BRZ",name:"Raúl Jiménez (BRZ)"},{id:"EXT06-PRT",name:"Raúl Jiménez (PRT)"},{id:"EXT06-OUR",name:"Raúl Jiménez (OUR)"},
    {id:"EXT07-BRD",name:"Florian Wirtz (BRD)"},{id:"EXT07-BRZ",name:"Florian Wirtz (BRZ)"},{id:"EXT07-PRT",name:"Florian Wirtz (PRT)"},{id:"EXT07-OUR",name:"Florian Wirtz (OUR)"},
    {id:"EXT08-BRD",name:"Federico Valverde (BRD)"},{id:"EXT08-BRZ",name:"Federico Valverde (BRZ)"},{id:"EXT08-PRT",name:"Federico Valverde (PRT)"},{id:"EXT08-OUR",name:"Federico Valverde (OUR)"},
    {id:"EXT09-BRD",name:"Luis Díaz (BRD)"},{id:"EXT09-BRZ",name:"Luis Díaz (BRZ)"},{id:"EXT09-PRT",name:"Luis Díaz (PRT)"},{id:"EXT09-OUR",name:"Luis Díaz (OUR)"},
    {id:"EXT10-BRD",name:"Alphonso Davies (BRD)"},{id:"EXT10-BRZ",name:"Alphonso Davies (BRZ)"},{id:"EXT10-PRT",name:"Alphonso Davies (PRT)"},{id:"EXT10-OUR",name:"Alphonso Davies (OUR)"},
  ]},
];

const ALL_SECTIONS = [...TEAMS, ...LEGENDS];
const TOTAL = TEAMS.reduce((acc, t) => acc + t.stickers.length, 0);

const FLAG = {
  FWC:"",MEX:"mx",RSA:"za",KOR:"kr",CZE:"cz",CAN:"ca",BIH:"ba",QAT:"qa",
  SUI:"ch",BRA:"br",MAR:"ma",HAI:"ht",SCO:"gb-sct",USA:"us",PAR:"py",AUS:"au",
  TUR:"tr",ARG:"ar",ESP:"es",FRA:"fr",GER:"de",POR:"pt",ENG:"gb-eng",NED:"nl",
  BEL:"be",COL:"co",URU:"uy",CRO:"hr",SEN:"sn",JPN:"jp",ECU:"ec",
  ALG:"dz",EGY:"eg",GHA:"gh",CPV:"cv",COD:"cd",CUW:"cw",CIV:"ci",AUT:"at",
  SWE:"se",TUN:"tn",IRN:"ir",NZL:"nz",KSA:"sa",UZB:"uz",JOR:"jo",IRQ:"iq",
  NOR:"no",PAN:"pa",CC:"",LEG:"",
};

const SCO_FLAG = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/40px-Flag_of_Scotland.svg.png";

const FlagImg = ({ code, size=32 }) => {
  if (!code) return <span style={{fontSize:size*0.8,lineHeight:1}}>🏆</span>;
  if (code === "gb-sct") return <img src={SCO_FLAG} width={size*1.4} height={size} style={{objectFit:"contain",borderRadius:3}} alt="Scotland" />;
  const upper = code.replace("gb-eng","GB").toUpperCase();
  return <img src={`https://flagsapi.com/${upper}/flat/64.png`} width={size*1.4} height={size}
    style={{objectFit:"contain",borderRadius:3}} alt={upper}
    onError={e=>{e.target.style.display="none"}} />;
};

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [state, setState] = useState({glued:{},repeats:{}});
  const [view, setView] = useState("album");
  const [activeSection, setActiveSection] = useState(null);
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => { loadState().then(s=>{setState(s);setLoaded(true);}); }, []);

  const persist = useCallback(async(next) => { setState(next); await saveState(next); }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null),2000); };

  const toggleGlued = (id) => {
    const next = {...state, glued:{...state.glued}};
    if(next.glued[id]) delete next.glued[id]; else next.glued[id]=true;
    if(next.glued[id]) showToast(`✅ ${id} colada!`);
    persist(next);
  };

  const setRepeats = (id, val) => {
    const next = {...state, repeats:{...state.repeats}};
    const n = Math.max(0, parseInt(val)||0);
    if(n===0) delete next.repeats[id]; else next.repeats[id]=n;
    persist(next);
  };

  const totalRepeats = Object.values(state.repeats).reduce((a,b)=>a+b,0);
  const teamGlued = TEAMS.reduce((acc,t) => acc + t.stickers.filter(s=>state.glued[s.id]).length, 0);
  const totalMissing = TOTAL - teamGlued;
  const pct = Math.round((teamGlued/TOTAL)*100);

  const filteredSections = ALL_SECTIONS.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.stickers.some(s => s.id.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase()))
  );

  const C = {
    bg:"#f5f5f0", card:"#ffffff", border:"#e0ddd5",
    accent:"#e8402a", accentB:"#1a3fa0", accentG:"#2a9a4a",
    gold:"#C9A84C", text:"#1a1a1a", textSub:"#666", textFaint:"#aaa",
    glued:"#eaf7ed", gluedBorder:"#6abf7a", legend:"#f3eeff", legendBorder:"#8B5CF6",
  };

  if(!loaded) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:C.bg,color:C.text,fontFamily:"Arial",fontSize:18}}>Carregando álbum...</div>;

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"Arial, sans-serif"}}>

      {/* HEADER */}
      <div style={{background:"#fff",borderBottom:`3px solid ${C.accent}`,padding:"14px 20px",boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
        <div style={{maxWidth:960,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:10}}>
            <div style={{background:C.accent,borderRadius:10,padding:"6px 10px"}}><span style={{fontSize:28}}>🏆</span></div>
            <div style={{flex:1}}>
              <div style={{fontSize:20,fontWeight:900,color:C.text,letterSpacing:1,textTransform:"uppercase"}}>FIFA World Cup 2026</div>
              <div style={{fontSize:13,color:C.textSub,fontWeight:600}}>Álbum do Dudu</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:28,fontWeight:900,color:C.accent}}>{pct}%</div>
              <div style={{fontSize:13,color:C.textSub}}>{teamGlued}/{TOTAL}</div>
            </div>
          </div>
          <div style={{background:"#eee",borderRadius:6,height:8,overflow:"hidden",marginBottom:10}}>
            <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${C.accent},${C.gold})`,borderRadius:6,transition:"width 0.4s ease"}} />
          </div>
          <div style={{display:"flex",gap:20,fontSize:14,fontWeight:700}}>
            <span style={{color:C.accentG}}>✅ {teamGlued} coladas</span>
            <span style={{color:C.accent}}>❌ {totalMissing} faltando</span>
            <span style={{color:C.accentB}}>📦 {totalRepeats} repetidas</span>
          </div>
        </div>
      </div>

      {/* NAV */}
      <div style={{background:"#fff",borderBottom:`1px solid ${C.border}`,display:"flex",overflowX:"auto"}}>
        <div style={{maxWidth:960,margin:"0 auto",display:"flex",width:"100%"}}>
          {[["album","📖 Álbum"],["missing","❌ Faltando"],["repeats","📦 Repetidas"]].map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)} style={{
              padding:"14px 22px",border:"none",cursor:"pointer",fontSize:15,fontWeight:800,
              background:"transparent",color:view===v?C.accentB:C.textSub,
              borderBottom:view===v?`3px solid ${C.accentB}`:"3px solid transparent",
              whiteSpace:"nowrap",transition:"all 0.15s",textTransform:"uppercase",letterSpacing:0.5
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{padding:"20px 16px",maxWidth:960,margin:"0 auto"}}>

        {/* ÁLBUM */}
        {view==="album" && (
          <>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Buscar seleção ou figurinha..."
              style={{width:"100%",padding:"12px 16px",background:"#fff",border:`2px solid ${C.border}`,borderRadius:10,color:C.text,fontSize:15,marginBottom:18,boxSizing:"border-box",outline:"none"}} />
            {/* Label Lendas */}
            <div style={{fontSize:12,fontWeight:700,color:C.textFaint,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Álbum Principal</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(170px, 1fr))",gap:12,marginBottom:24}}>
              {filteredSections.filter(t=>!LEGENDS.find(l=>l.id===t.id)).map(team=>{
                const total=team.stickers.length;
                const done=team.stickers.filter(s=>state.glued[s.id]).length;
                const rpts=team.stickers.filter(s=>state.repeats[s.id]>0).reduce((a,s)=>a+state.repeats[s.id],0);
                const p=Math.round((done/total)*100);
                const complete=done===total;
                return (
                  <div key={team.id} onClick={()=>{setActiveSection(team.id);setView("team");}}
                    style={{background:complete?"#fffbea":C.card,border:`2px solid ${complete?C.gold:C.border}`,borderRadius:12,padding:14,cursor:"pointer",transition:"all 0.15s",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                      <FlagImg code={FLAG[team.id]} size={28} />
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:14,fontWeight:800,color:complete?C.gold:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{team.name}</div>
                        <div style={{fontSize:12,color:C.textFaint,fontWeight:600}}>{team.id}</div>
                      </div>
                    </div>
                    <div style={{background:"#eee",borderRadius:4,height:5,marginBottom:8,overflow:"hidden"}}>
                      <div style={{width:`${p}%`,height:"100%",background:complete?C.gold:C.accentG,borderRadius:4}} />
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontWeight:700}}>
                      <span style={{color:C.accentG}}>{done}/{total}</span>
                      {rpts>0&&<span style={{color:C.accentB}}>📦 {rpts}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Seção Lendas */}
            {filteredSections.some(t=>LEGENDS.find(l=>l.id===t.id)) && (
              <>
                <div style={{fontSize:12,fontWeight:700,color:"#8B5CF6",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>⭐ Lendas — não contam no %</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(170px, 1fr))",gap:12}}>
                  {filteredSections.filter(t=>LEGENDS.find(l=>l.id===t.id)).map(team=>{
                    const total=team.stickers.length;
                    const done=team.stickers.filter(s=>state.glued[s.id]).length;
                    const rpts=team.stickers.filter(s=>state.repeats[s.id]>0).reduce((a,s)=>a+state.repeats[s.id],0);
                    const p=Math.round((done/total)*100);
                    return (
                      <div key={team.id} onClick={()=>{setActiveSection(team.id);setView("team");}}
                        style={{background:C.legend,border:`2px solid ${C.legendBorder}`,borderRadius:12,padding:14,cursor:"pointer",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
                        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                          <span style={{fontSize:24}}>⭐</span>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:14,fontWeight:800,color:"#8B5CF6"}}>{team.name}</div>
                            <div style={{fontSize:11,color:C.textFaint}}>não conta no %</div>
                          </div>
                        </div>
                        <div style={{background:"#e9d5ff",borderRadius:4,height:5,marginBottom:8,overflow:"hidden"}}>
                          <div style={{width:`${p}%`,height:"100%",background:"#8B5CF6",borderRadius:4}} />
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontWeight:700}}>
                          <span style={{color:"#8B5CF6"}}>{done}/{total}</span>
                          {rpts>0&&<span style={{color:C.accentB}}>📦 {rpts}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}

        {/* DETALHE SEÇÃO */}
        {view==="team" && activeSection && (()=>{
          const team=ALL_SECTIONS.find(t=>t.id===activeSection);
          if(!team) return null;
          const done=team.stickers.filter(s=>state.glued[s.id]).length;
          const isLegend=!!LEGENDS.find(l=>l.id===team.id);
          const accentColor=isLegend?"#8B5CF6":C.accentB;
          return (
            <>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18,background:"#fff",borderRadius:12,padding:"12px 16px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
                <button onClick={()=>setView("album")} style={{background:accentColor,border:"none",borderRadius:8,color:"#fff",padding:"8px 16px",cursor:"pointer",fontSize:14,fontWeight:700}}>← Voltar</button>
                {isLegend?<span style={{fontSize:28}}>⭐</span>:<FlagImg code={FLAG[team.id]} size={32} />}
                <div>
                  <div style={{fontSize:18,fontWeight:900,color:C.text}}>{team.name}</div>
                  <div style={{fontSize:13,color:C.textSub,fontWeight:600}}>{done}/{team.stickers.length} coladas{isLegend?" · não conta no %":""}</div>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(140px, 1fr))",gap:10}}>
                {team.stickers.map(s=>{
                  const isGlued=!!state.glued[s.id];
                  const rpt=state.repeats[s.id]||0;
                  return (
                    <div key={s.id} style={{background:isGlued?(isLegend?"#f3eeff":C.glued):C.card,border:`2px solid ${isGlued?(isLegend?C.legendBorder:C.gluedBorder):C.border}`,borderRadius:10,padding:10,position:"relative",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}}>
                      {s.foil&&<span style={{position:"absolute",top:5,right:5,fontSize:10,background:C.gold,color:"#fff",borderRadius:3,padding:"1px 5px",fontWeight:700}}>FOIL</span>}
                      <div style={{fontSize:13,fontWeight:800,color:isLegend?"#8B5CF6":C.accent,marginBottom:2}}>{s.id}</div>
                      <div style={{fontSize:12,color:C.textSub,marginBottom:10,lineHeight:1.4,minHeight:32}}>{s.name}</div>
                      <button onClick={()=>toggleGlued(s.id)} style={{width:"100%",padding:"6px 0",border:"none",borderRadius:6,cursor:"pointer",fontSize:13,fontWeight:800,background:isGlued?(isLegend?"#8B5CF6":C.accentG):accentColor,color:"#fff",marginBottom:8,transition:"all 0.15s"}}>{isGlued?"✅ Colada":"Colar"}</button>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                        <span style={{fontSize:12,color:C.textFaint}}>📦</span>
                        <button onClick={()=>setRepeats(s.id,rpt-1)} style={{background:"#eee",border:"none",color:C.text,width:24,height:24,borderRadius:5,cursor:"pointer",fontSize:15,fontWeight:700,lineHeight:1}}>−</button>
                        <span style={{fontSize:14,fontWeight:800,color:rpt>0?C.accentB:C.textFaint,minWidth:18,textAlign:"center"}}>{rpt}</span>
                        <button onClick={()=>setRepeats(s.id,rpt+1)} style={{background:"#eee",border:"none",color:C.text,width:24,height:24,borderRadius:5,cursor:"pointer",fontSize:15,fontWeight:700,lineHeight:1}}>+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })()}

        {/* FALTANDO */}
        {view==="missing" && (
          <>
            <div style={{fontSize:15,color:C.textSub,marginBottom:16}}>❌ <strong style={{color:C.text}}>{totalMissing}</strong> figurinhas faltando (álbum principal)</div>
            {TEAMS.filter(t=>t.stickers.some(s=>!state.glued[s.id])).map(team=>{
              const missing=team.stickers.filter(s=>!state.glued[s.id]);
              return (
                <div key={team.id} style={{marginBottom:18,background:C.card,borderRadius:12,padding:"12px 14px",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <FlagImg code={FLAG[team.id]} size={22} />
                    <span style={{fontSize:15,fontWeight:800,color:C.text}}>{team.name}</span>
                    <span style={{fontSize:13,color:C.textFaint,fontWeight:600}}>({missing.length} faltando)</span>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {missing.map(s=>(
                      <button key={s.id} onClick={()=>toggleGlued(s.id)} style={{padding:"5px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontSize:13,fontWeight:700,cursor:"pointer"}} title={s.name}>{s.id} <span style={{fontSize:11,color:C.textFaint,fontWeight:400}}>{s.name}</span></button>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* REPETIDAS */}
        {view==="repeats" && (
          <>
            <div style={{fontSize:15,color:C.textSub,marginBottom:16}}>📦 <strong style={{color:C.text}}>{totalRepeats}</strong> figurinhas repetidas no total</div>
            {totalRepeats===0?(
              <div style={{color:C.textFaint,textAlign:"center",padding:48,fontSize:15,background:C.card,borderRadius:12}}>Nenhuma repetida registrada ainda.</div>
            ):(
              ALL_SECTIONS.filter(t=>t.stickers.some(s=>state.repeats[s.id]>0)).map(team=>{
                const rpts=team.stickers.filter(s=>state.repeats[s.id]>0);
                const isLegend=!!LEGENDS.find(l=>l.id===team.id);
                return (
                  <div key={team.id} style={{marginBottom:18,background:C.card,borderRadius:12,padding:"12px 14px",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                      {isLegend?<span>⭐</span>:<FlagImg code={FLAG[team.id]} size={22} />}
                      <span style={{fontSize:15,fontWeight:800,color:C.text}}>{team.name}</span>
                    </div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {rpts.map(s=>(
                        <div key={s.id} style={{padding:"5px 10px",background:"#e8f0fe",border:"1px solid #b8cdf8",borderRadius:6,display:"flex",alignItems:"center",gap:6}}>
                          <span style={{fontSize:13,color:C.accentB,fontWeight:800}}>{s.id}</span>
                          <span style={{fontSize:11,color:C.textSub}}>{s.name}</span>
                          <span style={{fontSize:14,color:"#fff",background:C.accentB,borderRadius:4,padding:"1px 8px",fontWeight:800}}>×{state.repeats[s.id]}</span>
                          <button onClick={()=>setRepeats(s.id,state.repeats[s.id]-1)} style={{background:"transparent",border:"none",color:C.accentB,cursor:"pointer",fontSize:18,fontWeight:700,lineHeight:1,padding:0}}>−</button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>

      {/* TOAST */}
      {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:C.accentG,borderRadius:10,padding:"12px 24px",color:"#fff",fontSize:15,fontWeight:800,zIndex:999,pointerEvents:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.15)"}}>{toast}</div>}
    </div>
  );
}
