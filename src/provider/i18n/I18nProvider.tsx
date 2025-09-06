"use client";

import React, { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n.init({}).then(() => setReady(true));
    } else {
      setReady(true);
    }
  }, []);

  if (!ready) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
