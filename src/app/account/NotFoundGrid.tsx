"use client";

import { useData } from "./useData";
import { Loading } from "@/components/Loading";
import { Error } from "@/components/Error";
import { API_BASE_URL } from "@/config";

export function NotFoundGrid() {
    const { loading, data, error } = useData(`${API_BASE_URL}/not-found`);

    if (loading) {
        return (
            <div className="flex items-center">
                <Loading />
                <span>Loading...</span>
            </div>
        );
    }

    if (error) {
        return <Error />;
    }

    if (data) {
        return <div>Unknown data!</div>;
    }
}
