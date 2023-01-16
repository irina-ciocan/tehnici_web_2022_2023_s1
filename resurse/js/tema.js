window.addEventListener("DOMContentLoaded",  function(){
    //vector_teme=["dark","light","craciun","1dec"]
    temaCurenta=localStorage.getItem("tema")
    if(temaCurenta)
        document.body.classList.add(temaCurenta);


    document.getElementById("tema").onclick=function(){
        if (document.body.classList.contains("dark")){
            document.body.classList.remove("dark");
            localStorage.removeItem("tema");
        }
        else{
            document.body.classList.add("dark");
            localStorage.setItem("tema","dark");
        }
    }
});