import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const ReferralSlip = ({ referralSlip, headers }) => {
  const fetchReferralSlip = async () => {
    const response = await axios.get(
      `${ENDPOINT}referral_slip/${referralSlip}`,
      {
        headers,
        responseType: "arraybuffer",
      }
    );

    return new Blob([response.data], { type: "image/png" });
  };

  const { data } = useQuery(
    ["personnel_referral_slip", referralSlip],
    fetchReferralSlip,
    {
      refetchOnWindowFocus: true,
    }
  );

  const [blob, setBlob] = useState(null);

  useEffect(() => {
    if (data) {
      setBlob(data);
    }
  }, [data]);

  return blob;
};

export default ReferralSlip;
