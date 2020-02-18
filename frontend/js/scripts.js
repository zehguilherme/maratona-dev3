// classList: adicionar classes
// toggle: função que adiciona ou remove conforme há a existência da classe 'hide' ou não

document.querySelector('header button').addEventListener("click", function() {
    document.querySelector('section.form').classList.toggle('hide');
})

