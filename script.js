
document.querySelector("button").addEventListener("click", find);
document.onkeydown = function(el){
    if(el.code == "Enter"){
        find();
    }
}

function find() {
    document.querySelector(".pl").style.opacity = "1";
    let word = document.getElementById("inputWord").value;
    var xml = new XMLHttpRequest();
    let words = [];

    let searchtype = document.querySelector("input[name='toSearch']:checked").id;
    // console.log(searchtype);
    xml.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.querySelector(".pl").style.opacity = "0";
            let json = JSON.parse(this.responseText);
            json.forEach(obj => {
                words.push(" "+obj.word);             
            });
            document.querySelector(".resP").textContent = words;
       }
    };
    xml.open("GET", `https://api.datamuse.com/words?${searchtype}=${word}`);
    xml.send();
    document.getElementById("inputWord").value = null;
}

