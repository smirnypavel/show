// types.ts

export interface FormData {
  firstName?: string;
  phone?: string;
  telegram?: string;
  email?: string;
  viber?: string;
  whatsapp?: string;
  title?: string;
  price?: string;
  description?: string;
  social?: {
    Facebook?: string;
    Instagram?: string;
    Youtube?: string;
    TikTok?: string;
    WebSite?: string;
  };
}

export interface StepProps {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSubmit?: () => void;
}
