function calculateDough() {
    const numPortions = parseFloat(document.getElementById("numPortions").value);
    const pizzaSize = parseFloat(document.getElementById("pizzaSize").value);
    const hydration = parseFloat(document.getElementById("hydration").value);
    const salt = parseFloat(document.getElementById("salt").value);
    const pizzaDate = document.getElementById("pizzaDate").value;
    const pizzaTime = document.getElementById("pizzaTime").value;

    if (isNaN(numPortions) || numPortions <= 0 ||
        isNaN(pizzaSize) || pizzaSize <= 0 ||
        isNaN(hydration) || hydration < 50 || hydration > 100 ||
        isNaN(salt) || salt < 0) {
        document.getElementById("results").innerHTML = 
            `<p class='text-danger text-center'>Please enter valid input values.</p>`;
        return;
    }

    const totalWeight = numPortions * pizzaSize;
    const totalFlour = totalWeight / (1 + hydration / 100);
    const totalWater = totalFlour * (hydration / 100);
    const totalSalt = totalFlour * (salt / 100);

    const poolishFlour = totalFlour / 2;
    const poolishWater = poolishFlour;
    const yeast = poolishFlour * 0.02;
    const honey = poolishFlour * 0.02;

    const finalFlour = totalFlour - poolishFlour;
    const finalWater = totalWater - poolishWater;

    // Vypocet casu startu Poolishe
    const recommendedStartRange = calculatePoolishTimeRange(pizzaDate, pizzaTime);
    //Vypocet casu final mixu
    const finalMixTimeRange = calculateFinalMixTimeRange(pizzaDate, pizzaTime);

    const totalBox = `
    <div>
        <strong>${getTranslation('totalIngredients')}</strong>
        <div class="d-flex flex-wrap justify-content-around gap-3 p-3 bg-light">
            <div class="mini-box-total text-center">
                <strong>${getTranslation('flour')}</strong>
                <p>${Math.round(totalFlour)}g</p>
            </div>
            <div class="mini-box-total text-center">
                <strong>${getTranslation('water')}</strong>
                <p>${Math.round(totalWater)}g</p>
            </div>
            <div class="mini-box-total text-center">
                <strong>${getTranslation('salt')}</strong>
                <p>${Math.round(totalSalt)}g</p>
            </div>
            <div class="mini-box-total text-center">
                <strong>${getTranslation('yeast')}</strong>
                <p>${Math.round(yeast)}g</p>
            </div>
            <div class="mini-box-total text-center">
                <strong>${getTranslation('honey')}</strong>
                <p>${Math.round(honey)}g</p>
            </div>
        </div>
    </div>
`;

    /********************POOLISH********************/
    const poolishBox = `
        <div>
            <strong>${getTranslation('poolish')}</strong>
            <small class="text-muted"><i class="bi bi-clock"></i> ${getTranslation('recommendedStart')}: ${recommendedStartRange}</small>
            ${generatePoolishBox(poolishFlour, poolishWater, yeast, honey)}
        </div>
    `;

    function generatePoolishBox(poolishFlour, poolishWater, yeast, honey) {
        return `
            <div class="d-flex flex-wrap justify-content-around gap-3 p-3 bg-light">
                <div class="mini-box-poolish text-center">
                    <strong>${getTranslation('flour')}</strong>: ${Math.round(poolishFlour)}g
                </div>
                <div class="mini-box-poolish text-center">
                    <strong>${getTranslation('water')}</strong>: ${Math.round(poolishWater)}g
                </div>
                <div class="mini-box-poolish text-center">
                    <strong>${getTranslation('yeast')}</strong>: ${Math.round(yeast)}g
                </div>
                <div class="mini-box-poolish text-center">
                    <strong>${getTranslation('honey')}</strong>: ${Math.round(honey)}g
                </div>
            </div>
        `;
    }
    //POOLISH INSTRUCTIONS
    function generatePoolishInstructions(poolishWater, poolishFlour) {
        //getDynamicValues(water = null, flour = null, honey = null, yeast = null, salt = null, currentLanguage)
        const dynamicValues = getDynamicValues(poolishWater, poolishFlour, honey, yeast, null, currentLanguage);

        return `
            <div id="instructionsWrapper">
                <div id="toggleInstructionsWrapper" class="d-flex justify-content-end mt-2">   
                    <button id="toggleInstructions" type="button" class="btn btn-link p-0" onclick="toggleInstructions(event)">
                        ${getTranslation('hideInstructions')}
                    </button>
                </div>
                <div id="instructionsBox" class="instructions-box">
                    <h5>${getTranslation('instructions')}</h5>
                    <ul style="list-style-type: disc; padding-left: 20px;">
                        ${generateDynamicStepWithTooltips('step1',dynamicValues, 'step1_tooltips')}
                        ${generateDynamicStepWithTooltips('step2',dynamicValues, 'step2_tooltips')}
                        ${generateDynamicStepWithTooltips('step3',dynamicValues, 'step3_tooltips')}
                    </ul>
                </div>
            </div>
        `;
    }

    /********************FINAL MIX********************/
    const finalmixBox = `
        <div>
            <strong>${getTranslation('finalMix')}</strong>
            <small class="text-muted"><i class="bi bi-clock"></i> ${getTranslation('recommendedStart')}: ${finalMixTimeRange}</small><br>
            ${generatefinalmixBox(finalFlour, finalWater, yeast, honey)}
        </div>
    `;

    function generatefinalmixBox(finalFlour, finalWater, totalSalt) {  
        return `
            <div class="d-flex flex-wrap justify-content-around gap-3 p-3 bg-light">
                <div class="mini-box-poolish text-center">
                    <strong>${getTranslation('flour')}</strong>: ${Math.round(finalFlour)}g
                </div>
                <div class="mini-box-poolish text-center">
                    <strong>${getTranslation('water')}</strong>: ${Math.round(finalWater)}g
                </div>
                <div class="mini-box-poolish text-center">
                    <strong>${getTranslation('salt')}</strong>: ${Math.round(totalSalt)}g
                </div>
            </div>
        `;
    }

    //FINAL INSTRUCTIONS
    function generateFinalMixInstructions() {
        //getDynamicValues(water = null, flour = null, honey = null, yeast = null, salt = null, currentLanguage)
        const dynamicValues = getDynamicValues(finalWater, finalFlour, null, null,totalSalt, currentLanguage);

        return `
            <div id="finalInstructionsWrapper">
                <div id="toggleFinalInstructionsWrapper" class="d-flex justify-content-end mt-2">   
                    <button id="toggleFinalInstructions" type="button" class="btn btn-link p-0" onclick="toggleFinalInstructions(event)">
                        ${getTranslation('showInstructions')}
                    </button>
                </div>
                <div id="finalInstructionsBox" class="final-instructions-box">
                    <h5>${getTranslation('finalInstructions')}</h5>
                    <ul style="list-style-type: disc; padding-left: 20px;">
                        ${generateDynamicStepWithTooltips('finalMixStep1',dynamicValues, 'finalStep1_tooltips')}
                        ${generateDynamicStepWithTooltips('finalMixStep2',dynamicValues, 'finalStep2_tooltips')}
                        ${generateDynamicStepWithTooltips('finalMixStep3',dynamicValues, 'finalStep3_tooltips')}
                        ${generateDynamicStepWithTooltips('finalMixStep4',dynamicValues, 'finalStep4_tooltips')}
                    </ul>
                </div>
            </div>
        `;
    }
    
    document.getElementById("results").innerHTML = `
            ${totalBox}
            ${poolishBox}
            ${generatePoolishInstructions(poolishWater, poolishFlour)}
            ${finalmixBox}
            ${generateFinalMixInstructions()}
        `;
    }

