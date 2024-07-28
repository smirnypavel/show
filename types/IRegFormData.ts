// types.ts

export interface FormData {
  firstName?: string;
  phone?: string;
  telegram?: string;
  mail?: string;
  viber?: string;
  whatsapp?: string;
  title?: string;
  price?: string;
  description?: string;
  social?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    website?: string;
  };
}

export interface StepProps {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSubmit?: () => void;
}
