const TOKEN = "";
const API_URL = "https://superheroapi.com/api.php/" + TOKEN;

class Personaje {
  constructor(stats, as, fb, name, weight, height) {
    this.intelligence = Math.round((((parseInt(stats.intelligence)||0)*2 + as)/1.1)*fb)
    this.strength = Math.round((((parseInt(stats.strength)||0)*2 + as)/1.1)*fb)
    this.speed = Math.round((((parseInt(stats.speed)||0)*2 + as)/1.1)*fb)
    this.durability = Math.round((((parseInt(stats.durability)||0)*2 + as)/1.1)*fb)
    this.power = Math.round((((parseInt(stats.power)||0)*2 + as)/1.1)*fb)
    this.combat = Math.round((((parseInt(stats.combat)||0)*2 + as)/1.1)*fb)
    this.hp = Math.round(((this.strength*0.8 + this.durability*0.7 + this.power)*(1 + as/10)) + 100)
    this.hpMax = this.hp
    this.mental = Math.round((this.intelligence*0.7 + this.speed*0.2 + this.combat*0.1)*fb)
    this.strong = Math.round((this.strength*0.6 + this.power*0.2 + this.combat*0.2)*fb)
    this.fast = Math.round((this.speed*0.55 + this.durability*0.25 + this.strength*0.2)*fb)
    this.alive = 1
    this.name = name
    this.weight = weight
    this.height = height
  }
  damage(x) {
      let posHP = this.hp - x;
      if(posHP > 0) this.hp = posHP;
      else this.alive = 0;
  }
  attack() {
      let at = Math.round(Math.random() * 2);
      if(at==2) return this.mental
      if(at==1) return this.strong
      else return this.fast
  }
  revive() {
      this.hp = this.hpMax;
      this.alive = 1;
  }
}

function startBattle(pjsA, pjsB){
    let A = [0, 1, 2, 3, 4];
    let B = [0, 1, 2, 3, 4];
    let battle = 2;
    while(battle){
        if(battle==2){
            console.log("Comienza la batalla!");
            console.log("Los integrantes del equipo A son:");
            for(let pj of pjsA){
                console.log("Pesando "+pj.weight+" y con una altura de "+pj.height+"...");
                console.log("Aquí tenemos aaaaa: "+pj.name+"!!!");
                console.log("%cclap! clap! clap!", "color:blue;font-style:italic;");
            }
            console.log("Yyyy ahoraaaa...");
            console.log("Los integrantes del equipo B son:");
            for(let pj of pjsB){
                console.log("Pesando "+pj.weight+" y con una altura de "+pj.height+"...");
                console.log("Aquí tenemos aaaaa: "+pj.name+"!!!");
                console.log("%cclap! clap! clap!", "color:green;font-style:italic;");
            }
            battle--;
        }
        let a=confirm('Deseas continuar la batalla? (El avance aparece en la consola)');
        if(a){
            let x = Math.round(Math.random() * (A.length-1)); //personaje del equipo A que ataca y recibe
            let y = Math.round(Math.random() * (B.length-1)); //personaje del equipo B que ataca y recibe
            let z = Math.round(Math.random()); //si z=0 ataca A primero, si z=1 ataca B primero
            if(z){
                //turno de B
                let dam = pjsB[B[y]].attack();
                let sgtTurn=1;
                pjsA[A[x]].damage(dam);
                if(pjsA[A[x]].alive) {
                    console.log(pjsA[A[x]].name+" recibe "+dam.toString()+" de un golpe por parte de "+pjsB[B[y]].name);
                    console.log(pjsA[A[x]].name+" ahora tiene "+pjsA[A[x]].hp+" puntos de vida.");
                }
                else {
                    console.log("%c"+pjsA[A[x]].name+" muere a causa del golpe de "+pjsB[B[y]].name, "color:red;font-style:bold;");
                    A.splice(x,1);
                    if(A.length==0){
                        console.log("%cEl equipo B gana esta batalla con "+pjsB.length.toString()+" sobrevivientes.", "color:green;font-style:bold;font-size: 30px");
                        battle=0;
                    }
                    sgtTurn=0;
                }
                //turno de A
                if(sgtTurn){
                    dam = pjsA[A[x]].attack();
                    pjsB[B[y]].damage(dam);
                    if(pjsB[B[y]].alive) {
                        console.log(pjsB[B[y]].name+" recibe "+dam.toString()+" de un golpe por parte de "+pjsA[A[x]].name);
                        console.log(pjsB[B[y]].name+" ahora tiene "+pjsB[B[y]].hp+" puntos de vida.");
                    }
                    else {
                        console.log("%c"+pjsB[B[y]].name+" muere a causa del golpe de "+pjsA[A[x]].name, "color:red;font-style:bold;");
                        B.splice(y,1);
                        if(B.length==0){
                            console.log("%cEl equipo A gana esta batalla con "+pjsA.length.toString()+" sobrevivientes.", "color:green;font-style:bold;font-size: 30px");
                            battle=0;
                        }
                    }
                }
                console.log("_________________________________________________________________________")
            }
            else{
                //turno de A
                let sgtTurn=1;
                let dam = pjsA[A[x]].attack();
                pjsB[B[y]].damage(dam);
                if(pjsB[B[y]].alive) {
                    console.log(pjsB[B[y]].name+" recibe "+dam.toString()+" de un golpe por parte de "+pjsA[A[x]].name);
                    console.log(pjsB[B[y]].name+" ahora tiene "+pjsB[B[y]].hp+" puntos de vida.");
                }
                else {
                    console.log("%c"+pjsB[B[y]].name+" muere a causa del golpe de "+pjsA[A[x]].name, "color:red;font-style:bold;");
                    B.splice(y,1);
                    if(B.length==0){
                        console.log("%cEl equipo B gana esta batalla con "+pjsA.length.toString()+" sobrevivientes.", "color:green;font-style:bold;font-size: 30px");
                        battle=0;
                    }
                    sgtTurn=0;
                }
                //turno de B
                if(sgtTurn){
                    dam = pjsB[B[y]].attack();
                    pjsA[A[x]].damage(dam);
                    if(pjsA[A[x]].alive) {
                        console.log(pjsA[A[x]].name+" recibe "+dam.toString()+" de un golpe por parte de "+pjsB[B[y]].name);
                        console.log(pjsA[A[x]].name+" ahora tiene "+pjsA[A[x]].hp+" puntos de vida.");
                    }
                    else {
                        console.log("%c"+pjsA[A[x]].name+" muere a causa del golpe de "+pjsB[B[y]].name, "color:red;font-style:bold;");
                        A.splice(x,1);
                        if(A.length==0){
                            console.log("%cEl equipo B gana esta batalla con "+pjsB.length.toString()+" sobrevivientes.", "color:green;font-style:bold;font-size: 30px");
                        }
                    }
                }
                console.log("_________________________________________________________________________")
            }
        }
        else battle = 0;
    }
}


