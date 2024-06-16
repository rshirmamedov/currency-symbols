"use client";

import { useEffect, useState } from "react";
import { currencyMapping } from "./currencyMapping";
import { CurrenciesGrid } from "./CurrenciesGrid";
import { NotFoundGrid } from "./NotFoundGrid";

type Currency = {
    amount: string;
    updatedAt: string;
    currencyId: keyof typeof currencyMapping;
};

export default function Account() {
    const [currencies, setCurrencies] = useState<Currency[] | undefined>();

    useEffect(() => {
        const fetchCurrencies = async () => {
            const res = await fetch("https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1/currencies");

            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await res.json();

            if (!abort) {
                setCurrencies(data);
            }
        };

        let abort = false;

        fetchCurrencies();

        return () => {
            abort = true;
        };
    }, [setCurrencies]);

    return (
        <div className="p-3">
            <h1 className="pb-2 text-2xl">Balances</h1>
            <CurrenciesGrid />

            <h1 className="pt-8 pb-2 text-2xl">Not found</h1>
            <NotFoundGrid />
        </div>
    );
}