// function generateStepWithTooltips(stepKey, tooltipsKey) {
//     const stepText = translations[currentLanguage][stepKey] || "";
//     const tooltips = translations[currentLanguage][tooltipsKey] || {};

//     let stepHTML = stepText;
//     for (const [word, tooltip] of Object.entries(tooltips)) {
//         const tooltipHTML = `<span class="info-word" data-info="${tooltip}">${word}</span>`;
//         const regex = new RegExp(`\\b${word}\\b`, 'g');
//         stepHTML = stepHTML.replace(regex, tooltipHTML);
//     }

//     return `<li>${stepHTML}</li>`;
// }

function generateDynamicStepWithTooltips(stepKey, dynamicValues = {}, tooltipsKey) {
    let stepTemplate = translations[currentLanguage][stepKey] || "";
    const tooltips = translations[currentLanguage][tooltipsKey] || {};

    Object.keys(dynamicValues).forEach(key => {
        const value = dynamicValues[key] || "";
        const tooltip = tooltips[key];
        const replacement = tooltip
            ? `<span class="info-word" data-info="${tooltip}">${value}</span>`
            : value;

        const placeholder = `{${key}}`;
        stepTemplate = stepTemplate.replace(placeholder, replacement);
    });

    return `<li>${stepTemplate}</li>`;
}

