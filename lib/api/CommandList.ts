import useSWR from "swr";
import { apiEndpoint, ApiResponse } from ".";
import { useToken } from "../../hooks/use-token";
import fetchWithToken from "../fetchWithToken";

export type CommandList = {
    id: number;
    name: string;
    description: string;
    options: string[];
}

const useAllCommandLists = () => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<CommandList[]>>(token ? [`${apiEndpoint}/command/lists`, token] : null, fetchWithToken);

    if (data && data.error) {
        return {
            data: undefined,
            isLoading: !error && !data,
            error: data.error
        }
    }

    return {
        data: data?.data,
        isLoading: !error && !data,
        error
    }
}

const useCommandList = (id: number) => {
    const token = useToken();
    const { error, data } = useSWR<ApiResponse<CommandList>>(token ? [`${apiEndpoint}/command/lists/${id}`, token] : null, fetchWithToken);

    if (data && data.error) {
        return {
            data: undefined,
            isLoading: !error && !data,
            error: data.error
        }
    }

    return {
        data: data?.data,
        isLoading: !error && !data,
        error
    }
}

// We cannot use React hooks here.
const createCommandList = async (token: string, data: { name: string, description: string, options: string[] }) => {
    const response = await fetch(`${apiEndpoint}/command/lists`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(data)
    });

    const responseJson = await response.json();

    return response.status === 200;
}

// We cannot use React hooks here.
const updateCommandList = async (token: string, data: { name: string, description: string, options: string[] }, id: number) => {
    const response = await fetch(`${apiEndpoint}/command/lists/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'PUT',
        body: JSON.stringify(data)
    });

    const responseJson = await response.json();

    return response.status === 200;
}

// We cannot use React hooks here.
const deleteCommandList = async (token: string, id: number) => {
    const response = await fetch(`${apiEndpoint}/command/lists/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'DELETE'
    });

    const responseJson = await response.json();

    return response.status === 200;
}

// TODO: Implement create, update, delete.

const exports = {
    useAllCommandLists,
    useCommandList,
    createCommandList,
    updateCommandList,
    deleteCommandList
}

export default exports;