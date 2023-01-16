window.addEventListener("load",  function(){
    x=100

    //----------- preluare date cos virtual (din localStorage)
    // in localStorage vom memora cosul virtual ca o lista de id-uri separate prin virgula
    // "cos_virtual": "3,1,10,4,2"
    // daca vreau si cantitate: "3|2,5|1,1|7" prajitura 3 (2 bucati), prajitura 5(1 bucata)...

    let iduriProduse=localStorage.getItem("cos_virtual");
    iduriProduse=iduriProduse?iduriProduse.split(","):[];      //["3","1","10","4","2"]
/*
    [value=3].select-cos{
        color:red;
    }

*/
    for(let idp of iduriProduse){
        let ch = document.querySelector(`[value='${idp}'].select-cos`);
        if(ch){
            ch.checked=true;
        }
        else{
            console.log("id cos virtual inexistent:", idp);
        }
    }

    //----------- adaugare date in cosul virtual (din localStorage)
    let checkboxuri= document.getElementsByClassName("select-cos");
    for(let ch of checkboxuri){
        ch.onchange=function(){
            let iduriProduse=localStorage.getItem("cos_virtual");
            iduriProduse=iduriProduse?iduriProduse.split(","):[];

            if( this.checked){
                iduriProduse.push(this.value)
            }
            else{
                let poz= iduriProduse.indexOf(this.value);
                if(poz != -1){
                    iduriProduse.splice(poz,1);
                }
            }

            localStorage.setItem("cos_virtual", iduriProduse.join(","))
        }
        
    }

    document.getElementById("inp-pret").onchange=function(){
        console.log(this.value);
        document.getElementById("infoRange").innerHTML=`(${this.value})`
    }


    document.getElementById("filtrare").onclick=function(){
        //verificare inputuri
        condValidare=true;
        var inpNume=document.getElementById("inp-nume").value.toLowerCase().trim();
        condValidare = condValidare && inpNume.match(new RegExp("^[a-zA-Z]*$"))
        if (!condValidare){
            alert("Inputuri gresite");
            return;
        }
        var inpCategorie=document.getElementById("inp-categorie").value;

        var produse=document.getElementsByClassName("produs");
        console.log(produse)
        for (let produs of produse){
            var cond1=false, cond2=false;
            produs.style.display="none";

            let nume= produs.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase().trim();
            if(nume.includes(inpNume)){
                cond1=true;
            }
            let categorie= produs.getElementsByClassName("val-categorie")[0].innerHTML;
            if(inpCategorie=="toate" || categorie==inpCategorie){
                cond2=true;
            }


            if(cond1 && cond2){
                produs.style.display="block";
            }
        }
    }

    document.getElementById("resetare").onclick=function(){
        //resteare produse
        var produse=document.getElementsByClassName("produs");
        for (let produs of produse){
            produs.style.display="block";
        }
        //resetare filtre
        document.getElementById("inp-nume").value="";
        document.getElementById("sel-toate").selected=true;

    }

    function sorteaza(semn){
        var produse=document.getElementsByClassName("produs");
        var v_produse=Array.from(produse);


        v_produse.sort(function(a,b){
            var pret_a=parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML);
            var pret_b=parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML);
            if(pret_a==pret_b){
                var nume_a=a.getElementsByClassName("val-nume")[0].innerHTML;
                var nume_b=b.getElementsByClassName("val-nume")[0].innerHTML;
                return semn*nume_a.localeCompare(nume_b);
            }
            return (pret_a-pret_b)*semn;
        })
        for (let produs of v_produse){
            produs.parentNode.appendChild(produs);
        }       
    }

    document.getElementById("sortCrescNume").onclick=function(){
        sorteaza(1);
    }
    document.getElementById("sortDescrescNume").onclick=function(){
        sorteaza(-1);
    }

    window.onkeydown=function(e){
        console.log(e);
        if(e.key=='c' && e.altKey){
            var produse=document.getElementsByClassName("produs");
            let suma=0;
            for(let prod of produse){
                if (prod.style.display!="none")
                    suma+=parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML)
            }
            if (!document.getElementById("rezultat")){
                rezultat=document.createElement("p");
                rezultat.id="rezultat";
                rezultat.innerHTML="<b>Pret total:</b> "+suma;
                //document.getElementById("produse").appendChild(rezultat);
                var ps=document.getElementById("p-suma");
                ps.parentNode.insertBefore(rezultat,ps.nextSibling);
                rezultat.style.border="1px solid purple";
                rezultat.onclick= function(){
                    this.remove();
                }

                setTimeout(function (){
                    document.getElementById("rezultat").remove();
                }, 2000);
            }
            //setInterval(function(){alert(1);}, 3000);
        }
    }

});