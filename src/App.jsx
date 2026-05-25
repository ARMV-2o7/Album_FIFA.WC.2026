import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── SUPABASE CONFIG ──────────────────────────────────────────────────────────
// SUBSTITUA as duas linhas abaixo com seus dados do Supabase (veja o guia)
const SUPABASE_URL = "https://uyhjskxlbmpzjeqrdglg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5aGpza3hsYm1wemplcXJkZ2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NjA2NzUsImV4cCI6MjA5NTIzNjY3NX0.ilYXmea7VprjA1N86T9EPkMoeZKrs838XGNoUkYnf6o";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const DB_KEY = "copa26_v1";

const loadState = async () => {
  try {
    const { data } = await supabase
      .from("album_state")
      .select("value")
      .eq("key", DB_KEY)
      .single();
    return data ? JSON.parse(data.value) : { glued: {}, repeats: {} };
  } catch {
    return { glued: {}, repeats: {} };
  }
};

const saveState = async (state) => {
  try {
    await supabase
      .from("album_state")
      .upsert({ key: DB_KEY, value: JSON.stringify(state) }, { onConflict: "key" });
  } catch {}
};

const TEAMS = [
  { id:"FWC", name:"FIFA WC 2026", flag:"🏆", color:"#C9A84C", stickers:[
    {id:"00",name:"Panini Logo",foil:true},{id:"FWC1",name:"Emblema Oficial",foil:true},{id:"FWC2",name:"Emblema Oficial",foil:true},
    {id:"FWC3",name:"Mascotes Oficiais",foil:true},{id:"FWC4",name:"Slogan Oficial",foil:true},{id:"FWC5",name:"Bola Oficial",foil:true},
    {id:"FWC6",name:"Canadá – Sede",foil:true},{id:"FWC7",name:"México – Sede",foil:true},{id:"FWC8",name:"EUA – Sede",foil:true},
  ]},
  { id:"MEX", name:"México", flag:"🇲🇽", color:"#006847", stickers:[
    {id:"MEX1",name:"Escudo",foil:true},{id:"MEX2",name:"Luis Malagón"},{id:"MEX3",name:"Johan Vasquez"},
    {id:"MEX4",name:"Jorge Sánchez"},{id:"MEX5",name:"Cesar Montes"},{id:"MEX6",name:"Jesus Gallardo"},
    {id:"MEX7",name:"Israel Reyes"},{id:"MEX8",name:"Diego Lainez"},{id:"MEX9",name:"Carlos Rodriguez"},
    {id:"MEX10",name:"Edson Alvarez"},{id:"MEX11",name:"Orbelin Pineda"},{id:"MEX12",name:"Marcel Ruiz"},
    {id:"MEX13",name:"Foto do Time"},{id:"MEX14",name:"Érick Sánchez"},{id:"MEX15",name:"Hirving Lozano"},
    {id:"MEX16",name:"Santiago Giménez"},{id:"MEX17",name:"Raúl Jiménez"},{id:"MEX18",name:"Alexis Vega"},
    {id:"MEX19",name:"Roberto Alvarado"},{id:"MEX20",name:"Cesar Huerta"},
  ]},
  { id:"RSA", name:"África do Sul", flag:"🇿🇦", color:"#007A4D", stickers:[
    {id:"RSA1",name:"Escudo",foil:true},{id:"RSA2",name:"Ronwen Williams"},{id:"RSA3",name:"Sipho Chaine"},
    {id:"RSA4",name:"Aubrey Modiba"},{id:"RSA5",name:"Samukele Kabini"},{id:"RSA6",name:"M. Mbokazi"},
    {id:"RSA7",name:"K. Ndamane"},{id:"RSA8",name:"Siyabonga Ngezana"},{id:"RSA9",name:"Khuliso Mudau"},
    {id:"RSA10",name:"N. Sibisi"},{id:"RSA11",name:"Teboho Mokoena"},{id:"RSA12",name:"T. Mbatha"},
    {id:"RSA13",name:"Foto do Time"},{id:"RSA14",name:"Bathasi Aubaas"},{id:"RSA15",name:"Yaya Sithole"},
    {id:"RSA16",name:"Sipho Mbule"},{id:"RSA17",name:"Lyle Foster"},{id:"RSA18",name:"Iqraam Rayners"},
    {id:"RSA19",name:"Mohau Nkota"},{id:"RSA20",name:"Oswin Appollis"},
  ]},
  { id:"KOR", name:"Coreia do Sul", flag:"🇰🇷", color:"#CD2E3A", stickers:[
    {id:"KOR1",name:"Escudo",foil:true},{id:"KOR2",name:"Hyeon-woo Jo"},{id:"KOR3",name:"Seung-Gyu Kim"},
    {id:"KOR4",name:"Min-jae Kim"},{id:"KOR5",name:"Yu-min Cho"},{id:"KOR6",name:"Young-woo Seol"},
    {id:"KOR7",name:"Han-beom Lee"},{id:"KOR8",name:"Tae-seok Lee"},{id:"KOR9",name:"Myung-jae Lee"},
    {id:"KOR10",name:"Jae-sung Lee"},{id:"KOR11",name:"In-beom Hwang"},{id:"KOR12",name:"Kang-in Lee"},
    {id:"KOR13",name:"Foto do Time"},{id:"KOR14",name:"Seung-ho Paik"},{id:"KOR15",name:"Jens Castrop"},
    {id:"KOR16",name:"Dong-yeong Lee"},{id:"KOR17",name:"Gue-sung Cho"},{id:"KOR18",name:"Heung-min Son"},
    {id:"KOR19",name:"Hee-chan Hwang"},{id:"KOR20",name:"Hyeon-Gyu Oh"},
  ]},
  { id:"CZE", name:"Tchéquia", flag:"🇨🇿", color:"#D7141A", stickers:[
    {id:"CZE1",name:"Escudo",foil:true},{id:"CZE2",name:"Matej Kovar"},{id:"CZE3",name:"Jindrich Stanek"},
    {id:"CZE4",name:"Ladislav Krejci"},{id:"CZE5",name:"Vladimir Coufal"},{id:"CZE6",name:"Jaroslav Zeleny"},
    {id:"CZE7",name:"Tomas Holes"},{id:"CZE8",name:"David Zima"},{id:"CZE9",name:"Michal Sadilek"},
    {id:"CZE10",name:"Lukas Provod"},{id:"CZE11",name:"Lukas Cerv"},{id:"CZE12",name:"Tomas Soucek"},
    {id:"CZE13",name:"Foto do Time"},{id:"CZE14",name:"Pavel Sulc"},{id:"CZE15",name:"Matej Vydra"},
    {id:"CZE16",name:"Vasil Kusej"},{id:"CZE17",name:"Tomas Chory"},{id:"CZE18",name:"Vaclav Cerny"},
    {id:"CZE19",name:"Adam Hlozek"},{id:"CZE20",name:"Patrik Schick"},
  ]},
  { id:"CAN", name:"Canadá", flag:"🇨🇦", color:"#FF0000", stickers:[
    {id:"CAN1",name:"Escudo",foil:true},{id:"CAN2",name:"Dayne St.Clair"},{id:"CAN3",name:"Alphonso Davies"},
    {id:"CAN4",name:"Alistair Johnston"},{id:"CAN5",name:"Samuel Adekugbe"},{id:"CAN6",name:"Riche Larvea"},
    {id:"CAN7",name:"Derek Cornelius"},{id:"CAN8",name:"Moïse Bombito"},{id:"CAN9",name:"Kamal Miller"},
    {id:"CAN10",name:"Stephen Eustáquio"},{id:"CAN11",name:"Ismaël Koné"},{id:"CAN12",name:"J. Osorio"},
    {id:"CAN13",name:"Foto do Time"},{id:"CAN14",name:"J. Shaffelburg"},{id:"CAN15",name:"M. Choinière"},
    {id:"CAN16",name:"Niko Sigur"},{id:"CAN17",name:"Tajon Buchanan"},{id:"CAN18",name:"Liam Millar"},
    {id:"CAN19",name:"Cyle Larin"},{id:"CAN20",name:"Jonathan David"},
  ]},
  { id:"BIH", name:"Bósnia e Herz.", flag:"🇧🇦", color:"#002395", stickers:[
    {id:"BIH1",name:"Escudo",foil:true},{id:"BIH2",name:"Nikola Vasilj"},{id:"BIH3",name:"Amer Dedic"},
    {id:"BIH4",name:"Sead Kolasinac"},{id:"BIH5",name:"T. Muharemovic"},{id:"BIH6",name:"Nihad Mujakic"},
    {id:"BIH7",name:"Nikola Katic"},{id:"BIH8",name:"A. Hadziahmetovic"},{id:"BIH9",name:"B. Tahirovic"},
    {id:"BIH10",name:"Armin Gigovic"},{id:"BIH11",name:"Ivan Sunjic"},{id:"BIH12",name:"Ivan Basic"},
    {id:"BIH13",name:"Foto do Time"},{id:"BIH14",name:"Dzenis Burnic"},{id:"BIH15",name:"E. Bajraktarevic"},
    {id:"BIH16",name:"Amar Memic"},{id:"BIH17",name:"E. Demirovic"},{id:"BIH18",name:"Edin Dzeko"},
    {id:"BIH19",name:"Samed Bazdar"},{id:"BIH20",name:"Haris Tabakovic"},
  ]},
  { id:"QAT", name:"Qatar", flag:"🇶🇦", color:"#8D153A", stickers:[
    {id:"QAT1",name:"Escudo",foil:true},{id:"QAT2",name:"Meshaal Barsham"},{id:"QAT3",name:"Sultan Albrake"},
    {id:"QAT4",name:"Lucas Mendes"},{id:"QAT5",name:"Homam Ahmed"},{id:"QAT6",name:"B. Khoukhi"},
    {id:"QAT7",name:"Pedro Miguel"},{id:"QAT8",name:"Tarek Salman"},{id:"QAT9",name:"M. Al-Mannai"},
    {id:"QAT10",name:"Karim Boudiaf"},{id:"QAT11",name:"Assim Madibo"},{id:"QAT12",name:"Ahmed Fatehi"},
    {id:"QAT13",name:"Foto do Time"},{id:"QAT14",name:"Mohammed Waad"},{id:"QAT15",name:"A. Hatem"},
    {id:"QAT16",name:"H. Al-Haydos"},{id:"QAT17",name:"Edmilson Junior"},{id:"QAT18",name:"A. Afif"},
    {id:"QAT19",name:"Ahmed Al Ganehi"},{id:"QAT20",name:"Almoez Ali"},
  ]},
  { id:"SUI", name:"Suíça", flag:"🇨🇭", color:"#FF0000", stickers:[
    {id:"SUI1",name:"Escudo",foil:true},{id:"SUI2",name:"Gregor Kobel"},{id:"SUI3",name:"Yvon Mvogo"},
    {id:"SUI4",name:"Manuel Akanji"},{id:"SUI5",name:"R. Rodriguez"},{id:"SUI6",name:"Nico Elvedi"},
    {id:"SUI7",name:"Aurèle Amenda"},{id:"SUI8",name:"Silvan Widmer"},{id:"SUI9",name:"Granit Xhaka"},
    {id:"SUI10",name:"Denis Zakaria"},{id:"SUI11",name:"Remo Freuler"},{id:"SUI12",name:"Fabian Rieder"},
    {id:"SUI13",name:"Foto do Time"},{id:"SUI14",name:"Ardon Jashari"},{id:"SUI15",name:"J. Manzambi"},
    {id:"SUI16",name:"M. Aebischer"},{id:"SUI17",name:"Breel Embolo"},{id:"SUI18",name:"Ruben Vargas"},
    {id:"SUI19",name:"Dan Ndoye"},{id:"SUI20",name:"Zeki Amdouni"},
  ]},
  { id:"BRA", name:"Brasil", flag:"🇧🇷", color:"#009C3B", stickers:[
    {id:"BRA1",name:"Escudo",foil:true},{id:"BRA2",name:"Alisson"},{id:"BRA3",name:"Bento"},
    {id:"BRA4",name:"Marquinhos"},{id:"BRA5",name:"Éder Militão"},{id:"BRA6",name:"G. Magalhães"},
    {id:"BRA7",name:"Danilo"},{id:"BRA8",name:"Wesley"},{id:"BRA9",name:"Lucas Paquetá"},
    {id:"BRA10",name:"Casemiro"},{id:"BRA11",name:"Bruno Guimarães"},{id:"BRA12",name:"Luiz Henrique"},
    {id:"BRA13",name:"Foto do Time"},{id:"BRA14",name:"Vinicius Júnior"},{id:"BRA15",name:"Rodrygo"},
    {id:"BRA16",name:"João Pedro"},{id:"BRA17",name:"Matheus Cunha"},{id:"BRA18",name:"G. Martinelli"},
    {id:"BRA19",name:"Raphinha"},{id:"BRA20",name:"Estévão"},
  ]},
  { id:"MAR", name:"Marrocos", flag:"🇲🇦", color:"#C1272D", stickers:[
    {id:"MAR1",name:"Escudo",foil:true},{id:"MAR2",name:"Yassine Bounou"},{id:"MAR3",name:"M. El Kajoui"},
    {id:"MAR4",name:"Achraf Hakimi"},{id:"MAR5",name:"N. Mazraoui"},{id:"MAR6",name:"Nayef Aguerd"},
    {id:"MAR7",name:"Roman Saiss"},{id:"MAR8",name:"J. El Yamio"},{id:"MAR9",name:"Adam Masina"},
    {id:"MAR10",name:"Sofyan Amrabat"},{id:"MAR11",name:"A. Ounahi"},{id:"MAR12",name:"E. Ben Seghir"},
    {id:"MAR13",name:"Foto do Time"},{id:"MAR14",name:"B. El Khannouss"},{id:"MAR15",name:"I. Saibari"},
    {id:"MAR16",name:"Y. En-Nesyri"},{id:"MAR17",name:"A. Ezzalzouli"},{id:"MAR18",name:"S. Rahimi"},
    {id:"MAR19",name:"Brahim Diaz"},{id:"MAR20",name:"Ayoub El Kaabi"},
  ]},
  { id:"HAI", name:"Haiti", flag:"🇭🇹", color:"#00209F", stickers:[
    {id:"HAI1",name:"Escudo",foil:true},{id:"HAI2",name:"Johny Placide"},{id:"HAI3",name:"Carlens Arcus"},
    {id:"HAI4",name:"M. Expérience"},{id:"HAI5",name:"J-K. Duverne"},{id:"HAI6",name:"Ricardo Adé"},
    {id:"HAI7",name:"Duke Lacroix"},{id:"HAI8",name:"G. Metusala"},{id:"HAI9",name:"H. Delcroix"},
    {id:"HAI10",name:"L. Pierre"},{id:"HAI11",name:"D. Jean Jacques"},{id:"HAI12",name:"J-R. Bellegarde"},
    {id:"HAI13",name:"Foto do Time"},{id:"HAI14",name:"C. Attys"},{id:"HAI15",name:"D. Etienne Jr"},
    {id:"HAI16",name:"J. Casimir"},{id:"HAI17",name:"R. Providence"},{id:"HAI18",name:"D. Nazon"},
    {id:"HAI19",name:"L. Deedson"},{id:"HAI20",name:"F. Pierrot"},
  ]},
  { id:"SCO", name:"Escócia", flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", color:"#003087", stickers:[
    {id:"SCO1",name:"Escudo",foil:true},{id:"SCO2",name:"Angus Gunn"},{id:"SCO3",name:"Jack Hendry"},
    {id:"SCO4",name:"Kieran Tierney"},{id:"SCO5",name:"Aaron Hickey"},{id:"SCO6",name:"A. Robertson"},
    {id:"SCO7",name:"Scott McKenna"},{id:"SCO8",name:"John Souttar"},{id:"SCO9",name:"A. Ralston"},
    {id:"SCO10",name:"Grant Hanley"},{id:"SCO11",name:"S. McTominay"},{id:"SCO12",name:"Billy Gilmour"},
    {id:"SCO13",name:"Foto do Time"},{id:"SCO14",name:"Lewis Ferguson"},{id:"SCO15",name:"Ryan Christie"},
    {id:"SCO16",name:"Kenny McLean"},{id:"SCO17",name:"John McGinn"},{id:"SCO18",name:"Lyndon Dykes"},
    {id:"SCO19",name:"Che Adams"},{id:"SCO20",name:"B. Gannon-Doak"},
  ]},
  { id:"USA", name:"EUA", flag:"🇺🇸", color:"#B22234", stickers:[
    {id:"USA1",name:"Escudo",foil:true},{id:"USA2",name:"Matt Freese"},{id:"USA3",name:"Chris Richards"},
    {id:"USA4",name:"Tim Ream"},{id:"USA5",name:"Mark McKenzie"},{id:"USA6",name:"Alex Freeman"},
    {id:"USA7",name:"A. Robinson"},{id:"USA8",name:"Tyler Adams"},{id:"USA9",name:"T. Tessmann"},
    {id:"USA10",name:"W. McKennie"},{id:"USA11",name:"C. Roldan"},{id:"USA12",name:"Timothy Weah"},
    {id:"USA13",name:"Foto do Time"},{id:"USA14",name:"Diego Luna"},{id:"USA15",name:"Malik Tillman"},
    {id:"USA16",name:"C. Pulisic"},{id:"USA17",name:"B. Aaronson"},{id:"USA18",name:"Ricardo Pepi"},
    {id:"USA19",name:"Haji Wright"},{id:"USA20",name:"F. Balogun"},
  ]},
  { id:"PAR", name:"Paraguai", flag:"🇵🇾", color:"#D52B1E", stickers:[
    {id:"PAR1",name:"Escudo",foil:true},{id:"PAR2",name:"R. Fernandez"},{id:"PAR3",name:"Orlando Gill"},
    {id:"PAR4",name:"G. Gomez"},{id:"PAR5",name:"F. Balbuena"},{id:"PAR6",name:"J.J. Cáceres"},
    {id:"PAR7",name:"O. Alderete"},{id:"PAR8",name:"Junior Alonso"},{id:"PAR9",name:"M. Villasanti"},
    {id:"PAR10",name:"Diego Gomez"},{id:"PAR11",name:"D. Bobadilla"},{id:"PAR12",name:"Andres Cubas"},
    {id:"PAR13",name:"Foto do Time"},{id:"PAR14",name:"M. Galarza"},{id:"PAR15",name:"Julio Enciso"},
    {id:"PAR16",name:"A.R. Gamarra"},{id:"PAR17",name:"M. Almirón"},{id:"PAR18",name:"Ramon Sosa"},
    {id:"PAR19",name:"Angel Romero"},{id:"PAR20",name:"A. Sanabria"},
  ]},
  { id:"AUS", name:"Austrália", flag:"🇦🇺", color:"#00843D", stickers:[
    {id:"AUS1",name:"Escudo",foil:true},{id:"AUS2",name:"Mathew Ryan"},{id:"AUS3",name:"Joe Gauci"},
    {id:"AUS4",name:"Harry Souttar"},{id:"AUS5",name:"A. Circati"},{id:"AUS6",name:"Jordan Bos"},
    {id:"AUS7",name:"Aziz Behich"},{id:"AUS8",name:"C. Burgess"},{id:"AUS9",name:"Lewis Miller"},
    {id:"AUS10",name:"M. Degenek"},{id:"AUS11",name:"Jackson Irvine"},{id:"AUS12",name:"Riley McGree"},
    {id:"AUS13",name:"Foto do Time"},{id:"AUS14",name:"Aiden O'Neill"},{id:"AUS15",name:"C. Metcalfe"},
    {id:"AUS16",name:"P. Yazbek"},{id:"AUS17",name:"Craig Goodwin"},{id:"AUS18",name:"Kusini Vengi"},
    {id:"AUS19",name:"N. Irankunda"},{id:"AUS20",name:"Mohamed Touré"},
  ]},
  { id:"TUR", name:"Turquia", flag:"🇹🇷", color:"#E30A17", stickers:[
    {id:"TUR1",name:"Escudo",foil:true},{id:"TUR2",name:"U. Cakir"},{id:"TUR3",name:"Mert Gunok"},
    {id:"TUR4",name:"M. Demiral"},{id:"TUR5",name:"Zeki Celik"},{id:"TUR6",name:"S. Akaydin"},
    {id:"TUR7",name:"R. Yilmaz"},{id:"TUR8",name:"F. Kadioglu"},{id:"TUR9",name:"Salih Ozcan"},
    {id:"TUR10",name:"Orkun Kokcu"},{id:"TUR11",name:"O. Yokuslu"},{id:"TUR12",name:"I. Yuksek"},
    {id:"TUR13",name:"Foto do Time"},{id:"TUR14",name:"Arda Guler"},{id:"TUR15",name:"K. Akturkoglu"},
    {id:"TUR16",name:"Yunus Akgun"},{id:"TUR17",name:"B.A. Yilmaz"},{id:"TUR18",name:"Kenan Yildiz"},
    {id:"TUR19",name:"E. Karaca"},{id:"TUR20",name:"Cenk Tosun"},
  ]},
  { id:"ARG", name:"Argentina", flag:"🇦🇷", color:"#74ACDF", stickers:[
    {id:"ARG1",name:"Escudo",foil:true},{id:"ARG2",name:"E. Martínez"},{id:"ARG3",name:"G. Rulli"},
    {id:"ARG4",name:"C. Romero"},{id:"ARG5",name:"L. Martínez"},{id:"ARG6",name:"N. Otamendi"},
    {id:"ARG7",name:"N. Molina"},{id:"ARG8",name:"M. Acuña"},{id:"ARG9",name:"R. De Paul"},
    {id:"ARG10",name:"E. Fernández"},{id:"ARG11",name:"A. Mac Allister"},{id:"ARG12",name:"G. Lo Celso"},
    {id:"ARG13",name:"Foto do Time"},{id:"ARG14",name:"T. Almada"},{id:"ARG15",name:"V. Carboni"},
    {id:"ARG16",name:"J. Alvarez"},{id:"ARG17",name:"A. Di Maria"},{id:"ARG18",name:"N. González"},
    {id:"ARG19",name:"L. Martínez"},{id:"ARG20",name:"Lionel Messi"},
  ]},
  { id:"ESP", name:"Espanha", flag:"🇪🇸", color:"#AA151B", stickers:[
    {id:"ESP1",name:"Escudo",foil:true},{id:"ESP2",name:"David Raya"},{id:"ESP3",name:"Unai Simón"},
    {id:"ESP4",name:"R. Le Normand"},{id:"ESP5",name:"A. Laporte"},{id:"ESP6",name:"Pau Cubarsí"},
    {id:"ESP7",name:"D. Carvajal"},{id:"ESP8",name:"A. Grimaldo"},{id:"ESP9",name:"Pedri"},
    {id:"ESP10",name:"Rodri"},{id:"ESP11",name:"Fabián Ruiz"},{id:"ESP12",name:"M. Merino"},
    {id:"ESP13",name:"Foto do Time"},{id:"ESP14",name:"Ferran Torres"},{id:"ESP15",name:"M. Oyarzabal"},
    {id:"ESP16",name:"Nico Williams"},{id:"ESP17",name:"Lamine Yamal"},{id:"ESP18",name:"Dani Olmo"},
    {id:"ESP19",name:"Á. Morata"},{id:"ESP20",name:"Ayoze Pérez"},
  ]},
  { id:"FRA", name:"França", flag:"🇫🇷", color:"#002395", stickers:[
    {id:"FRA1",name:"Escudo",foil:true},{id:"FRA2",name:"Mike Maignan"},{id:"FRA3",name:"Brice Samba"},
    {id:"FRA4",name:"D. Upamecano"},{id:"FRA5",name:"W. Saliba"},{id:"FRA6",name:"I. Konaté"},
    {id:"FRA7",name:"T. Hernandez"},{id:"FRA8",name:"J. Clauss"},{id:"FRA9",name:"E. Camavinga"},
    {id:"FRA10",name:"A. Tchouaméni"},{id:"FRA11",name:"A. Rabiot"},{id:"FRA12",name:"Y. Fofana"},
    {id:"FRA13",name:"Foto do Time"},{id:"FRA14",name:"O. Dembélé"},{id:"FRA15",name:"B. Barcola"},
    {id:"FRA16",name:"M. Thuram"},{id:"FRA17",name:"R. Kolo Muani"},{id:"FRA18",name:"C. Nkunku"},
    {id:"FRA19",name:"K. Mbappé"},{id:"FRA20",name:"A. Griezmann"},
  ]},
  { id:"GER", name:"Alemanha", flag:"🇩🇪", color:"#000000", stickers:[
    {id:"GER1",name:"Escudo",foil:true},{id:"GER2",name:"Manuel Neuer"},{id:"GER3",name:"O. Baumann"},
    {id:"GER4",name:"Jonathan Tah"},{id:"GER5",name:"A. Rüdiger"},{id:"GER6",name:"N. Schlotterbeck"},
    {id:"GER7",name:"B. Henrichs"},{id:"GER8",name:"M. Mittelstädt"},{id:"GER9",name:"F. Wirtz"},
    {id:"GER10",name:"Toni Kroos"},{id:"GER11",name:"J. Kimmich"},{id:"GER12",name:"R. Andrich"},
    {id:"GER13",name:"Foto do Time"},{id:"GER14",name:"J. Musiala"},{id:"GER15",name:"T. Müller"},
    {id:"GER16",name:"S. Gnabry"},{id:"GER17",name:"Leroy Sané"},{id:"GER18",name:"Deniz Undav"},
    {id:"GER19",name:"Kai Havertz"},{id:"GER20",name:"N. Füllkrug"},
  ]},
  { id:"POR", name:"Portugal", flag:"🇵🇹", color:"#006600", stickers:[
    {id:"POR1",name:"Escudo",foil:true},{id:"POR2",name:"Diogo Costa"},{id:"POR3",name:"José Sá"},
    {id:"POR4",name:"Rúben Dias"},{id:"POR5",name:"G. Inácio"},{id:"POR6",name:"Diogo Dalot"},
    {id:"POR7",name:"Nuno Mendes"},{id:"POR8",name:"J. Palhinha"},{id:"POR9",name:"Vitinha"},
    {id:"POR10",name:"Rúben Neves"},{id:"POR11",name:"B. Fernandes"},{id:"POR12",name:"B. Silva"},
    {id:"POR13",name:"Foto do Time"},{id:"POR14",name:"Pedro Neto"},{id:"POR15",name:"Rafael Leão"},
    {id:"POR16",name:"F. Conceição"},{id:"POR17",name:"C. Ronaldo"},{id:"POR18",name:"João Félix"},
    {id:"POR19",name:"G. Ramos"},{id:"POR20",name:"Diogo Jota"},
  ]},
  { id:"ENG", name:"Inglaterra", flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", color:"#CF081F", stickers:[
    {id:"ENG1",name:"Escudo",foil:true},{id:"ENG2",name:"J. Pickford"},{id:"ENG3",name:"A. Ramsdale"},
    {id:"ENG4",name:"John Stones"},{id:"ENG5",name:"Marc Guehi"},{id:"ENG6",name:"H. Maguire"},
    {id:"ENG7",name:"Kyle Walker"},{id:"ENG8",name:"Luke Shaw"},{id:"ENG9",name:"T. Alexander-Arnold"},
    {id:"ENG10",name:"Declan Rice"},{id:"ENG11",name:"K. Mainoo"},{id:"ENG12",name:"J. Bellingham"},
    {id:"ENG13",name:"Foto do Time"},{id:"ENG14",name:"Phil Foden"},{id:"ENG15",name:"M. Rashford"},
    {id:"ENG16",name:"Bukayo Saka"},{id:"ENG17",name:"Jarrod Bowen"},{id:"ENG18",name:"Cole Palmer"},
    {id:"ENG19",name:"Harry Kane"},{id:"ENG20",name:"Ollie Watkins"},
  ]},
  { id:"NED", name:"Países Baixos", flag:"🇳🇱", color:"#FF4F00", stickers:[
    {id:"NED1",name:"Escudo",foil:true},{id:"NED2",name:"B. Verbruggen"},{id:"NED3",name:"M. Flekken"},
    {id:"NED4",name:"S. de Vrij"},{id:"NED5",name:"V. van Dijk"},{id:"NED6",name:"M. de Ligt"},
    {id:"NED7",name:"D. Dumfries"},{id:"NED8",name:"Nathan Aké"},{id:"NED9",name:"R. Gravenberch"},
    {id:"NED10",name:"F. de Jong"},{id:"NED11",name:"T. Reijnders"},{id:"NED12",name:"T. Koopmeiners"},
    {id:"NED13",name:"Foto do Time"},{id:"NED14",name:"Cody Gakpo"},{id:"NED15",name:"D. Malen"},
    {id:"NED16",name:"Xavi Simons"},{id:"NED17",name:"W. Weghorst"},{id:"NED18",name:"B. Brobbey"},
    {id:"NED19",name:"M. Depay"},{id:"NED20",name:"Noa Lang"},
  ]},
  { id:"BEL", name:"Bélgica", flag:"🇧🇪", color:"#EF3340", stickers:[
    {id:"BEL1",name:"Escudo",foil:true},{id:"BEL2",name:"K. Casteels"},{id:"BEL3",name:"Matz Sels"},
    {id:"BEL4",name:"Wout Faes"},{id:"BEL5",name:"J. Vertonghen"},{id:"BEL6",name:"A. Theate"},
    {id:"BEL7",name:"T. Meunier"},{id:"BEL8",name:"T. Castagne"},{id:"BEL9",name:"A. Onana"},
    {id:"BEL10",name:"Axel Witsel"},{id:"BEL11",name:"Y. Tielemans"},{id:"BEL12",name:"O. Mangala"},
    {id:"BEL13",name:"Foto do Time"},{id:"BEL14",name:"L. Trossard"},{id:"BEL15",name:"Jeremy Doku"},
    {id:"BEL16",name:"Lois Openda"},{id:"BEL17",name:"R. Lukaku"},{id:"BEL18",name:"D. Lukebakio"},
    {id:"BEL19",name:"K. De Bruyne"},{id:"BEL20",name:"C. De Ketelaere"},
  ]},
  { id:"ITA", name:"Itália", flag:"🇮🇹", color:"#009246", stickers:[
    {id:"ITA1",name:"Escudo",foil:true},{id:"ITA2",name:"G. Donnarumma"},{id:"ITA3",name:"Alex Meret"},
    {id:"ITA4",name:"A. Bastoni"},{id:"ITA5",name:"G. Scalvini"},{id:"ITA6",name:"G. Di Lorenzo"},
    {id:"ITA7",name:"F. Dimarco"},{id:"ITA8",name:"B. Cristante"},{id:"ITA9",name:"S. Tonali"},
    {id:"ITA10",name:"N. Barella"},{id:"ITA11",name:"Jorginho"},{id:"ITA12",name:"L. Pellegrini"},
    {id:"ITA13",name:"Foto do Time"},{id:"ITA14",name:"F. Chiesa"},{id:"ITA15",name:"G. Raspadori"},
    {id:"ITA16",name:"D. Frattesi"},{id:"ITA17",name:"M. Retegui"},{id:"ITA18",name:"M. Zaccagni"},
    {id:"ITA19",name:"L. Lucca"},{id:"ITA20",name:"Moise Kean"},
  ]},
  { id:"COL", name:"Colômbia", flag:"🇨🇴", color:"#FCD116", stickers:[
    {id:"COL1",name:"Escudo",foil:true},{id:"COL2",name:"Camilo Vargas"},{id:"COL3",name:"D. Ospina"},
    {id:"COL4",name:"D. Sánchez"},{id:"COL5",name:"Yerry Mina"},{id:"COL6",name:"S. Arias"},
    {id:"COL7",name:"J. Mojica"},{id:"COL8",name:"Mateus Uribe"},{id:"COL9",name:"Jefferson Lerma"},
    {id:"COL10",name:"Jhon Arias"},{id:"COL11",name:"Richard Ríos"},{id:"COL12",name:"J. Lerma"},
    {id:"COL13",name:"Foto do Time"},{id:"COL14",name:"Cuadrado"},{id:"COL15",name:"Carrascal"},
    {id:"COL16",name:"Luis Díaz"},{id:"COL17",name:"J. Rodríguez"},{id:"COL18",name:"T. Gutiérrez"},
    {id:"COL19",name:"Falcao"},{id:"COL20",name:"R.S. Borré"},
  ]},
  { id:"URU", name:"Uruguai", flag:"🇺🇾", color:"#5EB6E4", stickers:[
    {id:"URU1",name:"Escudo",foil:true},{id:"URU2",name:"Sergio Rochet"},{id:"URU3",name:"F. Muslera"},
    {id:"URU4",name:"J.M. Giménez"},{id:"URU5",name:"S. Coates"},{id:"URU6",name:"R. Araújo"},
    {id:"URU7",name:"N. Nández"},{id:"URU8",name:"M. Olivera"},{id:"URU9",name:"R. Bentancur"},
    {id:"URU10",name:"M. Ugarte"},{id:"URU11",name:"F. Valverde"},{id:"URU12",name:"N. De La Cruz"},
    {id:"URU13",name:"Foto do Time"},{id:"URU14",name:"Maxi Gómez"},{id:"URU15",name:"F. Pellistri"},
    {id:"URU16",name:"G. De Arrascaeta"},{id:"URU17",name:"Darwin Núñez"},{id:"URU18",name:"A. Canobbio"},
    {id:"URU19",name:"M. Vecino"},{id:"URU20",name:"E. Cavani"},
  ]},
  { id:"CRO", name:"Croácia", flag:"🇭🇷", color:"#FF0000", stickers:[
    {id:"CRO1",name:"Escudo",foil:true},{id:"CRO2",name:"D. Livaković"},{id:"CRO3",name:"I. Ivušić"},
    {id:"CRO4",name:"D. Vida"},{id:"CRO5",name:"J. Gvardiol"},{id:"CRO6",name:"D. Ćaleta-Car"},
    {id:"CRO7",name:"J. Stanišić"},{id:"CRO8",name:"Borna Sosa"},{id:"CRO9",name:"M. Brozović"},
    {id:"CRO10",name:"Luka Modrić"},{id:"CRO11",name:"M. Kovačić"},{id:"CRO12",name:"M. Pašalić"},
    {id:"CRO13",name:"Foto do Time"},{id:"CRO14",name:"L. Ivanušec"},{id:"CRO15",name:"N. Vlašić"},
    {id:"CRO16",name:"I. Perišić"},{id:"CRO17",name:"A. Kramarić"},{id:"CRO18",name:"A. Budimir"},
    {id:"CRO19",name:"Petar Musa"},{id:"CRO20",name:"B. Petković"},
  ]},
  { id:"SEN", name:"Senegal", flag:"🇸🇳", color:"#00853F", stickers:[
    {id:"SEN1",name:"Escudo",foil:true},{id:"SEN2",name:"E. Mendy"},{id:"SEN3",name:"A. Gomis"},
    {id:"SEN4",name:"A. Diallo"},{id:"SEN5",name:"K. Koulibaly"},{id:"SEN6",name:"P.A. Cissé"},
    {id:"SEN7",name:"F. Mendy"},{id:"SEN8",name:"Y. Sabaly"},{id:"SEN9",name:"N. Mendy"},
    {id:"SEN10",name:"C. Kouyaté"},{id:"SEN11",name:"I. Gana Gueye"},{id:"SEN12",name:"K. Diatta"},
    {id:"SEN13",name:"Foto do Time"},{id:"SEN14",name:"Ismaïla Sarr"},{id:"SEN15",name:"N. Jackson"},
    {id:"SEN16",name:"Bamba Dieng"},{id:"SEN17",name:"Sadio Mané"},{id:"SEN18",name:"P.M. Sarr"},
    {id:"SEN19",name:"H. Diallo"},{id:"SEN20",name:"Lamine Camara"},
  ]},
  { id:"JAP", name:"Japão", flag:"🇯🇵", color:"#003087", stickers:[
    {id:"JAP1",name:"Escudo",foil:true},{id:"JAP2",name:"S. Gonda"},{id:"JAP3",name:"Zion Suzuki"},
    {id:"JAP4",name:"S. Taniguchi"},{id:"JAP5",name:"Maya Yoshida"},{id:"JAP6",name:"Ko Itakura"},
    {id:"JAP7",name:"Hiroki Ito"},{id:"JAP8",name:"Y. Sugawara"},{id:"JAP9",name:"Junya Ito"},
    {id:"JAP10",name:"W. Endo"},{id:"JAP11",name:"H. Morita"},{id:"JAP12",name:"T. Kubo"},
    {id:"JAP13",name:"Foto do Time"},{id:"JAP14",name:"K. Mitoma"},{id:"JAP15",name:"Ritsu Doan"},
    {id:"JAP16",name:"Ao Tanaka"},{id:"JAP17",name:"Ayase Ueda"},{id:"JAP18",name:"Yuki Soma"},
    {id:"JAP19",name:"K. Furuhashi"},{id:"JAP20",name:"D. Kamada"},
  ]},
  { id:"MLI", name:"Mali", flag:"🇲🇱", color:"#14B53A", stickers:[
    {id:"MLI1",name:"Escudo",foil:true},{id:"MLI2",name:"D. Diarra"},{id:"MLI3",name:"M. Sinayoko"},
    {id:"MLI4",name:"H. Traoré"},{id:"MLI5",name:"B. Kouyaté"},{id:"MLI6",name:"F. Sacko"},
    {id:"MLI7",name:"Niakhaté"},{id:"MLI8",name:"Y. Bissouma"},{id:"MLI9",name:"L. Coulibaly"},
    {id:"MLI10",name:"A.N. Traoré"},{id:"MLI11",name:"A. Haidara"},{id:"MLI12",name:"C. Doucouré"},
    {id:"MLI13",name:"Foto do Time"},{id:"MLI14",name:"K. Coulibaly"},{id:"MLI15",name:"I. Koné"},
    {id:"MLI16",name:"L. Sinayoko"},{id:"MLI17",name:"M. Doumbia"},{id:"MLI18",name:"E.B. Touré"},
    {id:"MLI19",name:"K. Doumbia"},{id:"MLI20",name:"Aliou Dieng"},
  ]},
  { id:"ECU", name:"Equador", flag:"🇪🇨", color:"#FFD100", stickers:[
    {id:"ECU1",name:"Escudo",foil:true},{id:"ECU2",name:"H. Galíndez"},{id:"ECU3",name:"A. Domínguez"},
    {id:"ECU4",name:"P. Hincapié"},{id:"ECU5",name:"R. Arboleda"},{id:"ECU6",name:"X. Arreaga"},
    {id:"ECU7",name:"P. Estupiñán"},{id:"ECU8",name:"A. Preciado"},{id:"ECU9",name:"J. Méndez"},
    {id:"ECU10",name:"C. Gruezo"},{id:"ECU11",name:"M. Caicedo"},{id:"ECU12",name:"Ángel Mena"},
    {id:"ECU13",name:"Foto do Time"},{id:"ECU14",name:"G. Plata"},{id:"ECU15",name:"J. Caicedo"},
    {id:"ECU16",name:"D. Reasco"},{id:"ECU17",name:"E. Valencia"},{id:"ECU18",name:"R. Ibarra"},
    {id:"ECU19",name:"J. Sarmiento"},{id:"ECU20",name:"K. Rodríguez"},
  ]},
  { id:"CHI", name:"Chile", flag:"🇨🇱", color:"#D52B1E", stickers:[
    {id:"CHI1",name:"Escudo",foil:true},{id:"CHI2",name:"Claudio Bravo"},{id:"CHI3",name:"G. Arias"},
    {id:"CHI4",name:"Gary Medel"},{id:"CHI5",name:"G. Maripán"},{id:"CHI6",name:"Paulo Díaz"},
    {id:"CHI7",name:"M. Isla"},{id:"CHI8",name:"E. Mena"},{id:"CHI9",name:"Arturo Vidal"},
    {id:"CHI10",name:"C. Aránguiz"},{id:"CHI11",name:"E. Pulgar"},{id:"CHI12",name:"D. Valdés"},
    {id:"CHI13",name:"Foto do Time"},{id:"CHI14",name:"V. Dávila"},{id:"CHI15",name:"A. Sánchez"},
    {id:"CHI16",name:"B. Brereton"},{id:"CHI17",name:"L. Assadi"},{id:"CHI18",name:"D. Osorio"},
    {id:"CHI19",name:"M. Núñez"},{id:"CHI20",name:"E. Vargas"},
  ]},
  { id:"ALG", name:"Argélia", flag:"🇩🇿", color:"#006233", stickers:[
    {id:"ALG1",name:"Escudo",foil:true},{id:"ALG2",name:"R. M'Bolhi"},{id:"ALG3",name:"A. Oukidja"},
    {id:"ALG4",name:"R. Bensebaïni"},{id:"ALG5",name:"D. Benlamri"},{id:"ALG6",name:"A. Mandi"},
    {id:"ALG7",name:"I. Slimani"},{id:"ALG8",name:"H. Belkebla"},{id:"ALG9",name:"R. Zerrouki"},
    {id:"ALG10",name:"I. Bennacer"},{id:"ALG11",name:"S. Feghouli"},{id:"ALG12",name:"S. Benrahma"},
    {id:"ALG13",name:"Foto do Time"},{id:"ALG14",name:"Y. Atal"},{id:"ALG15",name:"A. Delort"},
    {id:"ALG16",name:"N. Boujellab"},{id:"ALG17",name:"B. Bounedjah"},{id:"ALG18",name:"Y. Belaïli"},
    {id:"ALG19",name:"R. Mahrez"},{id:"ALG20",name:"A. Gouiri"},
  ]},
  { id:"EGY", name:"Egito", flag:"🇪🇬", color:"#CE1126", stickers:[
    {id:"EGY1",name:"Escudo",foil:true},{id:"EGY2",name:"M. El-Shenawy"},{id:"EGY3",name:"A. El-Shenawy"},
    {id:"EGY4",name:"A. Hegazi"},{id:"EGY5",name:"Omar Gaber"},{id:"EGY6",name:"M. Abdel-Moneim"},
    {id:"EGY7",name:"K. Hafez"},{id:"EGY8",name:"A. El-Sulaya"},{id:"EGY9",name:"T. Hamed"},
    {id:"EGY10",name:"M. Elneny"},{id:"EGY11",name:"E. Ashour"},{id:"EGY12",name:"H. Fathy"},
    {id:"EGY13",name:"Foto do Time"},{id:"EGY14",name:"Zizo"},{id:"EGY15",name:"M. Mohamed"},
    {id:"EGY16",name:"Trezeguet"},{id:"EGY17",name:"Mohamed Salah"},{id:"EGY18",name:"O. Marmoush"},
    {id:"EGY19",name:"A.S. Zizo"},{id:"EGY20",name:"M. Hassan"},
  ]},
  { id:"POL", name:"Polônia", flag:"🇵🇱", color:"#DC143C", stickers:[
    {id:"POL1",name:"Escudo",foil:true},{id:"POL2",name:"W. Szczęsny"},{id:"POL3",name:"L. Skorupski"},
    {id:"POL4",name:"J. Bednarek"},{id:"POL5",name:"Kamil Glik"},{id:"POL6",name:"J. Kiwior"},
    {id:"POL7",name:"B. Bereszyński"},{id:"POL8",name:"P. Frankowski"},{id:"POL9",name:"G. Krychowiak"},
    {id:"POL10",name:"P. Zielinski"},{id:"POL11",name:"M. Klich"},{id:"POL12",name:"J. Moder"},
    {id:"POL13",name:"Foto do Time"},{id:"POL14",name:"K. Jóźwiak"},{id:"POL15",name:"N. Zalewski"},
    {id:"POL16",name:"S. Szymański"},{id:"POL17",name:"R. Lewandowski"},{id:"POL18",name:"K. Świderski"},
    {id:"POL19",name:"M. Skóraś"},{id:"POL20",name:"A. Milik"},
  ]},
  { id:"GHA", name:"Gana", flag:"🇬🇭", color:"#006B3F", stickers:[
    {id:"GHA1",name:"Escudo",foil:true},{id:"GHA2",name:"L. Ati-Zigi"},{id:"GHA3",name:"J. Wollacott"},
    {id:"GHA4",name:"A. Djiku"},{id:"GHA5",name:"D. Amartey"},{id:"GHA6",name:"J. Mensah"},
    {id:"GHA7",name:"Baba Rahman"},{id:"GHA8",name:"T. Lamptey"},{id:"GHA9",name:"I. Baba"},
    {id:"GHA10",name:"T. Partey"},{id:"GHA11",name:"Andre Ayew"},{id:"GHA12",name:"Jordan Ayew"},
    {id:"GHA13",name:"Foto do Time"},{id:"GHA14",name:"A. Semenyo"},{id:"GHA15",name:"O. Bukari"},
    {id:"GHA16",name:"S.A. Samed"},{id:"GHA17",name:"M. Kudus"},{id:"GHA18",name:"K. Sulemana"},
    {id:"GHA19",name:"Inaki Williams"},{id:"GHA20",name:"E. Owusu"},
  ]},
  { id:"NIG", name:"Nigéria", flag:"🇳🇬", color:"#008751", stickers:[
    {id:"NIG1",name:"Escudo",foil:true},{id:"NIG2",name:"F. Uzoho"},{id:"NIG3",name:"M. Okoye"},
    {id:"NIG4",name:"W. Troost-Ekong"},{id:"NIG5",name:"L. Balogun"},{id:"NIG6",name:"K. Omeruo"},
    {id:"NIG7",name:"Z. Sanusi"},{id:"NIG8",name:"E. Dennis"},{id:"NIG9",name:"W. Ndidi"},
    {id:"NIG10",name:"Joe Aribo"},{id:"NIG11",name:"F. Onyeka"},{id:"NIG12",name:"Chukwuemeka"},
    {id:"NIG13",name:"Foto do Time"},{id:"NIG14",name:"T. Awoniyi"},{id:"NIG15",name:"A. Lookman"},
    {id:"NIG16",name:"Alex Iwobi"},{id:"NIG17",name:"V. Osimhen"},{id:"NIG18",name:"T. Moffi"},
    {id:"NIG19",name:"S. Chukwueze"},{id:"NIG20",name:"C. Bassey"},
  ]},
  { id:"PER", name:"Peru", flag:"🇵🇪", color:"#D91023", stickers:[
    {id:"PER1",name:"Escudo",foil:true},{id:"PER2",name:"P. Gallese"},{id:"PER3",name:"C. Cáceda"},
    {id:"PER4",name:"C. Zambrano"},{id:"PER5",name:"A. Callens"},{id:"PER6",name:"M. Araujo"},
    {id:"PER7",name:"L. Advíncula"},{id:"PER8",name:"M. López"},{id:"PER9",name:"Y. Yotún"},
    {id:"PER10",name:"R. Tapia"},{id:"PER11",name:"Sergio Peña"},{id:"PER12",name:"Andy Polo"},
    {id:"PER13",name:"Foto do Time"},{id:"PER14",name:"R. Ruidíaz"},{id:"PER15",name:"A. Carrillo"},
    {id:"PER16",name:"E. Flores"},{id:"PER17",name:"C. Cueva"},{id:"PER18",name:"G. Lapadula"},
    {id:"PER19",name:"Bryan Reyna"},{id:"PER20",name:"P. Guerrero"},
  ]},
  { id:"VEN", name:"Venezuela", flag:"🇻🇪", color:"#CF142B", stickers:[
    {id:"VEN1",name:"Escudo",foil:true},{id:"VEN2",name:"W. Fariñez"},{id:"VEN3",name:"R. Romo"},
    {id:"VEN4",name:"Y. Herrera"},{id:"VEN5",name:"Jon Aramburu"},{id:"VEN6",name:"A. Reyes"},
    {id:"VEN7",name:"R. Hernández"},{id:"VEN8",name:"C. Makoun"},{id:"VEN9",name:"T. Rincón"},
    {id:"VEN10",name:"J. Chancellor"},{id:"VEN11",name:"Y. Soteldo"},{id:"VEN12",name:"J. Moreno"},
    {id:"VEN13",name:"Foto do Time"},{id:"VEN14",name:"R. Otero"},{id:"VEN15",name:"A. Peñaranda"},
    {id:"VEN16",name:"S. Rondón"},{id:"VEN17",name:"E. Bello"},{id:"VEN18",name:"J. Cádiz"},
    {id:"VEN19",name:"D. Machís"},{id:"VEN20",name:"J-C. Simons"},
  ]},
  { id:"CIV", name:"Costa do Marfim", flag:"🇨🇮", color:"#F77F00", stickers:[
    {id:"CIV1",name:"Escudo",foil:true},{id:"CIV2",name:"Y. Fofana"},{id:"CIV3",name:"B.A. Sangaré"},
    {id:"CIV4",name:"O. Diomandé"},{id:"CIV5",name:"Eric Bailly"},{id:"CIV6",name:"S. Aurier"},
    {id:"CIV7",name:"G. Konan"},{id:"CIV8",name:"J.M. Seri"},{id:"CIV9",name:"I. Sangaré"},
    {id:"CIV10",name:"F. Kessié"},{id:"CIV11",name:"Seko Fofana"},{id:"CIV12",name:"M. Cornet"},
    {id:"CIV13",name:"Foto do Time"},{id:"CIV14",name:"J. Bamba"},{id:"CIV15",name:"S. Adingra"},
    {id:"CIV16",name:"N. Pépé"},{id:"CIV17",name:"W. Zaha"},{id:"CIV18",name:"S. Haller"},
    {id:"CIV19",name:"W. Gnonto"},{id:"CIV20",name:"D. Drogba Jr."},
  ]},
  { id:"AUT", name:"Áustria", flag:"🇦🇹", color:"#ED2939", stickers:[
    {id:"AUT1",name:"Escudo",foil:true},{id:"AUT2",name:"P. Pentz"},{id:"AUT3",name:"A. Schlager"},
    {id:"AUT4",name:"K. Danso"},{id:"AUT5",name:"A. Dragovic"},{id:"AUT6",name:"P. Lienhart"},
    {id:"AUT7",name:"S. Lainer"},{id:"AUT8",name:"M. Wöber"},{id:"AUT9",name:"X. Schlager"},
    {id:"AUT10",name:"F. Grillitsch"},{id:"AUT11",name:"David Alaba"},{id:"AUT12",name:"K. Laimer"},
    {id:"AUT13",name:"Foto do Time"},{id:"AUT14",name:"F. Kainz"},{id:"AUT15",name:"N. Seiwald"},
    {id:"AUT16",name:"M. Sabitzer"},{id:"AUT17",name:"C. Baumgartner"},{id:"AUT18",name:"M. Gregoritsch"},
    {id:"AUT19",name:"M. Arnautovic"},{id:"AUT20",name:"P. Wimmer"},
  ]},
  { id:"CPV", name:"Cabo Verde", flag:"🇨🇻", color:"#003893", stickers:[
    {id:"CPV1",name:"Escudo",foil:true},{id:"CPV2",name:"Vozinha"},{id:"CPV3",name:"Marcelo"},
    {id:"CPV4",name:"R. Lopes"},{id:"CPV5",name:"D. Tavares"},{id:"CPV6",name:"Stopira"},
    {id:"CPV7",name:"Virgílio"},{id:"CPV8",name:"K. Rocha"},{id:"CPV9",name:"P. Andrade"},
    {id:"CPV10",name:"S. Fortes"},{id:"CPV11",name:"R. Mendes"},{id:"CPV12",name:"G. Rodrigues"},
    {id:"CPV13",name:"Foto do Time"},{id:"CPV14",name:"J. Tavares"},{id:"CPV15",name:"J. Monteiro"},
    {id:"CPV16",name:"W. Semedo"},{id:"CPV17",name:"Héldon"},{id:"CPV18",name:"J. Cabral"},
    {id:"CPV19",name:"B. Teixeira"},{id:"CPV20",name:"Djon Lima"},
  ]},
  { id:"COD", name:"Congo DR", flag:"🇨🇩", color:"#007FFF", stickers:[
    {id:"COD1",name:"Escudo",foil:true},{id:"COD2",name:"J. Kiassumbua"},{id:"COD3",name:"E. Nzuzi"},
    {id:"COD4",name:"C. Mbemba"},{id:"COD5",name:"M. Tisserand"},{id:"COD6",name:"E. Kayembe"},
    {id:"COD7",name:"C. Mavinga"},{id:"COD8",name:"A. Masuaku"},{id:"COD9",name:"P-J. M'Poku"},
    {id:"COD10",name:"C. Bakambu"},{id:"COD11",name:"E. Meschack"},{id:"COD12",name:"Y. Bolasie"},
    {id:"COD13",name:"Foto do Time"},{id:"COD14",name:"J. Botaka"},{id:"COD15",name:"B. Assombalonga"},
    {id:"COD16",name:"T. Bongonda"},{id:"COD17",name:"D. Mbokani"},{id:"COD18",name:"S. Gnaka"},
    {id:"COD19",name:"N. Kebano"},{id:"COD20",name:"Jonathan David"},
  ]},
  { id:"CUR", name:"Curaçao", flag:"🇨🇼", color:"#002B7F", stickers:[
    {id:"CUR1",name:"Escudo",foil:true},{id:"CUR2",name:"Eloy Room"},{id:"CUR3",name:"O. Sinclair"},
    {id:"CUR4",name:"C. Martina"},{id:"CUR5",name:"D. Lachman"},{id:"CUR6",name:"E. Dorest"},
    {id:"CUR7",name:"V. Anita"},{id:"CUR8",name:"B. Kuwas"},{id:"CUR9",name:"L. Bacuna"},
    {id:"CUR10",name:"G. Murray"},{id:"CUR11",name:"J. Antonia"},{id:"CUR12",name:"J. Gaari"},
    {id:"CUR13",name:"Foto do Time"},{id:"CUR14",name:"R. Sarmiento"},{id:"CUR15",name:"J. Namdar"},
    {id:"CUR16",name:"G. Wijnaldum"},{id:"CUR17",name:"G. Nepomuceno"},{id:"CUR18",name:"G. Snijders"},
    {id:"CUR19",name:"Q. Schoop"},{id:"CUR20",name:"C. Bazoer"},
  ]},
  { id:"WCH", name:"História da Copa", flag:"🏅", color:"#C9A84C", stickers:[
    {id:"WCH1",name:"Uruguai 1930"},{id:"WCH2",name:"Itália 1934"},{id:"WCH3",name:"França 1938"},
    {id:"WCH4",name:"Brasil 1950"},{id:"WCH5",name:"Suíça 1954"},{id:"WCH6",name:"Suécia 1958"},
    {id:"WCH7",name:"Chile 1962"},{id:"WCH8",name:"Inglaterra 1966"},{id:"WCH9",name:"México 1970"},
    {id:"WCH10",name:"Alemanha 1974"},{id:"WCH11",name:"Argentina 1978"},{id:"WCH12",name:"Espanha 1982"},
    {id:"WCH13",name:"México 1986"},{id:"WCH14",name:"Itália 1990"},{id:"WCH15",name:"EUA 1994"},
    {id:"WCH16",name:"França 1998"},{id:"WCH17",name:"Coreia/Japão 2002"},{id:"WCH18",name:"Alemanha 2006"},
    {id:"WCH19",name:"África do Sul 2010"},{id:"WCH20",name:"Brasil 2014"},
    {id:"WCH21",name:"Rússia 2018"},{id:"WCH22",name:"Qatar 2022"},
  ]},
  { id:"CC", name:"Coca-Cola", flag:"🥤", color:"#F40009", stickers:[
    {id:"CC1",name:"Coca-Cola 1",foil:true},{id:"CC2",name:"Coca-Cola 2",foil:true},
    {id:"CC3",name:"Coca-Cola 3",foil:true},{id:"CC4",name:"Coca-Cola 4",foil:true},
    {id:"CC5",name:"Coca-Cola 5",foil:true},{id:"CC6",name:"Coca-Cola 6",foil:true},
    {id:"CC7",name:"Coca-Cola 7",foil:true},{id:"CC8",name:"Coca-Cola 8",foil:true},
    {id:"CC9",name:"Coca-Cola 9",foil:true},{id:"CC10",name:"Coca-Cola 10",foil:true},
    {id:"CC11",name:"Coca-Cola 11",foil:true},{id:"CC12",name:"Coca-Cola 12",foil:true},
  ]},
];

