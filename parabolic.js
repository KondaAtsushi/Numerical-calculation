class Parabolic {
    
    constructor() {
        let X = 10;//M
        let Y = 10;//N
        let a = 0.5;
        let h = 0.5;
        let k = 0.25;
        let b = k*a/(h*h);
        let t;

        let f = new Array(X); // 要素数5の配列(array)を作成
        for (let x = 0; x < X; x++) {
            f[x] = new Array(5); // 配列(array)の各要素に対して、要素数5の配列を作成
            for (let y = 0; y < 5; y++) {
                f[x][y] = 0; // 0で初期化
            }
        }


    }
}

const guisetup=()=> {
    let X = 10;//M
    let Y = 10;//N
    let a;
    if(document.querySelector("#gold").disabled==true){
        a=0.424;
    }else if(document.querySelector("#silver").disabled==true){
        a=0.613;
    }else{
        a=0.360;
    }
    let h = 0.5;
    let k = 0.25;
    let b = k*a/(h*h);
    var count=0;

    let f = new Array(X); // 要素数5の配列(array)を作成
    for (let x = 0; x < X; x++) {
        f[x] = new Array(5); // 配列(array)の各要素に対して、要素数5の配列を作成
        for (let y = 0; y < 5; y++) {
            f[x][y] = 0; // 0で初期化
        }
    }
        const vc1=new VCanvas( document.querySelector('#graph1'));
        const vc2=new VCanvas(document.querySelector('#graph12'));
        vc1.scale(-3.5,3.5,7,7);
        vc2.scale(-3.5,3.5,7,7);
        var Ptime=0.0;

        function counter(){
            Ptime++;
            document.querySelector("#etime").innerHTML="経過時間T:"+Ptime;
        }

        let tb1=document.querySelector("#tb1");
        function add(){
            let tr=document.createElement("tr");
            for(let i=0;i<11;i++){
                let td =document.createElement("td");
                tr.appendChild(td);
            }
            tb1.appendChild(tr);
        }

            // Initialize initial condition
            for (let i = 0; i < X; i++) {
                f[i][0] = 5.0 * i * h * (i * h - 4.0) + 20.0;
            }

            // Set boundary conditions
            for (let j = 1; j < Y; j++) {
                f[0][j] = f[X - 1][j] = 20.0;
            }

            // Compute using explicit finite difference method
            for (let j = 0; j < Y - 1; j++) {
                for (let i = 1; i < X - 1; i++) {
                    f[i][j + 1] = f[i][j] + b * (f[i + 1][j] - 2.0 * f[i][j] + f[i - 1][j]);
                }
            }

            // Print the results
            for (let j = 0; j < Y; j++) {
                let t = k * j;
                console.log(t.toFixed(3).padStart(6) + ' ');
                for (let i = 0; i < X; i++) {
                    console.log(f[i][j].toFixed(3).padStart(8) + ' ');
                }
                console.log('\n');
            }    

        document.querySelector("#start").addEventListener("click",()=>{
            PassageID=setInterval(()=>{
                counter()
            },1000);
            
            hyou=setInterval(()=>{
                add();
                for(let i=0;i<X;i++){
                    document.getElementsByTagName("td")[i+count*(X+1)].textContent=f[i][count].toFixed(2).padStart(8);
                }
                console.log(count);
                count++;
            },5000);
            document.querySelector("#start").disabled=true;
            document.querySelector("#clear").disabled=true;

        });

        document.querySelector("#stop").addEventListener("click",()=>{
            //PassageID = setInterval(counter,1000); 
            clearInterval(PassageID);
            clearInterval(hyou);
            document.querySelector("#start").disabled=false;
            document.querySelector("#clear").disabled=false;
        });

        document.querySelector("#clear").addEventListener("click",()=>{
            vc1.cls();
            Ptime=0;
            document.querySelector("#etime").innerHTML="経過時間T:"+Ptime;
        });

        document.querySelector("#d1").addEventListener("click",()=>{
            vc1.cls();
            document.querySelector("#d1").disabled=true;
            document.querySelector("#d2").disabled=false;
            document.querySelector("#p1").disabled=true;
            document.querySelector("#p2").disabled=true;
            document.querySelector("#p3").disabled=true;
            document.querySelector("#p4").disabled=true;
            document.querySelector("#p5").disabled=true;
            document.querySelector("#p6").disabled=true;
        });

        document.querySelector("#d2").addEventListener("click",()=>{
            document.querySelector("#d1").disabled=false;
            document.querySelector("#d2").disabled=true;
            document.querySelector("#p1").disabled=false;
            document.querySelector("#p2").disabled=false;
            document.querySelector("#p3").disabled=false;
            document.querySelector("#p4").disabled=false;
            document.querySelector("#p5").disabled=false;
            document.querySelector("#p6").disabled=false;
        });

        document.querySelector("#gold").addEventListener("click",()=>{
            let a=0.424;
            document.querySelector("#bronze").disabled=false;
            document.querySelector("#silver").disabled=false;
            document.querySelector("#gold").disabled=true;
            document.querySelector("#tab").innerHTML="金:a="+a;
        });

        document.querySelector("#silver").addEventListener("click",()=>{
            let a=0.613;
            document.querySelector("#bronze").disabled=false;
            document.querySelector("#silver").disabled=true;
            document.querySelector("#gold").disabled=false;
            document.querySelector("#tab").innerHTML="銀:a="+a;
        });

        document.querySelector("#bronze").addEventListener("click",()=>{
            let a=0.360;
            document.querySelector("#bronze").disabled=true;
            document.querySelector("#silver").disabled=false;
            document.querySelector("#gold").disabled=false;
            document.querySelector("#tab").innerHTML="銅:a="+a;
        });

        document.querySelector("#decide").addEventListener("click",()=>{
            let input_temp=document.querySelector("#temp");
            let text_var = document.querySelector("#Text");
            text_var.innerHTML=input_temp.value+"℃";

        });

        document.querySelector("#p1").addEventListener("click",()=>{
            vc1.cls();
            vc1.beginPath();
            vc1.circle(-3,4,3);
            vc1.stroke();
            vc1.fill();

            vc2.forecolor(0,250,250,0.5);
            vc2.beginPath();
            vc2.rect(-3,4,3,7);
            vc2.stroke();
            vc2.fill();
        });

        document.querySelector("#p2").addEventListener("click",()=>{
            vc1.cls();
            vc1.beginPath();
            vc1.circle(3,4,3);
            vc1.stroke();
            vc1.fill();
        });
        
        document.querySelector("#p3").addEventListener("click",()=>{
            vc1.cls();
            vc1.beginPath();
            vc1.circle(0,7,3);
            vc1.stroke();
            vc1.fill();
        });

        document.querySelector("#p4").addEventListener("click",()=>{
            vc1.cls();
            vc1.beginPath();
            vc1.circle(-3,10,3);
            vc1.stroke();
            vc1.fill();
        });

        document.querySelector("#p5").addEventListener("click",()=>{
            vc1.cls();
            vc1.beginPath();
            vc1.circle(3,10,3);
            vc1.stroke();
            vc1.fill();
        });
}

//表の描画
window.addEventListener('load',()=>{
    guisetup();

    vc2= new VCanvas( document.querySelector('#graph12'));
    vc2.scale(-3.5,3.5,7,7);

    for(var i=0;i<8;i+=0.7){
        vc2.beginPath();
        vc2.line( -3.5, 3.5+i, 3.5, 3.5+i );
        vc2.stroke();
    }

    for(var j=0;j<8;j+=0.7){
        vc2.beginPath();
        vc2.line( -3.5+j, 3.5, -3.5+j, 10.5);
        vc2.stroke();
    }
});