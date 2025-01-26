import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getMyAdAccount, HOST } from "../../services";

export function useGoogleAccountConnect() {
  const [adAccount, setAdAccount] = useState(false);
  const [createAdAcountOpen, setCreateAdAccountOpen] = useState(false);
  const [token, setToken] = useState("");
  const [chooseAddAccountOpen, setChooseAddAccountOpen] = useState(false);
  const [newAccountOpen, setNewAccountOpen] = useState(false);

  useEffect(() => {
    if (!newAccountOpen) {
      fetchAdAccount();
    }
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [newAccountOpen]);

  const handleMessage = useCallback(
    (message) => {
      if (message.data && message.origin === HOST) {
        if (newAccountOpen) {
          setCreateAdAccountOpen(true);
        } else {
          setChooseAddAccountOpen(true);
        }
        setToken(message.data);
      }
    },
    [newAccountOpen]
  );

  const fetchAdAccount = useCallback(() => {
    getMyAdAccount().then((data) => {
      setAdAccount(data);
    });
  }, []);

  return {
    fetchAdAccount,
    createAdAcountOpen,
    setCreateAdAccountOpen,
    token,
    setToken,
    chooseAddAccountOpen,
    setChooseAddAccountOpen,
    newAccountOpen,
    setNewAccountOpen,
    adAccount,
    setAdAccount,
  };
}
