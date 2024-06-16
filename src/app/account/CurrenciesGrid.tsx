"use client";

import { currencyMapping } from "./currencyMapping";
import { Loading } from "@/components/Loading";
import { Error } from "@/components/Error";
import { useData } from "./useData";
import { Field } from "@/components/Field";
import { ChangeEvent, KeyboardEvent, useCallback, useMemo, useState } from "react";
import { API_BASE_URL } from "@/config";

type Currency = {
    amount: string;
    updatedAt: string;
    currencyId: keyof typeof currencyMapping;
};

export function CurrenciesGrid() {
    const [search, setSearch] = useState("");
    const { loading, data, error } = useData<Currency[]>(`${API_BASE_URL}/currencies`);

    const currencies = useMemo(() => {
        if (!Array.isArray(data)) {
            return;
        }

        const allCurrencies = data.map(({ currencyId, amount }) => ({
            currencySymbol: currencyMapping[currencyId] ?? currencyId,
            amount,
        }));

        if (search) {
            const searchValue = search.toLowerCase();

            return allCurrencies.filter(({ currencySymbol }) => currencySymbol.toLowerCase().includes(searchValue));
        }

        return allCurrencies;
    }, [data, search]);

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value.slice(0, 3));
        },
        [setSearch],
    );

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (!/[a-zA-Z]/.test(e.key)) {
            e.preventDefault();
        }
    }, []);

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

    if (currencies) {
        return (
            <>
                <div className="pb-5 w-60">
                    <Field
                        inputId="currencySymbol"
                        type="text"
                        label="Currency symbol (3 chars max)"
                        placeholder="Search by currency symbol"
                        value={search}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] h-10 overflow-hidden">
                    {[...Array(currencies.length)].map((_, index) => (
                        <div key={index} className="border flex justify-between px-4 py-1 h-10 bg-gray-200">
                            <div className="flex items-center font-bold">Name</div>
                            <div className="flex items-center font-bold">Balance</div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                    {currencies.map(({ amount, currencySymbol }) => (
                        <div
                            className="border flex justify-between align-bottom px-4 h-10 bg-white overflow-hidden"
                            key={currencySymbol}
                        >
                            <div className="flex items-center font-semibold">{currencySymbol}</div>
                            <div className="flex items-center">{amount}</div>
                        </div>
                    ))}
                </div>
            </>
        );
    }
}
