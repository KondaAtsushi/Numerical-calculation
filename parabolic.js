const guisetup=()=> {
    let X = 10;
    let Y = 10;
    let h = 1;
    let k = 5;
    var count=0;

    let f = new Array(X);
    let f2 = new Array(X); // 要素数Xの配列(array)を作成
    for (let i = 0; i < X; i++) {
        f[i] = new Array(Y);
        f2[i] = new Array(Y); // 配列(array)の各要素に対して、要素数Yの配列を作成
        for (let j = 0; j < Y; j++) {
            f[i][j] = 0;
            f2[i][j] = 0; // 0で初期化
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
           let td=document.createElement("td");
           tr.appendChild(td);
        }
        tb1.appendChild(tr);
    }

    // 温度に対する色設定
    function color(clr){
        if(clr<=0){
            vc1.forecolor(0,0,0,1);//黒
        }else if(clr<=10){
            vc1.forecolor(76,0,153, 1);//濃紫
        }else if(clr<=20){
            vc1.forecolor(178,102,255, 1);//紫
        }else if(clr<=30){
            vc1.forecolor(0,0,255, 1);//青
        }else if(clr<=40){
            vc1.forecolor(0,255,255, 1);//水
        }else if(clr<=50){
            vc1.forecolor(0,255,0, 1);//緑
        }else if(clr<=60){
            vc1.forecolor(255,255,0, 1);//黄
        }else if(clr<=70){
            vc1.forecolor(255,128,0, 1);//橙
        }else if(clr<=80){
            vc1.forecolor(255,0,0,1);//赤
        }else if(clr<=90){
            vc1.forecolor(102,0,0, 1);//濃赤
        }else{
            vc1.forecolor(51,0,0, 1);//茶
        }
    }

    //start ボタンが押されたとき
    document.querySelector("#start").addEventListener("click",()=>{
    
        PassageID=setInterval(()=>{
            counter()
        },1000);
        
        hyou=setInterval(()=>{
            add();
            for(let i=0;i<X;i++){
                document.getElementsByTagName("td")[i+count*(X+1)].textContent=f2[i][count].toFixed(2).padStart(8);
            }
            count++;
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
    });

    //clear ボタンが押されたとき
    document.querySelector("#clear").addEventListener("click",()=>{
        vc1.cls();
        Ptime=0;
        document.querySelector("#etime").innerHTML="経過時間T:"+Ptime+"*10^(-1)s";
        document.getElementsByTagName('td').textContent = '';
    });

    //一端 ボタンが押されたとき
    //未実装
    document.querySelector("#d1").addEventListener("click",()=>{
        vc1.cls();
        document.querySelector("#d1").disabled=true;
        document.querySelector("#d2").disabled=false;
    });

    //両端 ボタンが押されたとき
    document.querySelector("#d2").addEventListener("click",()=>{
        document.querySelector("#d1").disabled=false;
        document.querySelector("#d2").disabled=true;
    });

    //金 ボタンが押されたとき
    //適用されず
    document.querySelector("#gold").addEventListener("click",()=>{
        let a=0.424;
        document.querySelector("#bronze").disabled=false;
        document.querySelector("#silver").disabled=false;
        document.querySelector("#gold").disabled=true;
        document.querySelector("#hk1").disabled=false;
        document.querySelector("#tab").innerHTML="金:a="+a;
    });

    //銀 ボタンが押されたとき
    //適用されず
    document.querySelector("#silver").addEventListener("click",()=>{
        let a=0.613;
        document.querySelector("#bronze").disabled=false;
        document.querySelector("#silver").disabled=true;
        document.querySelector("#gold").disabled=false;
        document.querySelector("#hk1").disabled=false;
        document.querySelector("#tab").innerHTML="銀:a="+a;
    });

    //銅 ボタンが押されたとき
    //適用されず
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
        document.querySelector("#decide").disabled=true;
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
        var list = [];//色分け用一次元配列
        //h=k=1のときの差分方程式
        // Initialize initial condition
        for (let i = 0; i < X; i++) {
            f[i][0] = 3.0 * i * h * (i * h - 9.0) + Number(input_temp.value);
            f2[i][0]=f[i][0];
            list.push(f[i][0]);
        }

        // Set boundary conditions
        for(let j  = 1; j < Y; j++) {
            f[0][j] = f[Y - 1][j] = Number(input_temp.value);
            f2[0][j]=f[0][j];
        }
    
        // Compute using explicit finite difference method
        for (let j = 0; j < Y - 1; j++) {
            for (let i = 1; i < X - 1; i++) {
                f[i][j + 1] =b * (f[i + 1][j]+ f[i - 1][j]);
                f2[i][j+1]=f[i][j+1];
                list.push(f[i][j+1]);
            }
        }

        //コンソールに計算結果を出す
        //デバッグ用
        /*for (let j = 0; j < 100; j++) {
            console.log(list[j]);
            console.log('000000');
        }*/

        for (let i = 0; i < X; i++) {
            //console.log(list[i]);
            color(list[i]);
            d=-3.5+i*0.7;
            f=-2.8+i*0.7;
            vc1.beginPath();
            vc1.line(d,10.15,f,10.15)
            vc1.stroke(); 
        }


        //通常の差分方程式
        //もし、hとkの値を変えれるようになったときにしようする。
        // Initialize initial condition
        /*for (let i = 0; i < X; i++) {
            f[i][0] = 3.0 * i * h * (i * h - 9.0) + Number(input_temp.value);
        }

        // Set boundary conditions
        for (let j = 1; j < Y; j++) {
        f[0][j] = f[X - 1][j] = Number(input_temp.value);
        }
    
        // Compute using explicit finite difference method
        for (let j = 0; j < Y - 1; j++) {
            for (let i = 1; i < X - 1; i++) {
                f[i][j + 1] =f[i][j]+b * (f[i + 1][j]-2*f[i][j]+ f[i - 1][j]);
            }
        }*/

        //境界条件によって状態変化図に色を付ける
        color(Number(input_temp.value));
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
