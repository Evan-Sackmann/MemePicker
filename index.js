import { catsData } from "./data.js";

const getImageBtn = document.getElementById("get-image-btn");
const emotionRadios = document.getElementById("emotion-radios");
const getGif = document.getElementById("gifs-only-option");
const memeModal = document.getElementById("meme-modal");
const modalCloseBtn = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", styleCurrentEmotion);
getImageBtn.addEventListener("click", renderCat);
modalCloseBtn.addEventListener("click", closeModal);

function getSelectedEmotion() {
	if (document.querySelector("input[type='radio']:checked")) {
		return document.querySelector("input[type='radio']:checked").id;
	}
}

function closeModal() {
	memeModal.style.display = "none";
}

function styleCurrentEmotion(e) {
	for (const emotion of document.getElementsByClassName("radio")) {
		emotion.classList.remove("highlight");
	}
	return document
		.getElementById(e.target.id)
		.parentElement.classList.add("highlight");
}

function getCatImage() {
	const catEmotion = getSelectedEmotion();
	const getMatchingCat = catsData.filter(function (cat) {
		if (getGif.checked) {
			return cat.emotionTags.includes(catEmotion) && cat.isGif;
		} else {
			return cat.emotionTags.includes(catEmotion);
		}
	});
	return getMatchingCat;
}

function getSingleCatObject() {
	const catArray = getCatImage();
	return catArray[Math.floor(Math.random() * catArray.length)];
}

function renderCat() {
	memeModal.style.display = "flex";
	const cat = getSingleCatObject();
	document.getElementById("meme-modal-inner").innerHTML = `
        <img src="./images/${cat.image}" class="cat-img"/>
    `;
}

function getCatEmotionsArray(cat) {
	const emotionList = [];

	for (const emotion of cat) {
		if (!emotionList.includes(emotion.emotionTags[0])) {
			emotionList.push(emotion.emotionTags[0]);
		}
	}
	return emotionList;
}

function renderEmotionsRadios() {
	const emotions = getCatEmotionsArray(catsData);
	let emotionList = "";
	for (const emotion of emotions) {
		emotionList += `
            <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input 
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name="radio"
            >
                
            </div>
        `;
	}
	return (document.getElementById("emotion-radios").innerHTML = emotionList);
}

renderEmotionsRadios();
