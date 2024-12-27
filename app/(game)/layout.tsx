'use client';

import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    React.useEffect(() => {
        document.documentElement.style.fontSize = "62.5%";
        return () => {
            document.documentElement.style.fontSize = "";
        };
    }, []);

    return <section>{children}</section>;
}
