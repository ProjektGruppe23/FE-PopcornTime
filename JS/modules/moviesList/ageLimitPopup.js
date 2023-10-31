export const closePopup = () => {
    const popup = document.getElementById('movie-popup');
    popup.style.display = 'none';
};

export const showPopupWithAgeLimit = (ageLimit) => {
    const popup = document.getElementById('movie-popup');
    const ageLimitPlaceholder = document.getElementById('age-limit-placeholder');
    ageLimitPlaceholder.textContent = ageLimit;
    popup.style.display = 'block';
};
