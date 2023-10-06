function loadFooter()
{
    fetch('../Template/Footer/footer.html') //load the template
        .then(response => response.text())
        .then(data =>
        {
            const footerContainer = document.getElementById('footer');
            footerContainer.innerHTML = data
        })
        .catch(error => console.error('Error loading footer:', error))
}