async function getData(url, met='get') {
  const response = await fetch(url, {method: met})
  .catch(err => console.log(err));

  return response.json();
}


async function getEquipos(){
    var equipoA = [];//para recopilar las request
    var pjA = [];//arreglo de personajes a retornar
    var alignA = 0;//para calcular FB
    var equipoB = [];
    var pjB = [];
    var alignB = 0;

    for (let i=0, j=10; i<j; i++) {
        let num=Math.round(Math.random() * 730)+1;
        if (!equipoA.includes(num) && i<5) {
            equipoA.push(num);
        }
        else if (!equipoA.includes(num) && !equipoB.includes(num) && i>4) {
            equipoB.push(num);
        }
    }
    for (let x of equipoA) {
        let y=equipoA.indexOf(x);
        equipoA[y] = await getData(API_URL+x.toString());
        if (equipoA[y].biography.alignment == "good") alignA++;
        else alignA--;
    }
    for (let x of equipoB) {
        let y=equipoB.indexOf(x);
        equipoB[y] = await getData(API_URL+x.toString());
        if (equipoB[y].biography.alignment == "good") alignB++;
        else alignB--;
    }
    if(alignA>0) alignA="good";
    else alignA="bad";
    if(alignB>0) alignB="good";
    else alignB="bad";
    for (let x of equipoA) {
        let as = Math.round(Math.random() * 10);
        let fb =0;
        if (x.alignment == alignA) fb = 1 + Math.round(Math.random() * 9);
        else fb = 1/(1 + Math.round(Math.random() * 9));
        let pj = new Personaje(x.powerstats, as, fb, x.name, x.appearance.weight[1], x.appearance.height[1]);
        pjA.push(pj);
    }
    for (let x of equipoB) {
        let as = Math.round(Math.random() * 10);
        let fb =0;
        if (x.alignment == alignB) fb = 1 + Math.round(Math.random() * 9);
        else fb = 1/(1 + Math.round(Math.random() * 9));
        let pj = new Personaje(x.powerstats, as, fb, x.name, x.appearance.weight[1], x.appearance.height[1]);
        pjB.push(pj);
    }
    return [pjA, pjB];
}


while(true){
    var playing =1;
    const equipos = await getEquipos();
    const pjsA = equipos[0]; //shallow copy (se copian los Personajes, pero cada uno pierde hp tras batallas)
    const pjsB = equipos[1];
    while(playing){
        for (let pj of pjsA) pj.revive(); //ya que es shallow copy, hay que "revivir" a cada personaje
        for (let pj of pjsB) pj.revive();
        startBattle(pjsA, pjsB)
        let a=confirm('Deseas comenzar la batalla con los mismos personajes?');
        if(a==0) {
            console.log("Comenzará una nueva batalla con nuevos personajes")
            break;
        }
    }
}