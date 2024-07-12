const guisetup=()=> {
    let X = 10;//M
    let Y = 10;//N
    let h = 1;
    let k = 5;
    var count=0;

    let f = new Array(X); // 要素数5の配列(array)を作成
    for (let x = 0; x < X; x++) {
        f[x] = new Array(5); // 配列(array)の各要素に対して、要素数5の配列を作成
        for (let y = 0; y < 5; y++) {
            f[x][y] = 0; // 0で初期化
        }
    }

    const vc1=new VCanvas( document.querySelector('#graph1'));
    const vc3=new VCanvas(document.querySelector('#graph12'));
    let tb1=document.querySelector("#tb1");
    vc1.scale(-3.5,3.5,7,7);
    vc3.scale(-3.5,3.5,7,7);
    vc1.lineWidth(35);
    var Ptime=0.0;

    //経過時間
    function counter(){
        Ptime++;
        document.querySelector("#etime").innerHTML="経過時間T:"+Ptime+("*10^(-1)s");
    }

    //tableの追加
    function add(){
       let tr=document.createElement("tr");
       for(let i=0;i<11;i++){
           let td =document.createElement("td");
           tr.appendChild(td);
        }
        tb1.appendChild(tr);
    }

    //start ボタンが押されたとき
    document.querySelector("#start").addEventListener("click",()=>{
        PassageID=setInterval(()=>{
            counter()
        },1000);
        
        hyou=setInterval(()=>{
            add();
            for(let i=0;i<X;i++){
                document.getElementsByTagName("td")[i+count*(X+1)].textContent=f[i][count].toFixed(2).padStart(8);
            }
            count++;

            vc1.cls();
            vc1.beginPath();
            vc1.line(2.8,3.85,3.5,3.85)
            vc1.stroke();

        },5000);
        document.querySelector("#start").disabled=true;
        document.querySelector("#clear").disabled=true;
        document.querySelector("#decide").disabled=true;
    });

    //stop ボタンが押されたとき
    document.querySelector("#stop").addEventListener("click",()=>{
        //PassageID = setInterval(counter,1000); 
        clearInterval(PassageID);
        clearInterval(hyou);
        document.querySelector("#start").disabled=false;
        document.querySelector("#clear").disabled=false;
        document.querySelector("#decide").disabled=false;
    });

    //clear ボタンが押されたとき
    document.querySelector("#clear").addEventListener("click",()=>{
        vc1.cls();
        Ptime=0;
        document.querySelector("#etime").innerHTML="経過時間T:"+Ptime+"*10^(-1)s";
        document.getElementsByTagName('td').textContent = '';
    });

    //一端 ボタンが押されたとき
    document.querySelector("#d1").addEventListener("click",()=>{
        vc1.cls();
        document.querySelector("#d1").disabled=true;
        document.querySelector("#d2").disabled=false;
        document.querySelector("#p1").disabled=true;
        document.querySelector("#p2").disabled=true;
        document.querySelector("#p3").disabled=true;
        document.querySelector("#p4").disabled=true;
        document.querySelector("#p5").disabled=true;
    });

    //両端 ボタンが押されたとき
    document.querySelector("#d2").addEventListener("click",()=>{
        document.querySelector("#d1").disabled=false;
        document.querySelector("#d2").disabled=true;
        document.querySelector("#p1").disabled=false;
        document.querySelector("#p2").disabled=false;
        document.querySelector("#p3").disabled=false;
        document.querySelector("#p4").disabled=false;
        document.querySelector("#p5").disabled=false;
    });

    //金 ボタンが押されたとき
    document.querySelector("#gold").addEventListener("click",()=>{
        let a=0.424;
        document.querySelector("#bronze").disabled=false;
        document.querySelector("#silver").disabled=false;
        document.querySelector("#gold").disabled=true;
        document.querySelector("#hk1").disabled=false;
        document.querySelector("#tab").innerHTML="金:a="+a;
    });

    //銀 ボタンが押されたとき
    document.querySelector("#silver").addEventListener("click",()=>{
        let a=0.613;
        document.querySelector("#bronze").disabled=false;
        document.querySelector("#silver").disabled=true;
        document.querySelector("#gold").disabled=false;
        document.querySelector("#hk1").disabled=false;
        document.querySelector("#tab").innerHTML="銀:a="+a;
    });

    //銅 ボタンが押されたとき
    document.querySelector("#bronze").addEventListener("click",()=>{
        let a=0.360;
        document.querySelector("#bronze").disabled=true;
        document.querySelector("#silver").disabled=false;
        document.querySelector("#gold").disabled=false;
        document.querySelector("#tab").innerHTML="銅:a="+a;
    });

    //0.5 ボタンが押されたとき
    document.querySelector("#hk1").addEventListener("click",()=>{
        let a=0.5;
        document.querySelector("#bronze").disabled=false;
        document.querySelector("#silver").disabled=false;
        document.querySelector("#gold").disabled=false;
        document.querySelector("#hk1").disabled=true;
        document.querySelector("#tab").innerHTML="a="+a;
    });

    // 設定ボタンが押されたとき
    document.querySelector("#decide").addEventListener("click",()=>{
        let input_temp=document.querySelector("#temp");
        let text_var=document.querySelector("#Text");
        text_var.innerHTML=input_temp.value+"℃";
        let a=0.5;
        //どの温度伝導率が押されているかによって伝導率の値を決定する。
        //未完成であるため、0.5しか設定できない
        if(document.querySelector("#gold").disabled==true){
            a=0.424;
        }else if(document.querySelector("#silver").disabled==true){
            a=0.613;
        }else if(document.querySelector("#bronze").disabled==true){
            a=0.36
        }else{
            a=0.5;
        }

        let b = k*a/(h*h)/5;

        // Initialize initial condition
        for (let i = 0; i < X; i++) {
            f[i][0] = 3.0 * i * h * (i * h - 9.0) + Number(input_temp.value);
        }

        // Set boundary conditions
        for (let j = 1; j < Y; j++) {
        f[0][j] = f[X - 1][j] = Number(input_temp.value);
        }
    
        // Compute using explicit finite difference method
        for (let j = 0; j < Y - 1; j++) {
            for (let i = 1; i < X - 1; i++) {
                f[i][j + 1] =b * (f[i + 1][j]+ f[i - 1][j]);
            }
    }   
    
    //境界条件によって状態変化図に色を付ける
    vc1.forecolor(254, 254, 21, 1);
    vc1.beginPath();
    vc1.line(-3.15,3.5,-3.15,10.5)
    vc1.line(3.15,3.5,3.15,10.5)
    vc1.stroke();

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
