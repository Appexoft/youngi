export const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <title>Example Bootstrap implementation</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap"
      rel="stylesheet"
    />

    <script src="https://cdn.paymeservice.com/hf/v1/hostedfields.js"></script>
  </head>
  <style>
    body {
      margin: 0;
      background-color: #fff;
      padding: 0 23px 0 23px;

    }

    .card {
      width: 100%;
      background-color: #d354ff;
      box-sizing: border-box;
      padding-top: 5px;
      padding-bottom: 20px;
      padding-left: 12px;
      padding-right: 20px;
      margin-top: 25px;
      border-radius: 20px;
      position: relative;
      box-shadow: 0px 0px 38px rgba(10, 10, 10, 0.2);
    }

    .debitOrCredit {
      font-family: "Rubik", sans-serif;
      font-weight: 400;
      font-size: 15px;
      padding: 0;
      line-height: 20px;
      position: absolute;
      right: 20px;
      top: 0px;
      color: #fff;
      opacity: 0.7;
    }

    .cardNumberRow {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-top: 45px;
    }

    .cardSecondRow {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 18px;
      margin-top: 24px;
    }

    .subtitle {
      font-family: "Rubik", sans-serif;
      font-weight: 500;
      font-size: 18px;
      color: #fff;
      margin: 0;
    }

    .another {
      margin-top: 24px;
    }

    .input {
      width: 100%;
      padding: 14px 12px;
      background: rgba(28, 16, 32, 0.12);
      border-radius: 12px;
      box-sizing: border-box;
      border: 0;
      margin-top: 8px;
      height: 45px;
    }
    .input:active {
      border: 0;
      outline: none;
    }
    .input:focus {
      border: 0;
      outline: none;
    }
    .input::placeholder {
      color: rgba(255, 255, 255, 0.68);
      font-family: "Rubik", sans-serif;
      font-weight: 400;
      font-size: 15px;
    }
    .button {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(
        261.24deg,
        #d354ff 8.45%,
        #ca30ff 75.8%,
        #ca30ff 75.8%
      );
      box-shadow: 0px 8px 40px -4px rgba(28, 16, 32, 0.1);
      border-radius: 20px;
      border: 0;
      margin-top: 55px;
      color: #fff;
      font-family: "Rubik", sans-serif;
      font-weight: 600;
      font-size: 18px;
    }
  </style>
  <body>
    <form id="checkout-form">
      <div class="card">
        <h2 class="debitOrCredit">קרדיט/דביט</h2>

        <div>
          <div class="cardNumberRow">
            <label for="card-number-container" class="subtitle"
              >מספר כרטיס</label
            >
            <div class="input" id="card-number-container"></div>
          </div>
        </div>

        <div class="cardSecondRow another">
          <div class="">
            <label for="card-expiration-container" class="subtitle"
              >תאריך</label
            >
            <div class="input" id="card-expiration-container"></div>
          </div>
          <div class="">
            <label for="card-cvc-container" class="subtitle">
              CVC
            </label>
            <div class="input" id="card-cvc-container"></div>
          </div>
          
         </div>
        </div>
      </div>
      <button type="submit" class="button" id="submit-button">
        הוסף כרטיס
      </button>
    </form>

    <pre id="console-pre"></pre>

    <script>
      const apiKey = "5a7ae614-b951-4344-a4be-aeee80f77645";
      const form = document.getElementById("checkout-form");
      let infoFromReactNativeApp;

      window.addEventListener("message", (message) => {
        if (message.data.includes("email")) {
          infoFromReactNativeApp = JSON.parse(message.data);
        }
      });
      const sendDataToReactNativeApp = async (data) => {
        window.ReactNativeWebView.postMessage(data);
      };

      PayMe.create(apiKey, { testMode: true, tokenIsPermanent: true })
        .then(function (instance) {
          var fields = instance.hostedFields();
          const defaultSettings = {
            styles: {
              base: {
                "text-align": "left",
                color: "rgba(255, 255, 255, 0.68)",
                "font-family": "Rubik, sans-serif",
                "font-weight": "400",
                "font-size": "15px",
                width: "100%",
                padding: "14px 12px",
                "background-color": "rgba(28, 16, 32, 0.12)",
                "border-radius": "12px",
                "box-sizing": "border-box",
                border: "0",
                " margin-top": "8px",
                "::placeholder": {
                  color: "rgba(255, 255, 255, 0.68)",
                },
              },
              invalid: {
                color: "#fff",
              },
              valid: {
                color: "#fff",
              },
            },
          };

          const cardNumberSettings = Object.assign({}, defaultSettings, {
            placeholder: '0000 0000 0000 0000',
          });
          var cardNumber = fields.create(
            PayMe.fields.NUMBER,
            cardNumberSettings
          );

          const expirationSettings = Object.assign({}, defaultSettings, {
            placeholder: 'MM/YY',
          });
          var expiration = fields.create(PayMe.fields.EXPIRATION, expirationSettings);

          const cvcSettings = Object.assign({}, defaultSettings, {
            placeholder: '000',
          });
          var cvc = fields.create(PayMe.fields.CVC, cvcSettings);

          cardNumber.mount("#card-number-container");
          expiration.mount("#card-expiration-container");
          cvc.mount("#card-cvc-container");

          form.addEventListener("submit", (ev) => {
            ev.preventDefault();

            sendDataToReactNativeApp(infoFromReactNativeApp);

            var saleData = {
              payerFirstName: infoFromReactNativeApp.firstName,
              payerLastName: infoFromReactNativeApp.lastName,
              payerEmail: infoFromReactNativeApp.email,
              payerPhone: infoFromReactNativeApp.phone,
              payerSocialId: infoFromReactNativeApp.personID,

              total: {
                label: "GET TOKEN",
                amount: {
                  currency: "USD",
                  value: "1.00",
                },
              },
            };

            instance
              .tokenize(saleData)
              .then(function (tokenizationResult) {
                sendDataToReactNativeApp(JSON.stringify(tokenizationResult));
              })
              .catch(function (tokenizationError) {
                sendDataToReactNativeApp(tokenizationError);
              });
          });
        })
        .catch(function (error) {
          // Instantiation error occurs
          sendDataToReactNativeApp(error);
        });
    </script>
  </body>
</html>`;
