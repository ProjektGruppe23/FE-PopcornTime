export function createOption(text, value)
{
    console.log("Opretter dropdown element med tekst: " + text + " og værdi: " + value);
    // Opretter et tomt option HTML-element med tekst og værdi.
    const option = document.createElement('option');
    option.text = text;
    option.value = value;
    return option;
}