// Gera o "PIX Copia e Cola" (BR Code estático, padrão EMV do Banco Central).
export const PIX_KEY = "e1468073-16b2-4e58-a5cb-2f73183ef4cb";
export const PIX_MERCHANT_NAME = "NATAL FAMILIA";
export const PIX_MERCHANT_CITY = "BRASIL";

function field(id: string, value: string) {
  return id + String(value.length).padStart(2, "0") + value;
}

function normalize(text: string, max: number) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .toUpperCase()
    .slice(0, max);
}

function crc16(payload: string) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function buildPixPayload(amountCents: number, txid: string) {
  const merchantAccount = field("00", "br.gov.bcb.pix") + field("01", PIX_KEY);
  const payload =
    field("00", "01") +
    field("26", merchantAccount) +
    field("52", "0000") +
    field("53", "986") +
    field("54", (amountCents / 100).toFixed(2)) +
    field("58", "BR") +
    field("59", normalize(PIX_MERCHANT_NAME, 25)) +
    field("60", normalize(PIX_MERCHANT_CITY, 15)) +
    field("62", field("05", txid.replace(/[^A-Za-z0-9]/g, "").slice(0, 25))) +
    "6304";
  return payload + crc16(payload);
}
