const Payment = () => {
  return (
    <div>
      <h1>Payment</h1>
      <form
        method="POST"
        acceptCharset="utf-8"
        target="_blank"
        action="https://www.liqpay.ua/api/3/checkout">
        <input
          type="hidden"
          name="data"
          value="eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJzdWJzY3JpYmUiLCJhbW91bnQiOiIxMDAiLCJjdXJyZW5jeSI6IlVBSCIsImRlc2NyaXB0aW9uIjoi0JzRltC5INGC0L7QstCw0YAiLCJwdWJsaWNfa2V5Ijoic2FuZGJveF9pMzEyMzM2NTc3ODgiLCJyZWN1cnJpbmdieXRva2VuIjoxLCJsYW5ndWFnZSI6InVrIiwic3Vic2NyaWJlIjoxLCJzdWJzY3JpYmVfZGF0ZV9zdGFydCI6Im5vdyIsInN1YnNjcmliZV9wZXJpb2RpY2l0eSI6Im1vbnRoIn0="
        />
        <input
          type="hidden"
          name="signature"
          value="2+Kzlz1t1JVAXC5CT1zpKFcy8YM="
        />
        <button
          style={{
            border: "none",
            display: "inline-block",
            textAlign: "center",
            padding: "5px 24px",
            color: "#fff",
            boxShadow:
              "0px 0px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.12)",
            fontSize: "16px",
            lineHeight: "1.75",
            fontWeight: "600",
            fontFamily: "Open Sans, sans-serif",
            cursor: "pointer",
            borderRadius: "8px",
            background: "#77CC5D",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = "0.5";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = "1";
          }}>
          <img
            src="https://static.liqpay.ua/buttons/logo-white.svg"
            alt="LiqPay Logo"
            // name="btn_text"
            style={{ verticalAlign: "middle" }}
          />
          <span style={{ verticalAlign: "middle", marginLeft: "8px" }}>
            Сплатити
          </span>
        </button>
      </form>
    </div>
  );
};

export default Payment;
