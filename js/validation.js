document.getElementById("hydration").addEventListener("input", function () {
    const hydration = parseFloat(this.value); // Aktu�ln� hodnota hydratace
    const warningElement = document.getElementById("hydrationWarning"); // Element pro upozorn�n�

    // Zkontroluj hydrataci a nastav upozorn�n�
    // if (hydration < 50) {
    //     warningElement.innerHTML = getTranslation();"Hydration below 50% is not recommended, as the dough may become too stiff.";
    //     warningElement.classList.add("text-danger");
    //     warningElement.classList.remove("text-success");
    // } else if (hydration > 75) {
    //     warningElement.innerHTML = "Hydration above 75% is recommended for advanced bakers, as the dough becomes sticky and hard to handle.";
    //     warningElement.classList.add("text-danger");
    //     warningElement.classList.remove("text-success");
    // }
});