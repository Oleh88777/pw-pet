# AQA Study List

Список для кращого розуміння після payment / billing флоу.
Мета: General QA → Automation QA (Playwright + TypeScript).

---

## 1. TypeScript (високий пріоритет)

- [ ] `interface` vs `type` — коли що використовувати
- [ ] Structural typing: чому `UserData` підходить туди, де очікують `BillingAddress`
- [ ] `as Type` — це підказка компілятору, не перевірка даних у рантаймі
- [ ] `Pick`, `Partial` — звуження / часткові типи (після бази)
- [ ] Типізація параметрів методів POM (`data: BillingAddress`)

**Практика:** описувати test data і входи методів тільки через типи.

---

## 2. Async / Promises

- [ ] Навіщо `await` на `click`, `expect`, `readFile`, `writeFile`
- [ ] Що буде без `await` (флейки, race conditions)
- [ ] Різниця: синхронний код vs Promise

**Практика:** пояснити своїми словами будь-який `await` у `payment.setup.ts`.

---

## 3. Playwright: auth і setup

- [ ] `storageState` — що зберігає (сесія), чого не зберігає (поля юзера)
- [ ] Setup projects + `dependencies` у `playwright.config.ts`
- [ ] Короткий JWT / TTL токена — чому в UI mode потрібен свіжий setup
- [ ] Патерн: session file + data file (як у payment-setup)
- [ ] Далі: API login / fixture в `beforeEach` для стабільності

Док: [Authentication](https://playwright.dev/docs/auth)

---

## 4. Playwright: локатори і asserts

- [ ] `getByRole`, `getByTestId` — user-facing локатори
- [ ] Web-first asserts: `toBeVisible`, `toHaveValue`, `toHaveText`
- [ ] Чому не `waitForTimeout` і не “видимий = заповнений”
- [ ] `test.step` для читабельних звітів

Док: [Best practices](https://playwright.dev/docs/best-practices)

---

## 5. POM / структура фреймворку

- [ ] Локатори + дії/перевірки в page class; сценарій у спеку
- [ ] Метод на кшталт `checkBillingFiledValues` vs asserts у тесті
- [ ] Що не класти в POM (читання json з диска — краще helper/fixture)
- [ ] Helpers: `loadCheckoutUser()`, `toBillingAddress()`

---

## 6. Git (базово для портфоліо)

- [ ] `status` / `diff` / `add` / `commit` / `push`
- [ ] Короткі informative commit messages
- [ ] Не комітити secrets (`storageState`, паролі, `.env`)

---

## 7. Для інтерв’ю (умти пояснити вголос)

Свій payment-флоу одним ланцюжком:

```text
API register → UI login → storageState + user data.json
→ тест читає json → BillingAddress / UserData
→ POM toHaveValue на billing полях
```

Також: чому одного `storageState` мало для assert адреси.

---

## План на найближчий тиждень

| День | Фокус |
|------|--------|
| 1–2 | TypeScript interfaces + structural typing |
| 3 | `await` / Promises на своєму коді |
| 4 | Винести `readFile`+parse у маленький helper |
| 5 | Повторити auth setup vs payment setup своїми словами |

---

## Вже зрозуміло (не втрачай)

- Два артефакти setup: сесія vs дані юзера
- Prefill billing → assert, не fill
- `BillingAddress` як контракт форми
- UI mode: спочатку setup, потім тест (короткий token)
