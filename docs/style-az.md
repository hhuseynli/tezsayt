# Azerbaijani Style Guide (style-az.md)

Register: plain, direct, respectful — how a competent person explains something to a
peer. Not marketing-agency Azerbaijani, not officialese, not literal translation from
English. The reader is a non-technical Baku business owner on a phone.

## Address form

**Siz** (formal you), consistently. Never sən, never switching between them.

## Termbase

| Concept | Preferred AZ term | Avoid | Notes |
|---|---|---|---|
| website | sayt, vebsayt | veb-sayt (hyphenated) | "sayt" in running text, "vebsayt" in headings/meta if needed |
| homepage | ana səhifə | əsas səhifə | |
| domain | domen | | Borrowed, universally understood |
| hosting | hostinq | | Borrowed, universally understood |
| password | şifrə (pl: şifrələr) | parol | "şifrə" is the everyday word in Baku |
| password reset | şifrələri sıfırlamaq | | |
| account | hesab | akkount | |
| credentials | giriş məlumatları | etimadnamə | "etimadnamə" is too formal |
| ownership | sahiblik | mülkiyyət | "mülkiyyət" is legal register |
| delivery / handover | təhvil | çatdırılma | "çatdırılma" implies physical delivery |
| timeline / turnaround | müddət | vaxt çərçivəsi | |
| calendar day | təqvim günü | | Must appear at least once per page with turnaround |
| deposit | depozit | əvvəlcədən ödəniş | Borrowed, universally understood |
| support | dəstək | | |
| support plan | dəstək planı | texniki xidmət planı | Simpler |
| optional | ixtiyari | isteğe bağlı (Turkish) | **Never** "isteğe bağlı" — Turkish form |
| revision round | düzəliş dövrü | reviziya | |
| free draft / sample | pulsuz nümunə | | |
| launch (going live) | yayım | lanç | |
| price | qiymət | | |
| project | layihə | | |
| build (noun) | hazırlanma | | "tam hazırlanma" for "full build" |
| payment | ödəniş | | |
| client / customer | müştəri | klient | "müştəri" is the everyday word |
| business (entity) | biznes | | |
| business owner | biznes sahibi | sahibkar | "sahibkar" is formal/press |
| service | xidmət | | |
| feature | funksiya | xüsusiyyət | "xüsusiyyət" means "characteristic" |
| booking | rezervasiya | bron | |
| branding | brendinq | | |
| logo | loqo | | |
| content | məzmun, kontent | | "kontent" OK in tech context (SMM kontent) |
| security patch | təhlükəsizlik yaması | | |
| backup | backup, ehtiyat nüsxə | | "backup" is understood; can alternate |
| analytics | analitika | | |
| estimate | təxmini qiymət | smeta | |
| on request | sorğu əsasında | tələb əsasında | "tələb" sounds demanding |
| cancel | ləğv etmək | | |
| admin panel | idarəetmə paneli | admin panel | Use AZ form in user-facing text |

## Turkish-form watchlist

These Turkish spellings leak in regularly. Always use the Azerbaijani form:

| Turkish | Azerbaijani | Context |
|---|---|---|
| isteğe bağlı | ixtiyari / istəyə bağlı | "optional" |
| tutduğu | əhatə etdiyi | "what it covers" (scope) |
| hiyləsi | — | Acceptable AZ, but "tutduğu" is the calque to watch |
| fokuslanmaq | diqqət yetirmək, yönəlmək | "to focus" — "fokuslanmaq" is acceptable colloquial |
| kontent | məzmun (formal), kontent (tech) | Both OK in context |
| branding | brendinq | |

## Phrasings to avoid

| Avoid | Use instead | Why |
|---|---|---|
| "keyfiyyətli həllər" | (describe the actual thing) | Empty marketing filler |
| "innovativ yanaşma" | (describe what's actually different) | |
| "hərtərəfli xidmət" | (list what's included) | |
| "müasir texnologiyalar" | (name the technology or skip) | |
| "professional komanda" | (name the people) | Two people, not a "komanda" |
| "proaktiv şəkildə" | "dərhal", "öz başımıza" | "proaktiv" is corporate-speak in AZ |
| "sizin icazənizlə işləyirik" | "sizdən icazə ilə işləyirik" or simpler | Calque of "at your discretion" |
| "giriş məlumatlarımızı silirik" | "girişimizi ləğv edirik" | More natural |
| "mənbə kodu" | "kod" | Non-technical reader doesn't need "mənbə" |
| "infrastrukturumuzda" | "öz serverimizdə" | Reader knows "server" |
| subordinate-clause pileups | Break into 2 sentences | AZ tolerates long sentences poorly |

## Number and punctuation conventions

- Thousands separator: space (1 000, not 1,000 or 1.000)
- Decimal: comma (2,5 not 2.5)
- Currency: "500 AZN" (number + space + AZN), never "₼500" in text
- "X AZN-dən" for "from X AZN" — suffix attaches to AZN
- Ranges: en-dash without spaces: "3–5 gün", "500–800 AZN"
- Percentages: "50%" (no space before %)
- Phone: +994 XX XXX XX XX
- Time: 24-hour format
- Lists: no Oxford comma equivalent; "A, B və C"
- Ellipsis: three dots "..." (no special character needed)

## Suffix agreement around interpolated values

When a number is interpolated, the following word must work for any value:
- "30 gün" is fine (cardinal + noun, no suffix)
- "30 günlük" is fine (adjectival)
- "30 gündə" — only works if the number doesn't change; prefer "müddəti 30 gündür"
  or restructure

## Heading conventions

- Headings are buyer questions or plain descriptive phrases
- No exclamation marks in headings
- No "!" anywhere except error messages
- Sentence case, not Title Case: "Layihə necə gedir", not "Layihə Necə Gedir"
