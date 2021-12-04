const roger_color = "#f44336";
const nadal_color = "#ebcb8b";
const djokovic_color = "#4fc3f7";

function getColor(name) {
    switch(name) {
        case "Federer":
            return roger_color
        case "Nadal":
            return nadal_color
        case "Djokovic":
            return djokovic_color
        default:
            return "#6C935C"
    }
}