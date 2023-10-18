import { createOption } from "./createOption.js";
import { fetchAnyUrl } from "./fetchAnyUrl.js";

/**
 * Generic function to fetch data and populate a dropdown
 *
 * @param {string} dropdownId - ID of the dropdown element
 * @param {string} fetchUrl - API endpoint URL
 * @param {string} textKey - Object key for the text in the dropdown
 * @param {string} valueKey - Object key for the value in the dropdown
 */
export async function fetchAndPopulateDropdown(dropdownId, fetchUrl, textKey, valueKey) {
    // Fetch the dropdown element by its ID
    const dropdownElement = document.getElementById(dropdownId);

    try {
        // Fetch the data from the URL
        const data = await fetchAnyUrl(fetchUrl);

        // Populate the dropdown
        data.forEach(item => {
            dropdownElement.appendChild(createOption(item[textKey], item[valueKey]));
            // textKey will populate the text of the dropdown, valueKey will populate the value of the dropdown to the database.
        });
    } catch (error) {
        console.error(`Error populating dropdown for ${dropdownId}:`, error);
    }
}