// Funkce pro vypocet casu startu Poolish
function calculatePoolishTimeRange(pizzaDate, pizzaTime) {
    const pizzaDateTime = new Date(`${pizzaDate}T${pizzaTime}`);

    const startMinus29 = new Date(pizzaDateTime);
    startMinus29.setHours(pizzaDateTime.getHours() - 25);

    const startMinus19 = new Date(pizzaDateTime);
    startMinus19.setHours(pizzaDateTime.getHours() - 18);

    return `${formatTimeRange(startMinus29, startMinus19)}`;
}

// Funkce pro vypocet casu startu final mix
function calculateFinalMixTimeRange(pizzaDate, pizzaTime) {
    const pizzaDateTime = new Date(`${pizzaDate}T${pizzaTime}`);

    const startMinus4 = new Date(pizzaDateTime);
    startMinus4.setHours(pizzaDateTime.getHours() - 4);

    const startMinus2 = new Date(pizzaDateTime);
    startMinus2.setHours(pizzaDateTime.getHours() - 2);

    return `${formatTimeRange(startMinus4, startMinus2)}`;
}

function formatTimeRange(start, end) {
    if (!(start instanceof Date) || isNaN(start) || !(end instanceof Date) || isNaN(end)) {
        return getTranslation('invalidTimeRange'); // Pøeklad pro "Invalid time range"
    }

    const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' };
    const startTime = start.toLocaleString(currentLanguage, options);
    const endTime = end.toLocaleString(currentLanguage, options);

    return `${startTime} - ${endTime}`;
}


function setLanguage(lang) {
    currentLanguage = lang;
    calculateDough();
}

/********************TOGGLE INSTRUCTIONS********************/
function toggleInstructions(event) {
    event.preventDefault();

    const instructionsBox = document.getElementById('instructionsBox');
    const toggleButton = document.getElementById('toggleInstructions');

    if (instructionsBox.classList.contains('hidden')) {
        instructionsBox.classList.remove('hidden'); // Zobrazení instrukcí
        toggleButton.innerText = getTranslation('hideInstructions');
    } else {
        instructionsBox.classList.add('hidden'); // Skrytí instrukcí
        toggleButton.innerText = getTranslation('showInstructions');
    }
}

function toggleFinalInstructions(event) {
    event.preventDefault();

    const finalInstructionsBox = document.getElementById('finalInstructionsBox');
    const toggleButton = document.getElementById('toggleFinalInstructions');

    if (finalInstructionsBox.classList.contains('hidden')) {
        finalInstructionsBox.classList.remove('hidden'); // Zobrazení instrukcí
        toggleButton.innerText = getTranslation('hideInstructions');
    } else {
        finalInstructionsBox.classList.add('hidden'); // Skrytí instrukcí
        toggleButton.innerText = getTranslation('showInstructions');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const today = new Date();

    // Pøidání 24 hodin
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');

    // Nastavení data a èasu
    document.getElementById("pizzaDate").value = tomorrow.toISOString().split('T')[0];
    document.getElementById("pizzaTime").value = `${hours}:${minutes}`;

    calculateDough();

    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", calculateDough);
    });

    // Tooltipy
    document.querySelectorAll('.info-word').forEach(word => {
        word.addEventListener('click', event => {
            event.stopPropagation(); // Zabrání šíøení kliknutí
            if (word.classList.contains('active')) {
                word.classList.remove('active');
            } else {
                // Skryje ostatní aktivní tooltipy
                document.querySelectorAll('.info-word.active').forEach(activeWord => {
                    activeWord.classList.remove('active');
                });
                word.classList.add('active');
            }
        });
    });

    // Skrytí tooltipù po kliknutí mimo
    document.addEventListener('click', () => {
        document.querySelectorAll('.info-word.active').forEach(word => {
            word.classList.remove('active');
        });
    });

    // Detekce dotykového zaøízení
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.body.classList.add('touch-device');
    }
});


