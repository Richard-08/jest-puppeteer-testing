const timeout = 50000;

const sites = [
  /* {
    url: "https://sale.haval-kuntsevo.ru/",
    btns: [
      ".block-header__button",
      ".block-cars__button",
      ".block-cars__car-img",
      ".block-advantages__item",
    ],
    form: ".popup-callback",
  }, */
  {
    url: "https://skoda-avtomir-vrn.ru/",
    btns: [
      ".offer-btn",
      ".button_common",
      ".bclock-callback",
      ".condition",
      ".car-img__model",
      ".list-elem",
      ".car-button",
      ".advantage",
    ],
    form: ".callback-request",
    form_close: ".close",
  },
];

sites.forEach((site) => {
  describe(
    "/ (Home Page)",
    () => {
      let page;
      beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(site.url);
      }, timeout);

      afterAll(async () => {
        await page.close();
      });

      site.btns.forEach((btn) => {
        it("should load without error", async () => {
          await page.click(btn);
          await page.waitForSelector(site.form);
          await page.click(site.form_close);
        });
      });
    },
    timeout
  );
});
