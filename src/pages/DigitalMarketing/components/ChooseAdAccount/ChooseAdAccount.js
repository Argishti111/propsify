import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  addExistingAdAccount,
  HOST,
  listAccessibleCustomers,
} from "../../../../services";
import {
  CustomButton,
  ErrorBox,
  Modal,
  ModalActions,
  ModalLoading,
  Table,
  TBody,
  THead,
} from "../../../../shared/components";
import { Radio } from "../../../../shared/components/Form";
import { formatGoogleAdCustomerId } from "../../../../shared/helpers";
import "./ChooseAdAccount.css";

export function ChooseAdAccount({
  token,
  onConnect,
  onClose = () => {},
  chooseAddAccountOpen,
  onCreateNew,
}) {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (chooseAddAccountOpen && token) {
      fetchAccounts(token.id);
    }
  }, [token]);

  const handleClose = useCallback(() => {
    onClose();
    setAccounts([]);
  }, []);

  const handleConnect = useCallback(() => {
    setError("");
    setLoading(true);
    addExistingAdAccount(selectedAccount.id, token.id)
      .then((data) => {
        if (data.success) {
          onConnect();
          onClose();
          setSelectedAccount({});
          return;
        }
        setError(data.errorMessage);
      })
      .catch(() => {
        setError("Failed to connect account");
        setTimeout(() => {
          setError("");
        }, 3000);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedAccount, token]);

  const fetchAccounts = useCallback(
    (token) => {
      setLoading(true);
      listAccessibleCustomers(token)
        .then((res) => {
          if (res.success) {
            setAccounts(res.data.accounts);
          } else {
            setError(res.errorMessage);
          }
        })
        .catch(() => {
          setError("Failed to get accounts");
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [token]
  );

  return (
    <>
      {loading && <ModalLoading />}
      <Modal
        open={chooseAddAccountOpen}
        onClose={handleClose}
        title="Choose Ad account"
        PaperProps={{ sx: { mx: { md: 4, sm: 2, xs: 1 } } }}
        titleChildren={<div />}
      >
        <Box
          px={{ md: 5, sm: 1, xs: 1 }}
          py={6}
          sx={{ overflowY: "scroll" }}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Typography maxWidth={416} textAlign="center" variant="body1">
            Your selected Google Ad account will be added to Propsify's Google
            Manager account. You will receive an email from Google confirming
            this. By connecting your Google Ads account to Propsify, you agree
            that Google may share information about your use of Google Ads with
            Propsify, including the amount you spend on Google Ads. Google May
            use this information to further its business relationship with
            Propsify, including to calculate or pay commissions or bonuses owed
            to Propsify.
          </Typography>

          <Typography textAlign="center" mt={5} mb={2} variant="body1">
            You can connect 1 ad account.
          </Typography>
          <ErrorBox
            title="FAILED"
            message={error}
            sx={{ width: "100%" }}
            mb={2}
          />
          <Table>
            <THead style={{ paddingLeft: 16 }} align="left">
              <tr>
                <th>Ad account</th>
                <th>Ad account ID</th>
              </tr>
            </THead>
            <TBody
              className="ad-accounts"
              style={{ overflowY: "auto", height: "auto" }}
            >
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td style={{ paddingLeft: 8 }}>
                    <Radio
                      checked={selectedAccount.id === account.id}
                      onChange={() => setSelectedAccount(account)}
                      id={account.id}
                      label={account.name}
                    />
                  </td>
                  <td style={{ paddingLeft: 8 }}>
                    {formatGoogleAdCustomerId(account.id)}
                  </td>
                </tr>
              ))}
            </TBody>
          </Table>
        </Box>
        <ModalActions
          secondActionDisabled={!selectedAccount.id}
          onFirstAction={onCreateNew}
          firstAction="CREATE NEW"
          onSecondAction={handleConnect}
          secondAction="CONNECT"
        />
      </Modal>
    </>
  );
}
