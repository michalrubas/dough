let currentLanguage = 'en';

const translations = {
    en: {
        title: "Pizza Dough Calculator",
        portions: "Portions",
        pizzaSize: "Pizza Size (g)",
        hydration: "Hydration (%)",
        salt: "Salt (%)",
        eatingDate: "Planned Eating Date",
        eatingTime: "Planned Eating Time",
        results: "Results",
        poolish: "Step 1 - Poolish Preparation Steps",
        flour: "Flour",
        water: "Water",
        salt: "Salt",
        yeast: "Yeast",
        honey: "Honey",
        finalMix: "Step 2 - Final Mix",
        recommendedStart: "Recommended start",
        totalIngredients: "Total Ingredients",
        instructions: "Poolish - Instructions",
        hideInstructions: "Hide Instructions",
        showInstructions: "Show Instructions",
        step1: "Mix the ingredients: Pour water into a bowl, add honey, and stir. Next, add yeast and stir again. Finally, add flour and mix until a smooth batter forms.",
        step1_tooltips: {
            honey: "Honey helps fermentation."
        },
        step2: "Let it rest: Leave the mixture uncovered at room temperature for 10–15 minutes, then cover and let it sit for another hour.",
        step3: "Refrigeration: Transfer the poolish to the fridge and let it ferment for 16–24 hours (do not exceed 24 hours).",
        finalInstructions: "Final Mix - Instruction",
        finalMixStep1: "Mix the ingredients: Pour water into a bowl, add the poolish, and stir. Then add salt and flour, and mix manually or with a mixer.",
        finalMixStep2: "Cover and let rest for 20 minutes. Knead the dough until smooth and elastic; it may still be sticky at this stage.",
        finalMixStep3: "Let the dough rest for another 20 minutes to make it easier to handle. Knead lightly until the surface is smooth and gluten is well developed.",
        finalMixStep4: "Divide the dough into individual portions and shape into balls. Place the balls into a sealed container and let them rise for 1–2 hours."
    },
    cz: {
        title: "Kalkulátor těsta na pizzu",
        portions: "Porce",
        pizzaSize: "Velikost pizzy (g)",
        hydration: "Hydratace (%)",
        salt: "Sůl (%)",
        eatingDate: "Datum plánované konzumace",
        eatingTime: "Čas plánované konzumace",
        results: "Výsledky",
        poolish: "Krok 1 - Postup pro přípravu předkvasu",
        flour: "Mouka",
        water: "Voda",
        salt: "Sůl",
        yeast: "Droždí",
        honey: "Med",
        finalMix: "Krok 2 - Finální směs",
        recommendedStart: "Doporučený začátek",
        totalIngredients: "Celkové suroviny",
        instructions: "Předkvas - Postup zpracování",
        hideInstructions: "Skrýt postup",
        showInstructions: "Zobrazit postup",
        step1: "Smíchejte ingredience: Do mísy nalijte vodu, přidejte med a promíchejte. Poté přidejte droždí a znovu promíchejte. Nakonec přidejte mouku a míchejte, dokud nezískáte hladké těsto.",
        step1_tooltips: {
            med: "Med podpoří fermentaci."
        },
        step2: "Nechte odpočinout: Směs nechte 10–15 minut odkrytou při pokojové teplotě, poté zakryjte a nechte stát další 1 hodinu.",
        step3: "Zrání v lednici: Přesuňte poolish do lednice a nechte ho zrát 16–24 hodin (nepřekračujte 24 hodin).",
        finalInstructions: "Finální směs - instrukce",
        finalMixStep1: "Smíchejte ingredience: Do mísy nalijte vodu, přidejte předkvas (poolish) a promíchejte. Poté přidejte sůl a mouku a zpracujte ručně nebo v robotu.",
        finalMixStep2: "Přikryjte a nechte odpočinout 20 minut. Těsto hněťte, dokud nebude hladké a pružné; v této fázi může být stále lepivé.",
        finalMixStep3: "Nechte těsto odpočívat dalších 20 minut, aby se s ním lépe pracovalo. Lehkým propracováním vytvořte hladký povrch a zajistěte, aby lepková síť nebyla přetrhaná.",
        finalMixStep4: "Rozdělte těsto na jednotlivé porce a vytvarujte koule. Připravené koule dejte do uzavíratelné nádoby a nechte kynout 1–2 hodiny."
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('lang-en').addEventListener('click', () => switchLanguage('en'));
    document.getElementById('lang-cz').addEventListener('click', () => switchLanguage('cz'));
    calculateDough();
});

function switchLanguage(lang) {
    currentLanguage = lang;

    document.querySelector('h1').innerText = translations[lang].title;
    document.querySelector('label[for="numPortions"]').innerText = translations[lang].portions;
    document.querySelector('label[for="pizzaSize"]').innerText = translations[lang].pizzaSize;
    document.querySelector('label[for="hydration"]').innerText = translations[lang].hydration;
    document.querySelector('label[for="salt"]').innerText = translations[lang].salt;
    document.querySelector('label[for="pizzaDate"]').innerText = translations[lang].eatingDate;
    document.querySelector('label[for="pizzaTime"]').innerText = translations[lang].eatingTime;
    // document.querySelector('h2').innerText = translations[lang].results;

    calculateDough();
}

function getTranslation(key) {
    return translations[currentLanguage][key];
}