const TOTAL = TEAMS.reduce((acc, t) => acc + t.stickers.length, 0);

// Mapa de códigos ISO2 para bandeiras (via flagcdn.com)
const FLAG = {
  FWC:"", MEX:"mx", RSA:"za", KOR:"kr", CZE:"cz", CAN:"ca", BIH:"ba", QAT:"qa",
  SUI:"ch", BRA:"br", MAR:"ma", HAI:"ht", SCO:"gb-sct", USA:"us", PAR:"py", AUS:"au",
  TUR:"tr", ARG:"ar", ESP:"es", FRA:"fr", GER:"de", POR:"pt", ENG:"gb-eng", NED:"nl",
  BEL:"be", ITA:"it", COL:"co", URU:"uy", CRO:"hr", SEN:"sn", JAP:"jp", MLI:"ml",
  ECU:"ec", CHI:"cl", ALG:"dz", EGY:"eg", POL:"pl", GHA:"gh", NIG:"ng", PER:"pe",
  VEN:"ve", CIV:"ci", AUT:"at", CPV:"cv", COD:"cd", CUR:"cw", WCH:"", CC:"",
};

const FlagImg = ({ code, size = 32 }) => {
  if (!code) return <span style={{ fontSize: size * 0.8, lineHeight: 1 }}>🏆</span>;
  // Converte código para maiúsculo para a API do flagsapi.com
  const upper = code.replace("gb-sct", "GB").replace("gb-eng", "GB").toUpperCase();
  return (
    <img
      src={`https://flagsapi.com/${upper}/flat/64.png`}
      width={size * 1.4}
      height={size}
      style={{ objectFit:"contain", borderRadius:3 }}
      alt={upper}
      onError={e => { e.target.style.display = "none"; }}
    />
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [state, setState] = useState({ glued: {}, repeats: {} });
  const [view, setView] = useState("album");
  const [activeTeam, setActiveTeam] = useState(null);
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadState().then(s => { setState(s); setLoaded(true); });
  }, []);

  const persist = useCallback(async (next) => {
    setState(next);
    await saveState(next);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const toggleGlued = (id) => {
    const next = { ...state, glued: { ...state.glued } };
    if (next.glued[id]) delete next.glued[id];
    else next.glued[id] = true;
    if (next.glued[id]) showToast(`✅ ${id} colada!`);
    persist(next);
  };

  const setRepeats = (id, val) => {
    const next = { ...state, repeats: { ...state.repeats } };
    const n = Math.max(0, parseInt(val) || 0);
    if (n === 0) delete next.repeats[id];
    else next.repeats[id] = n;
    persist(next);
  };

  const totalGlued = Object.keys(state.glued).length;
  const totalRepeats = Object.values(state.repeats).reduce((a, b) => a + b, 0);
  const totalMissing = TOTAL - totalGlued;
  const pct = Math.round((totalGlued / TOTAL) * 100);

  const allMissing = TEAMS.flatMap(t => t.stickers.filter(s => !state.glued[s.id]).map(s => ({ ...s, teamName: t.name, teamId: t.id })));
  const allRepeats = TEAMS.flatMap(t => t.stickers.filter(s => state.repeats[s.id] > 0).map(s => ({ ...s, teamName: t.name, teamId: t.id, qty: state.repeats[s.id] })));

  const filteredTeams = TEAMS.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.stickers.some(s => s.id.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase()))
  );

  // ── Paleta clara inspirada na capa do álbum
  const C = {
    bg: "#f5f5f0",
    card: "#ffffff",
    border: "#e0ddd5",
    accent: "#e8402a",       // vermelho FIFA
    accentB: "#1a3fa0",      // azul Copa
    accentG: "#2a9a4a",      // verde
    gold: "#C9A84C",
    text: "#1a1a1a",
    textSub: "#666",
    textFaint: "#aaa",
    glued: "#eaf7ed",
    gluedBorder: "#6abf7a",
    navActive: "#1a3fa0",
  };

  if (!loaded) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", background:C.bg, color:C.text, fontFamily:"'Arial Black', Arial, sans-serif", fontSize:18 }}>
      Carregando álbum...
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"Arial, sans-serif" }}>

      {/* ── HEADER ── */}
      <div style={{ background:"#fff", borderBottom:`3px solid ${C.accent}`, padding:"14px 20px", boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:10 }}>
            <div style={{ background:C.accent, borderRadius:10, padding:"6px 10px" }}>
              <span style={{ fontSize:28 }}>🏆</span>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:20, fontWeight:900, color:C.text, letterSpacing:1, textTransform:"uppercase" }}>FIFA World Cup 2026</div>
              <div style={{ fontSize:13, color:C.textSub, fontWeight:600 }}>Álbum do Grupo</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:28, fontWeight:900, color:C.accent }}>{pct}%</div>
              <div style={{ fontSize:13, color:C.textSub }}>{totalGlued}/{TOTAL}</div>
            </div>
          </div>
          {/* Barra de progresso */}
          <div style={{ background:"#eee", borderRadius:6, height:8, overflow:"hidden", marginBottom:10 }}>
            <div style={{ width:`${pct}%`, height:"100%", background:`linear-gradient(90deg,${C.accent},${C.gold})`, borderRadius:6, transition:"width 0.4s ease" }} />
          </div>
          {/* Stats */}
          <div style={{ display:"flex", gap:20, fontSize:14, fontWeight:700 }}>
            <span style={{ color:C.accentG }}>✅ {totalGlued} coladas</span>
            <span style={{ color:C.accent }}>❌ {totalMissing} faltando</span>
            <span style={{ color:C.accentB }}>📦 {totalRepeats} repetidas</span>
          </div>
        </div>
      </div>

      {/* ── NAV ── */}
      <div style={{ background:"#fff", borderBottom:`1px solid ${C.border}`, display:"flex", overflowX:"auto" }}>
        <div style={{ maxWidth:960, margin:"0 auto", display:"flex", width:"100%" }}>
          {[["album","📖 Álbum"],["missing","❌ Faltando"],["repeats","📦 Repetidas"]].map(([v,l]) => (
            <button key={v} onClick={() => setView(v)} style={{
              padding:"14px 22px", border:"none", cursor:"pointer", fontSize:15, fontWeight:800,
              background:"transparent",
              color: view===v ? C.navActive : C.textSub,
              borderBottom: view===v ? `3px solid ${C.navActive}` : "3px solid transparent",
              whiteSpace:"nowrap", transition:"all 0.15s", textTransform:"uppercase", letterSpacing:0.5
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding:"20px 16px", maxWidth:960, margin:"0 auto" }}>

        {/* ── ÁLBUM ── */}
        {view === "album" && (
          <>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="🔍 Buscar seleção ou figurinha..."
              style={{ width:"100%", padding:"12px 16px", background:"#fff", border:`2px solid ${C.border}`, borderRadius:10, color:C.text, fontSize:15, marginBottom:18, boxSizing:"border-box", outline:"none" }}
            />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(170px, 1fr))", gap:12 }}>
              {filteredTeams.map(team => {
                const total = team.stickers.length;
                const done = team.stickers.filter(s => state.glued[s.id]).length;
                const rpts = team.stickers.filter(s => state.repeats[s.id] > 0).reduce((a,s) => a + state.repeats[s.id], 0);
                const p = Math.round((done/total)*100);
                const complete = done === total;
                return (
                  <div key={team.id} onClick={() => { setActiveTeam(team.id); setView("team"); }}
                    style={{
                      background: complete ? "#fffbea" : C.card,
                      border: `2px solid ${complete ? C.gold : C.border}`,
                      borderRadius:12, padding:14, cursor:"pointer",
                      transition:"all 0.15s", boxShadow:"0 1px 4px rgba(0,0,0,0.06)"
                    }}
                  >
                    {/* Bandeira + Nome */}
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <FlagImg code={FLAG[team.id]} size={28} />
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:14, fontWeight:800, color: complete ? C.gold : C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{team.name}</div>
                        <div style={{ fontSize:12, color:C.textFaint, fontWeight:600 }}>{team.id}</div>
                      </div>
                    </div>
                    {/* Barra */}
                    <div style={{ background:"#eee", borderRadius:4, height:5, marginBottom:8, overflow:"hidden" }}>
                      <div style={{ width:`${p}%`, height:"100%", background: complete ? C.gold : C.accentG, borderRadius:4 }} />
                    </div>
                    {/* Contadores */}
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, fontWeight:700 }}>
                      <span style={{ color:C.accentG }}>{done}/{total}</span>
                      {rpts > 0 && <span style={{ color:C.accentB }}>📦 {rpts}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── SELEÇÃO ── */}
        {view === "team" && activeTeam && (() => {
          const team = TEAMS.find(t => t.id === activeTeam);
          if (!team) return null;
          const done = team.stickers.filter(s => state.glued[s.id]).length;
          return (
            <>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18, background:"#fff", borderRadius:12, padding:"12px 16px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
                <button onClick={() => setView("album")} style={{ background:C.accentB, border:"none", borderRadius:8, color:"#fff", padding:"8px 16px", cursor:"pointer", fontSize:14, fontWeight:700 }}>← Voltar</button>
                <FlagImg code={FLAG[team.id]} size={32} />
                <div>
                  <div style={{ fontSize:18, fontWeight:900, color:C.text }}>{team.name}</div>
                  <div style={{ fontSize:13, color:C.textSub, fontWeight:600 }}>{done}/{team.stickers.length} coladas</div>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(140px, 1fr))", gap:10 }}>
                {team.stickers.map(s => {
                  const isGlued = !!state.glued[s.id];
                  const rpt = state.repeats[s.id] || 0;
                  return (
                    <div key={s.id} style={{
                      background: isGlued ? C.glued : C.card,
                      border: `2px solid ${isGlued ? C.gluedBorder : C.border}`,
                      borderRadius:10, padding:10, position:"relative",
                      boxShadow:"0 1px 3px rgba(0,0,0,0.05)"
                    }}>
                      {s.foil && <span style={{ position:"absolute", top:5, right:5, fontSize:10, background:C.gold, color:"#fff", borderRadius:3, padding:"1px 5px", fontWeight:700 }}>FOIL</span>}
                      <div style={{ fontSize:13, fontWeight:800, color:C.accent, marginBottom:2 }}>{s.id}</div>
                      <div style={{ fontSize:12, color:C.textSub, marginBottom:10, lineHeight:1.4, minHeight:32 }}>{s.name}</div>
                      <button onClick={() => toggleGlued(s.id)} style={{
                        width:"100%", padding:"6px 0", border:"none", borderRadius:6, cursor:"pointer", fontSize:13, fontWeight:800,
                        background: isGlued ? C.accentG : C.accentB,
                        color:"#fff", marginBottom:8, transition:"all 0.15s"
                      }}>{isGlued ? "✅ Colada" : "Colar"}</button>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                        <span style={{ fontSize:12, color:C.textFaint }}>📦</span>
                        <button onClick={() => setRepeats(s.id, rpt-1)} style={{ background:"#eee", border:"none", color:C.text, width:24, height:24, borderRadius:5, cursor:"pointer", fontSize:15, fontWeight:700, lineHeight:1 }}>−</button>
                        <span style={{ fontSize:14, fontWeight:800, color: rpt>0 ? C.accentB : C.textFaint, minWidth:18, textAlign:"center" }}>{rpt}</span>
                        <button onClick={() => setRepeats(s.id, rpt+1)} style={{ background:"#eee", border:"none", color:C.text, width:24, height:24, borderRadius:5, cursor:"pointer", fontSize:15, fontWeight:700, lineHeight:1 }}>+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })()}

        {/* ── FALTANDO ── */}
        {view === "missing" && (
          <>
            <div style={{ fontSize:15, color:C.textSub, marginBottom:16 }}>❌ <strong style={{ color:C.text }}>{allMissing.length}</strong> figurinhas faltando</div>
            {TEAMS.filter(t => t.stickers.some(s => !state.glued[s.id])).map(team => {
              const missing = team.stickers.filter(s => !state.glued[s.id]);
              return (
                <div key={team.id} style={{ marginBottom:18, background:C.card, borderRadius:12, padding:"12px 14px", boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                    <FlagImg code={FLAG[team.id]} size={22} />
                    <span style={{ fontSize:15, fontWeight:800, color:C.text }}>{team.name}</span>
                    <span style={{ fontSize:13, color:C.textFaint, fontWeight:600 }}>({missing.length} faltando)</span>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {missing.map(s => (
                      <button key={s.id} onClick={() => toggleGlued(s.id)} style={{
                        padding:"5px 10px", background:C.bg, border:`1px solid ${C.border}`, borderRadius:6,
                        color:C.text, fontSize:13, fontWeight:700, cursor:"pointer"
                      }} title={s.name}>{s.id} <span style={{ fontSize:11, color:C.textFaint, fontWeight:400 }}>{s.name}</span></button>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* ── REPETIDAS ── */}
        {view === "repeats" && (
          <>
            <div style={{ fontSize:15, color:C.textSub, marginBottom:16 }}>📦 <strong style={{ color:C.text }}>{allRepeats.length}</strong> tipos · <strong style={{ color:C.text }}>{totalRepeats}</strong> figurinhas no total</div>
            {allRepeats.length === 0 ? (
              <div style={{ color:C.textFaint, textAlign:"center", padding:48, fontSize:15, background:C.card, borderRadius:12 }}>Nenhuma repetida registrada ainda.</div>
            ) : (
              TEAMS.filter(t => t.stickers.some(s => state.repeats[s.id] > 0)).map(team => {
                const rpts = team.stickers.filter(s => state.repeats[s.id] > 0);
                return (
                  <div key={team.id} style={{ marginBottom:18, background:C.card, borderRadius:12, padding:"12px 14px", boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                      <FlagImg code={FLAG[team.id]} size={22} />
                      <span style={{ fontSize:15, fontWeight:800, color:C.text }}>{team.name}</span>
                    </div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {rpts.map(s => (
                        <div key={s.id} style={{ padding:"5px 10px", background:"#e8f0fe", border:`1px solid #b8cdf8`, borderRadius:6, display:"flex", alignItems:"center", gap:6 }}>
                          <span style={{ fontSize:13, color:C.accentB, fontWeight:800 }}>{s.id}</span>
                          <span style={{ fontSize:11, color:C.textSub }}>{s.name}</span>
                          <span style={{ fontSize:14, color:"#fff", background:C.accentB, borderRadius:4, padding:"1px 8px", fontWeight:800 }}>×{state.repeats[s.id]}</span>
                          <button onClick={() => setRepeats(s.id, state.repeats[s.id]-1)} style={{ background:"transparent", border:"none", color:C.accentB, cursor:"pointer", fontSize:18, fontWeight:700, lineHeight:1, padding:0 }}>−</button>
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

      {/* ── TOAST ── */}
      {toast && (
        <div style={{
          position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)",
          background:C.accentG, borderRadius:10, padding:"12px 24px",
          color:"#fff", fontSize:15, fontWeight:800, zIndex:999, pointerEvents:"none",
          boxShadow:"0 4px 16px rgba(0,0,0,0.15)"
        }}>{toast}</div>
      )}
    </div>
  );
}
