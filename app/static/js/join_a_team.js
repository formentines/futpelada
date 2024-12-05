document.getElementById("searchInput").addEventListener("input", function() {
    var input = this.value.toLowerCase();
    var teamCards = document.querySelectorAll(".team-card");
    
    teamCards.forEach(function(card) {
        var name = card.querySelector("h2").textContent.toLowerCase();
        var description = card.querySelector("p").textContent.toLowerCase();
        
        if (name.includes(input) || description.includes(input)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});