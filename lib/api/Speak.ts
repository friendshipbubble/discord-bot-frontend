import { apiEndpoint } from ".";


// We cannot use React hooks here.
export const speak = async (token: string, data: { channelSnowflake: string, message: string }) => {
    const response = await fetch(`${apiEndpoint}/v1/discord/speak`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(data)
    });

    const responseJson = await response.json();

    return response.status === 201;
}