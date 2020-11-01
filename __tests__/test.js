const timeout = 50000;

const sites = [
  {
    url: "https://sale.haval-kuntsevo.ru/",
    btns: [
      ".block-header__button",
      ".block-cars__button",
      //".block-cars__car-img",
      ".block-advantages__item",
    ],
    form: ".popup-callback",
    form_close: ".popup-callback__close",
  },
  {
    url: "https://skoda-avtomir-vrn.ru/",
    btns: [
      ".offer-btn",
      ".button_common",
      ".bclock-callback",
      ".condition",
      //".car-img__model",
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
    `${site.url}`,
    () => {
      let page;
      beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        await page.setViewport({ width: 1920, height: 1080 });

        await page.setRequestInterception(true);
        page.on("request", (request) => {
          const url = request.url();
          const filters = [
            "google-analytics",
            "fontawesome",
            "facebook",
            "analytics",
            "comagic",
            "yandex",
            "googletagmanager",
            "callkeeper",
            "calltouch",
            "googleoptimize",
          ];
          const shouldAbort = filters.some((urlPart) => url.includes(urlPart));
          if (shouldAbort) {
            return request.abort();
          } else if (
            request.url().endsWith(".png") ||
            request.url().endsWith(".jpg")
          ) {
            return request.abort();
          } else {
            return request.continue();
          }
        });

        await page.goto(site.url);
      }, timeout);

      afterAll(async () => {
        await page.close();
      });

      site.btns.forEach((btn) => {
        it(`${btn} is clicked`, async () => {
          await page.click(btn);
          await page.waitForSelector(site.form);
          await page.click(site.form_close);
        });
      });
    },
    timeout
  );
});
