/**
 * Unified function to handle HTTP responses and errors
 *
 * @param {Response|Error} responseOrError - The fetch response object or Error object
 * @returns {Promise<any>} - Returns parsed JSON if successful, otherwise throws an error
 */

export async function handleResponse(responseOrError)
{
    // Check if the input is a 'Response' object (from fetch)
    if (responseOrError instanceof Response)
    {
        // 'response.ok' returns true if the status code is between 200-299
        if (responseOrError.ok)
        {
            // SUCCESS CASE: Parse and return the JSON data
            return await responseOrError.json();
        }
        else
        {
            // SERVER ERROR CASE: HTTP 4xx and 5xx status codes -> parse the JSON data from the response object for error details
            const responseData = await responseOrError.json();
            // Create an error message string
            const errorMsg = `Server Error! Status: ${responseOrError.status}, Message: ${JSON.stringify(responseData)}`;
            // Show the error message as an alert
            alert(errorMsg);
            // Throw a new error to be caught by the caller
            throw new Error(errorMsg);
        }
    }
    // Check if the input is an 'Error' object (likely a network error)
    else if (responseOrError instanceof Error)
    {
        // NETWORK ERROR CASE: Could be no internet, CORS issue, etc.
        // Log the error to console for debugging
        console.error('Fetch Error:', responseOrError);
        // Show a generic alert message
        alert('An unexpected error occurred. See console for details.');
        // Throw the original error to be caught by the caller
        throw responseOrError;
    }
    else
    {
        // UNKNOWN CASE: The input was neither a Response nor Error object -> Log the unknown object for debugging
        console.error('Unknown object:', responseOrError);
        // Throw a generic error to be caught by the caller
        throw new Error('An unknown error occurred');
    }
}
